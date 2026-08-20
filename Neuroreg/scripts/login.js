// login.js — ESM version using esm.sh (GitHub Pages compatible)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

// ---------------------------------------------
// Initialize Supabase
// ---------------------------------------------
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------------------------------------
// SIGNUP (fixed: now signs user in before inserting profile)
// ---------------------------------------------
window.signup = async function (email, password, nickname) {
  // Step 1: Create the user
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password
  });

  if (signupError) {
    return { error: signupError.message };
  }

  // Step 2: Sign the user in (creates authenticated session)
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (loginError) {
    return { error: loginError.message };
  }

  const user = loginData.user;

  // Step 3: Insert profile (now authenticated)
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    nickname,
    email,
    scalpel_points: 0,
    isadmin: false
  });

  if (profileError) {
    return { error: profileError.message };
  }

  // Step 4: Save session + profile info to localStorage
  localStorage.setItem("sessionToken", loginData.session.access_token);
  localStorage.setItem("nickname", nickname);
  localStorage.setItem("scalpel_points", "0");
  localStorage.setItem("userId", user.id);
  localStorage.setItem("isAdmin", "false");

  // Step 5: Redirect to index.html
  window.location.href = "index.html";

  return { user };
};

// ---------------------------------------------
// LOGIN
// ---------------------------------------------
window.login = async function (email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { error: error.message };
  }

  const user = data.user;

  // Fetch profile row
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return { error: profileError.message };
  }

  // ---------------------------------------------
  // Save session + profile info to localStorage
  // ---------------------------------------------
  localStorage.setItem("sessionToken", data.session.access_token);
  localStorage.setItem("nickname", profile.nickname);
  localStorage.setItem("scalpel_points", profile.scalpel_points);
  localStorage.setItem("userId", user.id);
  localStorage.setItem("isAdmin", profile.isadmin ? "true" : "false");

  // Redirect to index.html
  window.location.href = "index.html";

  return { user, profile };
};

// ---------------------------------------------
// GET CURRENT USER
// ---------------------------------------------
window.getCurrentUser = async function () {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user || null;
};

// ---------------------------------------------
// LOGOUT
// ---------------------------------------------
window.logout = async function () {
  await supabase.auth.signOut();
};

// ---------------------------------------------
// AUTH STATE LISTENER
// ---------------------------------------------
window.onAuthStateChange = function (callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};