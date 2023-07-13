let centerData
async function fetchData() {
    try {
        const resp = await fetch("https://isro.vercel.app/api/centres");
        let data = await resp.json();
        // console.log(data);
        centerData = data.centres;
        render(centerData);
    }
    catch (error) {
        console.log(error);
    }
}
function render(data) {
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
            cell.innerHTML = `<div class="head"> ${a} </div> <div class="tdata"> ${itm[heads]} </div>`;
            
            row.appendChild(cell);
            
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    tdiv.appendChild(table);
}

function searchBar(e) {
    const result = document.getElementById("tabled");
    const input = document.getElementById("search").value.trim();
    if (input === "") {
        alert("Enter Details!")
        result.innerHTML = "";
        render(centerData);
    } else {       
        result.innerHTML = "";
        let searchBy = e.id;
        let data = [];
        let i = 0;
        let val = 0;
        centerData.forEach(itm => {
            if (input.toLowerCase() === itm[searchBy].toLowerCase()) {
                data[i] = itm;
                i++;
                val=1;
            }
        });
        if(val===1){
        render(data)}
        else{
            alert("Enter Valid Information!");
            render(centerData);
        }
    }
}

function searchRender() { 
    let btnc = document.getElementById("name")
    let btns = document.getElementById("State");
    let btnp = document.getElementById("Place");
    
    let flagc = false;
    let flags = false;
    let flagp = false;

    btnc.addEventListener("click", () => {
        if (flagc) {
            flagc = false;
            btnc.classList.remove('clicked');
        } else {
            flagc = true;
            btnc.classList.add('clicked');
        }
    })
    btns.addEventListener("click", () => {
        if (flags) {
            flags = false;
            btns.classList.remove('clicked');
        } else {
            flags = true;
            btns.classList.add('clicked');
        }
    })
    btnp.addEventListener("click", () => {
        if (flagp) {
            flagp = false;
            btnp.classList.remove('clicked');
        } else {
            flagp = true;
            btnp.classList.add('clicked');
        }
    })
}
searchRender()
fetchData()