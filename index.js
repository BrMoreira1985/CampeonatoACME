const request = new XMLHttpRequest();
request.open("GET","./data.json", false);
request.send(null);
const data = JSON.parse(request.responseText);

let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');
let tfoot = document.createElement('tfoot');
let row =[];
let rowData = [];

table.appendChild(thead);
table.appendChild(tbody);
table.appendChild(tfoot);

function stripStatistics(statistics){
    statistics = statistics.split(/\s/);
    return statistics;
}

function buildHeader(){
    let empty1 = document.createElement('th');
    let empty2 = document.createElement('th');
    thead.appendChild(empty1);
    thead.appendChild(empty2);

    let length = data.data[20].headers.length;

    for(let k = 0; k < length; k++){
        let hdr = data.data[20].headers[k]
        let thHdr = document.createElement('th');
        thHdr.innerHTML = hdr;
        thead.appendChild(thHdr)
    } 
}

function buildFoot(){
    let line1Foot = document.createElement('th');
    let line2Foot = document.createElement('th');
    let label = [];
    let labelLength = data.data[21].footPositions.length;
    let positions = data.data[21];

    for(let l = 0; l < labelLength; l++){
        
        label[l] = document.createElement('td');
        label[l].innerHTML =`&emsp; <i class="fa-solid fa-square"></i>  ${positions.footPositions[l]}` ;
        line1Foot.append(label[l]);

    }

    label = document.createElement('td');
    labelLength = data.data[22].footAcronyms.length;
    let acronyms = data.data[22];
    let labelText = '';

    for(let m = 0; m < labelLength; m++) 
        labelText += `&emsp;${acronyms.footAcronyms[m]}`;
    
    label.innerHTML = labelText
    line2Foot.append(label);


    tfoot.append(line1Foot);
    tfoot.append(line2Foot);


}

function buildTable(){
    buildHeader();
    buildFoot();
    for(let i = 0; i < 20; i++){
        let index = document.createElement('td');
        let name = document.createElement('td');
        let stats = stripStatistics(data.data[i].statistics);

        row[i] = document.createElement('tr');
        tbody.appendChild(row[i]);
        
        index.innerHTML = i+1;
        row[i].appendChild(index);
        
        name.innerHTML = data.data[i].name;
        row[i].appendChild(name);
        
        length = stats.length;

        for(let j = 0; j < length; j++){
            let _data = stats.shift();
            rowData[j] = document.createElement('td');
            rowData[j].innerHTML = _data;
            row[i].appendChild(rowData[j]);
        }
    }

    document.getElementById('body').appendChild(table);
}

buildTable();
