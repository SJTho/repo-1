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
// CATEGORY BUTTON LOGIC
// ------------------------------
const categoryButtons = document.querySelectorAll(".categoryBtn");

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showCategory(btn.textContent.trim());
    });
});

function showCategory(category) {
    // Hide all items
    document.querySelectorAll(".equipmentItem").forEach(item => {
        item.style.display = "none";
    });

    // Show only items in the selected category
    let selector = "";
    if (category === "Room") selector = ".roomItem";
    if (category === "Anaesthetic") selector = ".anaestheticItem";
    if (category === "Surgical") selector = ".surgicalItem";
    if (category === "Staff") selector = ".staffItem";

    document.querySelectorAll(selector).forEach(item => {
        item.style.display = "block";
    });
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
// Initialise draggable items
// ------------------------------
window.onload = () => {
    document.querySelectorAll(".equipmentItem").forEach(makeDraggable);
};