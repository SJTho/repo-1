/* ----------------------------------------------------
   Supabase Connection
---------------------------------------------------- */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ----------------------------------------------------
   GLOBAL STATE
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

/* ----------------------------------------------------
   MAIN INITIALISATION
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", initOperatingTheatre);

async function initOperatingTheatre() {
    const nickname = localStorage.getItem("nickname");
    if (!nickname) {
        window.location.href = "login.html";
        return;
    }

    enforceLandscapeMessage();
    setupHamburgerToggle();

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) console.error("Auth getUser error:", error);
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    await Promise.all([
        loadHamburgerMenu(),
        loadTopRightIcons()
    ]);

    await initTheatre();

    const wrapper = document.getElementById("theatreWrapper");
    if (wrapper) {
        initialTheatreWidth = wrapper.clientWidth || BASELINE_THEATRE_WIDTH;
    } else {
        initialTheatreWidth = BASELINE_THEATRE_WIDTH;
    }
    currentScaleFactor = 1;

    applyResponsiveLayout();
    window.addEventListener("resize", applyResponsiveLayout);
    window.addEventListener("orientationchange", applyResponsiveLayout);

    document.addEventListener("theatreChanged", evaluateOperations);
}

/* ----------------------------------------------------
   ROTATE PHONE MESSAGE
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
   Hamburger Toggle
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

    if (error) {
        console.error("Menu load error:", error);
        dropdown.innerHTML = "<div class='dropdownItem'>Menu failed to load</div>";
        return;
    }

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

    if (error) {
        console.error("Top-right load error:", error);
        return;
    }

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

    const [{ data: ops, error: opsError }, { data: map, error: mapError }] = await Promise.all([
        supabase
            .from("operation_types")
            .select("*")
            .order("id", { ascending: true }),
        supabase
            .from("itemid_operation_type_map")
            .select("*")
    ]);

    if (opsError) {
        console.error("Failed to load operation types:", opsError);
        dropdown.innerHTML = "<div class='operationItem'>Failed to load operations</div>";
        return;
    }
    if (mapError) {
        console.error("Failed to load operation map:", mapError);
    }

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

    const opReq = {};
    if (map) {
        map.forEach(row => {
            const opId = row.operationTypeId;
            const itemId = row.itemId;
            if (!opReq[opId]) opReq[opId] = [];
            opReq[opId].push(itemId);
        });
    }

    dropdown.opReq = opReq;

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
        .filter(el => el.location === "theatre")
        .map(el => Number(el.dataset.itemId));

    const opReq = dropdown.opReq || {};

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
   Load draggable items from Supabase (reward‑gated)
---------------------------------------------------- */
async function loadDraggableItemsFromSupabase() {
    const equipmentContainer = document.getElementById("equipmentContainer");
    if (!equipmentContainer) return;

    equipmentContainer.innerHTML = "";

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("scalpel_points, streak_days")
        .eq("id", user.id)
        .single();

    if (profileError) {
        console.error("Failed to load profile:", profileError);
        return;
    }

    const scalpelPoints = profile?.scalpel_points ?? 0;
    const streakDays = profile?.streak_days ?? 0;

    const { data, error } = await supabase
        .from("theatredragables")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Failed to load draggable items:", error);
        return;
    }

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

        img.startingWidth = row.starting_width ?? 200;
        img.startingHeight = row.starting_height ?? 400;

        img.virtualWidth = img.startingWidth;
        img.virtualHeight = img.startingHeight;

        img.virtualLeft = 0;
        img.virtualTop = 0;

        img.scale = 1;
        img.virtualScale = 1;

        img.flipped = false;
        img.location = "undeployed";
        img.zIndex = 1;

        img.classList.add("equipmentItem", `${category}Item`);
        img.style.display = "none";
        img.style.position = "absolute";

        img.addEventListener("load", () => {
            img.style.width = img.startingWidth + "px";
            img.style.height = img.startingHeight + "px";
        }, { once: true });

        frag.appendChild(img);
    });

    equipmentContainer.replaceChildren(frag);
}

/* ----------------------------------------------------
   Restore the saved location of draggable items
---------------------------------------------------- */
async function restoreItemStates() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
        .from("per_user_theatre_state")
        .select("*")
        .eq("userid", user.id);

    if (error || !data) return;

    data.forEach(state => {
        const el = document.querySelector(
            `.equipmentItem[data-item-id="${state.itemId}"]`
        );
        if (!el) return;

        el.scale = state.scale;
        el.virtualScale = state.scale;
        el.flipped = !!state.flip;
        applyTransform(el);

        const sw = el.startingWidth;
        const sh = el.startingHeight;
        el.virtualWidth = sw;
        el.virtualHeight = sh;
        el.style.width = sw + "px";
        el.style.height = sh + "px";

        if (state.store) {
            const room = (el.dataset.category === "staff")
                ? document.getElementById("staffroom")
                : document.getElementById("storeroom");

            if (room) {
                el.location = room.id === "staffroom" ? "staffroom" : "storeroom";
                moveItemToRoom(el, room);
            }
            return;
        }

        el.location = "theatre";

        el.virtualLeft = state.left;
        el.virtualTop = state.top;
        el.zIndex = state.z ?? 1;

        const wrapper = document.getElementById("theatreWrapper");
        const width = wrapper ? (wrapper.clientWidth || BASELINE_THEATRE_WIDTH) : BASELINE_THEATRE_WIDTH;
        const factor = initialTheatreWidth ? width / initialTheatreWidth : 1;

        el.style.display = "block";
        el.style.left = (el.virtualLeft * factor) + "px";
        el.style.top = (el.virtualTop * factor) + "px";
        el.style.zIndex = String(el.zIndex);

        makeDraggable(el);
    });

    scaleRoomContents();
    updateCategoryButtonColours();
    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Save the location of draggable items
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
    const flip = el.flipped;
    const store = (el.location === "storeroom" || el.location === "staffroom");
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

    revealIndex.room = 0;
    revealIndex.anaesthetic = 0;
    revealIndex.surgical = 0;
    revealIndex.staff = 0;
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
    item.location = "theatre";

    const sw = item.startingWidth;
    const sh = item.startingHeight;
    item.virtualWidth = sw;
    item.virtualHeight = sh;
    item.style.width = sw + "px";
    item.style.height = sh + "px";

    centerItemOnBackground(item);
    makeDraggable(item);

    revealIndex[categoryKey]++;
    updateCategoryButtonColours();
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

        const width = wrapper.clientWidth || BASELINE_THEATRE_WIDTH;
        const factor = initialTheatreWidth ? width / initialTheatreWidth : 1;

        item.virtualLeft = left / factor;
        item.virtualTop = top / factor;

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

        const hasUndeployed = items.some(item => item.location !== "theatre");

        btn.style.backgroundColor = hasUndeployed ? "green" : "";

        const badge = btn.querySelector(".levelBadge");
        if (badge) {
            const undeployedCount = items.filter(i => i.location !== "theatre").length;
            badge.textContent = String(undeployedCount);
        }
    });
}

/* ----------------------------------------------------
   Drag, Resize, Flip System (Pointer Events)
---------------------------------------------------- */
function makeDraggable(el) {
    let dragActive = false;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;

    let pinchActive = false;
    let pinchStartDist = 0;
    let lastTapTime = 0;

    el.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;

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

        dragActive = true;
        el.zIndex = getNextZIndex();
        el.style.zIndex = String(el.zIndex);
    });

    el.addEventListener("pointermove", (e) => {
        if (!dragActive) return;

        if (e.pointerType === "touch" && e.isPrimary === false) {
            return;
        }

        const wrapper = document.getElementById("theatreWrapper");
        if (!wrapper || !initialTheatreWidth) return;

        const parentRect = el.parentElement.getBoundingClientRect();
        const left = e.clientX - offsetX - parentRect.left;
        const top = e.clientY - offsetY - parentRect.top;

        const width = wrapper.clientWidth || BASELINE_THEATRE_WIDTH;
        const factor = initialTheatreWidth ? width / initialTheatreWidth : 1;

        el.virtualLeft = left / factor;
        el.virtualTop = top / factor;

        el.style.left = left + "px";
        el.style.top = top + "px";

        highlightRoomOnHover(el);
    });

    el.addEventListener("pointerup", (e) => {
        if (dragActive) {
            dragActive = false;
            clearRoomHighlights();
            attemptRoomDrop(el);
            scheduleSave(el);
        }

        const now = Date.now();
        const tapGap = now - lastTapTime;

        if (tapGap < 300 && !dragActive && e.pointerType === "mouse") {
            el.flipped = !el.flipped;
            applyTransform(el);
            scheduleSave(el);
        }

        lastTapTime = now;
        el.releasePointerCapture(e.pointerId);
    });

    el.addEventListener("pointercancel", (e) => {
        dragActive = false;
        clearRoomHighlights();
        el.releasePointerCapture(e.pointerId);
    });

    el.addEventListener("wheel", (e) => {
        if (dragActive) return;
        e.preventDefault();

        if (Math.abs(e.deltaY) < 5) return;

        const now = Date.now();
        if (now - (el._lastWheelTime || 0) < 40) return;
        el._lastWheelTime = now;

        const delta = e.deltaY < 0 ? 1.02 : 0.98;
        const newScale = Math.max(0.3, Math.min(3, el.scale * delta));

        el.scale = newScale;
        el.virtualScale = newScale;

        applyTransform(el);
        scheduleSave(el);
    }, { passive: false });

    el.addEventListener("dblclick", () => {
        el.flipped = !el.flipped;
        applyTransform(el);
        scheduleSave(el);
    });
}

function applyTransform(el) {
    const scale = el.scale;
    const flip = el.flipped ? -1 : 1;

    el.style.transformOrigin = "center center";
    el.style.transform = `scale(${flip * scale}, ${scale})`;
}

let maxZIndex = 1;
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

    if (droppedInStore) {
        el.location = "storeroom";
        moveItemToRoom(el, storeRoom);
    } else if (droppedInStaff) {
        el.location = "staffroom";
        moveItemToRoom(el, staffRoom);
    } else {
        el.location = "theatre";
    }

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

        originalEl.style.width = sw + "px";
        originalEl.style.height = sh + "px";

        originalEl.scale = 1;
        originalEl.virtualScale = 1;
        originalEl.flipped = false;
        applyTransform(originalEl);

        const parentRect = equipmentContainer.getBoundingClientRect();
        const width = theatre.clientWidth || BASELINE_THEATRE_WIDTH;
        const factor = initialTheatreWidth ? width / initialTheatreWidth : 1;

        const left = dropX - parentRect.left - (sw * factor / 2);
        const top = dropY - parentRect.top - (sh * factor / 2);

        originalEl.virtualLeft = left / factor;
        originalEl.virtualTop = top / factor;

        originalEl.style.left = left + "px";
        originalEl.style.top = top + "px";

        originalEl.location = "theatre";

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

    el.location = room.id === "staffroom" ? "staffroom" : "storeroom";

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

    el.location = "theatre";

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

    if (!initialTheatreWidth) {
        initialTheatreWidth = currentWidth;
        currentScaleFactor = 1;

        document.querySelectorAll(".equipmentItem").forEach(el => {
            el.virtualLeft = parseFloat(el.style.left || "0");
            el.virtualTop = parseFloat(el.style.top || "0");
            el.virtualWidth = el.startingWidth;
            el.virtualHeight = el.startingHeight;
            el.virtualScale = el.scale || 1;
        });

        return;
    }

    const responsiveFactor = currentWidth / initialTheatreWidth;

    document.querySelectorAll(".equipmentItem").forEach(el => {
        const vLeft = el.virtualLeft;
        const vTop = el.virtualTop;
        const vWidth = el.virtualWidth;
        const vHeight = el.virtualHeight;
        const userScale = el.scale;

        // Position scales with screen size
        el.style.left = (vLeft * responsiveFactor) + "px";
        el.style.top  = (vTop  * responsiveFactor) + "px";

        // Base size scales with screen size
        el.style.width  = (vWidth  * responsiveFactor) + "px";
        el.style.height = (vHeight * responsiveFactor) + "px";

        // User scaling applies on top
        el.style.transformOrigin = "center center";
        el.style.transform = `scale(${userScale})`;
    });

    dispatchTheatreChanged();
}

/* ----------------------------------------------------
   Theatre Change Event
---------------------------------------------------- */
function dispatchTheatreChanged() {
    document.dispatchEvent(new CustomEvent("theatreChanged"));
}