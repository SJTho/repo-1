// JavaScript source code


//splashscreen sequence on intro slide



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



//define the start array if not in localstorage

let linksarray = [
    { order: 1, displaytext: "Website", linkurl: "https://www.elogbook.org/", description: "logbook home page", expires: "01/01/2040", showto: "logbook-user" },
    { order: 2, displaytext: "Add Operations", linkurl: "https://client.elogbook.org/eLogbook/Operations/OperationMaintain/Add", description: "add operations to your logbook", expires: "01/01/2040", showto: "logbook-user" },
    { order: 3, displaytext: "Browse Operations", linkurl: "https://client.elogbook.org/eLogbook/Operations/OperationList", description: "browse through and edit the operations in your logbook", expires: "01/01/2040", showto: "logbook-user" },
    { order: 4, displaytext: "Filters", linkurl: "https://client.elogbook.org/eLogbook/Operations/ConsolidationFilters", description: "design filters that you can apply to your logbook", expires: "01/01/2040", showto: "logbook-user" },
    { order: 5, displaytext: "My Reports", linkurl: "https://client.elogbook.org/eLogbook/Operations/ConsolidationReports", description: "produce standard pdf reports from your logbook", expires: "01/01/2040", showto: "logbook-user" },
    { order: 6, displaytext: "My Details", linkurl: "https://client.elogbook.org/eLogbook/User/UserDetails", description: "keep your logbook details up to date", expires: "01/01/2040", showto: "logbook-user" },
    { order: 6, displaytext: "My Training Programmes", linkurl: "https://client.elogbook.org/eLogbook/Director/TrainingProgrammeList", description: "see how your trainees and your training programme are doing", expires: "01/01/1950", showto: "logbook-director" },
    { order: 6, displaytext: "My Training Programmes", linkurl: "https://client.elogbook.org/eLogbook/Director/TrainingProgrammeList", description: "see how your trainees and your training programme are doing", expires: "01/01/1950", showto: "logbook-director" },
    { order: 6, displaytext: "JCST Home Page", linkurl: "https://www.jcst.org/", description: "JCST landing page", expires: "01/01/1950", showto: "JCST-all" },
    { order: 6, displaytext: "JCST Data Requests", linkurl: "https://www.jcst.org/data-requests/", description: "Request data from ISCP, JCST and the logbook", expires: "01/01/1950", showto: "JCST-all" },
    { order: 6, displaytext: "Gold Guide", linkurl: "https://www.copmed.org.uk/publications/gold-guide/gold-guide-9th-edition", description: "Guide to the rules that govern training (provided by the Conference of the Postgraduate Medical Deans)", expires: "01/01/1950", showto: "JCST-all" },
    { order: 6, displaytext: "Home Page", linkurl: "https://www.jcie.org.uk/Content/content.aspx", description: "JCIE home page", expires: "01/01/1950", showto: "JCIE-candidate" },
    { order: 6, displaytext: "Exam dates", linkurl: "https://www.jcie.org.uk/calendar/calendar.aspx", description: "Calender of exam dates", expires: "01/01/1950", showto: "JCIE-candidate" },
    { order: 6, displaytext: "Apply", linkurl: "https://www.jcie.org.uk/content/content.aspx?ID=22", description: "Apply for an examination", expires: "01/01/1950", showto: "JCIE-candidate" },
    { order: 6, displaytext: "Examiner Application", linkurl: "https://www.jcie.org.uk/content/content.aspx?ID=23", description: "Apply to become an examiner", expires: "01/01/1950", showto: "JCIE-examiner" },
    { order: 6, displaytext: "Question Writer Application", linkurl: "https://www.jcie.org.uk/content/content.aspx?ID=41", description: "Apply to become a question writer", expires: "01/01/1950", showto: "JCIE-examiner" },
    { order: 6, displaytext: "ISCP home", linkurl: "https://www.iscp.ac.uk/", description: "Home Page", expires: "01/01/1950", showto: "ISCP-trainee" },
    { order: 6, displaytext: "My details", linkurl: "https://www.iscp.ac.uk/2020/account-details/user", description: "Update your record at ISCP", expires: "01/01/1950", showto: "ISCP-trainee" },
    { order: 6, displaytext: "", linkurl: "", description: "A Head of School link", expires: "01/01/1950", showto: "ISCP-hos" },
    { order: 6, displaytext: "", linkurl: "", description: "A TPD link", expires: "01/01/1950", showto: "ISCP-tpd" },
    { order: 6, displaytext: "My Trainees", linkurl: "https://www.iscp.ac.uk/mytrainees/cs.aspx?role_type=cs", description: "My Trainees as a Clinical Supervisor", expires: "01/01/1950", showto: "ISCP-cs" },
    { order: 6, displaytext: "My Trainees", linkurl: "https://www.iscp.ac.uk/mytrainees/aes.aspx?role_type=aes", description: "My Trainees as an Assigned Educational Supervisor", expires: "01/01/1950", showto: "ISCP-aes" },
    { order: 6, displaytext: "", linkurl: "", description: "Another AES link", expires: "01/01/1950", showto: "ISCP-aes" },
    { order: 6, displaytext: "Home Page", linkurl: "https://www.intercollegiatemrcsexams.org.uk/", description: "Home Page", expires: "01/01/1950", showto: "ICBSE-candidate" },
    { order: 6, displaytext: "Application RCSEng", linkurl: "https://www.rcseng.ac.uk/education-and-exams/exams/surgical/#Surgical=True&Dental=False", description: "Application RCSEng", expires: "01/01/1950", showto: "ICBSE-candidate" },
    { order: 6, displaytext: "Application RCSEd", linkurl: "https://www.rcsed.ac.uk/exams", description: "Application RCSEd", expires: "01/01/1950", showto: "ICBSE-candidate" },
    { order: 6, displaytext: "Application RCPSG", linkurl: "https://rcpsg.ac.uk/surgeons/exams", description: "Application RCPSG", expires: "01/01/1950", showto: "ICBSE-candidate" },
    { order: 6, displaytext: "Application RCSI", linkurl: "https://www.rcsi.com/dublin", description: "Application RCSI", expires: "01/01/1950", showto: "ICBSE-candidate" },
    { order: 6, displaytext: "RCSEng Examiner application", linkurl: "https://www.rcseng.ac.uk/education-and-exams/exams/examiner-vacancies/", description: "RCSEng Examiner application", expires: "01/01/1950", showto: "ICBSE-examiner" },
    { order: 6, displaytext: "RCSEd Examiner application", linkurl: "https://www.rcsed.ac.uk/professional-support-development-resources/grants-jobs-and-placements/professional-appointments/examiner-vacancies", description: "RCSEd Examiner application", expires: "01/01/1950", showto: "ICBSE-examiner" },
    { order: 6, displaytext: "RCPSG Examiner application", linkurl: "https://rcpsg.ac.uk/work-with-us/intercollegiate-mrcs-part-b-osce-invitation-to-become-an-examiner", description: "RCPSG Examiner application", expires: "01/01/1950", showto: "ICBSE-examiner" },
    { order: 6, displaytext: "RCSI Examiner application", linkurl: "https://www.rcsi.com/surgery/exams/court-of-examiners", description: "RCSI Examiner application", expires: "01/01/1950", showto: "ICBSE-examiner" },
]; 
          

//these functions add records

function showaddfields() {
    document.getElementById("addarecord").style.visibility = 'visible';
    document.getElementById("showaddfields").style.visibility = 'hidden';
}


function AddToList() {

    linksarray.push({
        order: document.getElementById("order").value,
        displaytext: document.getElementById("displaytext").value,
        linkurl: document.getElementById("linkurl").value,
        description: document.getElementById("description").value,
        expires: document.getElementById("expires").value,
        showto: document.getElementById("who").value
    });
    localStorage.setItem("myarray", JSON.stringify(linksarray));
    ShowList();
    showeditbuttons();
    document.getElementById("addarecord").style.visibility = 'hidden';
    document.getElementById("showaddfields").style.visibility = 'visible';

}

//sorts and updates the displayed list
function ShowList() {

    linksarray.sort(function (a, b) { return a.order - b.order });
    document.getElementById("showaddfields").style.display="none";
    let Role = document.getElementById("role").value;
    let variable2 = "";
    for (let i = 0; i < linksarray.length; i++) {
        if (linksarray[i].showto == Role) { 
        variable2 += "<tr><th><a href=" + linksarray[i].linkurl + " target='_self'>" + linksarray[i].displaytext + "</a></th>";
            variable2 += "<th>" + linksarray[i].description; + "</th>";
            variable2 += "<th  class='hideable hidden'>" + "<label onclick='editrecord(" + i + ")'>Edit</label>" + "</th>";
            variable2 += "<th class='hideable hidden'>" + "<label onclick='deleterecord(" + i + ")'>Delete</label>" + "</th></tr>";

    }
}
    document.querySelector("#myTable tbody").innerHTML = variable2;
}

//this function deletes a single record
function deleterecord(s) {
    linksarray.splice(s, 1);
    localStorage.setItem("myarray", JSON.stringify(linksarray));
    ShowList();
    showeditbuttons();
}


//these function edit a record
function editrecord(s) {
    document.getElementById("editarecord").style.visibility = 'visible';

    document.getElementById("orderEdit").value = linksarray[s].order;
    document.getElementById("displaytextEdit").value = linksarray[s].displaytext;
    document.getElementById("linkurlEdit").value = linksarray[s].linkurl;
    document.getElementById("descriptionEdit").value = linksarray[s].description;
    document.getElementById("expiresEdit").value = linksarray[s].expires;
    document.getElementById("whoEdit").value = linksarray[s].showto;

    document.getElementById("recordnumber").value = s;
    
}

function editrecordsubmit() {
    linksarray.splice(document.getElementById("recordnumber").value, 1, {
        order: document.getElementById("orderEdit").value,
        displaytext: document.getElementById("displaytextEdit").value,
        linkurl: document.getElementById("linkurlEdit").value,
        description: document.getElementById("descriptionEdit").value,
        expires: document.getElementById("expiresEdit").value,
        showto: document.getElementById("whoEdit").value,
    });

    document.getElementById("editarecord").style.visibility = 'hidden';
    localStorage.setItem("myarray", JSON.stringify(linksarray));
    ShowList();
    showeditbuttons();
}


//These funtions store or retrieve data from localstorage

function retrievefromstorage() {
    var x = localStorage.getItem("myarray");
    if (x) {
        linksarray = JSON.parse(x);
    }
    ShowList();
}

function clearstorage() {
    localStorage.clear();
    ShowList();
}

function showeditbuttons() {

   
    const r = document.getElementsByClassName("hideable");
    for (let i = 0; i < r.length; i++) {
        if (r[i].style.display === "inline-block") {
            r[i].style.display = "none";
        } else {
            r[i].style.display = "inline-block";
        }
    };



    var x = document.getElementById("showaddfields");

    if (x.style.display === "inline-block") {
        x.style.display = "none";
    } else {
        x.style.display = "inline-block";
    }

}
