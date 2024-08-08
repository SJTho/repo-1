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



    


const waitinglist = [
    { type: "Original", firstName: "Bill", surname: "Jones", Time:"1722788947957"},
    { type: "Original", firstName: "James", surname: "Smith", Time: "1722786945555" },
    { type: "Original", firstName: "Bob", surname: "Bloggs", Time: "1722788946957" },
]; 


function AddToList() {
  
    waitinglist.push({ type: "New", firstName: document.getElementById("firstName").value, surname: document.getElementById("surname").value, Time: Date.now() });
    ShowList();
    document.getElementById("addarecord").style.visibility = 'hidden';
    document.getElementById("showaddfields").style.visibility = 'visible';

}



function ShowList() {
    
    waitinglist.sort(function (a, b) { return a.Time - b.Time });
    let variable2 = "";
    for (let i = 0; i < waitinglist.length; i++) {
        variable2 += "<tr><th onclick='editrecord(" + i + ")'>" + waitinglist[i].type + "</th>";
        variable2 += "<th onclick='editrecord(" + i + ")'>" + waitinglist[i].firstName + " " + waitinglist[i].surname + "</th>";
        var date = new Date(Number(waitinglist[i].Time));
        var hours = date.getHours();
        var minutes = date.getMinutes();
        variable2 += "<th onclick='editrecord(" + i + ")'>" + hours + ":" + minutes + "</th>";
        variable2 += "<th>" + "<img src='icons/delete.jpg' onclick='deleterecord(" + i + ")'>" + "</th></tr>";
    }

        document.querySelector("#myTable tbody").innerHTML = variable2;
 
    
    }


function deleterecord(s) { 
    waitinglist.splice(s, 1);
    ShowList();
}

function editrecord(s) {
    document.getElementById("editarecord").style.visibility = 'visible';
    document.getElementById("firstNameEdit").value = waitinglist[s].firstName;
    document.getElementById("surnameEdit").value = waitinglist[s].surname;
    document.getElementById("recordnumber").value = s;
}

function editrecordsubmit() {
    waitinglist.splice(document.getElementById("recordnumber").value, 1, { type: "Updated", firstName: document.getElementById("firstNameEdit").value, surname: document.getElementById("surnameEdit").value, Time: Date.now() });
    document.getElementById("editarecord").style.visibility = 'hidden';
    ShowList();
}

function showaddfields() {
    document.getElementById("addarecord").style.visibility = 'visible';
    document.getElementById("showaddfields").style.visibility = 'hidden';
}