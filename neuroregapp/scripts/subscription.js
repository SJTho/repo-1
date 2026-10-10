// ----------------------------------------------------
// Supabase Client
// ----------------------------------------------------
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { initHelpPopup } from "./helpPopup.js";
import { logout } from "./logout.js";


let openHelpPopup;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------------------------------
// Hamburger Menu
// ----------------------------------------------------
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
        div.innerText = (item.emoji ? item.emoji + " " : "") + item.displayname;

        div.onclick = () => {
            if (item.url === "logout") logout();
            else window.location.href = item.url;
        };

        dropdown.appendChild(div);
    });
}

// ----------------------------------------------------
// Top-Right Icons
// ----------------------------------------------------
async function loadTopRightIcons() {
    const container = document.getElementById("topRightIcons");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
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

// ----------------------------------------------------
// Hamburger Click Handler
// ----------------------------------------------------
function attachHamburgerHandler() {
    const icon = document.getElementById("hamburgerMenu");
    const dropdown = document.getElementById("hamburgerMenuDropdown");

    icon.onclick = () => {
        dropdown.style.display =
            dropdown.style.display === "flex" ? "none" : "flex";
    };
}


// ---------------------------------------
//  Subscription
//  ------------------------------------

async function loadSubscription() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const { data, error } = await supabase
        .from('profiles')
        .select(`
            subscription_active,
            subscription_expiry
        `)
        .eq('id', user.id)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById('subscriptionStatus').textContent =
        data.subscription_active ? 'ACTIVE' : 'NOT ACTIVE';

    document.getElementById('subscriptionExpiry').textContent =
        data.subscription_expiry
            ? new Date(data.subscription_expiry).toLocaleDateString()
            : '-';

    const subscribeButton =
        document.getElementById('subscribeButton');

    const manageButton =
        document.getElementById('manageButton');

    if (data.subscription_active) {

        subscribeButton.style.display = 'none';

    } else {

        manageButton.style.display = 'none';

    }
}

// ----------------------------------------------------
// Paypal subscription
// ----------------------------------------------------

async function activateSubscription(subscriptionId) {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    const startDate = new Date();

    const expiryDate = new Date(startDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const { error } = await supabase
        .from("profiles")
        .update({
            subscription_active: true,
            subscription_status: "active",
            subscription_start: startDate.toISOString(),
            subscription_expiry: expiryDate.toISOString(),
            paypal_subscription_id: subscriptionId
        })
        .eq("id", user.id);

    if (error) {
        console.error(error);
        alert("Subscription created but profile update failed.");
        return;
    }

    alert("Subscription activated successfully.");

    loadSubscription();
}

// ----------------------------------------------------
// Page Load
// ----------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    openHelpPopup = initHelpPopup(supabase);

    loadHamburgerMenu();
    loadTopRightIcons();
    attachHamburgerHandler();
    loadSubscription();
});

window.activateSubscription = activateSubscription;

// ----------------------------------------------------
// Reset hamburger menu when returning via Back button
// ----------------------------------------------------
window.addEventListener("pageshow", () => {
    const dropdown = document.getElementById("hamburgerMenuDropdown");
    if (dropdown) dropdown.style.display = "none";
});

