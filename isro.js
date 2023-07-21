let centerData     // Storing the data globally

// Fetching the data from API 
async function fetchData() {
    try {
        const resp = await fetch("https://isro.vercel.app/api/centres");  // fetching the API data
        let data = await resp.json();
        // console.log(data);
        centerData = data.centres;
        render(centerData);           // Initially render all the data from API
    }
    catch (error) {
        console.log(error);
    }
}

let btnFlag = false;  // Global flag for buttons

// ** Rendering the data in div by creacting tables. ** //
function render(data) {
    const tdiv = document.getElementById("tabled");   // Getting the div from html
    const table = document.createElement("table");    // Creating the table element
    const tbody = document.createElement("tbody");    // Creating the table body.
    const val = ["name", "Place", "State"];

    data.forEach(itm => {           // For each loop to traverse on each data        

        const row = document.createElement("tr");  //Creating the row 
        row.classList.add("row");                 // Ginving class to the row
        val.forEach((heads, idx) => {
            // Getting each value from val array
            const cell = document.createElement("td");   //Creating the cell or td

            let a = "";
            if (idx === 0) {
                a = "CENTER";
            } else if (idx === 1) {                 //  assigning the head values
                a = "CITY";
            } else {
                a = "STATE";
            }

            // Writing the head values and the data from the API into the cell or td.
            cell.innerHTML = `<div class="head"> ${a} </div> <div class="tdata"> ${itm[heads]} </div>`;

            // Appending the cell or td in the row
            row.appendChild(cell);

        });
        // Appending the row in the table body
        tbody.appendChild(row);
    });
    // Appending the table body in the table.
    table.appendChild(tbody);
    // Appending the table in the div.
    tdiv.appendChild(table);
}

// ** Search and filter logic ** //
function searchBar(e) {
    const result = document.getElementById("tabled");                 // Getting the result div for clearing the initial data
    let input = document.getElementById("search").value.trim();   // Getting user entered input values 
    if (input === "") {
        alert("Enter Details!")
        btnFlag = true;                // If user not entered any value then clear the result div and re-render the whole data
        result.innerHTML = "";
        render(centerData);
    } else {
        result.innerHTML = "";
        btnFlag = false;
        let searchBy = e.id;
        let data = [];             // Else get the value from input and value from clicked button
        let i = 0;
        let val = 0;

        if(input.toLowerCase() === "punjab" || input.toLowerCase() === "haryana"){
              input = "punjab/haryana";  
        }
        centerData.forEach(itm => {        // Traversing on the whole API data
            if (input.toLowerCase() === itm[searchBy].toLowerCase()) {   // Check if input and button clicked value is same 
                data[i] = itm;                                           // and the value is present in the API
                i++;
                val = 1;
            }
        });

        if (val === 1) {
            render(data)
        }               // If the value is present then only render that values in the result div
        else {
            alert("Enter Valid Information!");
            btnFlag = true;                  // If the value not match with api data then give a pop-up message
            render(centerData);              // and render the whole data
        }
    }
}

// ** Logic to applying the CSS and styling to the buttons after click ** //
function buttonRender() {
    let btnc = document.getElementById("name")
    let btns = document.getElementById("State");    // Getting the buttons using Id's
    let btnp = document.getElementById("Place");

    let flagc = false;
    let flags = false;
    let flagp = false;

    btnc.addEventListener("click", () => {             // On clicking the button do the falling logic
        if (flagc || btnFlag) {
            flagc = false;
            btnc.classList.remove('clicked');
            btns.classList.remove('clicked');       // If button is alredy clicked then remove styling from all buttons
            btnp.classList.remove('clicked');       // Or if global flag is true then also remove all styling
        } else {
            flagc = true;
            btnc.classList.add('clicked');
            btns.classList.remove('clicked');       // If button is cliked then add styling to the clicked button
            flags = false;                          // and remove styling from other buttons
            btnp.classList.remove('clicked');
            flagp = false;
        }
    })
    btns.addEventListener("click", () => {          // On clicking the button do the falling logic
        if (flags || btnFlag) {
            flags = false;
            btns.classList.remove('clicked');
            btnc.classList.remove('clicked');
            btnp.classList.remove('clicked');
        } else {
            flags = true;
            btns.classList.add('clicked');
            btnc.classList.remove('clicked');       // If button is cliked then add styling to the clicked button
            flagc = false;                          // and remove styling from other buttons
            btnp.classList.remove('clicked');
            flagp = false;
        }
    })
    btnp.addEventListener("click", () => {         // On clicking the button do the falling logic
        if (flagp || btnFlag) {
            flagp = false;
            btnp.classList.remove('clicked');
            btns.classList.remove('clicked');
            btnc.classList.remove('clicked');
        } else {
            flagp = true;
            btnp.classList.add('clicked');
            btns.classList.remove('clicked');       // If button is cliked then add styling to the clicked button
            flags = false;                          // and remove styling from other buttons
            btnc.classList.remove('clicked');
            flagc = false;
        }
    })
}
buttonRender()
fetchData()