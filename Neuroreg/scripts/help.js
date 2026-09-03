import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { logout } from "./logout.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;

/* -----------------------------------------
   Load dynamic help content
----------------------------------------- */
async function loadHelpContent() {
    const refUrl = document.referrer;
    const refPage = refUrl ? refUrl.split("/").pop() : null;

    if (!refPage) {
        console.warn("Help page opened directly — no referrer detected.");
        return;
    }

    const { data, error } = await supabase
        .from("help")
        .select("*")
        .eq("page", refPage);

    if (error) {
        console.error("Help load error:", error);
        return;
    }

    const container = document.getElementById("helpContent");
    container.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const h2 = document.createElement("h2");
        h2.innerText = item.heading;

        const p = document.createElement("p");
        p.innerText = item.content;

        card.appendChild(h2);
        card.appendChild(p);
        container.appendChild(card);
    });
}

/* -----------------------------------------
   Close button + click-outside-to-close
----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    // Close button
    document.getElementById("closeBtn").addEventListener("click", () => {
        window.location.href = document.referrer || "index.html";
    });

    // Click outside popup to close
    document.getElementById("popupOverlay").addEventListener("click", (e) => {
        if (e.target.id === "popupOverlay") {
            window.location.href = document.referrer || "index.html";
        }
    });
});

/* -----------------------------------------
   Init
----------------------------------------- */
window.addEventListener("DOMContentLoaded", loadHelpContent);