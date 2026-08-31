// login.js — ESM version using esm.sh (GitHub Pages compatible)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------------------------------
// SIGNUP (fixed: profile insert happens AFTER login)
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

    // 3. Insert profile row (NOW allowed)
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      nickname,
      email,
      scalpel_points: 0,
      isadmin: false
    });

    if (profileError) return { error: profileError.message };

    // 4. Store session + profile info
    localStorage.setItem("sessionToken", loginData.session.access_token);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("scalpel_points", "0");
    localStorage.setItem("userId", user.id);
    localStorage.setItem("isAdmin", "false");

    // 5. Redirect
    window.location.href = "index.html";

    return { user };

  } catch (err) {
    return { error: "Signup failed. Please try again." };
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