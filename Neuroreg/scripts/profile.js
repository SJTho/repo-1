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
    const email = localStorage.getItem("email");

    document.getElementById("nicknameDisplay").innerText = nickname ?? "N/A";
    document.getElementById("pointsDisplay").innerText = scalpelPoints ?? "0";
    document.getElementById("rankDisplay").innerText = rank ?? "Unranked";
    document.getElementById("emailDisplay").innerText = email ?? "N/A";
}

window.addEventListener("DOMContentLoaded", loadProfile);

/* ----------------------------------------------------
   Editing Logic
---------------------------------------------------- */
function enableEdit(displayId, inputId, editBtnId, saveBtnId) {
    const span = document.getElementById(displayId);
    const input = document.getElementById(inputId);

    input.value = span.innerText;

    span.style.display = "none";
    input.style.display = "block";

    document.getElementById(editBtnId).style.display = "none";
    document.getElementById(saveBtnId).style.display = "inline-block";

    return input;
}

async function saveField(inputEl, displayId, localStorageKey, supabaseColumn) {
    const newValue = inputEl.value.trim();
    const span = document.getElementById(displayId);
    const userId = localStorage.getItem("userId");

    span.innerText = newValue;
    span.style.display = "block";
    inputEl.style.display = "none";

    localStorage.setItem(localStorageKey, newValue);

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
        alert("Failed to save to Supabase: " + error.message);
        return;
    }

    document.getElementById(displayId.replace("Display", "Input")).style.display = "none";
    document.getElementById(displayId).style.display = "block";

    window.location.reload();
}

window.startEditNickname = () => {
    enableEdit("nicknameDisplay", "nicknameInput", "editNicknameBtn", "saveNicknameBtn");
};

window.saveNickname = () => {
    saveField(
        document.getElementById("nicknameInput"),
        "nicknameDisplay",
        "nickname",
        "nickname"
    );
};

window.startEditPassword = () => {
    enableEdit("passwordDisplay", "passwordInput", "editPasswordBtn", "savePasswordBtn");
};

window.savePassword = () => {
    saveField(
        document.getElementById("passwordInput"),
        "passwordDisplay",
        "password_hash",
        "password_hash"
    );
};

window.startEditEmail = () => {
    enableEdit("emailDisplay", "emailInput", "editEmailBtn", "saveEmailBtn");
};

window.saveEmail = () => {
    saveField(
        document.getElementById("emailInput"),
        "emailDisplay",
        "email",
        "email"
    );
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
window.addEventListener("DOMContentLoaded", () => {
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
});