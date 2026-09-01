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

    // If all items already revealed, do nothing
    if (index >= items.length) return;

    // Reveal the next item
    const item = items[index];
    item.style.display = "block";

    // Position it in the centre of the background image
    centerItemOnBackground(item);

    // Prepare it for dragging
    makeDraggable(item);

    // Move to next item for future clicks
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

    // Calculate centre position
    const left = bgRect.left + (bgRect.width / 2) - (itemWidth / 2);
    const top = bgRect.top + (bgRect.height / 2) - (itemHeight / 2);

    // Apply position
    item.style.left = `${left}px`;
    item.style.top = `${top}px`;
}

// ------------------------------
// Drag & Drop System
// ------------------------------
function makeDraggable(el) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    el.addEventListener("mousedown", (e) => {
        isDragging = true;

        // Bring this item to the front
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
        item.style.display = "none"; // start hidden
    });
};