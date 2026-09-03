/* ----------------------------------------------------
   Supabase Connection
---------------------------------------------------- */
import {createClient} from "https://esm.sh/@supabase/supabase-js@2";
import {SUPABASE_URL, SUPABASE_KEY} from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ----------------------------------------------------
   MAIN PAGE LOGIC
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------------------------------
       Exit Warning
    ---------------------------------------------------- */
    function confirmExitExam() {
        return confirm(
            "If you leave this page you may not be allowed back into the examination.\n\nDo you want to continue?"
        );
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

        const {data, error} = await supabase
            .from("menuitems")
            .select("*")
            .eq("hamburger", true)
            .order("hamburgersection", {ascending: true})
            .order("hamburgerorder", {ascending: true});

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

            div.dataset.target = item.url;
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

        const {data, error} = await supabase
            .from("menuitems")
            .select("*")
            .eq("topright", true)
            .order("toprightorder", {ascending: true});

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
            icon.dataset.target = item.url;

            container.appendChild(icon);
        });
    }

    /* ----------------------------------------------------
       Apply exit warning to menu items
    ---------------------------------------------------- */
    document.addEventListener("click", (event) => {
        const item = event.target.closest("[data-target]");
        if (!item) return;

        const target = item.dataset.target;

        if (confirmExitExam()) {
            window.location.href = target;
        }
    });

    /* ----------------------------------------------------
       Event Title
    ---------------------------------------------------- */
    const storedTitle = localStorage.getItem("currentEventTitle");
    document.getElementById("combinedHeading").textContent =
        storedTitle || "Event Instructions";

    /* ----------------------------------------------------
       Event Time Window
    ---------------------------------------------------- */
    const start = localStorage.getItem("currentEventStart");
    const finish = localStorage.getItem("currentEventFinish");

    if (start && finish) {
        document.getElementById("timeWindowText").textContent =
            `You must begin your attempt between ${start} and ${finish}.`;
    }

    /* ----------------------------------------------------
       Participant Name
    ---------------------------------------------------- */
    const nameInput = document.getElementById("participantName");
    const storedName = localStorage.getItem("participantName");

    if (storedName) nameInput.value = storedName;

    nameInput.addEventListener("input", () => {
        localStorage.setItem("participantName", nameInput.value);
    });

    /* ----------------------------------------------------
       Start Now → examination.html
    ---------------------------------------------------- */
    document.getElementById("startNowBtn").addEventListener("click", () => {
        localStorage.setItem("examLocked", "true");
        window.location.href = "examination.html";
    });

    /* ----------------------------------------------------
       Back Button
    ---------------------------------------------------- */
    document.getElementById("closeBtn").addEventListener("click", () => {
        if (confirmExitExam()) {
            window.history.back();
        }
    });

    /* ----------------------------------------------------
       INITIAL LOAD
    ---------------------------------------------------- */
    loadHamburgerMenu();
    loadTopRightIcons();
});