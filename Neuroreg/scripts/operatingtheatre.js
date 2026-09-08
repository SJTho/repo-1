/* ----------------------------------------------------
   Supabase Connection
---------------------------------------------------- */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ----------------------------------------------------
   GLOBAL STATE
---------------------------------------------------- */
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

/* ----------------------------------------------------
   MAIN INITIALISATION
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const nickname = localStorage.getItem("nickname");
    if (!nickname) {
        window.location.href = "login.html";
        return;
    }

    const hamburger = document.getElementById("hamburgerMenu");
    const dropdown = document.getElementById("hamburgerMenuDropdown");

    if (hamburger && dropdown) {
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
    }

    (async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) console.error("Auth getUser error:", error);

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        loadHamburgerMenu();
        loadTopRightIcons();
        initTheatre();
    })();
});

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

async function loadOperationsMenu() {
    const wrapper = document.getElementById("operationsMenuWrapper");
    const button = document.getElementById("operationsMenuButton");
    const dropdown = document.getElementById("operationsDropdown");

    if (!wrapper || !button || !dropdown) return;

    // Fetch all operation types
    const { data, error } = await supabase
        .from("operation_types")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Failed to load operation types:", error);
        dropdown.innerHTML = "<div class='operationItem'>Failed to load operations</div>";
        return;
    }

    dropdown.innerHTML = "";

    data.forEach(op => {
        const div = document.createElement("div");
        div.className = "operationItem";
        div.textContent = op.name || op.operation_name || `Operation ${op.id}`;
        dropdown.appendChild(div);
    });

    // Toggle dropdown on button click
    button.addEventListener("click", () => {
        dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.style.display = "none";
        }
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
    loadOperationsMenu();
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

    data.forEach(row => {
        const category = (row.category || "").toLowerCase();
        if (!["room", "anaesthetic", "surgical", "staff"].includes(category)) {
            return;
        }

        const unlocked =
            (streakDays >= (row.streak ?? 0)) ||
            (scalpelPoints >= (row.points ?? 0));

        if (!unlocked) return;

        const img = document.createElement("img");

        img.src = row.url;
        img.dataset.category = category;
        img.dataset.itemId = String(row.id);
        img.dataset.scale = "1";
        img.dataset.flipped = "false";
        img.dataset.deployed = "false"; // ✅ not yet deployed anywhere

        img.classList.add("equipmentItem", `${category}Item`);
        img.style.display = "none";
        img.style.position = "absolute";

        equipmentContainer.appendChild(img);
    });
}


/* ----------------------------------------------------
   Restore the saved location of dragable items
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

        // Restore scale + flip
        el.dataset.scale = String(state.scale);
        el.dataset.flipped = state.flip ? "true" : "false";
        applyTransform(el);

        if (state.store) {
            // Item belongs in a room → create thumbnail
            const room = (el.dataset.category === "staff")
                ? document.getElementById("staffroom")
                : document.getElementById("storeroom");

            if (room) moveItemToRoom(el, room);
            return;
        }

        // Item belongs in theatre
        el.style.display = "block";
        el.style.left = `${state.left}px`;
        el.style.top = `${state.top}px`;
el.style.zIndex = String(state.z ?? 1);

        el.dataset.deployed = "true";

        makeDraggable(el);
    });

    scaleRoomContents();
    updateCategoryButtonColours();
}

/* ----------------------------------------------------
   Save the location of dragable items
---------------------------------------------------- */

async function saveItemState(el) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const itemId = Number(el.dataset.itemId);

    const left = parseInt(el.style.left || "0");
    const top = parseInt(el.style.top || "0");

    const scale = parseFloat(el.dataset.scale || "1");
    const flip = (el.dataset.flipped === "true");

    const store = (el.style.display === "none");

    const z = parseInt(el.style.zIndex || "1");

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
}

/* ----------------------------------------------------
   Category System
---------------------------------------------------- */
function buildCategoryMap() {
    categoryMap = {
        room: Array.from(document.querySelectorAll(".equipmentItem[data-category='room']")),
        anaesthetic: Array.from(document.querySelectorAll(".equipmentItem[data-category='anaesthetic']")),
        surgical: Array.from(document.querySelectorAll(".equipmentItem[data-category='surgical']")),
        staff: Array.from(document.querySelectorAll(".equipmentItem[data-category='staff']"))
    };

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
    item.dataset.scale = item.dataset.scale || "1";
    item.dataset.flipped = item.dataset.flipped || "false";
    item.dataset.deployed = "true"; // ✅ now deployed (background or room)

    centerItemOnBackground(item);
    makeDraggable(item);

    revealIndex[categoryKey]++;
    updateCategoryButtonColours();
}

/* ----------------------------------------------------
   Center new items on theatre background
---------------------------------------------------- */
function centerItemOnBackground(item) {
    const wrapper = document.getElementById("theatreWrapper");
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();

    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;

    const left = (wrapperRect.width / 2) - (itemWidth / 2);
    const top = (wrapperRect.height / 2) - (itemHeight / 2);

    item.style.left = `${left}px`;
    item.style.top = `${top}px`;
}

/* ----------------------------------------------------
   Category Button Colour Logic
   Green = there exist items that are NOT YET DEPLOYED anywhere
---------------------------------------------------- */
function updateCategoryButtonColours() {
    document.querySelectorAll(".categoryBtn").forEach(btn => {
        const category = btn.dataset.category;
        const items = categoryMap[category] || [];

        // Undeployed = dataset.deployed === "false"
        const hasUndeployed = items.some(item => item.dataset.deployed === "false");

        // Button colour: green if there exist items not yet deployed anywhere
        btn.style.backgroundColor = hasUndeployed ? "green" : "";

        // ⭐ Badge number: total AVAILABLE items in this category
        const badge = btn.querySelector(".levelBadge");
        if (badge) {
            badge.textContent = String(items.length);
        }
    });
}

/* ----------------------------------------------------
   Drag, Resize, Flip System
---------------------------------------------------- */
function makeDraggable(el) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let dragStarted = false;
    let startX = 0;
    let startY = 0;

    el.addEventListener("mousedown", (e) => {
        if (el.style.display === "none") {
            el.style.display = "block";
            removeItemFromRooms(el);
        }

        startX = e.clientX;
        startY = e.clientY;

        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        dragStarted = true;
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragStarted) return;

        if (!isDragging) {
            const dx = Math.abs(e.clientX - startX);
            const dy = Math.abs(e.clientY - startY);

            if (dx < 3 && dy < 3) return;
            isDragging = true;
            el.style.zIndex = getNextZIndex();
        }

        const parentRect = el.parentElement.getBoundingClientRect();
        const newLeft = e.clientX - offsetX - parentRect.left;
        const newTop = e.clientY - offsetY - parentRect.top;

        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";

        highlightRoomOnHover(el);
    });

    document.addEventListener("mouseup", () => {
        if (dragStarted) {
            attemptRoomDrop(el);
            clearRoomHighlights();
            saveItemState(el);
        }

        dragStarted = false;
        isDragging = false;
    });

    el.addEventListener("dblclick", () => {
        el.dataset.flipped = (el.dataset.flipped === "true") ? "false" : "true";
        applyTransform(el);
        saveItemState(el);
    });

    el.addEventListener("wheel", (e) => {
        if (isDragging) return;
        e.preventDefault();

        if (Math.abs(e.deltaY) < 5) return;

        const now = Date.now();
        if (now - (el._lastWheelTime || 0) < 40) return;
        el._lastWheelTime = now;

        let scale = parseFloat(el.dataset.scale || "1");
        const delta = e.deltaY < 0 ? 1.02 : 0.98;

        scale = Math.max(0.3, Math.min(3, scale * delta));
        el.dataset.scale = String(scale);

        applyTransform(el);
        saveItemState(el);
    });
}

function applyTransform(el) {
    const scale = parseFloat(el.dataset.scale || "1");
    const flipped = (el.dataset.flipped === "true");

    const flipPart = flipped ? "scaleX(-1)" : "scaleX(1)";
    el.style.transform = `${flipPart} scale(${scale})`;
}

function getNextZIndex() {
    const items = document.querySelectorAll(".equipmentItem");
    let maxZ = 0;

    items.forEach(item => {
        const z = parseInt(window.getComputedStyle(item).zIndex) || 0;
        if (z > maxZ) maxZ = z;
    });

    return maxZ + 1;
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

    const isStaff = el.dataset.category === "staff" || el.classList.contains("staffItem");

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
        if (isStaff) {
            alert("Staff must be placed in the Staff Room.");
            return;
        }
        moveItemToRoom(el, storeRoom);
    }

    if (droppedInStaff) {
        if (!isStaff) {
            alert("Only staff can be placed in the Staff Room.");
            return;
        }
        moveItemToRoom(el, staffRoom);
    }
}

/* ----------------------------------------------------
   Thumbnail Drag-Out System (ghost + no-entry)
---------------------------------------------------- */
function makeThumbnailDraggable(thumb, originalEl, room) {
    let dragging = false;
    let ghost = null;
    let offsetX = 0;
    let offsetY = 0;

    const theatre = document.getElementById("theatreWrapper");
    if (!theatre) return;

    const theatreRect = theatre.getBoundingClientRect();

    thumb.addEventListener("mousedown", (e) => {
        dragging = true;

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

    document.addEventListener("mousemove", (e) => {
        if (!dragging || !ghost) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        ghost.style.left = `${x}px`;
        ghost.style.top = `${y}px`;

        const insideTheatre =
            e.clientX >= theatreRect.left &&
            e.clientX <= theatreRect.right &&
            e.clientY >= theatreRect.top &&
            e.clientY <= theatreRect.bottom;

        if (!insideTheatre) {
            ghost.classList.add("noEntryGhost");
        } else {
            ghost.classList.remove("noEntryGhost");
        }
    });

    document.addEventListener("mouseup", (e) => {
        if (!dragging) return;
        dragging = false;

        if (ghost) ghost.remove();

        const dropX = e.clientX;
        const dropY = e.clientY;

        const insideTheatre =
            dropX >= theatreRect.left &&
            dropX <= theatreRect.right &&
            dropY >= theatreRect.top &&
            dropY <= theatreRect.bottom;

        if (!insideTheatre) {
            thumb.style.visibility = "visible";
            return;
        }

        thumb.remove();
        updateRoomEmoji(room);
        scaleRoomContents();
        updateCategoryButtonColours();

        originalEl.style.display = "block";

        const equipmentContainer = document.getElementById("equipmentContainer");
        if (!equipmentContainer) return;

        equipmentContainer.appendChild(originalEl);

        // Still deployed; do NOT reset dataset.deployed
        originalEl.style.transform = "";
        originalEl.dataset.scale = "1";
        originalEl.dataset.flipped = "false";
        applyTransform(originalEl);

        const parentRect = equipmentContainer.getBoundingClientRect();

        originalEl.style.left = `${dropX - parentRect.left - (originalEl.offsetWidth / 2)}px`;
        originalEl.style.top = `${dropY - parentRect.top - (originalEl.offsetHeight / 2)}px`;

        makeDraggable(originalEl);
        saveItemState(originalEl);
    });
}

/* ----------------------------------------------------
   Thumbnail System
---------------------------------------------------- */
function moveItemToRoom(el, room) {
    const thumb = document.createElement("img");
    thumb.src = el.src;
    thumb.classList.add("storeThumb");

    room.appendChild(thumb);

    el.style.display = "none";

    // Item remains deployed; only its location changes
    makeThumbnailDraggable(thumb, el, room);

    updateRoomEmoji(room);
    scaleRoomContents();
    updateCategoryButtonColours();
    saveItemState(el);

}

function removeItemFromRooms(el) {
    const rooms = document.querySelectorAll(".roomPanel");

    rooms.forEach(room => {
        const thumbs = room.querySelectorAll(".storeThumb");
        thumbs.forEach(t => {
            if (t.src === el.src) t.remove();
        });
        updateRoomEmoji(room);
    });

    scaleRoomContents();
    updateCategoryButtonColours();
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
   Window onload (safety reset)
---------------------------------------------------- */
window.onload = () => {
    document.querySelectorAll(".equipmentItem").forEach(item => {
        // Keep deployed flag; just hide visuals
        item.style.display = "none";
    });

    scaleRoomContents();
 updateCategoryButtonColours();
};