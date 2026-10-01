document.addEventListener("DOMContentLoaded",()=>{
    const 
        b=document.getElementById("cookie-banner"),
        a=document.getElementById("acceptCookies");

    if(b&&!localStorage.getItem("cookiesAccepted"))b.style.display="block";
        if(a)a.onclick=()=>{localStorage.setItem("cookiesAccepted","true");
        b.style.display="none";
    };

});

/*-------------------------------------
Hamburger Menu on mobile
--------------------------------------*/
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
 
if (menuToggle && navLinks) {
menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("show");
});
}