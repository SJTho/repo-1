/* ----------------------------------------------------
   Supabase Connection
---------------------------------------------------- */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

    async function loadHamburgerMenu() {
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

    loadHamburgerMenu();
    loadTopRightIcons();

});

/* ----------------------------------------------------
   CATEGORY SYSTEM
---------------------------------------------------- */
const categoryMap = {
    Room: Array.from(document.querySelectorAll(".roomItem")),
    Anaesthetic: Array.from(document.querySelectorAll(".anaestheticItem")),
    Surgical: Array.from(document.querySelectorAll(".surgicalItem")),
    Staff: Array.from(document.querySelectorAll(".staffItem"))
};

const revealIndex = {
    Room: 0,
    Anaesthetic: 0,
    Surgical: 0,
    Staff: 0
};

document.querySelectorAll(".categoryBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.textContent.trim();
        revealNextItem(category);
    });
});

function revealNextItem(category) {
    const items = categoryMap[category];
    const index = revealIndex[category];

    if (index >= items.length) return;

    const item = items[index];

    const equipmentContainer = document.getElementById("equipmentContainer");
    equipmentContainer.appendChild(item);

    item.style.display = "block";

    item.dataset.scale = "1";
    item.dataset.flipped = "false";

    centerItemOnBackground(item);
    makeDraggable(item);

    revealIndex[category]++;
}

/* ----------------------------------------------------
   Center new items
---------------------------------------------------- */
function centerItemOnBackground(item) {
    const wrapper = document.getElementById("theatreWrapper");
    const wrapperRect = wrapper.getBoundingClientRect();

    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;

    const left = (wrapperRect.width / 2) - (itemWidth / 2);
    const top = (wrapperRect.height / 2) - (itemHeight / 2);

    item.style.left = `${left}px`;
    item.style.top = `${top}px`;
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
        }

        dragStarted = false;
        isDragging = false;
    });

    el.addEventListener("dblclick", () => {
        el.dataset.flipped = "false"; // RESET FLIP STATE ALWAYS
        applyTransform(el);
    });

    el.addEventListener("wheel", (e) => {
        if (isDragging) return;
        e.preventDefault();

        let scale = parseFloat(el.dataset.scale || "1");
        const delta = e.deltaY < 0 ? 1.01 : 0.99;

        scale = Math.max(0.3, Math.min(3, scale * delta));
        el.dataset.scale = scale;

        applyTransform(el);
    });
}

function applyTransform(el) {
    const scale = parseFloat(el.dataset.scale || "1");
    const flipped = false; // ALWAYS RESET FLIP STATE

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

    const storeRect = storeRoom.getBoundingClientRect();
    const staffRect = staffRoom.getBoundingClientRect();

    const isStaff = el.classList.contains("staffItem");

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

        originalEl.style.display = "block";

        originalEl.dataset.scale = "1";
        originalEl.dataset.flipped = "false";

        applyTransform(originalEl);

        const equipmentContainer = document.getElementById("equipmentContainer");
        equipmentContainer.appendChild(originalEl);

        const parentRect = equipmentContainer.getBoundingClientRect();

        originalEl.style.left = `${dropX - parentRect.left - (originalEl.offsetWidth / 2)}px`;
        originalEl.style.top = `${dropY - parentRect.top - (originalEl.offsetHeight / 2)}px`;

        makeDraggable(originalEl);
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

    makeThumbnailDraggable(thumb, el, room);

    updateRoomEmoji(room);
    scaleRoomContents();
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
}

function updateRoomEmoji(room) {
    const emoji = room.querySelector(".roomEmoji");
    const thumbs = room.querySelectorAll(".storeThumb");

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

        title.style.fontSize = "14px";
        emoji.style.fontSize = "32px";

        thumbs.forEach(t => {
            t.style.width = "30px";
            t.style.margin = "2px";
        });
    });
}

/* ----------------------------------------------------
   INITIALISE
---------------------------------------------------- */
window.onload = () => {
    document.querySelectorAll(".equipmentItem").forEach(item => {
        item.style.display = "none";
    });

    scaleRoomContents();
};