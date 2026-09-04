import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { logout } from "./logout.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;

/* -----------------------------------------
   Load all public links + user selections
----------------------------------------- */
async function loadLinksTable() {
    const container = document.getElementById("linksContainer");
    container.innerHTML = "";

    const userId = localStorage.getItem("userId");
    if (!userId) {
        container.innerHTML = "<p>No user logged in.</p>";
        return;
    }

    // 1️⃣ Load all public links
    const { data: links, error: linksError } = await supabase
        .from("indexpagelinks")
        .select("id, name, url, icon, ispublic")
        .neq("ispublic", "false")
        .order("id", { ascending: true });

    if (linksError) {
        console.error("Error loading links:", linksError);
        container.innerHTML = "<p>Failed to load links.</p>";
        return;
    }

    // 2️⃣ Load user-selected link IDs
    const { data: selected, error: selectedError } = await supabase
        .from("mapuserstolinks")
        .select("linkid")
        .eq("userid", userId);

    if (selectedError) {
        console.error("Error loading user selections:", selectedError);
        container.innerHTML = "<p>Failed to load selections.</p>";
        return;
    }

    const selectedIds = new Set(selected.map(row => row.linkid));

    // 3️⃣ Build table
    const table = document.createElement("table");
    table.className = "links-table";

    const header = document.createElement("tr");
    header.innerHTML = `
        <th>Link</th>
        <th>Select</th>
    `;
    table.appendChild(header);

    // 4️⃣ Render rows
    links.forEach(link => {
        const tr = document.createElement("tr");

        const isChecked = selectedIds.has(link.id);

        tr.innerHTML = `
            <td class="link-cell">
                <span class="icon">${link.icon || ""}</span>
                <span class="name">${link.name}</span>
            </td>
            <td class="checkbox-cell">
                <input type="checkbox" ${isChecked ? "checked" : ""} />
            </td>
        `;

        const checkbox = tr.querySelector("input[type='checkbox']");

        // 5️⃣ Checkbox behaviour
        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
                // Insert mapping
                const { error } = await supabase
                    .from("mapuserstolinks")
                    .insert({
                        userid: userId,
                        linkid: link.id
                    });

                if (error) {
                    console.error("Insert error:", error);
                    checkbox.checked = false;
                }
            } else {
                // Delete mapping
                const { error } = await supabase
                    .from("mapuserstolinks")
                    .delete()
                    .eq("userid", userId)
                    .eq("linkid", link.id);

                if (error) {
                    console.error("Delete error:", error);
                    checkbox.checked = true;
                }
            }
        });

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