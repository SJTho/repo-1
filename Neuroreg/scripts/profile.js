/* ----------------------------------------------------
   Load Profile
---------------------------------------------------- */
function loadProfile() {
    const token = localStorage.getItem("sessionToken");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const nickname = localStorage.getItem("nickname");
    const scalpelPoints = localStorage.getItem("scalpel_points");
    const rank = localStorage.getItem("rank");

    document.getElementById("nicknameDisplay").innerText = nickname ?? "N/A";
    document.getElementById("pointsDisplay").innerText = scalpelPoints ?? "0";
    document.getElementById("rankDisplay").innerText = rank ?? "Unranked";
    document.getElementById("passwordDisplay").innerText = "********";
}

window.addEventListener("DOMContentLoaded", loadProfile);

/* ----------------------------------------------------
   Editing Logic
---------------------------------------------------- */
function enableEdit(fieldId, btnId, saveBtnId) {
    const span = document.getElementById(fieldId);
    const currentValue = span.innerText;

    const input = document.createElement("input");
    input.className = "editField";
    input.value = currentValue;

    span.replaceWith(input);

    document.getElementById(btnId).style.display = "none";
    document.getElementById(saveBtnId).style.display = "inline-block";

    return input;
}

async function saveField(inputEl, localStorageKey, supabaseColumn) {
    const newValue = inputEl.value.trim();
    const userId = localStorage.getItem("userId");

    localStorage.setItem(localStorageKey, newValue);

    let rpcName;
    let rpcArgs;

    if (supabaseColumn === "nickname") {
        rpcName = "update_nickname";
        rpcArgs = { user_id: userId, new_nickname: newValue };
    } else if (supabaseColumn === "password_hash") {
        rpcName = "update_password";
        rpcArgs = { user_id: userId, new_password: newValue };
    }

    const { error } = await supabase.rpc(rpcName, rpcArgs);

    if (error) {
        console.error(error);
        alert("Failed to save to Supabase: " + error.message);
        return;
    }

    window.location.reload();
}

window.startEditNickname = () => {
    window.nicknameInput = enableEdit("nicknameDisplay", "editNicknameBtn", "saveNicknameBtn");
};

window.saveNickname = () => {
    saveField(window.nicknameInput, "nickname", "nickname");
};

window.startEditPassword = () => {
    window.passwordInput = enableEdit("passwordDisplay", "editPasswordBtn", "savePasswordBtn");
};

window.savePassword = () => {
    saveField(window.passwordInput, "password_hash", "password_hash");
};

/* ----------------------------------------------------
   Hamburger Menu
---------------------------------------------------- */
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
        console.error("Menu load error:", error);
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
            if (item.url === "logout") {
                logout();
            } else {
                window.location.href = item.url;
            }
        };

        dropdown.appendChild(div);
    });
}

window.addEventListener("DOMContentLoaded", loadHamburgerMenu);

/* ----------------------------------------------------
   Top-Right Icons
---------------------------------------------------- */
async function loadTopRightIcons() {
    const container = document.getElementById("topRightIcons");

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
        .from("menuitems")
        .select("*")
        .eq("topright", true)
        .order("toprightorder", { ascending: true });

    if (error) {
        console.error("Top-right load error:", error);
        return;
    }

    container.innerHTML = "";

    data.forEach(item => {
        if (item.admin && !isAdmin) return;
        if (item.url === currentPage) return;

        const icon = document.createElement("div");
        icon.className = "topRightIcon";
        icon.innerText = item.emoji;

        icon.onclick = () => {
            if (item.url === "logout") {
                logout();
            } else {
                window.location.href = item.url;
            }
        };

        container.appendChild(icon);
    });
}

window.addEventListener("DOMContentLoaded", loadTopRightIcons);

/* ----------------------------------------------------
   Hamburger Toggle
---------------------------------------------------- */
const hamburger = document.getElementById("hamburgerMenu");
const dropdown = document.getElementById("hamburgerMenuDropdown");

hamburger.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});