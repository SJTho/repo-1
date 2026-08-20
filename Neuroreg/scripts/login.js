import {createClient} from "https://esm.sh/@supabase/supabase-js@2";
import {SUPABASE_URL, SUPABASE_KEY} from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ----------------------------------------------------
   Switch between Login and Signup views
---------------------------------------------------- */
function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
}

function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

/* ----------------------------------------------------
   Signup RPC (nickname + email + password)
---------------------------------------------------- */
async function signup() {
    const nickname = document.getElementById("signupNickname").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!nickname || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const {data, error} = await supabase.rpc("signup", {
        nickname_input: nickname,
        email_input: email,
        password_input: password
    });

    if (error) {
        alert("Signup failed: " + error.message);
        return;
    }

    alert("Signup successful. You can now log in.");
    showLogin();
}

/* ----------------------------------------------------
   Login RPC (email + password)
---------------------------------------------------- */
async function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const {data, error} = await supabase.rpc("login", {
        email_input: email,
        password_input: password
    });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    let user;

    if (Array.isArray(data)) {
        user = data[0]?.login || data[0];
    } else {
        user = data?.login || data;
    }

    if (!user || user.error) {
        alert("Invalid email or password");
        return;
    }

    /* Store session data */
    localStorage.setItem("sessionToken", user.token);
    localStorage.setItem("nickname", user.nickname);
    localStorage.setItem("email", user.email);
    localStorage.setItem("scalpel_points", user.scalpel_points);
    localStorage.setItem("userId", user.id);

    localStorage.setItem("isAdmin", user.isadmin ? "true" : "false");

    /* Rank lookup */
    const {data: rankData, error: rankError} = await supabase.rpc(
        "get_rank_for_points",
        {points: user.scalpel_points}
    );

    if (rankError) {
        console.error("Rank lookup failed:", rankError);
        localStorage.setItem("rank", "Unranked");
    } else {
        localStorage.setItem("rank", rankData || "Unranked");
    }

    window.location.href = "index.html";
}

/* ----------------------------------------------------
   Expose functions globally
---------------------------------------------------- */
window.login = login;
window.signup = signup;
window.showLogin = showLogin;
window.showSignup = showSignup;

window.addEventListener("DOMContentLoaded", () => {
    showLogin();
});