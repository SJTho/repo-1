// login.js — ESM version using esm.sh (GitHub Pages compatible)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------------------------------
// VALIDATION RULES
// ----------------------------------------------------
const emailRegex =
  /^[^\s@]+@([A-Za-z0-9-]{2,}\.)+[A-Za-z]{2,}$/;


const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{8,}$/;

const nicknameRegex = /^[A-Za-z0-9_-]{3,20}$/;

// ----------------------------------------------------
// CAPTCHA CALLBACKS
// ----------------------------------------------------
window.onSignupCaptcha = function (token) {
  handleSignup(token);
};

window.onPasswordResetCaptcha = function (token) {
  handlePasswordReset(token);
};

// ----------------------------------------------------
// SIGNUP (with scalpel_points = 40 and link rows)
// ----------------------------------------------------
window.signup = async function (email, password, nickname, subscribed) {
  try {
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signupError) return { error: signupError.message };

    const user = signupData.user;

    // Create profile row
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      nickname,
      email,
      subscribed,
      scalpel_points: 40,
      isadmin: false
    });

    if (profileError) return { error: profileError.message };

    // Create link rows
    const linkRows = Array.from({ length: 8 }, (_, i) => ({
      userid: user.id,
      linkid: i + 1
    }));

    const { error: mapError } = await supabase
      .from("mapuserstolinks")
      .insert(linkRows);

    if (mapError) return { error: mapError.message };

    // Login immediately to get session
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (loginError) return { error: loginError.message };

    localStorage.setItem("sessionToken", loginData.session.access_token);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("userId", user.id);

    window.location.href = "index.html";

    return { user };

  } catch (err) {
    return { error: "Signup failed. Please try again." };
  }
};

// ----------------------------------------------------
// SIGNUP HANDLER (with validation)
// ----------------------------------------------------
window.handleSignup = async function (captchaToken) {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const nickname = document.getElementById("signupNickname").value.trim();
  const errorBox = document.getElementById("signup-error");

  if (!captchaToken) {
    errorBox.textContent = "Captcha failed. Please try again.";
    errorBox.style.display = "block";
    return;
  }

  // VALIDATION
  if (!emailRegex.test(email)) {
    errorBox.textContent = "Please enter a valid email address.";
    errorBox.style.display = "block";
    return;
  }

  if (!passwordRegex.test(password)) {
    errorBox.textContent =
      "Password must be at least 8 characters and include letters and numbers.";
    errorBox.style.display = "block";
    return;
  }

  if (!nicknameRegex.test(nickname)) {
    errorBox.textContent =
      "Nickname must be 3–20 characters (letters, numbers, _ or -).";
    errorBox.style.display = "block";
    return;
  }

  // Check nickname uniqueness
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("nickname", nickname)
    .maybeSingle();

  if (existing) {
    errorBox.textContent = "Nickname already taken.";
    errorBox.style.display = "block";
    return;
  }

  const result = await signup(email, password, nickname);

  if (result.error) {
    errorBox.textContent = result.error;
    errorBox.style.display = "block";
  }
};

// ----------------------------------------------------
// PASSWORD RESET HANDLER (protected by captcha)
// ----------------------------------------------------
window.handlePasswordReset = async function (captchaToken) {
  
const email =
document.getElementById("recoverEmail").value.trim();

const errorBox = document.getElementById("recover-error");
const successBox = document.getElementById("recover-success");

if (!captchaToken) {
errorBox.textContent = "Captcha failed. Please try again.";
errorBox.style.display = "block";
return;
}

const result = await recoverPassword(email);

if (result.error) {
errorBox.textContent = result.error;
errorBox.style.display = "block";
successBox.style.display = "none";
return;
}

errorBox.style.display = "none";
successBox.textContent = result.message;
successBox.style.display = "block";
};

// ----------------------------------------------------
// RECOVER PASSWORD
// ----------------------------------------------------
window.recoverPassword = async function (email) {
try {

const { data, error } =
await supabase.auth.resetPasswordForEmail(email, {
redirectTo:
"https://www.neuroreg.net/neuroregapp/update-password.html"
});

console.log("RESET DATA:", data);
console.log("RESET ERROR:", error);

if (error) {
return { error: error.message };
}

return {
message:
"If an account exists for that email, a password reset link has been sent."
};

} catch (err) {
console.error("RECOVERY EXCEPTION:", err);
return { error: err.message };
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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) return { error: profileError.message };

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
// LOAD EMAIL AFTER PASSWORD RESET
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
 
const params = new URLSearchParams(window.location.search);
const email = params.get("email");
 
const emailInput =
document.getElementById("loginEmail");
 
const passwordInput =
document.getElementById("loginPassword");
 
if (email) {
 
if (emailInput) {
emailInput.value = email;
}
 
if (passwordInput) {
 
passwordInput.value = "";
 
setTimeout(() => {
passwordInput.value = "";
}, 100);
 
setTimeout(() => {
passwordInput.value = "";
}, 500);
 
}
 
}
 
});

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