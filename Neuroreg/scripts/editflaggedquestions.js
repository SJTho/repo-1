import {createClient} from "https://esm.sh/@supabase/supabase-js@2";
import {SUPABASE_URL, SUPABASE_KEY} from "../myenv.js";
import {logout} from "./logout.js";

window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;

/* ----------------------------- MENU LOADING ----------------------------- */

async function loadHamburgerMenu() {
  const dropdown = document.getElementById("hamburgerMenuDropdown");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const currentPage = window.location.pathname.split("/").pop();

  const {data, error} = await window.supabase
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
    div.innerText = (item.emoji ? item.emoji + " " : "") + item.displayname;

    div.onclick = () => {
      if (item.url === "logout") logout();
      else window.location.href = item.url;
    };

    dropdown.appendChild(div);
  });
}

async function loadTopRightIcons() {
  const container = document.getElementById("topRightIcons");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const currentPage = window.location.pathname.split("/").pop();

  const {data, error} = await window.supabase
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

/* Hamburger toggle */
document.addEventListener("DOMContentLoaded", () => {
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

/* ----------------------------- FLAGGED QUESTIONS ----------------------------- */

window.fetchFlaggedQuestions = async () => {
  const {data, error} = await window.supabase
    .from("mcqquestions")
    .select("*")
    .gte("flaggedset", 5);

  if (error) {
    console.error("Supabase fetch error:", error);
    alert("Error loading flagged questions.");
    return [];
  }

  return data;
};

function esc(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function loadFlaggedQuestions() {
  const flagged = await window.fetchFlaggedQuestions();
  const container = document.getElementById("flaggedContainer");

  if (!flagged.length) {
    container.innerHTML = "<p>No flagged questions.</p>";
    return;
  }

  container.innerHTML = "";

  flagged.forEach(q => {
    const div = document.createElement("div");
    div.className = "flaggedItem";

    div.innerHTML = `
      <div class="stemHeader">
        <label for="stem_${q.id}">Stem:</label>
        <input id="stem_${q.id}" class="editStem" required value="${esc(q.stem || "")}">
      </div>

      <div class="collapsibleContent" style="display:none">

        <div class="topicLevelRow">
          <label for="topic_${q.id}">Topic:</label>
          <select id="topic_${q.id}" class="editTopic" required>
            <option value="">Select topic</option>
            ${["Vascular","Oncology","Skull Base","Trauma","CSF","Spine","Paediatrics","Peripheral Nerve","Functional","Epilepsy"]
              .map(t => `<option value="${t}" ${q.topic===t?"selected":""}>${t}</option>`).join("")}
          </select>

          <label for="level_${q.id}">Level:</label>
          <select id="level_${q.id}" class="editLevel" required>
            <option value="">Select level</option>
            <option value="MRCS" ${q.level==="MRCS"?"selected":""}>MRCS</option>
            <option value="FRCS" ${q.level==="FRCS"?"selected":""}>FRCS</option>
          </select>
        </div>

        <div class="explanationRow">
          <label for="explanation_${q.id}">Explanation:</label>
          <input id="explanation_${q.id}" class="editExplanation" required value="${esc(q.explanation || "")}">
        </div>

        <div class="optionRow12">
          <label for="option1_${q.id}">Correct:</label>
          <input id="option1_${q.id}" class="editOption1" required value="${esc(q.option1 || "")}">

          <label for="option2_${q.id}">Incorrect:</label>
          <input id="option2_${q.id}" class="editOption2" required value="${esc(q.option2 || "")}">
        </div>

        <div class="optionRow34">
          <label for="option3_${q.id}">Incorrect:</label>
          <input id="option3_${q.id}" class="editOption3" required value="${esc(q.option3 || "")}">

          <label for="option4_${q.id}">Incorrect:</label>
          <input id="option4_${q.id}" class="editOption4" required value="${esc(q.option4 || "")}">
        </div>

        <div class="buttonRow">
          <button class="saveBtn">Save</button>
          <button class="deleteBtn">Delete</button>
        </div>

      </div>
    `;

    const header = div.querySelector(".stemHeader");
    const content = div.querySelector(".collapsibleContent");

    header.addEventListener("click", () => {
      content.style.display = content.style.display === "none" ? "block" : "none";
    });

    /* ----------------------------- SAVE ----------------------------- */

    div.querySelector(".saveBtn").onclick = async () => {

      const stem = div.querySelector(".editStem")?.value.trim() || "";
      const topic = div.querySelector(".editTopic")?.value.trim() || "";
      const level = div.querySelector(".editLevel")?.value.trim() || "";
      const explanation = div.querySelector(".editExplanation")?.value.trim() || "";
      const option1 = div.querySelector(".editOption1")?.value.trim() || "";
      const option2 = div.querySelector(".editOption2")?.value.trim() || "";
      const option3 = div.querySelector(".editOption3")?.value.trim() || "";
      const option4 = div.querySelector(".editOption4")?.value.trim() || "";

      const updated = {
        stem,
        topic,
        level,
        explanation,
        option1,
        option2,
        option3,
        option4,
        flaggedset: 0
      };

      if (Object.values(updated).some(v => !v)) {
        alert("All fields are mandatory.");
        return;
      }

      const {error} = await window.supabase
        .from("mcqquestions")
        .update(updated)
        .eq("id", q.id);

      if (error) {
        alert("Error saving changes.");
      } else {
        alert("Saved.");
        loadFlaggedQuestions();
      }
    };

    /* ----------------------------- DELETE (SECURITY DEFINER RPC) ----------------------------- */

    div.querySelector(".deleteBtn").onclick = async () => {
      if (!confirm("Delete this question?")) return;

      const { data, error } = await window.supabase
        .rpc("delete_mcqquestion", { question_id: q.id });

      if (error) {
        alert("Error deleting question.");
        return;
      }

      alert("Deleted.");
      div.remove();
    };

    container.appendChild(div);
  });
}

/* ----------------------------- INIT ----------------------------- */

window.addEventListener("DOMContentLoaded", () => {
  loadHamburgerMenu();
  loadTopRightIcons();
  loadFlaggedQuestions();
});