// login.js — ESM version using esm.sh (GitHub Pages compatible)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// SIGNUP
window.signup = async function (email, password, nickname) {
  try {
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signupError) return { error: signupError.message };

    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (loginError) return { error: loginError.message };

    const user = loginData.user;

    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      nickname,
      email,
      scalpel_points: 0,
      isadmin: false
    });

    if (profileError) return { error: profileError.message };

    localStorage.setItem("sessionToken", loginData.session.access_token);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("scalpel_points", "0");
    localStorage.setItem("userId", user.id);
    localStorage.setItem("isAdmin", "false");

    window.location.href = "index.html";

    return { user };

  } catch (err) {
    return { error: "Signup failed. Please try again." };
  }
};

// LOGIN
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

// FORGOTTEN EMAIL (placeholder until Brevo exists)
window.recoverEmail = async function (nickname) {
  try {
    if (!nickname) {
      return { error: "Please enter your nickname." };
    }

    // Look up user by nickname
    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("nickname", nickname)
      .single();

    if (error || !data) {
      return { error: "No user found with that nickname." };
    }

    // Placeholder until Brevo account exists
    return {
      message: "Recovery email service is not active yet. Your email would be sent to: " + data.email
    };

  } catch (err) {
    return { error: "Unable to recover email right now." };
  }
};

// GET CURRENT USER
window.getCurrentUser = async function () {
  const { data: { user } } = await supabase.auth.getUser();
  return user || null;
};

// AUTH STATE LISTENER
window.onAuthStateChange = function (callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};