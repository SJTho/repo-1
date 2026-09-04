/* ----------------------------------------------------
   Supabase Connection
---------------------------------------------------- */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ----------------------------------------------------
   MAIN APP INITIALISATION
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------------------------------
       Redirect if not logged in
    ---------------------------------------------------- */
    const nickname = localStorage.getItem("nickname");
    if (!nickname) {
        window.location.href = "login.html";
        return;
    }

    /* ----------------------------------------------------
       Hamburger Toggle
    ---------------------------------------------------- */
    const hamburger = document.getElementById("hamburgerMenu");
    const dropdown = document.getElementById("hamburgerMenuDropdown");

    hamburger.addEventListener("click", () => {
        dropdown.style.display =
            dropdown.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", (event) => {
        if (!hamburger.contains(event.target) &&
            !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });

    /* ----------------------------------------------------
       Load Hamburger Menu (Supabase)
    ---------------------------------------------------- */
    async function loadHamburgerMenu() {
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
            div.innerText = (item.emoji ? item.emoji + " " : "") + item.displayname;

            /* ----------------------------------------------------
               FIXED: Logout item triggers logout.js
            ---------------------------------------------------- */
            if (item.url === "logout") {
                div.onclick = () => {
                    import("./logout.js").then(module => module.default());
                };
            } else {
                div.onclick = () => {
                    window.location.href = item.url;
                };
            }

            dropdown.appendChild(div);
        });
    }

    /* ----------------------------------------------------
       Load Top-Right Icons (Supabase)
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
                window.location.href = item.url;
            };

            container.appendChild(icon);
        });
    }

    /* ----------------------------------------------------
       Rank System
    ---------------------------------------------------- */
    async function fetchRankForPoints(points) {
        const { data, error } = await supabase.rpc("get_rank_for_points", { points });
        if (error) return null;
        return data;
    }

    async function updateRank(points) {
        const newRank = await fetchRankForPoints(points);
        if (!newRank) return;

        const oldRank = localStorage.getItem("rank");
        if (oldRank && newRank !== oldRank) {
            showRankUpAnimation(newRank);
        }

        localStorage.setItem("rank", newRank);
    }

    async function updateSupabasePoints(newPoints) {
        let userId = localStorage.getItem("userId");   // UUID (fixed)
        if (!userId) return;

        const { error } = await supabase.rpc("update_points", {
            user_id: userId,
            new_points: newPoints
        });

        if (!error) updateRank(newPoints);
    }

    /* ----------------------------------------------------
       Daily Reward
    ---------------------------------------------------- */
    function giveDailyReward() {
        const today = new Date().toLocaleDateString("en-CA");
        const last = localStorage.getItem("lastDailyReward");

        if (last !== today) {
            let pts = parseInt(localStorage.getItem("scalpel_points")) || 0;
            pts += 10;

            localStorage.setItem("scalpel_points", pts);
            localStorage.setItem("lastDailyReward", today);

            updateSupabasePoints(pts);

            alert("Daily reward: +10 points!");
        }
    }

    giveDailyReward();

    /* ----------------------------------------------------
       Rank-Up Animation
    ---------------------------------------------------- */
    function showRankUpAnimation(newRank) {
        const banner = document.getElementById("rankUpBanner");
        banner.textContent = `🎉 Rank Up! You are now: ${newRank}`;
        banner.style.display = "block";
        setTimeout(() => banner.style.display = "none", 4000);
    }

    /* ----------------------------------------------------
       Icon Grid + Custom Buttons
    ---------------------------------------------------- */
    const linksContainer = document.getElementById("linksContainer");
    const deletePopup = document.getElementById("deletePopup");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");

    let deleteIndex = null;

    function createIconCard(icon, label, url) {
        const card = document.createElement("div");
        card.className = "iconCard";
        card.addEventListener("click", () => window.open(url, "_blank"));
        card.innerHTML = `
            <div class="icon">${icon}</div>
            <p class="iconLabel">${label}</p>
        `;
        return card;
    }

    function loadCustomButtons() {
        return JSON.parse(localStorage.getItem("customButtons") || "[]").slice(0, 3);
    }

    function saveCustomButtons(buttons) {
        localStorage.setItem("customButtons", JSON.stringify(buttons));
    }

    function renderCustomButtons() {
        const buttons = loadCustomButtons();
        const fragment = document.createDocumentFragment();

        buttons.forEach((btn, index) => {
            const card = document.createElement("div");
            card.className = "iconCard";

            card.addEventListener("click", () => window.open(btn.url, "_blank"));

            const iconHTML = btn.image
                ? `<img src="${btn.image}" class="customIcon">`
                : `<div class="icon smallIcon">🔗</div>`;

            card.innerHTML = `
                ${iconHTML}
                <p class="iconLabel">${btn.name}</p>
                <div class="customDeleteBtn">❌</div>
            `;

            card.querySelector(".customDeleteBtn").addEventListener("click", (event) => {
                event.stopPropagation();
                deleteIndex = index;
                deletePopup.style.display = "flex";
            });

            fragment.appendChild(card);
        });

        return fragment;
    }

    confirmDelete.addEventListener("click", () => {
        const buttons = loadCustomButtons();
        buttons.splice(deleteIndex, 1);
        saveCustomButtons(buttons);
        deletePopup.style.display = "none";
        renderLinks();
    });

    cancelDelete.addEventListener("click", () => {
        deletePopup.style.display = "none";
    });

    /* ----------------------------------------------------
       Render user-mapped links from Supabase
    ---------------------------------------------------- */
    async function renderLinks() {
        linksContainer.innerHTML = "";

        const userId = localStorage.getItem("userId");

        // 1️⃣ Get mapped link IDs
        const { data: mappings, error: mapError } = await supabase
            .from("mapuserstolinks")
            .select("linkid")
            .eq("userid", userId);

        if (mapError) {
            console.error("Failed to load user link mappings:", mapError);
            return;
        }

        const linkIds = mappings.map(m => m.linkid);

        if (linkIds.length === 0) {
            linksContainer.innerHTML = "<p>No links selected yet.</p>";
            return;
        }

        // 2️⃣ Fetch link definitions
        const { data: links, error: linkError } = await supabase
            .from("indexpagelinks")
            .select("*")
            .in("id", linkIds);

        if (linkError) {
            console.error("Failed to load index page links:", linkError);
            return;
        }

        // 3️⃣ Render each link
        links.forEach(link => {
            linksContainer.appendChild(
                createIconCard(link.icon, link.name, link.url)
            );
        });

        // 4️⃣ Custom buttons still work
        linksContainer.appendChild(renderCustomButtons());

        if (loadCustomButtons().length < 3) {
            linksContainer.appendChild(createAddLinkButton());
        }
    }

    function createAddLinkButton() {
        const card = document.createElement("div");
        card.className = "iconCard";

        card.addEventListener("click", () => {
            window.location.href = "custom_button.html";
        });

        card.innerHTML = `
            <div class="icon smallIcon">🔗</div>
            <p class="iconLabel">Add Link</p>
        `;
        return card;
    }

    /* ----------------------------------------------------
       INITIAL LOAD
    ---------------------------------------------------- */
    loadHamburgerMenu();
    loadTopRightIcons();
    renderLinks();