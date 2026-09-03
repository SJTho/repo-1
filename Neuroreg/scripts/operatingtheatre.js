// ------------------------------
// Hamburger Menu + Admin Link Loader
// ------------------------------

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

// Populate menu links (admin + standard)
async function loadHamburgerLinks() {
    const dropdown = document.getElementById("hamburgerMenuDropdown");
    dropdown.innerHTML = ""; // Clear existing

    const userId = parseInt(localStorage.getItem("userId"));
    if (!userId) return;

    // Check admin status
    const { data, error } = await window.supabase
        .from("users")
        .select("isadmin")
        .eq("id", userId)
        .single();

    const isAdmin = data?.isadmin === true;

    // Standard links
    const links = [
        { text: "Home", href: "index.html" },
        { text: "MCQs", href: "mcq.html" },
        { text: "Operating Theatre", href: "operatingtheatre.html" },
        { text: "Scores", href: "scores.html" }
    ];

    // Admin-only links
    if (isAdmin) {
        links.push(
            { text: "Admin Panel", href: "admin.html" },
            { text: "Manage Questions", href: "adminquestions.html" },
            { text: "User Scores", href: "adminscores.html" }
        );
    }

    // Render links
    links.forEach(link => {
        const a = document.createElement("a");
        a.textContent = link.text;
        a.href = link.href;
        dropdown.appendChild(a);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    loadHamburgerLinks();
});


// ------------------------------
// CATEGORY SYSTEM
// ------------------------------

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

    item.getBoundingClientRect();

    item.dataset.scale = "1";
    item.dataset.flipped = "false";

    centerItemOnBackground(item);
    makeDraggable(item);

    revealIndex[category]++;
}


// ------------------------------
// Center new items
// ------------------------------

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


// ------------------------------
// Drag, Resize (scale), Flip System
// ------------------------------

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
        const flipped = el.dataset.flipped === "true";
        el.dataset.flipped = flipped ? "false" : "true";
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
    const flipped = el.dataset.flipped === "true";

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


// ------------------------------
// ⭐ ROOM DROP LOGIC (Store + Staff)
// ------------------------------

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


// ------------------------------
// ⭐ Thumbnail System (Both Rooms)
// ------------------------------

function moveItemToRoom(el, room) {
    const thumb = document.createElement("img");
    thumb.src = el.src;
    thumb.classList.add("storeThumb");

    room.appendChild(thumb);

    el.style.display = "none";

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


// ------------------------------
// ⭐ Scale room contents
// ------------------------------

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


// Initialise
window.onload = () => {
    document.querySelectorAll(".equipmentItem").forEach(item => {
        item.style.display = "none";
    });

    scaleRoomContents();
};