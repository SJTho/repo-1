import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { logout } from "./logout.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;

/* -----------------------------------------
   Emoji list for dropdown
----------------------------------------- */
const EMOJI_LIST = [
    "🔗", "⭐", "📁", "📄", "📊", "📈", "📉", "⚙️", "🧭",
    "🏥", "💡", "📚", "🧪", "🧬", "🛠️", "🧰", "🚀", "🎯",
    "💻", "🖥️", "📱", "🌐", "🔍", "📝", "📦"
];

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

    // Load all public links
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

    // Load user-selected link IDs
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

    // Build table
    const table = document.createElement("table");
    table.className = "links-table";

    const header = document.createElement("tr");
    header.innerHTML = `
        <th>Link</th>
        <th>Select</th>
    `;
    table.appendChild(header);

    // Render rows
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

        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
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
   Add Link Form
----------------------------------------- */
function renderAddLinkForm() {
    const formContainer = document.getElementById("addLinkContainer");

    // Build emoji dropdown options
    const emojiOptions = EMOJI_LIST.map(e => `<option value="${e}">${e}</option>`).join("");

    formContainer.innerHTML = `
        <h2>Add a New Link</h2>

        <label>Name</label>
        <input id="newLinkName" type="text" placeholder="e.g. My Dashboard">

        <label>URL</label>
        <input id="newLinkUrl" type="text" placeholder="https://example.com">

        <label>Icon</label>
        <select id="newLinkIcon">
            <option value="">-- choose an emoji --</option>
            ${emojiOptions}
        </select>

        <label>Public?</label>
        <select id="newLinkPublic">
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>

        <button id="saveNewLinkBtn">Save Link</button>
    `;

    document.getElementById("saveNewLinkBtn").addEventListener("click", saveNewLink);
}

/* -----------------------------------------
   Save new link into indexpagelinks
----------------------------------------- */
async function saveNewLink() {
    const name = document.getElementById("newLinkName").value.trim();
    const url = document.getElementById("newLinkUrl").value.trim();
    const icon = document.getElementById("newLinkIcon").value.trim();
    const ispublic = document.getElementById("newLinkPublic").value;

    const userId = localStorage.getItem("userId");   // ← NEW

    if (!name || !url) {
        alert("Name and URL are required.");
        return;
    }

    const { error } = await supabase
        .from("indexpagelinks")
        .insert({
            name,
            url,
            icon,
            ispublic,
            addedby: userId      // ← NEW
        });

    if (error) {
        console.error("Insert link error:", error);
        alert("Failed to save link.");
        return;
    }

    loadLinksTable();

    document.getElementById("newLinkName").value = "";
    document.getElementById("newLinkUrl").value = "";
    document.getElementById("newLinkIcon").value = "";
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
window.addEventListener("DOMContentLoaded", () => {
    loadLinksTable();
    renderAddLinkForm();
});