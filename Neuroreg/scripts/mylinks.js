import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { logout } from "./logout.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;

/* -----------------------------------------
   State: Are we editing a link?
----------------------------------------- */
let editMode = false;
let editLinkId = null;

/* -----------------------------------------
   Emoji list for dropdown
----------------------------------------- */
const EMOJI_LIST = [
    "🔗", "⭐", "📁", "📄", "📊", "📈", "📉", "⚙️", "🧭",
    "🏥", "💡", "📚", "🧪", "🧬", "🛠️", "🧰", "🚀", "🎯",
    "💻", "🖥️", "📱", "🌐", "🔍", "📝", "📦"
];

/* -----------------------------------------
   Load public links + user's private links
----------------------------------------- */
async function loadLinksTable() {
    const container = document.getElementById("linksContainer");
    container.innerHTML = "";

    const userId = localStorage.getItem("userId");
    if (!userId) {
        container.innerHTML = "<p>No user logged in.</p>";
        return;
    }

    const { data: links, error: linksError } = await supabase
        .from("indexpagelinks")
        .select("id, name, url, icon, ispublic, addedby")
        .or(`ispublic.eq.true,addedby.eq.${userId}`)
        .order("id", { ascending: true });

    if (linksError) {
        console.error("Error loading links:", linksError);
        container.innerHTML = "<p>Failed to load links.</p>";
        return;
    }

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

    const table = document.createElement("table");
    table.className = "links-table";

    const header = document.createElement("tr");
    header.innerHTML = `
        <th>Link</th>
        <th>Select</th>
        <th>Actions</th>
    `;
    table.appendChild(header);

    links.forEach(link => {
        const tr = document.createElement("tr");
        const isChecked = selectedIds.has(link.id);

        const isPrivateOwned =
            link.ispublic === false && link.addedby === userId;

        tr.innerHTML = `
            <td class="link-cell">
                <span class="icon">${link.icon || ""}</span>
                <span class="name">${link.name}</span>
            </td>
            <td class="checkbox-cell">
                <input type="checkbox" ${isChecked ? "checked" : ""} />
            </td>
            <td class="action-cell">
                ${isPrivateOwned ? `
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                ` : ""}
            </td>
        `;

        /* -----------------------------------------
           Checkbox behaviour
        ----------------------------------------- */
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

        /* -----------------------------------------
           Edit button behaviour
        ----------------------------------------- */
        if (isPrivateOwned) {
            const editBtn = tr.querySelector(".editBtn");
            editBtn.addEventListener("click", () => {
                enterEditMode(link);
            });
        }

        /* -----------------------------------------
           Delete button behaviour
        ----------------------------------------- */
        if (isPrivateOwned) {
            const deleteBtn = tr.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", async () => {
                if (!confirm("Delete this private link?")) return;

                await supabase
                    .from("mapuserstolinks")
                    .delete()
                    .eq("linkid", link.id);

                const { error } = await supabase
                    .from("indexpagelinks")
                    .delete()
                    .eq("id", link.id)
                    .eq("addedby", userId);

                if (error) {
                    console.error("Delete error:", error);
                    alert("Failed to delete link.");
                    return;
                }

                loadLinksTable();
            });
        }

        table.appendChild(tr);
    });

    container.appendChild(table);
}

/* -----------------------------------------
   Enter Edit Mode
----------------------------------------- */
function enterEditMode(link) {
    editMode = true;
    editLinkId = link.id;

    document.getElementById("formTitle").innerText = "Edit Your Private Link";
    document.getElementById("saveNewLinkBtn").innerText = "Update Link";

    document.getElementById("newLinkName").value = link.name;
    document.getElementById("newLinkUrl").value = link.url;
    document.getElementById("newLinkIcon").value = link.icon;
    document.getElementById("newLinkPublic").value = link.ispublic ? "true" : "false";
}

/* -----------------------------------------
   Add Link Form
----------------------------------------- */
function renderAddLinkForm() {
    const formContainer = document.getElementById("addLinkContainer");

    const emojiOptions = EMOJI_LIST.map(e => `<option value="${e}">${e}</option>`).join("");

    formContainer.innerHTML = `
        <h2 id="formTitle">Add a New Link</h2>

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

    document.getElementById("saveNewLinkBtn").addEventListener("click", saveOrUpdateLink);
}

/* -----------------------------------------
   Save OR Update link
----------------------------------------- */
async function saveOrUpdateLink() {
    const name = document.getElementById("newLinkName").value.trim();
    const url = document.getElementById("newLinkUrl").value.trim();
    const icon = document.getElementById("newLinkIcon").value.trim();
    const ispublic = document.getElementById("newLinkPublic").value === "true";

    const userId = localStorage.getItem("userId");

    if (!name || !url) {
        alert("Name and URL are required.");
        return;
    }

    if (!editMode) {
        /* -----------------------------------------
           INSERT MODE
        ----------------------------------------- */
        const { error } = await supabase
            .from("indexpagelinks")
            .insert({
                name,
                url,
                icon,
                ispublic,
                addedby: userId
            });

        if (error) {
            console.error("Insert link error:", error);
            alert("Failed to save link.");
            return;
        }
    } else {
        /* -----------------------------------------
           UPDATE MODE
        ----------------------------------------- */
        const { error } = await supabase
            .from("indexpagelinks")
            .update({
                name,
                url,
                icon,
                ispublic
            })
            .eq("id", editLinkId)
            .eq("addedby", userId);

        if (error) {
            console.error("Update link error:", error);
            alert("Failed to update link.");
            return;
        }

        exitEditMode();
    }

    loadLinksTable();
    resetForm();
}

/* -----------------------------------------
   Exit Edit Mode
----------------------------------------- */
function exitEditMode() {
    editMode = false;
    editLinkId = null;

    document.getElementById("formTitle").innerText = "Add a New Link";
    document.getElementById("saveNewLinkBtn").innerText = "Save Link";
}

/* -----------------------------------------
   Reset form fields
----------------------------------------- */
function resetForm() {
    document.getElementById("newLinkName").value = "";
    document.getElementById("newLinkUrl").value = "";
    document.getElementById("newLinkIcon").value = "";
    document.getElementById("newLinkPublic").value = "true";
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