export function logout() {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("scalpel_points");
    localStorage.removeItem("rank");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");

    window.location.href = "login.html";
}