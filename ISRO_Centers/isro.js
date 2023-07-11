async function fetchData() {
    try {
        const resp = await fetch("https://isro.vercel.app/api/centres");
        let data = await resp.json();
        // console.log(data);
        let centData = data.centres;
        searchRender(centData);
    }
    catch (error) {
        console.log(error);
    }
}
function createTable(data) {
    const tdiv = document.getElementById("tabled");
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    const val = ["name", "Place", "State"];

    
    
    data.forEach(itm => {

        const row = document.createElement("tr");
        row.classList.add("row");
        val.forEach((heads,idx) => {

            const cell = document.createElement("td");
            let a  =  "";
            if(idx === 0){
                a = "CENTER";
            }else if(idx === 1){
                a = "CITY";
            }else{
                a = "STATE";
            }
            cell.innerHTML = `<div class="head"> ${a} </div> ${itm[heads]}`;
            
            row.appendChild(cell);
            
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    tdiv.appendChild(table);
}

function searchRender(centData) {
    let input = document.getElementById("search");
    let btnc = document.getElementById("center")
    let btns = document.getElementById("state");
    let btnp = document.getElementById("city");
    let searchBtn = document.getElementById("searchBtn");
    
    let flagc = false;
    let flags = false;
    let flagp = false;

    input = input.value.toLowerCase();
    const filteredData = centData.filter(valData => {
        return (
            valData.State.toLowerCase().includes(input.value) ||
            valData.Place.toLowerCase().includes(input.value) ||
            valData.name.toLowerCase().includes(input.value)
        )
    });

    btnc.addEventListener("click", () => {
        if (flagc) {
            flagc = false;
            btnc.classList.remove('clicked');
        } else {
            flagc = true;
            btnc.classList.add('clicked');
            return createTable(filteredData)
        }
    })
    btns.addEventListener("click", () => {
        if (flags) {
            flags = false;
            btns.classList.remove('clicked');
        } else {
            flags = true;
            btns.classList.add('clicked');
            return createTable(filteredData)
        }
    })
    btnp.addEventListener("click", () => {
        if (flagp) {
            flagp = false;
            btnp.classList.remove('clicked');
        } else {
            flagp = true;
            btnp.classList.add('clicked');
            return createTable(filteredData)
        }
    })
    
    console.log(filteredData);
    if ( input === '' && flagc === false && flags === false && flagp === false) {
        console.log("I am in if");
        return createTable(centData);
    }
}
fetchData()