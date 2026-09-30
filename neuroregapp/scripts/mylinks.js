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
Get next display order for user
----------------------------------------- */
async function getNextUserOrder(userId) {
const { data, error } = await supabase
.from("mapuserstolinks")
.select("display_order")
.eq("userid", userId)
.order("display_order", { ascending: false })
.limit(1);
 
if (error) {
console.error("Failed to get user order:", error);
return 1;
}
 
return data.length > 0
? data[0].display_order + 1
: 1;
}





/* -----------------------------------------
   Reorder links
----------------------------------------- */
async function moveLink(userId, linkId, direction) {
 
const { data, error } = await supabase
.from("mapuserstolinks")
.select("linkid, display_order")
.eq("userid", userId)
.order("display_order", { ascending: true });
 
if (error) {
console.error(error);
return;
}
 
const currentIndex =
data.findIndex(
row => Number(row.linkid) === Number(linkId)
);
 
if (currentIndex < 0) return;
 
const targetIndex =
direction === "up"
? currentIndex - 1
: currentIndex + 1;
 
if (
targetIndex < 0 ||
targetIndex >= data.length
) {
return;
}
 
const current = data[currentIndex];
const target = data[targetIndex];
 
const temp = -9999;
 
// Step 1
let result = await supabase
.from("mapuserstolinks")
.update({ display_order: temp })
.eq("userid", userId)
.eq("linkid", current.linkid);
 
if (result.error) {
console.error(result.error);
return;
}
 
// Step 2
result = await supabase
.from("mapuserstolinks")
.update({ display_order: current.display_order })
.eq("userid", userId)
.eq("linkid", target.linkid);
 
if (result.error) {
console.error(result.error);
return;
}
 
// Step 3
result = await supabase
.from("mapuserstolinks")
.update({ display_order: target.display_order })
.eq("userid", userId)
.eq("linkid", current.linkid);
 
if (result.error) {
console.error(result.error);
return;
}
 
await loadLinksTable();
}



/* -----------------------------------------
   Emoji list for dropdown
----------------------------------------- */
const EMOJI_LIST = [
    "🔗", "⭐", "📁", "📄", "📊", "📈", "📉", "⚙️", "🧭",
    "🏥", "💡", "📚", "🧪", "🧬", "🛠️", "🧰", "🚀", "🎯",
    "💻", "🖥️", "📱", "🌐", "🔍", "📝", "📦"
];

/* -----------------------------------------
   Show / Hide Form + Top Buttons
----------------------------------------- */
function showForm() {
    document.getElementById("addLinkContainer").style.display = "flex";
    document.getElementById("topButtons").style.display = "none";
}

function hideForm() {
    document.getElementById("addLinkContainer").style.display = "none";
    document.getElementById("topButtons").style.display = "flex";
}

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
.select("linkid, display_order")
.eq("userid", userId)
.order("display_order", { ascending: true });





    if (selectedError) {
        console.error("Error loading user selections:", selectedError);
        container.innerHTML = "<p>Failed to load selections.</p>";
        return;
    }

const selectedIds = new Set(selected.map(row => row.linkid));
 
const selectedOrderMap = new Map(
selected.map(row => [row.linkid, row.display_order])
);

    const table = document.createElement("table");
    table.className = "links-table";

    const header = document.createElement("tr");
    header.innerHTML = `
        <th>Link</th>
        <th>Select</th>
        <th>Actions</th>
    `;
    table.appendChild(header);



links.sort((a, b) => {
 
const aSelected = selectedIds.has(a.id);
const bSelected = selectedIds.has(b.id);
 
if (aSelected && bSelected) {
return (
selectedOrderMap.get(a.id) -
selectedOrderMap.get(b.id)
);
}
 
if (aSelected) return -1;
if (bSelected) return 1;
 
return 0;
});




    links.forEach(link => {
        const tr = document.createElement("tr");
        const isChecked = selectedIds.has(link.id);




const selectedLinkIds = selected.map(
row => Number(row.linkid)
);
 
const rowPosition =
selectedLinkIds.indexOf(Number(link.id));
 
const showUp =
isChecked &&
rowPosition > 0;
 
const showDown =
isChecked &&
rowPosition < selectedLinkIds.length - 1;







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
<button class="makePublicBtn">Make Public</button>
` : `
<span class="public-note">Public link</span>
`}
 
${isChecked ? `
<div class="orderButtons">
${showUp ? '<button class="moveUpBtn">⬆️</button>' : ''}
${showDown ? '<button class="moveDownBtn">⬇️</button>' : ''}
</div>
` : ''}





            </td>
        `;

        /* -----------------------------------------
           Checkbox behaviour
        ----------------------------------------- */
        const checkbox = tr.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", async () => {
            
            
            
            
           if (checkbox.checked) {
 
const nextOrder = await getNextUserOrder(userId);
 
const { error } = await supabase
.from("mapuserstolinks")
.insert({
userid: userId,
linkid: link.id,
display_order: nextOrder
});
 
if (error) {
console.error("Insert error:", error);
checkbox.checked = false;
}
}
            
            
            
            else {
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
Move Up / Down buttons
----------------------------------------- */
if (isChecked) {
 
const moveUpBtn =
tr.querySelector(".moveUpBtn");
 
const moveDownBtn =
tr.querySelector(".moveDownBtn");
 
moveUpBtn?.addEventListener("click", async () => {
await moveLink(userId, link.id, "up");
});
 
moveDownBtn?.addEventListener("click", async () => {
await moveLink(userId, link.id, "down");
});
}





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
                    .eq("userid", userId)
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

        /* -----------------------------------------
           Make Public button behaviour
        ----------------------------------------- */
        if (isPrivateOwned) {
            const makePublicBtn = tr.querySelector(".makePublicBtn");
            makePublicBtn.addEventListener("click", async () => {

                const proceed = confirm(
                    "Public links are available to all users and cannot be deleted or edited.\n\nDo you want to continue?"
                );
                if (!proceed) return;

                const { error } = await supabase
                    .from("indexpagelinks")
                    .update({ ispublic: true })
                    .eq("id", link.id)
                    .eq("addedby", userId);

                if (error) {
                    console.error("Make public error:", error);
                    alert("Failed to update link.");
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
    if (!document.getElementById("newLinkName")) {
        renderAddLinkForm();
    }

    editMode = true;
    editLinkId = link.id;

    showForm();

    document.getElementById("formTitle").innerText = "Edit Your Private Link";
    document.getElementById("saveNewLinkBtn").innerText = "Update Link";

    document.getElementById("newLinkName").value = link.name;
    document.getElementById("newLinkUrl").value = link.url;

    const iconSelect = document.getElementById("newLinkIcon");
    if (![...iconSelect.options].some(o => o.value === link.icon)) {
        iconSelect.innerHTML += `<option value="${link.icon}">${link.icon}</option>`;
    }
    iconSelect.value = link.icon;
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

        <button id="saveNewLinkBtn">Save Link</button>
        <button id="closeFormBtn">Close</button>
    `;

    document.getElementById("saveNewLinkBtn").addEventListener("click", saveOrUpdateLink);

    // NEW: close form without saving
    document.getElementById("closeFormBtn").addEventListener("click", () => {
        resetForm();
        exitEditMode();
        hideForm();
    });
}

/* -----------------------------------------
   Save OR Update link
----------------------------------------- */
async function saveOrUpdateLink() {
    const name = document.getElementById("newLinkName").value.trim();
    const url = document.getElementById("newLinkUrl").value.trim();
    const icon = document.getElementById("newLinkIcon").value.trim();

    const userId = localStorage.getItem("userId");

    if (!name || !url) {
        alert("Name and URL are required.");
        return;
    }

    if (!editMode) {
        /* -----------------------------------------
           INSERT MODE (always private)
        ----------------------------------------- */
        const { data: inserted, error } = await supabase
            .from("indexpagelinks")
            .insert({
                name,
                url,
                icon,
                ispublic: false,
                addedby: userId
            })
            .select();

        if (error) {
            console.error("Insert link error:", error);
            alert("Failed to save link.");
            return;
        }

        const newLink = inserted[0];

        const nextOrder = await getNextUserOrder(userId);



await supabase
.from("mapuserstolinks")
.insert({
userid: userId,
linkid: newLink.id,
display_order: nextOrder
});





    } else {
        /* -----------------------------------------
           UPDATE MODE (never touches ispublic)
        ----------------------------------------- */
        const { error } = await supabase
            .from("indexpagelinks")
            .update({
                name,
                url,
                icon
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
    hideForm();
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
}

/* -----------------------------------------
   Close button (top right)
----------------------------------------- */
document.getElementById("closeBtn").addEventListener("click", () => {
    window.location.replace("index.html");
});

/* -----------------------------------------
   Init
----------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    loadLinksTable();
    renderAddLinkForm();

    // Add Link button
    document.getElementById("showAddFormBtn").addEventListener("click", () => {
        resetForm();
        exitEditMode();
        showForm();
    });

    hideForm(); // hide form on initial load
});