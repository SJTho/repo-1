// JavaScript source code



//display lists by user type



function updatelinks(role) {

    var ele = document.getElementById("linklist").children;
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].className.substr(ele[i].length -6) != "hidden") {ele[i].classList.add("hidden") };
        if (ele[i].className == role + " hidden") { ele[i].classList.remove("hidden") }; 

            
    }

}