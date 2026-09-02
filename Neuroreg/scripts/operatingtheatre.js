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
    const bg = document.getElementById("theatreBackground");
    const bgRect = bg.getBoundingClientRect();

    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;

    const left = bgRect.left + (bgRect.width / 2) - (itemWidth / 2);
    const top = bgRect.top + (bgRect.height / 2) - (itemHeight / 2);

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

        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        el.style.left = (e.clientX - offsetX) + "px";
        el.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

// --- Resize with mouse wheel (gentle) ---
el.addEventListener("wheel", (e) => {
    e.preventDefault();

    const currentWidth = el.offsetWidth;

    // Much smaller change per wheel tick
    const delta = e.deltaY < 0 ? 1.01 : 0.99;

    // Clamp size
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
};