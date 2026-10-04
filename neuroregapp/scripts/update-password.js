import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
 
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
 
const passwordRegex =
/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{8,}$/;
 
const updateBtn =
document.getElementById("updateBtn");
 
const errorBox =
document.getElementById("errorBox");
 
const successBox =
document.getElementById("successBox");
 
function showError(message) {
errorBox.textContent = message;
errorBox.style.display = "block";
successBox.style.display = "none";
}
 
function showSuccess(message) {
successBox.textContent = message;
successBox.style.display = "block";
errorBox.style.display = "none";
}
 
// Handle Supabase recovery links
(async () => {
 
const url = new URL(window.location.href);
const code = url.searchParams.get("code");
 
if (code) {
const { error } =
await supabase.auth.exchangeCodeForSession(code);
 
if (error) {
showError(error.message);
return;
}
}
 
const {
data: { session }
} = await supabase.auth.getSession();
 
console.log("Recovery session:", session);
 
})();
 
updateBtn.addEventListener("click", async () => {
 
const password =
document.getElementById("newPassword").value;
 
const confirmPassword =
document.getElementById("confirmPassword").value;
 
if (!passwordRegex.test(password)) {
showError(
"Password must be at least 8 characters and contain letters and numbers."
);
return;
}
 
if (password !== confirmPassword) {
showError("Passwords do not match.");
return;
}
 
const { error } =
await supabase.auth.updateUser({
password
});
 
if (error) {
showError(error.message);
return;
}
 
showSuccess(
"Password updated successfully. Redirecting to login..."
);
 
setTimeout(async () => {
 
const {
data: { user }
} = await supabase.auth.getUser();
 
const email =
encodeURIComponent(user?.email ?? "");
 
window.location.href =
`login.html?email=${email}`;
 
}, 3000);
 
});