document.addEventListener("DOMContentLoaded",()=>{
    const 
        b=document.getElementById("cookie-banner"),
        a=document.getElementById("acceptCookies");

    if(b&&!localStorage.getItem("cookiesAccepted"))b.style.display="block";
        if(a)a.onclick=()=>{localStorage.setItem("cookiesAccepted","true");
        b.style.display="none";
    };

});