import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { logout } from "./logout.js";
import { initHelpPopup } from "./helpPopup.js";
 
let openHelpPopup;
 
window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.logout = logout;
 
/* -------------------------------------
PAGE STATE
------------------------------------- */
 
let questions = [];
let currentIndex = 0;
let currentQuestionId = null;
 
/* -------------------------------------
LOAD HAMBURGER MENU
------------------------------------- */
 
async function loadHamburgerMenu() {
const dropdown = document.getElementById("hamburgerMenuDropdown");
const isAdmin = localStorage.getItem("isAdmin") === "true";
const currentPage = window.location.pathname.split("/").pop();
 
const { data, error } = await window.supabase
.from("menuitems")
.select("*")
.eq("hamburger", true)
.order("hamburgersection", { ascending: true })
.order("hamburgerorder", { ascending: true });
 
if (error) {
dropdown.innerHTML =
"<div class='dropdownItem'>Menu failed to load</div>";
return;
}
 
let currentSection = null;
 
data.forEach(item => {
if (item.admin && !isAdmin) return;
if (item.url === currentPage) return;
 
if (
currentSection !== null &&
item.hamburgersection !== currentSection
) {
const separator = document.createElement("div");
separator.className = "dropdownSeparator";
dropdown.appendChild(separator);
}
 
currentSection = item.hamburgersection;
 
const div = document.createElement("div");
div.className = "dropdownItem";
div.innerText =
(item.emoji ? item.emoji + " " : "") + item.displayname;
 
div.onclick = () => {
if (item.url === "logout") logout();
else window.location.href = item.url;
};
 
dropdown.appendChild(div);
});
}
 
/* -------------------------------------
LOAD TOP RIGHT ICONS
------------------------------------- */
 
async function loadTopRightIcons() {
const container = document.getElementById("topRightIcons");
const isAdmin = localStorage.getItem("isAdmin") === "true";
const currentPage = window.location.pathname.split("/").pop();
 
const { data, error } = await window.supabase
.from("menuitems")
.select("*")
.eq("topright", true)
.order("toprightorder", { ascending: true });
 
if (error) return;
 
container.innerHTML = "";
 
data.forEach(item => {
if (item.admin && !isAdmin) return;
if (item.url === currentPage) return;
 
const icon = document.createElement("div");
icon.className = "topRightIcon";
icon.innerText = item.emoji;
 
icon.onclick = () => {
if (item.url === "help" || item.url === "help.html") {
openHelpPopup();
return;
}
 
if (item.url === "logout") {
logout();
return;
}
 
window.location.href = item.url;
};
 
container.appendChild(icon);
});
}
 
/* -------------------------------------
HAMBURGER TOGGLE
------------------------------------- */
 
document.addEventListener("DOMContentLoaded", () => {
window.addEventListener("pageshow", () => {
const dropdown =
document.getElementById("hamburgerMenuDropdown");
 
if (dropdown) {
dropdown.style.display = "none";
}
});
 
const hamburger = document.getElementById("hamburgerMenu");
const dropdown =
document.getElementById("hamburgerMenuDropdown");
 
hamburger.addEventListener("click", () => {
dropdown.style.display =
dropdown.style.display === "flex"
? "none"
: "flex";
});
 
document.addEventListener("click", event => {
if (
!hamburger.contains(event.target) &&
!dropdown.contains(event.target)
) {
dropdown.style.display = "none";
}
});
});
 
/* -------------------------------------
FETCH QUESTIONS
------------------------------------- */
 
window.fetchQuestions = async () => {
const { data, error } = await window.supabase
.from("emailaquestion")
.select("*")
.order("id", { ascending: true });
 
if (error) {
alert("Error loading questions.");
return [];
}
 
return data;
};
 
/* -------------------------------------
LOAD QUESTIONS
------------------------------------- */
 
async function loadQuestions() {
questions = await window.fetchQuestions();
 
const container =
document.getElementById("emailaquestioncontainer");
 
if (!questions.length) {
container.innerHTML = `
<div class="questionEditor">
<p>No questions found.</p>
<button id="addQuestionBtn">Add Question</button>
</div>
`;
 
document
.getElementById("addQuestionBtn")
.addEventListener("click", createNewQuestion);
 
return;
}
 
currentIndex = 0;
renderQuestion();
}
 
/* -------------------------------------
RENDER QUESTION
------------------------------------- */
 
function renderQuestion() {
const container =
document.getElementById("emailaquestioncontainer");
 
const q = questions[currentIndex];
 
currentQuestionId = q.id;
 
container.innerHTML = `
<div class="questionEditor">
 
<div class="navigationRow">
<button id="previousBtn">◀ Previous</button>
 
<span>
Question ${currentIndex + 1}
of
${questions.length}
</span>
 
<button id="nextBtn">Next ▶</button>
</div>
 
<label>Heading</label>
<input
type="text"
id="heading"
value="${q.heading ?? ""}"
>
 
<label>Stem</label>
<textarea
id="stem"
rows="10"
>${q.stem ?? ""}</textarea>
 
<label>Hint</label>
<textarea
id="hint"
rows="8"
>${q.hint ?? ""}</textarea>
 
<label>Explanation</label>
<textarea
id="explanation"
rows="12"
>${q.explanation ?? ""}</textarea>
 
<label>Used On</label>
<input
type="date"
id="usedon"
value="${q.usedon ?? ""}"
>
 
<div class="buttonRow">
<button id="saveBtn">Save</button>
<button id="addBtn">Add New</button>
<button id="deleteBtn">Delete</button>
</div>
 
</div>
`;
 
attachEditorHandlers();
}
 
/* -------------------------------------
BUTTON HANDLERS
------------------------------------- */
 
function attachEditorHandlers() {
 
document.getElementById("previousBtn").onclick = () => {
if (currentIndex > 0) {
currentIndex--;
renderQuestion();
}
};
 
document.getElementById("nextBtn").onclick = () => {
if (currentIndex < questions.length - 1) {
currentIndex++;
renderQuestion();
}
};
 
document.getElementById("saveBtn").onclick = saveQuestion;
document.getElementById("addBtn").onclick = createNewQuestion;
document.getElementById("deleteBtn").onclick = deleteQuestion;
}
 
/* -------------------------------------
SAVE QUESTION
------------------------------------- */
 
async function saveQuestion() {
 
const updates = {
heading: document.getElementById("heading").value.trim(),
stem: document.getElementById("stem").value.trim(),
hint: document.getElementById("hint").value.trim(),
explanation: document
.getElementById("explanation")
.value
.trim(),
usedon:
document.getElementById("usedon").value || null
};
 
const { error } = await window.supabase
.from("emailaquestion")
.update(updates)
.eq("id", currentQuestionId);
 
if (error) {
console.error(error);
alert("Failed to save question.");
return;
}
 
Object.assign(
questions[currentIndex],
updates
);
 
alert("Question saved.");
}
 
/* -------------------------------------
ADD QUESTION
------------------------------------- */
 
async function createNewQuestion() {
 
const { data, error } = await window.supabase
.from("emailaquestion")
.insert({
heading: "",
stem: "",
hint: "",
explanation: "",
usedon: null
})
.select()
.single();
 
if (error) {
console.error(error);
alert("Failed to create question.");
return;
}
 
questions.push(data);
 
currentIndex = questions.length - 1;
 
renderQuestion();
}
 
/* -------------------------------------
DELETE QUESTION
------------------------------------- */
 
async function deleteQuestion() {
 
const confirmed = confirm(
"Are you sure you want to delete this question?"
);
 
if (!confirmed) {
return;
}
 
const { error } = await window.supabase
.from("emailaquestion")
.delete()
.eq("id", currentQuestionId);
 
if (error) {
console.error(error);
alert("Failed to delete question.");
return;
}
 
questions.splice(currentIndex, 1);
 
if (questions.length === 0) {
loadQuestions();
return;
}
 
if (currentIndex >= questions.length) {
currentIndex = questions.length - 1;
}
 
renderQuestion();
}
 
/* -------------------------------------
INITIALISATION
------------------------------------- */
 
window.addEventListener("DOMContentLoaded", () => {
 
openHelpPopup = initHelpPopup(
window.supabase
);
 
loadHamburgerMenu();
loadTopRightIcons();
loadQuestions();
});