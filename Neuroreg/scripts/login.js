// login.js — ESM version using esm.sh (GitHub Pages compatible)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------------------------------
// CAPTCHA CALLBACK (Google calls this automatically)
// ----------------------------------------------------
window.onSignupCaptcha = async function (token) {
  handleSignup(token);
};

// ----------------------------------------------------
// PROGRAMMATIC CAPTCHA TRIGGER
// ----------------------------------------------------
window.triggerSignupCaptcha = function () {
  grecaptcha.execute();
};

// ----------------------------------------------------
// SIGNUP (with scalpel_points = 200 and link rows)
// ----------------------------------------------------
window.signup = async function (email, password, nickname) {
  try {
    // 1. Create auth user
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signupError) return { error: signupError.message };

    // 2. Log them in (now authenticated → RLS allows profile insert)
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (loginError) return { error: loginError.message };

    const user = loginData.user;

    // 3. Insert profile row with scalpel_points = 200
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      nickname,
      email,
      scalpel_points: 200,
      isadmin: false
    });

    if (profileError) return { error: profileError.message };

    // 4. Insert 8 default link mappings (linkid 1–8)
    const linkRows = Array.from({ length: 8 }, (_, i) => ({
      userid: user.id,
      linkid: i + 1
    }));

    const { error: mapError } = await supabase
      .from("mapuserstolinks")
      .insert(linkRows);

    if (mapError) return { error: mapError.message };

    // 5. Store session + profile info
    localStorage.setItem("sessionToken", loginData.session.access_token);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("scalpel_points", "200");
    localStorage.setItem("userId", user.id);
    localStorage.setItem("isAdmin", "false");

    // 6. Redirect
    window.location.href = "index.html";

    return { user };

  } catch (err) {
    return { error: "Signup failed. Please try again." };
  }
};

// ----------------------------------------------------
// SIGNUP HANDLER (called after captcha)
// ----------------------------------------------------
window.handleSignup = async function (captchaToken) {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const nickname = document.getElementById("signupNickname").value.trim();
  const errorBox = document.getElementById("signup-error");

  // 1. Ensure captcha ran
  if (!captchaToken) {
    errorBox.textContent = "Captcha failed. Please try again.";
    errorBox.style.display = "block";
    return;
  }

  // 2. OPTIONAL: client-side captcha verification
  const verify = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=YOUR_SECRET_KEY&response=${captchaToken}`,
    { method: "POST" }
  ).then(r => r.json());

  if (!verify.success) {
    errorBox.textContent = "Captcha verification failed.";
    errorBox.style.display = "block";
    return;
  }

  // 3. Continue with Supabase signup
  const result = await signup(email, password, nickname);

  if (result.error) {
    errorBox.textContent = result.error;
    errorBox.style.display = "block";
    return;
  }
};

// ----------------------------------------------------
// LOGIN
// ----------------------------------------------------
window.login = async function (email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return { error: error.message };

    const user = data.user;

    // Load profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) return { error: profileError.message };

    // Store session + profile
    localStorage.setItem("sessionToken", data.session.access_token);
    localStorage.setItem("nickname", profile.nickname);
    localStorage.setItem("scalpel_points", profile.scalpel_points);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("isAdmin", profile.isadmin ? "true" : "false");

    window.location.href = "index.html";

    return { user, profile };

  } catch (err) {
    return { error: "Login failed. Please check your email and password." };
  }
};

// ----------------------------------------------------
// RECOVER EMAIL (nickname → email lookup)
// ----------------------------------------------------
window.recoverEmail = async function (nickname) {
  try {
    if (!nickname) {
      return { error: "Please enter your nickname." };
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("nickname", nickname)
      .single();

    if (error || !data) {
      return { error: "No user found with that nickname." };
    }

    return {
      message:
        "Recovery email service is not active yet. Your email would be sent to: " +
        data.email
    };

  } catch (err) {
    return { error: "Unable to recover email right now." };
  }
};

// ----------------------------------------------------
// GET CURRENT USER
// ----------------------------------------------------
window.getCurrentUser = async function () {
  const { data: { user } } = await supabase.auth.getUser();
  return user || null;
};

// ----------------------------------------------------
// AUTH STATE LISTENER
// ----------------------------------------------------
window.onAuthStateChange = function (callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};