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

// Ordered lists of items per category
const categoryMap = {
    Room: Array.from(document.querySelectorAll(".roomItem")),
    Anaesthetic: Array.from(document.querySelectorAll(".anaestheticItem")),
    Surgical: Array.from(document.querySelectorAll(".surgicalItem")),
    Staff: Array.from(document.querySelectorAll(".staffItem"))
};

// Track how many items have been revealed per category
const revealIndex = {
    Room: 0,
    Anaesthetic: 0,
    Surgical: 0,
    Staff: 0
};

// Handle category button clicks
document.querySelectorAll(".categoryBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.textContent.trim();
        revealNextItem(category);
    });
});

// Reveal ONE new item from the category
function revealNextItem(category) {
    const items = categoryMap[category];
    const index = revealIndex[category];

    if (index >= items.length) return;

    const item = items[index];
    item.style.display = "block";

    centerItemOnBackground(item);
    makeDraggable(item);

    revealIndex[category]++;
}

// ------------------------------
// Position new items in the centre of the background
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
// Drag, Resize, Flip System
// ------------------------------
function makeDraggable(el) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    // --- Dragging ---
    el.addEventListener("mousedown", (e) => {
        isDragging = true;
        el.style.zIndex = getNextZIndex();

        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const parentRect = el.parentElement.getBoundingClientRect();
        const newLeft = e.clientX - offsetX - parentRect.left;
        const newTop = e.clientY - offsetY - parentRect.top;

        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";
    });

    document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;

        const store = document.getElementById("storeroom");
        const theatreWrapper = document.getElementById("theatreWrapper");

        const storeRect = store.getBoundingClientRect();
        const theatreRect = theatreWrapper.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        // If dropped fully inside storeroom, move it there
        if (
            elRect.left >= storeRect.left &&
            elRect.right <= storeRect.right &&
            elRect.top >= storeRect.top &&
            elRect.bottom <= storeRect.bottom
        ) {
            // Reparent to storeroom
            store.appendChild(el);

            const newParentRect = store.getBoundingClientRect();
            const left = elRect.left - newParentRect.left;
            const top = elRect.top - newParentRect.top;

            el.style.left = left + "px";
            el.style.top = top + "px";
            el.style.zIndex = 1;
        }
        // If dropped inside theatre, ensure it's parented to equipmentContainer
        else if (
            elRect.left >= theatreRect.left &&
            elRect.right <= theatreRect.right &&
            elRect.top >= theatreRect.top &&
            elRect.bottom <= theatreRect.bottom
        ) {
            const equipmentContainer = document.getElementById("equipmentContainer");
            equipmentContainer.appendChild(el);

            const newParentRect = equipmentContainer.getBoundingClientRect();
            const left = elRect.left - newParentRect.left;
            const top = elRect.top - newParentRect.top;

            el.style.left = left + "px";
            el.style.top = top + "px";
        }
        // Otherwise, leave it where it is (but clipped by whichever container it's in)
    });

    // --- Resize with mouse wheel (smooth) ---
    el.addEventListener("wheel", (e) => {
        e.preventDefault();

        // Ignore tiny accidental scrolls
        if (Math.abs(e.deltaY) < 5) return;

        const currentWidth = el.offsetWidth;
        const delta = e.deltaY < 0 ? 1.01 : 0.99;
        const newWidth = Math.max(80, Math.min(600, currentWidth * delta));

        el.style.width = newWidth + "px";
    });

    // --- Flip left/right on double-click ---
    el.addEventListener("dblclick", () => {
        const current = el.style.transform;

        if (current.includes("scaleX(-1)")) {
            el.style.transform = "scaleX(1)";
        } else {
            el.style.transform = "scaleX(-1)";
        }
    });
}

// Helper: always return a higher z-index than any existing item
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
// Initialise (items start hidden)
// ------------------------------
window.onload = () => {
    document.querySelectorAll(".equipmentItem").forEach(item => {
        item.style.display = "none";
    });