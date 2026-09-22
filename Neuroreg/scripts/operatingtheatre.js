/* ----------------------------------------------------
   Supabase Connection
---------------------------------------------------- */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { initHelpPopup } from "./helpPopup.js";   // ⭐ NEW
let openHelpPopup;   // ⭐ NEW

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ----------------------------------------------------
   GLOBAL CONSTANTS & STATE
---------------------------------------------------- */
const BASELINE_THEATRE_WIDTH = 1000;

let initialTheatreWidth = null;
let currentScaleFactor = 1;

let categoryMap = {
    room: [],
    anaesthetic: [],
    surgical: [],
    staff: []
};

const revealIndex = {
    room: 0,
    anaesthetic: 0,
    surgical: 0,
    staff: 0
};

let saveQueue = new Map();
let maxZIndex = 1;
let operationRequirements = {};

/* ----------------------------------------------------
   ENTRY POINT
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", initOperatingTheatre);
window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("pageshow", () => {
  const dropdown = document.getElementById("hamburgerMenuDropdown");
  if (dropdown) dropdown.style.display = "none";
});

    openHelpPopup = initHelpPopup(supabase);   // ⭐ NEW
 });

/* ----------------------------------------------------
   ENTRY POINT
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", initOperatingTheatre);
window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("pageshow", () => {
        const dropdown = document.getElementById("hamburgerMenuDropdown");
        if (dropdown) dropdown.style.display = "none";
    });

    openHelpPopup = initHelpPopup(supabase);   // ⭐ NEW
});


async function initOperatingTheatre() {
    const nickname = localStorage.getItem("nickname");
    if (!nickname) {
        window.location.href = "login.html";
        return;
    }

    suppressRoomScrolling();   // ⭐ NOW IT RUNS

    enforceLandscapeMessage();
    setupHamburgerToggle();

    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    await Promise.all([
        loadHamburgerMenu(),
        loadTopRightIcons()
    ]);

     const wrapper = document.getElementById("theatreWrapper");
    initialTheatreWidth = wrapper?.clientWidth || BASELINE_THEATRE_WIDTH;

    await initTheatre();

    applyResponsiveLayout();
    window.addEventListener("resize", applyResponsiveLayout);
    window.addEventListener("orientationchange", applyResponsiveLayout);

    document.addEventListener("theatreChanged", evaluateOperations);
}

/* ----------------------------------------------------
   Touch suppression for room panels
---------------------------------------------------- */
function suppressRoomScrolling() {
    const rooms = document.querySelectorAll(".roomPanel");

    rooms.forEach(room => {
        room.addEventListener("touchmove", (e) => {
            e.preventDefault();
        }, { passive: false });

        room.addEventListener("touchstart", (e) => {
            e.preventDefault();
        }, { passive: false });
    });
}

/* ----------------------------------------------------
   Orientation Overlay
---------------------------------------------------- */
function enforceLandscapeMessage() {
    const overlay = document.getElementById("orientationOverlay");
    if (!overlay) return;

    const update = () => {
        const isLandscape = window.innerWidth > window.innerHeight;
        overlay.style.display = isLandscape ? "none" : "flex";
    };

    let timeout;
    const debouncedUpdate = () => {
        clearTimeout(timeout);
        timeout = setTimeout(update, 120);
    };

    update();
    window.addEventListener("resize", debouncedUpdate);
    window.addEventListener("orientationchange", update);
}

/* ----------------------------------------------------
   Hamburger Menu Toggle
---------------------------------------------------- */
function setupHamburgerToggle() {
    const hamburger = document.getElementById("hamburgerMenu");
    const dropdown = document.getElementById("hamburgerMenuDropdown");
    if (!hamburger || !dropdown) return;

    hamburger.addEventListener("click", () => {
        dropdown.style.display =
            dropdown.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", (event) => {
        if (!hamburger.contains(event.target) &&
            !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    }, { capture: true });
}

/* ----------------------------------------------------
   Menu Loading
---------------------------------------------------- */
async function loadHamburgerMenu() {
    const dropdown = document.getElementById("hamburgerMenuDropdown");
    if (!dropdown) return;

    dropdown.innerHTML = "";

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
        .from("menuitems")
        .select("*")
        .eq("hamburger", true)
        .order("hamburgersection", { ascending: true })
        .order("hamburgerorder", { ascending: true });

    if (error) return;

    const filtered = data.filter(item =>
        (!item.admin || isAdmin) &&
        item.url !== currentPage
    );

    let currentSection = null;
    const frag = document.createDocumentFragment();

    filtered.forEach(item => {
        if (currentSection !== null && item.hamburgersection !== currentSection) {
            const separator = document.createElement("div");
            separator.className = "dropdownSeparator";
            frag.appendChild(separator);
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

        frag.appendChild(div);
    });

    dropdown.replaceChildren(frag);
}

async function loadTopRightIcons() {
    const container = document.getElementById("topRightIcons");
    if (!container) return;

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
        .from("menuitems")
        .select("*")
        .eq("topright", true)
        .order("toprightorder", { ascending: true });

    if (error) return;

    container.innerHTML = "";

    const filtered = data.filter(item =>
        (!item.admin || isAdmin) &&
        item.url !== currentPage
    );

    const frag = document.createDocumentFragment();

    filtered.forEach(item => {
        const icon = document.createElement("div");
        icon.className = "topRightIcon";
        icon.innerText = item.emoji;
        icon.setAttribute("role", "button");

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


        frag.appendChild(icon);
    });

    container.replaceChildren(frag);
}

/* ----------------------------------------------------
   Operations Menu
---------------------------------------------------- */
async function loadOperationsMenu() {
    const wrapper = document.getElementById("operationsMenuWrapper");
    const button = document.getElementById("operationsMenuButton");
    const dropdown = document.getElementById("operationsDropdown");

    if (!wrapper || !button || !dropdown) return;

    const [{ data: ops }, { data: map }] = await Promise.all([
        supabase
            .from("operation_types")
            .select("*")
            .order("id", { ascending: true }),
        supabase
            .from("itemid_operation_type_map")
            .select("*")
    ]);

    dropdown.innerHTML = "";
    const frag = document.createDocumentFragment();

    ops.forEach(op => {
        const div = document.createElement("div");
        div.className = "operationItem";
        div.dataset.opId = String(op.id);
        div.textContent = op.name || op.operation_name || `Operation ${op.id}`;
        frag.appendChild(div);
    });

    dropdown.replaceChildren(frag);

    operationRequirements = {};
    if (map) {
        map.forEach(row => {
            const opId = row.operationTypeId;
            const itemId = row.itemId;
            if (!operationRequirements[opId]) operationRequirements[opId] = [];
            operationRequirements[opId].push(itemId);
        });
    }

    button.addEventListener("click", () => {
        dropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.classList.remove("open");
        }
    });

    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Operations Evaluation
---------------------------------------------------- */
function evaluateOperations() {
    const dropdown = document.getElementById("operationsDropdown");
    if (!dropdown) return;

    const deployed = Array.from(document.querySelectorAll(".equipmentItem"))
        .filter(el => el.dataset.location === "theatre")
        .map(el => Number(el.dataset.itemId));

    const opReq = operationRequirements || {};

    dropdown.querySelectorAll(".operationItem").forEach(div => {
        const opId = Number(div.dataset.opId);
        const required = opReq[opId] || [];

        const presentCount = required.filter(id => deployed.includes(id)).length;

        let status;
        if (required.length === 0) {
            status = "impossible";
        } else if (presentCount === required.length) {
            status = "performable";
        } else if (presentCount > 0) {
            status = "incomplete";
        } else {
            status = "impossible";
        }

        div.classList.remove("performable", "incomplete", "impossible");
        div.classList.add(status);
    });
}

/* ----------------------------------------------------
   Theatre Initialisation
---------------------------------------------------- */
async function initTheatre() {
    await loadDraggableItemsFromSupabase();
    await restoreItemStates();
    buildCategoryMap();
    wireCategoryButtons();
    scaleRoomContents();
    updateCategoryButtonColours();
    await loadOperationsMenu();
}

/* ----------------------------------------------------
   Load draggable items from Supabase (reward-gated)
---------------------------------------------------- */
async function loadDraggableItemsFromSupabase() {
    const equipmentContainer = document.getElementById("equipmentContainer");
    if (!equipmentContainer) return;

    equipmentContainer.innerHTML = "";

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
        .from("profiles")
        .select("scalpel_points, streak_days")
        .eq("id", user.id)
        .single();

    const scalpelPoints = profile?.scalpel_points ?? 0;
    const streakDays = profile?.streak_days ?? 0;

    const { data } = await supabase
        .from("theatredragables")
        .select("*")
        .order("id", { ascending: true });

    const frag = document.createDocumentFragment();

    data.forEach(row => {
        const category = row.category?.trim().toLowerCase();
        if (!["room", "anaesthetic", "surgical", "staff"].includes(category)) return;

        const unlocked =
            (streakDays >= (row.streak ?? 0)) ||
            (scalpelPoints >= (row.points ?? 0));

        if (!unlocked) return;

        const img = document.createElement("img");
        img.src = row.url;
        img.dataset.category = category;
        img.dataset.itemId = String(row.id);
        img.dataset.location = "undeployed";
        img.dataset.flipped = "false";

        /* ----------------------------------------------------
           MOBILE LANDSCAPE BASELINE SIZE FIX
           ---------------------------------------------------- */
        const isMobileLandscape =
            window.innerWidth > window.innerHeight &&
            window.innerHeight < 500;   // landscape phone threshold

        let startingWidth = row.starting_width ?? 200;
        let startingHeight = row.starting_height ?? 400;

        if (isMobileLandscape) {
            startingWidth *= 0.55;   // reduce width ~45%
            startingHeight *= 0.55;  // reduce height ~45%
        }

        img.startingWidth = startingWidth;
        img.startingHeight = startingHeight;

        img.virtualWidth = startingWidth;
        img.virtualHeight = startingHeight;
        img.virtualLeft = 0;
        img.virtualTop = 0;
        img.virtualScale = 1;

        img.scale = 1;
        img.zIndex = 1;

        img.classList.add("equipmentItem", `${category}Item`);
        img.style.display = "none";
        img.style.position = "absolute";

        img.addEventListener("load", () => {
            img.style.width = startingWidth + "px";
            img.style.height = startingHeight + "px";
            applyTransform(img);
        }, { once: true });

        frag.appendChild(img);
    });

    equipmentContainer.replaceChildren(frag);
}

/* ----------------------------------------------------
   Restore saved location of draggable items
---------------------------------------------------- */
async function restoreItemStates() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
        .from("per_user_theatre_state")
        .select("*")
        .eq("userid", user.id);

    if (!data) return;

    data.forEach(state => {
        const el = document.querySelector(
            `.equipmentItem[data-item-id="${state.itemId}"]`
        );
        if (!el) return;

        const wrapper = document.getElementById("theatreWrapper");
        const width = wrapper ? (wrapper.clientWidth || BASELINE_THEATRE_WIDTH)
                              : BASELINE_THEATRE_WIDTH;

        // ⭐ MUST MATCH DRAG MATH
        const baselineFactor = width / BASELINE_THEATRE_WIDTH;

        const sw = el.startingWidth;
        const sh = el.startingHeight;

        el.virtualWidth  = sw;
        el.virtualHeight = sh;
        el.virtualScale  = state.scale;
        el.scale         = state.scale;

        el.dataset.flipped = state.flip ? "true" : "false";

        // ⭐ Size = baseline × responsive × user scale
        el.style.width  = (sw * baselineFactor * el.scale) + "px";
        el.style.height = (sh * baselineFactor * el.scale) + "px";

        if (state.store) {
            const room = (el.dataset.category === "staff")
                ? document.getElementById("staffroom")
                : document.getElementById("storeroom");

            if (room) {
                el.dataset.location = room.id;
                moveItemToRoom(el, room);
            }
            return;
        }

        el.dataset.location = "theatre";

        el.virtualLeft = state.left;
        el.virtualTop  = state.top;
        el.zIndex      = state.z ?? 1;

        el.style.display = "block";

        // ⭐ Position = baseline × user scale
        el.style.left = (el.virtualLeft * baselineFactor * el.scale) + "px";
        el.style.top  = (el.virtualTop  * baselineFactor * el.scale) + "px";

        el.style.zIndex = String(el.zIndex);

        applyTransform(el);
        makeDraggable(el);
    });

    scaleRoomContents();
    updateCategoryButtonColours();
    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Save location of draggable items
---------------------------------------------------- */
function scheduleSave(el) {
    const id = el.dataset.itemId;
    const existing = saveQueue.get(id);
    if (existing) clearTimeout(existing);

    const timeout = setTimeout(() => saveItemState(el), 120);
    saveQueue.set(id, timeout);
}

async function saveItemState(el) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const itemId = Number(el.dataset.itemId);

    const left = el.virtualLeft;
    const top = el.virtualTop;
    const scale = el.scale;
    const flip = el.dataset.flipped === "true";
    const store = (el.dataset.location === "storeroom" || el.dataset.location === "staffroom");
    const z = el.zIndex || 1;

    await supabase
        .from("per_user_theatre_state")
        .upsert({
            userid: user.id,
            itemId,
            left,
            top,
            scale,
            flip,
            store,
            z,
            created_at: new Date().toISOString()
        }, {
            onConflict: "userid,itemId"
        });

    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Category System
---------------------------------------------------- */
function buildCategoryMap() {
    categoryMap = {
        room: [],
        anaesthetic: [],
        surgical: [],
        staff: []
    };

    document.querySelectorAll(".equipmentItem").forEach(el => {
        const category = el.dataset.category;
        if (categoryMap[category]) {
            categoryMap[category].push(el);
        }
    });

    Object.keys(categoryMap).forEach(category => {
        const items = categoryMap[category];

        const deployedCount = items.filter(i =>
            i.dataset.location === "theatre" ||
            i.dataset.location === "storeroom" ||
            i.dataset.location === "staffroom"
        ).length;

        revealIndex[category] = deployedCount;
    });

    updateCategoryButtonColours();
}

function wireCategoryButtons() {
    document.querySelectorAll(".categoryBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const raw = btn.dataset.category || btn.textContent.trim().toLowerCase();
            revealNextItem(raw);
        });
    });
}

function revealNextItem(categoryKey) {
    if (!categoryMap[categoryKey]) return;

    const items = categoryMap[categoryKey];
    const index = revealIndex[categoryKey];
    if (index >= items.length) return;

    const item = items[index];
    const equipmentContainer = document.getElementById("equipmentContainer");
    if (!equipmentContainer) return;

    equipmentContainer.appendChild(item);

    item.style.display = "block";
    item.dataset.location = "theatre";

    const sw = item.startingWidth;
    const sh = item.startingHeight;

    item.virtualWidth = sw;
    item.virtualHeight = sh;
    item.virtualScale = item.scale;

    const wrapper = document.getElementById("theatreWrapper");
    const width = wrapper ? (wrapper.clientWidth || BASELINE_THEATRE_WIDTH) : BASELINE_THEATRE_WIDTH;
    const factor = initialTheatreWidth ? width / initialTheatreWidth : 1;

    item.style.width = (sw * factor) + "px";
    item.style.height = (sh * factor) + "px";

    centerItemOnBackground(item);
    applyTransform(item);
    makeDraggable(item);

    revealIndex[categoryKey]++;
    updateCategoryButtonColours();
    scheduleSave(item);
    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Center new items on theatre background
---------------------------------------------------- */
function centerItemOnBackground(item) {
    const wrapper = document.getElementById("theatreWrapper");
    if (!wrapper) return;

    const center = () => {
        const wrapperRect = wrapper.getBoundingClientRect();

        const itemWidth = item.virtualWidth || item.offsetWidth || 200;
        const itemHeight = item.virtualHeight || item.offsetHeight || 200;

        const left = (wrapperRect.width / 2) - (itemWidth / 2);
        const top = (wrapperRect.height / 2) - (itemHeight / 2);

        const baselineFactor = wrapperRect.width / BASELINE_THEATRE_WIDTH;

        item.virtualLeft = left / baselineFactor;
        item.virtualTop = top / baselineFactor;

        item.style.left = left + "px";
        item.style.top = top + "px";
    };

    if (item.complete || item.naturalWidth > 0) {
        center();
    } else {
        item.addEventListener("load", center, { once: true });
    }
}

/* ----------------------------------------------------
   Category Button Colour Logic
---------------------------------------------------- */
function updateCategoryButtonColours() {
    document.querySelectorAll(".categoryBtn").forEach(btn => {
        const category = btn.dataset.category;
        const items = categoryMap[category] || [];

        const undeployedCount = items.filter(i =>
            i.dataset.location !== "theatre" &&
            i.dataset.location !== "storeroom" &&
            i.dataset.location !== "staffroom"
        ).length;

        btn.style.backgroundColor = undeployedCount > 0 ? "green" : "";

        const badge = btn.querySelector(".levelBadge");
        if (badge) {
            badge.textContent = String(undeployedCount);
        }
    });
}

/* ----------------------------------------------------
   Drag, Resize, Flip System (Pointer Events)
---------------------------------------------------- */
function makeDraggable(el) {
    if (el._draggableInitialized) return;
    el._draggableInitialized = true;

    let dragActive = false;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let lastTapTime = 0;

    // ⭐ Pinch detection / tracking
    let pinchCandidate = false;
    let pinchTimeout = null;
    let activePointers = new Map();   // pointerId → { x, y }
    let initialPinchDistance = null;
    let initialPinchScale = null;
    let pinchCooldownUntil = 0;
    let pinchOccurred = false;

    function startDrag(e) {
        dragActive = true;

        el.setPointerCapture(e.pointerId);

        if (el.style.display === "none") {
            el.style.display = "block";
            removeItemFromRooms(el);
        }

        startX = e.clientX;
        startY = e.clientY;

        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        el.zIndex = getNextZIndex();
        el.style.zIndex = String(el.zIndex);
    }

    /* ----------------------------------------------------
       POINTER DOWN
    ---------------------------------------------------- */
    el.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;

        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        // First finger → wait briefly to see if second arrives
        if (activePointers.size === 1) {
            pinchCandidate = true;

            pinchTimeout = setTimeout(() => {
                if (pinchCandidate) {
                    startDrag(e);
                }
            }, 80);
        }

        // Second finger → begin pinch
        else if (activePointers.size === 2) {            
            pinchCandidate = false;
            clearTimeout(pinchTimeout);

            dragActive = false; // suppress drag

            const pts = [...activePointers.values()];
            initialPinchDistance = Math.hypot(
                pts[0].x - pts[1].x,
                pts[0].y - pts[1].y
            );

            initialPinchScale = Number(el.dataset.scale ?? el.scale ?? 1);

            pinchOccurred = true;
        }
    });

    /* ----------------------------------------------------
       POINTER MOVE
    ---------------------------------------------------- */
    el.addEventListener("pointermove", (e) => {
        // ⭐ PINCH ZOOM
        if (activePointers.size === 2 && initialPinchDistance !== null) {
            activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

            const pts = [...activePointers.values()];
            const newDistance = Math.hypot(
                pts[0].x - pts[1].x,
                pts[0].y - pts[1].y
            );

            const ratio = newDistance / initialPinchDistance;
            const newScale = Math.max(0.3, Math.min(3, initialPinchScale * ratio));

            el.dataset.scale = String(newScale);
            el.scale = newScale;

            applyTransform(el);
            scheduleSave(el);

            return; // prevent drag logic from running
        }

        if (!dragActive) return;

        if (e.pointerType === "touch" && e.isPrimary === false) {
            return;
        }

        const wrapper = document.getElementById("theatreWrapper");
        if (!wrapper || !initialTheatreWidth) return;

        const parentRect = el.parentElement.getBoundingClientRect();
        const left = e.clientX - offsetX - parentRect.left;
        const top = e.clientY - offsetY - parentRect.top;

        const baselineFactor = (wrapper.clientWidth || BASELINE_THEATRE_WIDTH) / BASELINE_THEATRE_WIDTH;
        const scale = Number(el.dataset.scale ?? el.scale ?? 1);

        el.virtualLeft = (left / scale) / baselineFactor;
        el.virtualTop  = (top  / scale) / baselineFactor;

        el.style.left = left + "px";
        el.style.top = top + "px";

        highlightRoomOnHover(el);
    });






    /* ----------------------------------------------------
       POINTER UP
    ---------------------------------------------------- */
    el.addEventListener("pointerup", (e) => {
        activePointers.delete(e.pointerId);
        pinchCandidate = false;
        clearTimeout(pinchTimeout);

        if (activePointers.size < 2) {
            initialPinchDistance = null;
            initialPinchScale = null;

if (pinchOccurred) {
        pinchCooldownUntil = Date.now() + 300;   // ⭐ only after real pinch
    }

    pinchOccurred = false;   // reset
        }

        if (dragActive) {
            dragActive = false;
            clearRoomHighlights();
            attemptRoomDrop(el);
            scheduleSave(el);
        }

        const now = Date.now();

        // ⭐ Touch double‑tap flip
        if (e.pointerType === "touch") {

    // ⭐ Block flips during pinch cooldown
    if (now < pinchCooldownUntil) {
        lastTapTime = now;   // reset tap timer
        return;
    }

    // Normal double‑tap flip
    if (now - lastTapTime < 250) {
        const before = el.dataset.flipped;
        const after = before === "true" ? "false" : "true";

        el.dataset.flipped = after;
        applyTransform(el);
        scheduleSave(el);
    }

    lastTapTime = now;
}

        el.releasePointerCapture(e.pointerId);
    });







    /* ----------------------------------------------------
       POINTER CANCEL
    ---------------------------------------------------- */
    el.addEventListener("pointercancel", (e) => {
        activePointers.delete(e.pointerId);
        pinchCandidate = false;
        clearTimeout(pinchTimeout);

        if (activePointers.size < 2) {
            initialPinchDistance = null;
            initialPinchScale = null;

              if (pinchOccurred) {
        pinchCooldownUntil = Date.now() + 300;
    }

    pinchOccurred = false;
        }

        dragActive = false;
        clearRoomHighlights();
        el.releasePointerCapture(e.pointerId);
    });

    /* ----------------------------------------------------
       DESKTOP WHEEL ZOOM
    ---------------------------------------------------- */
    el.addEventListener("wheel", (e) => {
        if (dragActive) return;
        e.preventDefault();

        if (Math.abs(e.deltaY) < 5) return;

        const now = Date.now();
        if (now - (el._lastWheelTime || 0) < 40) return;
        el._lastWheelTime = now;

        const currentScale = Number(el.dataset.scale ?? el.scale ?? 1);
        const delta = e.deltaY < 0 ? 1.02 : 0.98;
        const newScale = Math.max(0.3, Math.min(3, currentScale * delta));

        el.dataset.scale = String(newScale);
        el.scale = newScale;

        applyTransform(el);
        scheduleSave(el);
    }, { passive: false });

    /* ----------------------------------------------------
       DESKTOP DOUBLE CLICK FLIP
    ---------------------------------------------------- */
    el.addEventListener("dblclick", () => {
        const before = el.dataset.flipped;
        const after = before === "true" ? "false" : "true";

        el.dataset.flipped = after;
        applyTransform(el);
        scheduleSave(el);
    });
}

/* ----------------------------------------------------
   Transform (Flip + Scale)
---------------------------------------------------- */
function applyTransform(el) {
    const scale = Number(el.dataset.scale ?? el.scale ?? 1);
    const flipped = el.dataset.flipped === "true";

    const flip = flipped ? "rotateY(180deg)" : "";

    el.style.transformOrigin = "center center";
    el.style.transform = `${flip} scale(${scale})`;
}

function getNextZIndex() {
    return ++maxZIndex;
}


/* ----------------------------------------------------
   ROOM DROP LOGIC
---------------------------------------------------- */
function highlightRoomOnHover(el) {
    const rooms = document.querySelectorAll(".roomPanel");
    const elRect = el.getBoundingClientRect();

    rooms.forEach(room => {
        const rect = room.getBoundingClientRect();

        const hovering =
            elRect.right > rect.left &&
            elRect.left < rect.right &&
            elRect.bottom > rect.top &&
            elRect.top < rect.bottom;

        if (hovering) {
            room.classList.add("drag-over");
        } else {
            room.classList.remove("drag-over");
        }
    });
}

function clearRoomHighlights() {
    document.querySelectorAll(".roomPanel").forEach(room => {
        room.classList.remove("drag-over");
    });
}

function attemptRoomDrop(el) {
    const elRect = el.getBoundingClientRect();

    const storeRoom = document.getElementById("storeroom");
    const staffRoom = document.getElementById("staffroom");

    if (!storeRoom || !staffRoom) return;

    const storeRect = storeRoom.getBoundingClientRect();
    const staffRect = staffRoom.getBoundingClientRect();

    const isStaff = el.dataset.category === "staff";

    const droppedInStore =
        elRect.right > storeRect.left &&
        elRect.left < storeRect.right &&
        elRect.bottom > storeRect.top &&
        elRect.top < storeRect.bottom;

    const droppedInStaff =
        elRect.right > staffRect.left &&
        elRect.left < staffRect.right &&
        elRect.bottom > staffRect.top &&
        elRect.top < staffRect.bottom;

    // ⭐ Staff incorrectly dropped in store room
    if (droppedInStore && isStaff) {
        alert("Staff can only go in the Staff Room.");

        // Move to centre
        centerItemOnBackground(el);
        applyTransform(el);
        scheduleSave(el);

        el.dataset.location = "theatre";
        return;
    }

    // ⭐ Non-staff incorrectly dropped in staff room
    if (droppedInStaff && !isStaff) {
        alert("Only staff can go in the Staff Room.");

        // Move to centre
        centerItemOnBackground(el);
        applyTransform(el);
        scheduleSave(el);

        el.dataset.location = "theatre";
        return;
    }

    // ⭐ Correct room drops
    if (droppedInStore) {
        el.dataset.location = "storeroom";
        moveItemToRoom(el, storeRoom);
        dispatchTheatreChanged();
        return;
    }

    if (droppedInStaff) {
        el.dataset.location = "staffroom";
        moveItemToRoom(el, staffRoom);
        dispatchTheatreChanged();
        return;
    }

    // ⭐ Not dropped in any room → stays in theatre
    el.dataset.location = "theatre";
    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Thumbnail Drag-Out System
---------------------------------------------------- */
function makeThumbnailDraggable(thumb, originalEl, room) {
    let dragging = false;
    let ghost = null;
    let offsetX = 0;
    let offsetY = 0;

    const theatre = document.getElementById("theatreWrapper");
    if (!theatre) return;

    function getTheatreRect() {
        return theatre.getBoundingClientRect();
    }

    thumb.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;

        dragging = true;
        thumb.setPointerCapture(e.pointerId);

        thumb.style.visibility = "hidden";

        ghost = document.createElement("img");
        ghost.src = thumb.src;
        ghost.classList.add("storeThumb");
        ghost.style.position = "fixed";
        ghost.style.pointerEvents = "none";
        ghost.style.zIndex = "99999";
        ghost.style.width = "40px";

        document.body.appendChild(ghost);

        const rect = thumb.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        ghost.style.left = `${e.clientX - offsetX}px`;
        ghost.style.top = `${e.clientY - offsetY}px`;
    });

    thumb.addEventListener("pointermove", (e) => {
        if (!dragging || !ghost) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        ghost.style.left = `${x}px`;
        ghost.style.top = `${y}px`;

        const rect = getTheatreRect();

        const insideTheatre =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (!insideTheatre) {
            ghost.classList.add("noEntryGhost");
        } else {
            ghost.classList.remove("noEntryGhost");
        }
    });

    thumb.addEventListener("pointerup", (e) => {
        if (!dragging) return;
        dragging = false;

        if (ghost) ghost.remove();

        const dropX = e.clientX;
        const dropY = e.clientY;

        const rect = getTheatreRect();

        const insideTheatre =
            dropX >= rect.left &&
            dropX <= rect.right &&
            dropY >= rect.top &&
            dropY <= rect.bottom;

        if (!insideTheatre) {
            thumb.style.visibility = "visible";
            thumb.releasePointerCapture(e.pointerId);
            return;
        }

        thumb.remove();
        updateRoomEmoji(room);
        scaleRoomContents();
        updateCategoryButtonColours();

        originalEl.style.display = "block";

        const equipmentContainer = document.getElementById("equipmentContainer");
        if (!equipmentContainer) {
            thumb.releasePointerCapture(e.pointerId);
            return;
        }

        equipmentContainer.appendChild(originalEl);

        const sw = originalEl.startingWidth;
        const sh = originalEl.startingHeight;

        originalEl.virtualWidth = sw;
        originalEl.virtualHeight = sh;
        originalEl.virtualScale = originalEl.scale;

        const theatreWidth = theatre.clientWidth || BASELINE_THEATRE_WIDTH;
        const factor = initialTheatreWidth ? theatreWidth / initialTheatreWidth : 1;

        originalEl.style.width = (sw * factor) + "px";
        originalEl.style.height = (sh * factor) + "px";

        const parentRect = equipmentContainer.getBoundingClientRect();

   // Correct baseline factor
const baselineFactor = theatreWidth / BASELINE_THEATRE_WIDTH;

// Current scale of the item
const scale = Number(originalEl.dataset.scale ?? originalEl.scale ?? 1);

// Compute pixel top-left from centre drop (correct)
const pixelLeft = dropX - parentRect.left - ((sw * baselineFactor * scale) / 2);
const pixelTop  = dropY - parentRect.top  - ((sh * baselineFactor * scale) / 2);

// Convert pixel → baseline-space top-left (correct)
originalEl.virtualLeft = pixelLeft / (baselineFactor * scale);
originalEl.virtualTop  = pixelTop  / (baselineFactor * scale);

// Apply pixel position
originalEl.style.left = pixelLeft + "px";
originalEl.style.top  = pixelTop + "px";
        originalEl.dataset.location = "theatre";

        applyTransform(originalEl);

        makeDraggable(originalEl);
        scheduleSave(originalEl);
        dispatchTheatreChanged();

        thumb.releasePointerCapture(e.pointerId);
    });

    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Thumbnail System
---------------------------------------------------- */
function moveItemToRoom(el, room) {
    const thumb = document.createElement("img");
    thumb.src = el.src;
    thumb.classList.add("storeThumb");
    thumb.dataset.itemId = el.dataset.itemId;

    room.appendChild(thumb);

    el.style.display = "none";

    el.dataset.location = room.id === "staffroom" ? "staffroom" : "storeroom";

    makeThumbnailDraggable(thumb, el, room);

    updateRoomEmoji(room);
    scaleRoomContents();
    updateCategoryButtonColours();
    scheduleSave(el);
    dispatchTheatreChanged();
}

function removeItemFromRooms(el) {
    const rooms = document.querySelectorAll(".roomPanel");

    rooms.forEach(room => {
        const thumbs = room.querySelectorAll(".storeThumb");
        thumbs.forEach(t => {
            if (t.dataset.itemId === el.dataset.itemId) t.remove();
        });
        updateRoomEmoji(room);
    });

    el.dataset.location = "theatre";

    scaleRoomContents();
    updateCategoryButtonColours();
    dispatchTheatreChanged();
}

function updateRoomEmoji(room) {
    const emoji = room.querySelector(".roomEmoji");
    const thumbs = room.querySelectorAll(".storeThumb");

    if (!emoji) return;

    emoji.style.display = thumbs.length === 0 ? "block" : "none";
}

/* ----------------------------------------------------
   Scale room contents
---------------------------------------------------- */
function scaleRoomContents() {
    const rooms = document.querySelectorAll(".roomPanel");

    rooms.forEach(room => {
        const emoji = room.querySelector(".roomEmoji");
        const title = room.querySelector("h3");
        const thumbs = room.querySelectorAll(".storeThumb");

        if (title) {
            title.style.fontSize = "14px";
        }
        if (emoji) {
            emoji.style.fontSize = "32px";
        }

        thumbs.forEach(t => {
            t.style.width = "30px";
            t.style.margin = "2px";
        });
    });
}

/* ----------------------------------------------------
   Responsive scaling (width + coordinates)
---------------------------------------------------- */
function applyResponsiveLayout() {
    const wrapper = document.getElementById("theatreWrapper");
    if (!wrapper) return;

    const currentWidth = wrapper.clientWidth || BASELINE_THEATRE_WIDTH;

    // First-time baseline capture
    if (!initialTheatreWidth) {
        initialTheatreWidth = currentWidth;

        document.querySelectorAll(".equipmentItem").forEach(el => {
            el.virtualLeft   = el.virtualLeft   ?? 0;
            el.virtualTop    = el.virtualTop    ?? 0;
            el.virtualWidth  = el.virtualWidth  ?? el.startingWidth;
            el.virtualHeight = el.virtualHeight ?? el.startingHeight;
            el.virtualScale  = el.virtualScale  ?? (Number(el.dataset.scale ?? el.scale ?? 1) || 1);
        });

        return;
    }

    // ⭐ MUST MATCH DRAG + RESTORE BASELINE
    const baselineFactor = currentWidth / BASELINE_THEATRE_WIDTH;

    document.querySelectorAll(".equipmentItem").forEach(el => {
        const vLeft   = el.virtualLeft;
        const vTop    = el.virtualTop;
        const vWidth  = el.virtualWidth;
        const vHeight = el.virtualHeight;
        const scale   = Number(el.dataset.scale ?? el.scale ?? 1);

        // ⭐ Size = baseline × user scale
        el.style.width  = (vWidth  * baselineFactor * scale) + "px";
        el.style.height = (vHeight * baselineFactor * scale) + "px";

        // ⭐ Position = baseline × user scale
        el.style.left = (vLeft * baselineFactor * scale) + "px";
        el.style.top  = (vTop  * baselineFactor * scale) + "px";

        applyTransform(el);
    });

    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Theatre Change Event
---------------------------------------------------- */
function dispatchTheatreChanged() {
    document.dispatchEvent(new CustomEvent("theatreChanged"));
}