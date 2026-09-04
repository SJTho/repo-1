import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { logout } from "./logout.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;

/* -----------------------------------------
   Load all public links
----------------------------------------- */
async function loadLinksTable() {
    const container = document.getElementById("linksContainer");
    container.innerHTML = "";

    // Fetch all links where ispublic != false
    const { data, error } = await supabase
        .from("indexpagelinks")
        .select("id, name, url, icon, ispublic")
        .neq("ispublic", "false")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error loading links:", error);
        container.innerHTML = "<p>Failed to load links.</p>";
        return;
    }

    if (!data || data.length === 0) {
        container.innerHTML = "<p>No links available.</p>";
        return;
    }

    // Create table
    const table = document.createElement("table");
    table.className = "links-table";

    // Header
    const header = document.createElement("tr");
    header.innerHTML = `
        <th>Link</th>
        <th>Select</th>
    `;
    table.appendChild(header);

    // Rows
    data.forEach(row => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td class="link-cell">
                <span class="icon">${row.icon || ""}</span>
                <span class="name">${row.name}</span>
            </td>
            <td class="checkbox-cell">
                <input type="checkbox" disabled />
            </td>
        `;

        table.appendChild(tr);
    });

    container.appendChild(table);
}

/* -----------------------------------------
   Close button
----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("closeBtn").addEventListener("click", () => {
        window.history.back();
    });
});

/* -----------------------------------------
   Init
----------------------------------------- */
window.addEventListener("DOMContentLoaded", loadLinksTable);