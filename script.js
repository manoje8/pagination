let container = document.createElement("div");
container.className = "container";

let h1 = document.createElement("h1");
h1.id = "title";
h1.innerHTML = "Pagination";

let p = document.createElement("p");
p.id = "description";
p.innerHTML = "Pagination in DOM Manipulation";

let tableContainer = document.createElement("div");
tableContainer.className = "table-responsive";

let table = document.createElement("table");
table.id = "table";
table.className = "table table-bordered";

let thread = document.createElement("thead");
thread.className = "tableHead";
let tableHeader = createTableHeader();

let tbody = document.createElement("tbody");
tbody.id = "tableBody";

let changeNumber = document.createElement("p");
changeNumber.id = "change";
changeNumber.innerHTML = "change: 1";

let pagination = createPagination();

thread.append(tableHeader);
table.append(thread, tbody)
tableContainer.append(table);
container.append(h1,p,tableContainer,changeNumber, pagination); 
document.body.append(container);


function createTable(start, end)
{
    let xml = new XMLHttpRequest();
    xml.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
    xml.send();
    xml.onload = function(){
        if(xml.status >= 200 && xml.status < 300)
        {
            const data = JSON.parse(xml.response);
            insertTableData(data, start, end)
        }else
        {
            console.log(xml.responseText)
        }
    }
};

//Insert data to the table
function insertTableData(data, start, end)
{
    let count = 0;
    let tableBody = document.querySelector("tbody");
    for(let i=start; i<end;i++)
    {
        let trow = tableBody.insertRow(count++);
        let cell1 = trow.insertCell(0);
        let cell2 = trow.insertCell(1);
        let cell3 = trow.insertCell(2);
        
        cell1.innerHTML = data[i].id;
        cell2.innerHTML = data[i].name;
        cell3.innerHTML = data[i].email;
    }
}

//Table Header
function createTableHeader()
{
    let tableHeader = ["Id", "Name", "Email"];
    let tableRow = document.createElement("tr");
    for(let i=0; i<tableHeader.length; i++)
    {
        let th = document.createElement("th");
        let text = document.innerHTML = tableHeader[i];
        th.append(text);
        tableRow.append(th);
    }
    return tableRow;
}

//Pagination
function createPagination()
{
    let paginationContainer = document.createElement("div");
    paginationContainer.id = "buttons";
    paginationContainer.className = "d-flex justify-content-center"

    let previous = document.createElement("li");
    previous.id = "prevPage";
    previous.innerHTML = "previous";

    let current = document.createElement("li");
    current.id = "firstPage";
    current.innerHTML = "First";

    let next = document.createElement("li");
    next.id = "nextPage";
    next.innerHTML = "next";

    paginationContainer.append(current, previous);

    for(let i=2; i<=10; i++)
    {
        let num = document.createElement("li");
        num.innerHTML = i;
        num.className = "num";
        num.value = i-1;
        paginationContainer.append(num);
    }

    paginationContainer.append(next);
    return paginationContainer;
}

//To delete previous data after clicked the next page
function deleteTableRow()
{
    let tbody = document.getElementById("tableBody");
    for(let i=0; i<10; i++)
    {
        tbody.deleteRow(0);
    }
}

//Function to display page number
function pageNumber(num)
{
    let pgNumber = document.getElementById("change");
    pgNumber.innerHTML = `change: ${num}`;

}

//EventListener 
document.addEventListener('DOMContentLoaded', () => {

    const itemsPerPage = 10; // Number of rows to display per page
    
    let currentPage  = 0; // Current page number (starts at 0)
    

    // Function to display items for the current page
    function showPage(page) {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        createTable(startIndex, endIndex);
    }

    // Initial display (show the first page)
    showPage(currentPage);
    

    // Add event listeners to pagination buttons
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const first = document.getElementById("firstPage");

    prevButton.addEventListener('click', () => {
        if(currentPage > 0)
        {
            currentPage = Math.max(currentPage - 1, 0);
            pageNumber(currentPage+1)
            showPage(currentPage);
            deleteTableRow();
        }
      });
    
    nextButton.addEventListener('click', () => {
        if(currentPage < 9)
        {
            currentPage = currentPage + 1;
            pageNumber(currentPage+1)
            showPage(currentPage);
            deleteTableRow();
        }
      });

    
    first.addEventListener('click', ()=>{
        currentPage = 0;
        pageNumber(1)
        showPage(0);
        deleteTableRow();
    })
      
    //pagination number
    document.querySelectorAll(".num").forEach(element => element.addEventListener("click", (event) => {
        currentPage = event.target.value;
        pageNumber(currentPage+1)
        showPage(currentPage);
        deleteTableRow();
    }));


})

