export function initHelpPopup(supabase) {
    const popup = document.getElementById("helpPopup");
    const helpContent = document.getElementById("helpContent");
    const closeBtn = document.getElementById("closeHelpBtn");

    if (!popup || !helpContent || !closeBtn) return;

    async function openHelpPopup() {
        helpContent.innerHTML = "";

        const refPage = window.location.pathname.split("/").pop();

        const { data: helpItems, error } = await supabase
            .from("help")
            .select("*")
            .eq("page", refPage);

        if (error) {
            helpContent.innerHTML = `<div class="card"><p>Error loading help.</p></div>`;
        } else if (!helpItems || helpItems.length === 0) {
            helpContent.innerHTML = `<div class="card"><p>No help available for this page.</p></div>`;
        } else {
            helpItems.forEach(item => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <h2>${item.heading}</h2>
                    <p>${item.content}</p>
                `;
                helpContent.appendChild(card);
            });
        }

        popup.style.display = "flex";
    }

    // Close button
    closeBtn.onclick = () => popup.style.display = "none";

    // Click outside
    popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.style.display = "none";
    });

    return openHelpPopup;
}