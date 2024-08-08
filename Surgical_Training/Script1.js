// JavaScript source code

let intro = document.querySelector('.splashscreen')
let logo = document.querySelector('.splashscreenheader')
let logoSpan = document.querySelectorAll('.logo')

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active')
            }, (idx + 1) * 100);
        });

        setTimeout(() => {
            intro.style.display = 'none'
        }, 3700);
    })
})



//display lists by user type



function updatelinks(role) {

    var ele = document.getElementById("linklist").children;
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].className.substr(ele[i].length -6) != "hidden") {ele[i].classList.add("hidden") };
        if (ele[i].className == role + " hidden") { ele[i].classList.remove("hidden") }; 

            
    }

}