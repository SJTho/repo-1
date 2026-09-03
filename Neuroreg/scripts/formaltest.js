import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { logout } from "./logout.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;

/* ----------------------------------------------------
   LOGIN REDIRECT
---------------------------------------------------- */
const sessionToken = localStorage.getItem("sessionToken");
if (!sessionToken) {
  window.location.href = "login.html";
}

const userId = parseInt(localStorage.getItem("userId"));

/* ----------------------------------------------------
   TIME FORMATTER (HH:MM)
---------------------------------------------------- */
function formatTime(timeString) {
  return timeString.slice(0, 5);
}

/* ----------------------------------------------------
   CHECK REGISTRATION
---------------------------------------------------- */
async function isRegistered(ev) {
  if (!userId) return false;

  const { data, error } = await supabase
    .from("eventregistration")
    .select("*")
    .eq("userid", userId)
    .eq("eventid", ev.eventid);

  if (error) {
    console.error(error);
    return false;
  }

  return data && data.length > 0;
}

/* ----------------------------------------------------
   REGISTER FOR EVENT
---------------------------------------------------- */
async function registerForEvent(ev) {
  if (!userId) {
    alert("You must be logged in to register.");
    return;
  }

  const { data: existing, error: checkError } = await supabase
    .from("eventregistration")
    .select("*")
    .eq("userid", userId)
    .eq("eventid", ev.eventid);

  if (checkError) {
    console.error(checkError);
    alert("Failed to check registration.");
    return;
  }

  if (existing && existing.length > 0) {
    alert("You are already registered for this event.");
    return;
  }

  const { error: insertError } = await supabase
    .from("eventregistration")
    .insert({
      userid: userId,
      eventid: ev.eventid
    });

  if (insertError) {
    console.error(insertError);
    alert("Failed to register for event.");
    return;
  }

  location.reload();
}

/* ----------------------------------------------------
   LIVE CHECK
---------------------------------------------------- */
function isEventLive(ev) {
  const now = new Date();
  const start = new Date(ev.eventdate + "T" + formatTime(ev.eventstarttime));
  const end = new Date(ev.eventdate + "T" + formatTime(ev.eventendtime));
  return now >= start && now <= end;
}

/* ----------------------------------------------------
   LOAD EVENTS
---------------------------------------------------- */
async function loadEvents() {
  const container = document.getElementById("eventsContainer");

  const { data: events, error } = await supabase
    .from("events")
    .select("eventid, eventtitle, eventdate, eventstarttime, eventendtime")
    .order("eventdate", { ascending: true });

  if (error) {
    console.error(error);
    container.innerHTML = "<p>Failed to load events.</p>";
    return;
  }

  if (!events || events.length === 0) {
    container.innerHTML = "<p>No upcoming events.</p>";
    return;
  }

  for (const ev of events) {
    const ukDate = new Date(ev.eventdate + "T00:00:00").toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    const already = await isRegistered(ev);
    const live = isEventLive(ev);

    const now = new Date();
    const eventEnd = new Date(ev.eventdate + "T" + formatTime(ev.eventendtime));
    const closed = now > eventEnd;

    const card = document.createElement("div");
    card.className = "eventCard";

    card.innerHTML = `
      <h3>${ev.eventtitle}</h3>
      <p><strong>Date:</strong> ${ukDate}</p>
      <p><strong>Start time:</strong> Available between ${formatTime(ev.eventstarttime)} and ${formatTime(ev.eventendtime)}</p>

      ${closed
        ? `<p class="closedMsg">Closed</p>`
        : already
          ? (live
            ? `<button class="registerBtn startBtn">Start</button>`
            : `<p class="alreadyRegisteredMsg">You have already registered</p>`
          )
          : `<button class="registerBtn">Register</button>`
      }
    `;

    if (!closed && !already) {
      card.querySelector(".registerBtn").addEventListener("click", async () => {
        await registerForEvent(ev);
      });
    }

    if (!closed && already && live) {
      card.querySelector(".startBtn").addEventListener("click", () => {
        localStorage.setItem("currentEventId", ev.eventid);
        localStorage.setItem("currentEventTitle", ev.eventtitle);
        localStorage.setItem("currentEventStart", formatTime(ev.eventstarttime));
        localStorage.setItem("currentEventFinish", formatTime(ev.eventendtime));

        window.location.href = "formaltestinstructions.html";
      });
    }

    container.appendChild(card);
  }
}

/* ----------------------------------------------------
   DYNAMIC MENUS
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
      if (item.url === "logout") logout();
      else window.location.href = item.url;
    };

    container.appendChild(icon);
  });
}

/* ----------------------------------------------------
   HAMBURGER TOGGLE
---------------------------------------------------- */
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

/* ----------------------------------------------------
   INIT
---------------------------------------------------- */
window.addEventListener("DOMContentLoaded", loadHamburgerMenu);
window.addEventListener("DOMContentLoaded", loadTopRightIcons);
window.addEventListener("DOMContentLoaded", loadEvents);