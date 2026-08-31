// ----------------------------------------------------
// Supabase Client
// ----------------------------------------------------
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------------------------------
// Load Profile
// ----------------------------------------------------
async function loadProfile() {
    const token = localStorage.getItem("sessionToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
        window.location.href = "login.html";
        return;
    }

    // Load profile row from public.profiles
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    // Load email from auth.users
    const { data: authUser, error: authError } = await supabase.auth.getUser();

    if (profileError || authError || !profile || !authUser?.user) {
        console.error("Profile load error:", profileError || authError);
        document.getElementById("error-message").innerText = "Failed to load profile.";
        return;
    }

    document.getElementById("nicknameDisplay").innerText = profile.nickname ?? "N/A";
    document.getElementById("emailDisplay").innerText = authUser.user.email ?? "N/A";
    document.getElementById("pointsDisplay").innerText = profile.scalpel_points ?? "0";
    document.getElementById("rankDisplay").innerText = profile.rank ?? "Unranked";
    document.getElementById("passwordDisplay").innerText = "********";
}

// ----------------------------------------------------
// Editing Logic
// ----------------------------------------------------
function enableEdit(displayId, inputId, editBtnId, saveBtnId) {
    const span = document.getElementById(displayId);
    const input = document.getElementById(inputId);

    input.value = span.innerText === "********" ? "" : span.innerText;

    span.style.display = "none";
    input.style.display = "block";

    document.getElementById(editBtnId).style.display = "none";
    document.getElementById(saveBtnId).style.display = "inline-block";

    return input;
}

// ----------------------------------------------------
// Save Logic (Corrected for public.profiles + Auth)
// ----------------------------------------------------
async function saveField(inputEl, displayId, supabaseColumn) {
    const newValue = inputEl.value.trim();
    const span = document.getElementById(displayId);
    const userId = localStorage.getItem("userId");

    if (!newValue) {
        alert("Value cannot be empty.");
        return;
    }

    let error = null;

    // Update nickname in public.profiles
    if (supabaseColumn === "nickname") {
        const { error: rpcError } = await supabase.rpc("update_nickname", {
            user_id: userId,
            new_nickname: newValue
        });
        error = rpcError;
    }

    // Update email in auth.users
    if (supabaseColumn === "email") {
        const { error: authErr } = await supabase.auth.updateUser({
            email: newValue
        });
        error = authErr;
    }

    // Update password in auth.users
    if (supabaseColumn === "password_hash") {
        const { error: passErr } = await supabase.auth.updateUser({
            password: newValue
        });
        error = passErr;
    }

    if (error) {
        console.error(error);
        alert("Failed to save: " + error.message);
        return;
    }

    span.innerText = supabaseColumn === "password_hash" ? "********" : newValue;
    span.style.display = "block";
    inputEl.style.display = "none";

    window.location.reload();
}

// ----------------------------------------------------
// Click Handlers
// ----------------------------------------------------
function attachEditHandlers() {
    document.getElementById("editNicknameBtn").onclick = () =>
        enableEdit("nicknameDisplay", "nicknameInput", "editNicknameBtn", "saveNicknameBtn");

    document.getElementById("saveNicknameBtn").onclick = () =>
        saveField(document.getElementById("nicknameInput"), "nicknameDisplay", "nickname");

    document.getElementById("editEmailBtn").onclick = () =>
        enableEdit("emailDisplay", "emailInput", "editEmailBtn", "saveEmailBtn");

    document.getElementById("saveEmailBtn").onclick = () =>
        saveField(document.getElementById("emailInput"), "emailDisplay", "email");

    document.getElementById("editPasswordBtn").onclick = () =>
        enableEdit("passwordDisplay", "passwordInput", "editPasswordBtn", "savePasswordBtn");

    document.getElementById("savePasswordBtn").onclick = () =>
        saveField(document.getElementById("passwordInput"), "passwordDisplay", "password_hash");
}

// ----------------------------------------------------
// Logout
// ----------------------------------------------------
function logout() {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    window.location.href = "login.html";
}

// ----------------------------------------------------
// Hamburger Menu
// ----------------------------------------------------
async function loadHamburgerMenu() {
    const dropdown = document.getElementById("hamburgerMenuDropdown");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
        .from("menuitems")
        .select("*")
        .eq("hamburger", true)
        .order("hamburgersection", { ascending: true })
        .order("hamburgerorder", { ascending: true });

    if (error) {
        dropdown.innerHTML = "<div class='dropdownItem'>Menu failed to load</div>";
        return;
    }

    let currentSection = null;

    data.forEach(item => {
        if (item.admin && !isAdmin) return;
        if (item.url === currentPage) return;

        if (currentSection !== null && item.hamburgersection !== currentSection) {
            const separator = document.createElement("div");
            separator.className = "dropdownSeparator";
            dropdown.appendChild(separator);
        }

        currentSection = item.hamburgersection;

        const div = document.createElement("div");
        div.className = "dropdownItem";

        const emoji = item.emoji ? item.emoji + " " : "";
        div.innerText = emoji + item.displayname;

        div.onclick = () => {
            if (item.url === "logout") logout();
            else window.location.href = item.url;
        };

        dropdown.appendChild(div);
    });
}

// ----------------------------------------------------
// Top-Right Icons
// ----------------------------------------------------
async function loadTopRightIcons() {
    const container = document.getElementById("topRightIcons");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
        .from("menuitems")
        .select("*")
        .eq("topright", true)
        .order("toprightorder", { ascending: true });

    if (error) return;

    container.innerHTML = "";

    data.forEach(item => {
        if (item.admin && !isAdmin) return;
        if (item.url === currentPage) return;

        const icon = document.createElement("div");
        icon.className = "topRightIcon";
        icon.innerText = item.emoji;

        icon.onclick = () => {
            if (item.url === "logout") logout();
            else window.location.href = item.url;
        };

        container.appendChild(icon);
    });
}

// ----------------------------------------------------
// Hamburger Click Handler
// ----------------------------------------------------
function attachHamburgerHandler() {
    const icon = document.getElementById("hamburgerMenu");
    const dropdown = document.getElementById("hamburgerMenuDropdown");

    icon.onclick = () => {
        dropdown.style.display =
            dropdown.style.display === "flex" ? "none" : "flex";
    };
}

// ----------------------------------------------------
// Page Load
// ----------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    attachEditHandlers();
    loadHamburgerMenu();
    loadTopRightIcons();
    attachHamburgerHandler();
});