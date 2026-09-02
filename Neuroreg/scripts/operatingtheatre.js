// ------------------------------
// Hamburger Menu
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
// Store Room / Staff Room UI Update
// ------------------------------
function updateRoomDisplay(roomElement) {
    const emoji = roomElement.querySelector(".roomEmoji");
    const items = roomElement.querySelectorAll(".equipmentItem");

    const hasItems = items.length > 0;

    if (emoji) {
        emoji.style.display = hasItems ? "none" : "block";
    }

    // Thumbnail mode for items inside rooms
    items.forEach(item => {
        item.style.position = "relative";
        item.style.left = "";
        item.style.top = "";

        // Save original scale if not already saved
        if (!item.dataset.originalScale) {
            item.dataset.originalScale = item.dataset.scale;
        }

        // Thumbnail scale
        item.dataset.scale = "0.3";
        applyTransform(item);
    });
}

// ------------------------------
// Drag, Resize, Flip System
// ------------------------------
function makeDraggable(el) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let dragStarted = false;
    let startX = 0;
    let startY = 0;

    el.addEventListener("mousedown", (e) => {
        const rect = el.getBoundingClientRect();

        startX = e.clientX;
        startY = e.clientY;

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

            // Restore full scale when dragging out of room
            if (el.parentElement.id === "storeroom" || el.parentElement.id === "staffroom") {
                el.dataset.scale = el.dataset.originalScale || "1";
                applyTransform(el);
            }
        }

        const parentRect = el.parentElement.getBoundingClientRect();
        const newLeft = e.clientX - offsetX - parentRect.left;
        const newTop = e.clientY - offsetY - parentRect.top;

        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;
    });

    document.addEventListener("mouseup", () => {
        if (!dragStarted) return;

        dragStarted = false;
        isDragging = false;

        const theatreWrapper = document.getElementById("theatreWrapper");
        const equipmentContainer = document.getElementById("equipmentContainer");

        const store = document.getElementById("storeroom");
        const staff = document.getElementById("staffroom");

        const elRect = el.getBoundingClientRect();
        const theatreRect = theatreWrapper.getBoundingClientRect();
        const storeRect = store.getBoundingClientRect();
        const staffRect = staff.getBoundingClientRect();

        function moveToRoom(roomElement) {
            roomElement.appendChild(el);

            el.style.position = "relative";
            el.style.left = "";
            el.style.top = "";
            el.style.zIndex = 1;

            updateRoomDisplay(roomElement);
        }

        // Store Room drop
        if (
            elRect.left >= storeRect.left &&
            elRect.right <= storeRect.right &&
            elRect.top >= storeRect.top &&
            elRect.bottom <= storeRect.bottom
        ) {
            moveToRoom(store);
            return;
        }

        // Staff Room drop
        if (
            elRect.left >= staffRect.left &&
            elRect.right <= staffRect.right &&
            elRect.top >= staffRect.top &&
            elRect.bottom <= staffRect.bottom
        ) {
            moveToRoom(staff);
            return;
        }

        // Theatre drop
        if (
            elRect.left >= theatreRect.left &&
            elRect.right <= theatreRect.right &&
            elRect.top >= theatreRect.top &&
            elRect.bottom <= theatreRect.bottom
        ) {
            equipmentContainer.appendChild(el);

            const newParentRect = equipmentContainer.getBoundingClientRect();
            const left = elRect.left - newParentRect.left;
            const top = elRect.top - newParentRect.top;

            el.style.position = "absolute";
            el.style.left = `${left}px`;
            el.style.top = `${top}px`;

            // Restore full scale
            el.dataset.scale = el.dataset.originalScale || "1";
            applyTransform(el);

            updateRoomDisplay(store);
            updateRoomDisplay(staff);
        }
    });

    // Flip
    el.addEventListener("dblclick", () => {
        const flipped = el.dataset.flipped === "true";
        el.dataset.flipped = flipped ? "false" : "true";
        applyTransform(el);
    });

    // Resize (scale)
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

// Combine flip + scale
function applyTransform(el) {
    const scale = parseFloat(el.dataset.scale || "1");
    const flipped = el.dataset.flipped === "true";

    const flipPart = flipped ? "scaleX(-1)" : "scaleX(1)";
    el.style.transform = `${flipPart} scale(${scale})`;
}

// Z-index helper
function getNextZIndex() {
    const items = document.querySelectorAll(".equipmentItem");
    let maxZ = 0;

    items.forEach(item => {
        const z = parseInt(window.getComputedStyle(item).zIndex) || 0;
        if (z > maxZ) maxZ = z;
    });

    return maxZ + 1;
}

// Initialise
window.onload = () => {
    document.querySelectorAll(".equipmentItem").forEach(item => {
        item.style.display = "none";
    });