// JavaScript source code



const waitinglist = [
    { type: "Original", firstName: "Bill", surname: "Jones", Time:"9:00"},
    { type: "Original", firstName: "James", surname: "Smith", Time: "9:10" },
    { type: "Original", firstName: "Bob", surname: "Bloggs", Time: "9:20" },
]; 


function AddToList() {
  
    var newfirstName = document.getElementById("firstName").value;
    var newsurname = document.getElementById("surname").value;
    //const timestamp1 = Date.now();
    const d = new Date();
    var timestamp2 = d.getHours() + ":" + d.getMinutes();
    waitinglist.push({ type: "New", firstName: newfirstName, surname: newsurname, Time: timestamp2 });

    ShowList();

}


function RemoveFromList() {

    waitinglist.shift();
    ShowList();
}


function ShowList() {
    

    let variable2 = "";
    for (let i = 0; i < waitinglist.length; i++) {
        variable2 += "<tr><th>" + waitinglist[i].type + "</th>";
        variable2 += "<th>" + waitinglist[i].firstName + " " + waitinglist[i].surname + "</th>";
        variable2 += "<th>" + waitinglist[i].Time + "</th></tr>";
    }
        document.querySelector("#myTable tbody").innerHTML = variable2;
 
    
    }


function SortWaitingList() {
    waitinglist.sort(function (a, b) {
        let x = a.type.toLowerCase();
        let y = b.type.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    });
    ShowList();
}


//array.map(function (currentValue, index, arr), thisValue)

 