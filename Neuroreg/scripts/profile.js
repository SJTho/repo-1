// ----------------------------------------------------
// Supabase Client
// ----------------------------------------------------
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { initHelpPopup } from "./helpPopup.js";

let openHelpPopup;

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

    // --- Rank lookup ---
    const points = profile.scalpel_points ?? 0;

    const { data: rankRow, error: rankError } = await supabase
        .from("rank")
        .select("rank")
        .lte("minimum_score", points)
        .gte("maximum_score", points)
        .single();

    let rankText = "Unranked";
    if (!rankError && rankRow) {
        rankText = rankRow.rank;
    }

    // --- Populate UI ---
    document.getElementById("nicknameDisplay").innerText = profile.nickname ?? "N/A";
    document.getElementById("emailDisplay").innerText = authUser.user.email ?? "N/A";
    document.getElementById("pointsDisplay").innerText = points;
    document.getElementById("rankDisplay").innerText = rankText;
    document.getElementById("passwordDisplay").innerText = "********";

    // Streak values with correct pluralisation
    const current = profile.current_streak_days ?? 0;
    const longest = profile.streak_days ?? 0;

    document.getElementById("currentStreakDisplay").innerText =
        current + (current === 1 ? " day" : " days");

    document.getElementById("longestStreakDisplay").innerText =
        longest + (longest === 1 ? " day" : " days");

    // Load subscription toggle state
    const emailQuestionToggle = document.getElementById("emailQuestionToggle");
    emailQuestionToggle.checked = profile.subscribed === true;
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
// Save Logic
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

    if (supabaseColumn === "nickname") {
        const { error: rpcError } = await supabase.rpc("update_nickname", {
            user_id: userId,
            new_nickname: newValue
        });
        error = rpcError;
    }

    if (supabaseColumn === "email") {
        const { error: authErr } = await supabase.auth.updateUser({
            email: newValue
        });
        error = authErr;
    }

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
// Subscription Toggle
// ----------------------------------------------------
function attachSubscriptionToggle() {
    const toggle = document.getElementById("emailQuestionToggle");
    const userId = localStorage.getItem("userId");

    toggle.addEventListener("change", async () => {
        const newValue = toggle.checked;

        const { error } = await supabase
            .from("profiles")
            .update({ subscribed: newValue })
            .eq("id", userId);

        if (error) {
            console.error("Subscription update failed:", error);
            alert("Failed to update subscription.");
            toggle.checked = !newValue;
        }
    });
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
        div.innerText = (item.emoji ? item.emoji + " " : "") + item.displayname;

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
            if (item.url === "help" || item.url === "help.html") {
                openHelpPopup();
                return;
            }

            if (item.url === "logout") {
                logout();
                return;
            }

            window.location.href = item.url;
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
// Delete Account
// ----------------------------------------------------
function attachDeleteAccountHandler() {
    const link = document.getElementById("deleteAccountLink");
    if (!link) return;

    link.onclick = async () => {
        const confirmed = confirm(
            "Are you sure you want to delete your account? This step is irreversible."
        );

        if (!confirmed) return;

        const { error } = await supabase.rpc("delete_user_account");

        if (error) {
            console.error("Account deletion failed:", error);
            alert("Failed to delete account.");
            return;
        }

        await supabase.auth.signOut();
        localStorage.clear();

        window.location.href = "login.html";
    };
}

// ----------------------------------------------------
// Page Load
// ----------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    openHelpPopup = initHelpPopup(supabase);

    loadProfile();
    attachEditHandlers();
    attachSubscriptionToggle();
    loadHamburgerMenu();
    loadTopRightIcons();
    attachHamburgerHandler();
    attachDeleteAccountHandler();
});