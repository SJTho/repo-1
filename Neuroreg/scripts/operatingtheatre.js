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
    item.style.display = "block";

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
// Drag, Resize, Flip System
// ------------------------------
function makeDraggable(el) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    // Drag start
    el.addEventListener("mousedown", (e) => {
        isDragging = true;
        el.style.zIndex = getNextZIndex();

        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    // Drag move
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const parentRect = el.parentElement.getBoundingClientRect();
        const newLeft = e.clientX - offsetX - parentRect.left;
        const newTop = e.clientY - offsetY - parentRect.top;

        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";
    });

    // Drag end
    document.addEventListener("mouseup", () => {
        if (!isDragging) return;
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
            const newParentRect = roomElement.getBoundingClientRect();
            const left = elRect.left - newParentRect.left;
            const top = elRect.top - newParentRect.top;
            el.style.left = left + "px";
            el.style.top = top + "px";
            el.style.zIndex = 1;
        }

        // Storeroom drop
        if (
            elRect.left >= storeRect.left &&
            elRect.right <= storeRect.right &&
            elRect.top >= storeRect.top &&
            elRect.bottom <= storeRect.bottom
        ) {
            moveToRoom(store);
            return;
        }

        // Staff room drop
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
            el.style.left = left + "px";
            el.style.top = top + "px";
        }
    });

    // Resize
    el.addEventListener("wheel", (e) => {
        e.preventDefault();

        if (Math.abs(e.deltaY) < 5) return;

        const currentWidth = el.offsetWidth;
        const delta = e.deltaY < 0 ? 1.01 : 0.99;
        const newWidth = Math.max(80, Math.min(600, currentWidth * delta));

        el.style.width = newWidth + "px";
    });

    // Flip
    el.addEventListener("dblclick", () => {
        const current = el.style.transform;

        if (current.includes("scaleX(-1)")) {
            el.style.transform = "scaleX(1)";
        } else {
            el.style.transform = "scaleX(-1)";
        }
    });
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