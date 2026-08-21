// ----------------------------------------------------
// Supabase Client
// ----------------------------------------------------
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------------------------------
// Load Profile (NOW FROM public.profiles)
// ----------------------------------------------------
async function loadProfile() {
    const token = localStorage.getItem("sessionToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
        window.location.href = "login.html";
        return;
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error || !profile) {
        console.error("Profile load error:", error);
        document.getElementById("error-message").innerText = "Failed to load profile.";
        return;
    }

    // Populate UI
    document.getElementById("nicknameDisplay").innerText = profile.nickname ?? "N/A";
    document.getElementById("emailDisplay").innerText = profile.email ?? "N/A";
    document.getElementById("pointsDisplay").innerText = profile.scalpel_points ?? "0";
    document.getElementById("rankDisplay").innerText = profile.rank ?? "Unranked";

    // Password always masked
    document.getElementById("passwordDisplay").innerText = "********";
}

window.addEventListener("DOMContentLoaded", loadProfile);

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

async function saveField(inputEl, displayId, supabaseColumn) {
    const newValue = inputEl.value.trim();
    const span = document.getElementById(displayId);
    const userId = localStorage.getItem("userId");

    span.innerText = supabaseColumn === "password_hash" ? "********" : newValue;
    span.style.display = "block";
    inputEl.style.display = "none";

    let rpcName;
    let rpcArgs;

    if (supabaseColumn === "nickname") {
        rpcName = "update_nickname";
        rpcArgs = { user_id: userId, new_nickname: newValue };
    } else if (supabaseColumn === "password_hash") {
        rpcName = "update_password";
        rpcArgs = { user_id: userId, new_password: newValue };
    } else if (supabaseColumn === "email") {
        rpcName = "update_email";
        rpcArgs = { user_id: userId, new_email: newValue };
    }

    const { error } = await supabase.rpc(rpcName, rpcArgs);

    if (error) {
        console.error(error);
        alert("Failed to save: " + error.message);
        return;
    }

    window.location.reload();
}

// Nickname
window.startEditNickname = () => {
    enableEdit("nicknameDisplay", "nicknameInput", "editNicknameBtn", "saveNicknameBtn");
};

window.saveNickname = () => {
    saveField(
        document.getElementById("nicknameInput"),
        "nicknameDisplay",
        "nickname"
    );
};

// Email
window.startEditEmail = () => {
    enableEdit("emailDisplay", "emailInput", "editEmailBtn", "saveEmailBtn");
};

window.saveEmail = () => {
    saveField(
        document.getElementById("emailInput"),
        "emailDisplay",
        "email"
    );
};

// Password
window.startEditPassword = () => {
    enableEdit("passwordDisplay", "passwordInput", "editPasswordBtn", "savePasswordBtn");
};

window.savePassword = () => {
    saveField(
        document.getElementById("passwordInput"),
        "passwordDisplay",
        "password_hash"
    );
};
/* ----------------------------------------------------
   Hamburger Menu
---------------------------------------------------- */
async function loadHamburgerMenu() {
    const dropdown = document.getElementById("hamburgerMenuDropdown");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const {data, error} = await supabase
        .from("menuitems")
        .select("*")
        .eq("hamburger", true)
        .order("hamburgersection", {ascending: true})
        .order("hamburgerorder", {ascending: true});

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

/* ----------------------------------------------------
   Top-Right Icons
---------------------------------------------------- */
async function loadTopRightIcons() {
    const container = document.getElementById("topRightIcons");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const {data, error} = await supabase
        .from("menuitems")
        .select("*")
        .eq("topright", true)
        .order("toprightorder", {ascending: true});

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

/* ----------------------------------------------------
   Page Load
---------------------------------------------------- */
{
window.addEventListener("DOMContentLoaded", loadHamburgerMenu);
window.addEventListener("DOMContentLoaded", loadTopRightIcons);

};