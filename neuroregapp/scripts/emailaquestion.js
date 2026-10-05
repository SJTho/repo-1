import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { logout } from "./logout.js";
import { initHelpPopup } from "./helpPopup.js";
let openHelpPopup;

window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;

/* -------------------------------------
    LOAD HAMBURGER MENU
  ------------------------------------- */

async function loadHamburgerMenu() {
  const dropdown = document.getElementById("hamburgerMenuDropdown");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const currentPage = window.location.pathname.split("/").pop();

  const { data, error } = await window.supabase
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

/* -------------------------------------
    LOAD TOP RIGHT ITEMS
  ------------------------------------- */
async function loadTopRightIcons() {
  const container = document.getElementById("topRightIcons");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const currentPage = window.location.pathname.split("/").pop();

  const { data, error } = await window.supabase
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
        openHelpPopup();   // ⭐ NEW
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

/* ---------------------------------------
  TOGGLE HAMBURGER
  ----------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("pageshow", () => {
  const dropdown = document.getElementById("hamburgerMenuDropdown");
  if (dropdown) dropdown.style.display = "none";
});

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

/* ----------------------------- 
    LOAD QUESTIONS
  ----------------------------- */

window.fetchQuestions = async () => {
  const { data, error } = await window.supabase
    .from("emailaquestion")
    .select("*")

  if (error) {
    alert("Error loading questions.");
    return [];
  }

  return data;
};

async function loadQuestions() {
  const flagged = await window.fetchQuestions();
  const container = document.getElementById("emailaquestioncontainer");

  container.innerHTML = "";


}

/* ----------------------------- 
  INITIALISATION
----------------------------- */

window.addEventListener("DOMContentLoaded", () => {
  openHelpPopup = initHelpPopup(window.supabase);

  loadHamburgerMenu();
  loadTopRightIcons();
  loadQuestions();
});