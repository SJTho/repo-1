// JavaScript source code



//display lists by user type


function updatelinks(role) {


    alert(role);

    let elements = document.getElementsByClassName(role);
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("hidden");
    }
  
}