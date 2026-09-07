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

        dropdown.innerHTML = "";
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

            if (item.url === "logout") {
                div.onclick = () => {
                    import("./logout.js").then(module => module.logout());
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
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const { error } = await supabase.rpc("update_points", {
            user_id: userId,
            new_points: newPoints
        });

        if (!error) updateRank(newPoints);
    }

    /* ----------------------------------------------------
       Daily Streak System (UPDATED FOR SUPABASE DAILY REWARD)
    ---------------------------------------------------- */
    async function handleDailyStreak() {
        const today = new Date().toLocaleDateString("en-CA");
        const lastLogin = localStorage.getItem("lastLoginDate");
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const { data: profile, error } = await supabase
            .from("profiles")
            .select("current_streak_days, streak_days, scalpel_points, last_daily_reward")
            .eq("id", userId)
            .single();

        if (error || !profile) {
            console.error("Failed to load streak profile:", error);
            return;
        }

        let { current_streak_days, streak_days, scalpel_points, last_daily_reward } = profile;

        /* ---- Streak calculation ---- */
        if (!lastLogin) {
            current_streak_days = 1;
        } else {
            const last = new Date(lastLogin);
            const now = new Date(today);
            const diff = (now - last) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
                current_streak_days += 1;
            } else if (diff > 1) {
                current_streak_days = 1;
            }
        }

        if (current_streak_days > streak_days) {
            streak_days = current_streak_days;
        }

        /* ---- Daily reward (Supabase-based) ---- */
        if (last_daily_reward !== today) {
            scalpel_points += 10;

            await supabase
                .from("profiles")
                .update({ last_daily_reward: today })
                .eq("id", userId);

            alert("Daily reward: +10 points!");
        }

        /* ---- Update streak + points ---- */
        const { error: updateError } = await supabase
            .from("profiles")
            .update({
                current_streak_days,
                streak_days,
                scalpel_points
            })
            .eq("id", userId);

        if (updateError) {
            console.error("Failed to update streak:", updateError);
        }

        localStorage.setItem("lastLoginDate", today);
        localStorage.setItem("scalpel_points", scalpel_points);

        updateRank(scalpel_points);
    }

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
       Icon Grid (Supabase Links Only)
    ---------------------------------------------------- */
    const linksContainer = document.getElementById("linksContainer");

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

    function createAddLinkButton() {
        const card = document.createElement("div");
        card.className = "iconCard";

        card.addEventListener("click", () => {
            window.location.href = "mylinks.html";
        });

        card.innerHTML = `
            <div class="icon smallIcon">🔗</div>
            <p class="iconLabel">Manage Links</p>
        `;
        return card;
    }

    /* ----------------------------------------------------
       Render user-mapped links from Supabase
    ---------------------------------------------------- */
    async function renderLinks() {
        linksContainer.innerHTML = "";

        const userId = localStorage.getItem("userId");

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
            linksContainer.appendChild(createAddLinkButton());
            return;
        }

        const { data: links, error: linkError } = await supabase
            .from("indexpagelinks")
            .select("*")
            .in("id", linkIds);

        if (linkError) {
            console.error("Failed to load index page links:", linkError);
            return;
        }

        links.forEach(link => {
            linksContainer.appendChild(
                createIconCard(link.icon, link.name, link.url)
            );
        });

        linksContainer.appendChild(createAddLinkButton());
    }

    /* ----------------------------------------------------
       INITIAL LOAD
    ---------------------------------------------------- */
    loadHamburgerMenu();
    loadTopRightIcons();
    handleDailyStreak();
    renderLinks();

});