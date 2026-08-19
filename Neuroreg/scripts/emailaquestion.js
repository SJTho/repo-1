/* ----------------------------------------------------
   Hamburger Menu
---------------------------------------------------- */
async function loadHamburgerMenu() {
    const dropdown = document.getElementById("hamburgerMenuDropdown");

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
        .from("menuitems")
        .select("*")
        .eq("hamburger", true)
        .order("hamburgersection", { ascending: true })
        .order("hamburgerorder", { ascending: true });

    if (error) {
        console.error("Menu load error:", error);
        dropdown.innerHTML = "<div class='dropdownItem'>Menu failed to load</div>";
        return;
    }

    let currentSection = null;

    data.forEach(item => {
        if (item.admin && !isAdmin) return;
        if (item.url === currentPage) return;

        if (currentSection !== null && item.hamburgersection !== currentSection) {
            const separator = document.createElement("div");
            separator.className = "dropdownSeparator";
            dropdown.appendChild(separator);
        }

        currentSection = item.hamburgersection;

        const div = document.createElement("div");
        div.className = "dropdownItem";

        const emoji = item.emoji ? item.emoji + " " : "";
        div.innerText = emoji + item.displayname;

        div.onclick = () => {
            if (item.url === "logout") {
                logout();
            } else {
                window.location.href = item.url;
            }
        };

        dropdown.appendChild(div);
    });
}

window.addEventListener("DOMContentLoaded", loadHamburgerMenu);

/* ----------------------------------------------------
   Top-Right Icons
---------------------------------------------------- */
async function loadTopRightIcons() {
    const container = document.getElementById("topRightIcons");

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
        .from("menuitems")
        .select("*")
        .eq("topright", true)
        .order("toprightorder", { ascending: true });

    if (error) {
        console.error("Top-right load error:", error);
        return;
    }

    container.innerHTML = "";

    data.forEach(item => {
        if (item.admin && !isAdmin) return;
        if (item.url === currentPage) return;

        const icon = document.createElement("div");
        icon.className = "topRightIcon";
        icon.innerText = item.emoji;

        icon.onclick = () => {
            if (item.url === "logout") {
                logout();
            } else {
                window.location.href = item.url;
            }
        };

        container.appendChild(icon);
    });
}

window.addEventListener("DOMContentLoaded", loadTopRightIcons);

/* ----------------------------------------------------
   Hamburger Toggle
---------------------------------------------------- */
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


/* ----------------------------------------------------
   email subscribe
---------------------------------------------------- */
document.getElementById("subscribeBtn").onclick = async () => {
  const email = document.getElementById("emailInput").value.trim();
  if (!email) return alert("Enter an email.");

  const { cipher, iv } = await encryptEmail(email, EMAIL_KEY);
  const encrypted = `${cipher}:${iv}`;

  const { data, error } = await window.supabase
    .rpc("update_email_subscription", {
      new_email_encrypted: encrypted,
      new_subscribed: true
    });

  if (error) {
    console.error(error);
    return alert("Failed to subscribe.");
  }

  document.getElementById("emailStatus").innerText = "Subscribed!";
};

/* ----------------------------------------------------
   email unsubscribe
---------------------------------------------------- */
document.getElementById("unsubscribeBtn").onclick = async () => {
  const { data, error } = await window.supabase
    .rpc("update_email_subscription", {
      new_email_encrypted: null,
      new_subscribed: false
    });

  if (error) {
    console.error(error);
    return alert("Failed to unsubscribe.");
  }

  document.getElementById("emailStatus").innerText = "Unsubscribed.";
};