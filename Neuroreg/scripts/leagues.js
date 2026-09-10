import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ----------------------------------------------------
   Helper: Get Rank From Points
---------------------------------------------------- */
async function getRankFromPoints(points) {
    const { data: rankRow, error } = await supabase
        .from("rank")
        .select("rank")
        .lte("minimum_score", points)
        .gte("maximum_score", points)
        .single();

    if (error || !rankRow) return "Unranked";
    return rankRow.rank;
}

/* ----------------------------------------------------
   Helper: Get User Profile
---------------------------------------------------- */
async function getUserProfile() {
    const userId = localStorage.getItem("userId");

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error || !profile) return null;
    return profile;
}

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
        dropdown.innerHTML = "<div class='dropdownItem'>Menu failed to load</div>";
        return;
    }

    dropdown.innerHTML = "";
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
            if (item.url === "logout") logout();
            else window.location.href = item.url;
        };

        dropdown.appendChild(div);
    });
}

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

    if (error) return;

    container.innerHTML = "";

    data.forEach(item => {
        if (item.admin && !isAdmin) return;
        if (item.url === currentPage) return;

        const icon = document.createElement("div");
        icon.className = "topRightIcon";
        icon.innerText = item.emoji;

        icon.onclick = () => {
            if (item.url === "logout") logout();
            else window.location.href = item.url;
        };

        container.appendChild(icon);
    });
}

/* ----------------------------------------------------
   Rank Page (League mode)
---------------------------------------------------- */
async function loadRankPage() {
    const token = localStorage.getItem("sessionToken");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const profile = await getUserProfile();
    if (!profile) return;

    const points = profile.scalpel_points ?? 0;

    const userRank = await getRankFromPoints(points);
    document.getElementById("rankHeading").innerText = userRank;

    const { data: rankRows } = await supabase
        .from("rank")
        .select("minimum_score, maximum_score")
        .eq("rank", userRank)
        .limit(1);

    const rankData = rankRows?.[0];
    if (!rankData) return;

    const { data: users, error } = await supabase.rpc(
        "get_users_in_rank_range",
        {
            min_score: rankData.minimum_score,
            max_score: rankData.maximum_score
        }
    );

    if (error) {
        console.error("League load error:", error);
        return;
    }

    const container = document.getElementById("rankList");
    container.innerHTML = "";

    users.slice(0, 10).forEach((u, index) => {
        const row = document.createElement("div");
        row.className = "rankRow";
        row.innerHTML = `
            <div class="rankPosition">${index + 1}</div>
            <div class="rankNickname">${u.nickname}</div>
            <div class="rankPoints">${u.scalpel_points}</div>
        `;
        container.appendChild(row);
    });
}

/* ----------------------------------------------------
   Friends Logic (Mutual friendships only after approval)
---------------------------------------------------- */
async function loadFriends() {
    const userId = localStorage.getItem("userId");

    const { data: friends } = await supabase.rpc(
        "get_friends_secure",
        { uid: userId }
    );

    return friends ?? [];
}

/* ----------------------------------------------------
   Friend Requests
---------------------------------------------------- */
async function loadFriendRequests() {
    const userId = localStorage.getItem("userId");

    const { data: requests, error } = await supabase.rpc(
        "get_incoming_friend_requests",
        { uid: userId }
    );

    const container = document.getElementById("friendRequestsList");
    if (!container) return;

    container.innerHTML = "";

    if (error) {
        container.innerHTML = "<p>Error loading requests.</p>";
        return;
    }

    if (!requests || requests.length === 0) {
        container.innerHTML = "<p>No pending requests.</p>";
        return;
    }

    for (const req of requests) {

        // ⭐ FIXED: Safe requester lookup
        const { data: requester } = await supabase
            .from("profiles")
            .select("nickname, scalpel_points")
            .eq("id", req.requester_id)
            .maybeSingle();

        const row = document.createElement("div");
        row.className = "requestRow";

        if (!requester) {
            // RLS blocked or requester deleted
            row.innerHTML = `
                <div class="requestInfo">
                    <strong>Unknown user</strong>
                    <span>Profile not accessible</span>
                </div>
                <div class="requestButtons">
                    <button class="approveBtn" onclick="approveRequest('${req.id}')">Approve</button>
                    <button class="rejectBtn" onclick="rejectRequest('${req.id}')">Reject</button>
                </div>
            `;
            container.appendChild(row);
            continue;
        }

        const requesterRank = await getRankFromPoints(requester.scalpel_points);

        row.innerHTML = `
            <div class="requestInfo">
                <strong>${requester.nickname}</strong>
                <span>${requester.scalpel_points} points</span>
                <span>${requesterRank}</span>
            </div>

            <div class="requestButtons">
                <button class="approveBtn" onclick="approveRequest('${req.id}')">Approve</button>
                <button class="rejectBtn" onclick="rejectRequest('${req.id}')">Reject</button>
            </div>
        `;

        container.appendChild(row);
    }
}

window.approveRequest = async function (id) {
    await supabase.rpc("approve_friend_request", { request_id: id });
    loadFriendRequests();
    renderFriendsList();
};

window.rejectRequest = async function (id) {
    await supabase.rpc("reject_friend_request", { request_id: id });
    loadFriendRequests();
};

/* ----------------------------------------------------
   Send Friend Request (instead of auto-adding)
---------------------------------------------------- */
window.addFriend = async function () {
    const userId = localStorage.getItem("userId");
    const nickname = document.getElementById("friendInput").value.trim();

    if (!nickname) {
        alert("Please enter a nickname.");
        return;
    }

    const { data: users } = await supabase.rpc(
        "get_user_by_nickname",
        { nick: nickname }
    );

    if (!users || users.length === 0) {
        alert("No user found with that nickname.");
        return;
    }

    const targetId = users[0].id;

    if (targetId === userId) {
        alert("You cannot add yourself.");
        return;
    }

    await supabase.rpc("send_friend_request", {
        uid: userId,
        fid: targetId
    });

    alert("Friend request sent!");
    document.getElementById("friendInput").value = "";
};

/* ----------------------------------------------------
   Render Friends List
---------------------------------------------------- */
async function renderFriendsList() {
    const container = document.getElementById("rankList");
    container.innerHTML = "";

    const friends = await loadFriends();

    if (!friends.length) {
        container.innerHTML = "<p>No friends added.</p>";
        return;
    }

    for (let i = 0; i < friends.length; i++) {
        const f = friends[i];
        const friendRank = await getRankFromPoints(f.scalpel_points);

        const row = document.createElement("div");
        row.className = "rankRow friendsRow";
        row.innerHTML = `
            <div class="rankPosition">${i + 1}</div>
            <div class="rankNickname">${f.nickname}</div>
            <div class="rankPoints">${f.scalpel_points}</div>
            <div class="rankText">${friendRank}</div>
            <button class="deleteFriendBtn" onclick="deleteFriend('${f.id}')">Delete</button>
        `;
        container.appendChild(row);
    }
}

window.deleteFriend = async function (friendId) {
    const userId = localStorage.getItem("userId");

    await supabase.rpc("delete_friend_secure", {
        uid: userId,
        fid: friendId
    });

    renderFriendsList();
};

/* ----------------------------------------------------
   Toggle League / Friends
---------------------------------------------------- */
window.toggleFriendMode = async function () {
    const toggle = document.getElementById("friendToggle");
    const leagueLabel = document.getElementById("leagueLabel");
    const friendsLabel = document.getElementById("friendsLabel");
    const heading = document.getElementById("rankHeading");

    if (toggle.checked) {
        document.getElementById("friendsSection").style.display = "block";
        friendsLabel.classList.remove("hidden");
        leagueLabel.classList.add("hidden");

        heading.innerText = "My Friends";

        renderFriendsList();
        loadFriendRequests();
    } else {
        document.getElementById("friendsSection").style.display = "none";
        leagueLabel.classList.remove("hidden");
        friendsLabel.classList.add("hidden");

        const profile = await getUserProfile();
        const userRank = await getRankFromPoints(profile.scalpel_points);

        heading.innerText = userRank;

        loadRankPage();
    }
};

/* ----------------------------------------------------
   Page Load
---------------------------------------------------- */
window.addEventListener("DOMContentLoaded", loadHamburgerMenu);
window.addEventListener("DOMContentLoaded", loadTopRightIcons);
window.addEventListener("DOMContentLoaded", loadRankPage);