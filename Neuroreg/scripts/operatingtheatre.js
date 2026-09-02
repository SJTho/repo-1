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

    // Always spawn inside theatre
    const equipmentContainer = document.getElementById("equipmentContainer");
    equipmentContainer.appendChild(item);

    item.style.display = "block";

    // Force layout
    item.getBoundingClientRect();

    // Initialise scale + flip state
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

    // Drag start (but not yet dragging)
    el.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;

        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        dragStarted = true;   // waiting to see if user actually drags
    });

    // Drag move
    document.addEventListener("mousemove", (e) => {
        if (!dragStarted) return;

        // Only start dragging if movement is significant
        if (!isDragging) {
            const dx = Math.abs(e.clientX - startX);
            const dy = Math.abs(e.clientY - startY);

            if (dx < 3 && dy < 3) return; // treat as click, not drag
            isDragging = true;
            el.style.zIndex = getNextZIndex();
        }

        const parentRect = el.parentElement.getBoundingClientRect();
        const newLeft = e.clientX - offsetX - parentRect.left;
        const newTop = e.clientY - offsetY - parentRect.top;

        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";
    });

    // Drag end
    document.addEventListener("mouseup", () => {
        dragStarted = false;
        isDragging = false;
    });

    // ⭐ Flip (now works because dragging no longer triggers)
    el.addEventListener("dblclick", () => {
        const flipped = el.dataset.flipped === "true";
        el.dataset.flipped = flipped ? "false" : "true";
        applyTransform(el);
    });

    // ⭐ Slow zoom (scale transform)
    el.addEventListener("wheel", (e) => {
        if (isDragging) return;
        e.preventDefault();

        let scale = parseFloat(el.dataset.scale || "1");
        const delta = e.deltaY < 0 ? 1.01 : 0.99; // your slow zoom

        scale = Math.max(0.3, Math.min(3, scale * delta));
        el.dataset.scale = scale;

        applyTransform(el);
    });
}

// ⭐ Combine flip + scale every time
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
};