// Supabase login + exam access check
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Correct UUID handling
const sessionToken = localStorage.getItem("sessionToken");
const userId = localStorage.getItem("userId");               // UUID (fixed)
const eventId = parseInt(localStorage.getItem("currentEventId"));  // integer

if (!sessionToken) {
  window.location.href = "login.html";
}

/* ----------------------------------------------------
   CHECK ACCESS (Supabase + localStorage)
---------------------------------------------------- */
async function checkAccess() {
  // Local lock: prevents refresh/back-button re-entry
  if (localStorage.getItem("examStarted") === "true") {
    window.location.href = "formaltestinstructions.html";
    return false;
  }

  // Server lock: prevents multi-device re-entry
  const { data, error } = await supabase
    .from("eventregistration")
    .select("examstarted")
    .eq("userid", userId)
    .eq("eventid", eventId)
    .maybeSingle();

  if (error || !data) {
    window.location.href = "formaltestinstructions.html";
    return false;
  }

  if (data.examstarted === true) {
    window.location.href = "formaltestinstructions.html";
    return false;
  }

  return true;
}

/* ----------------------------------------------------
   LOCK EXAM (Supabase + localStorage)
---------------------------------------------------- */
async function lockExam() {
  // Local lock
  localStorage.setItem("examStarted", "true");

  // Server lock
  await supabase
    .from("eventregistration")
    .update({ examstarted: true })
    .eq("userid", userId)
    .eq("eventid", eventId);
}

/* ----------------------------------------------------
   INIT: CHECK ACCESS + LOCK EXAM
---------------------------------------------------- */
(async () => {
  const allowed = await checkAccess();
  if (!allowed) return;

  // Trigger exam lock 5 seconds after DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      lockExam();
    }, 5000);
  });

  // Backup trigger at 7 seconds
  setTimeout(() => {
    lockExam();
  }, 7000);
})();

/* ----------------------------------------------------
   HAMBURGER MENU LOGIC
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

/* ----------------------------------------------------
   EXIT CONFIRMATION
---------------------------------------------------- */
function confirmExitExam() {
  return confirm(
    "If you leave this page you will NOT be allowed back into the examination.\n\nDo you want to continue?"
  );
}

document.querySelectorAll("#hamburgerMenuDropdown .dropdownItem")
  .forEach(item => {
    item.addEventListener("click", () => {
      const target = item.dataset.target;
      if (confirmExitExam()) {
        window.location.href = target;
      }
    });
  });

/* ----------------------------------------------------
   HEADING
---------------------------------------------------- */
const storedTitle = localStorage.getItem("currentEventTitle");
document.getElementById("combinedHeading").textContent = storedTitle;

/* ----------------------------------------------------
   COUNTDOWN CLOCK (3 hours)
---------------------------------------------------- */
let remainingSeconds = 3 * 60 * 60;

function updateClock() {
  const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  document.getElementById("topRightClock").textContent = `${hours}:${minutes}:${seconds}`;

  if (remainingSeconds > 0) remainingSeconds--;
}

updateClock();
setInterval(updateClock, 1000);

/* ----------------------------------------------------
   BACK BUTTON
---------------------------------------------------- */
document.getElementById("closeBtn").addEventListener("click", () => {
  if (confirmExitExam()) {
    window.history.back();
  }
});