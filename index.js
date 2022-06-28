const request = new XMLHttpRequest();
request.open("GET", "./data.json", false);
request.send(null);
const data = JSON.parse(request.responseText);

let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let tfoot = document.createElement("tfoot");
let captionTop = document.createElement('caption')
let captionBottom = document.createElement("caption");
let row = [];
let rowData = [];

captionTop.setAttribute('class', 'top');
captionBottom.setAttribute('class', 'bottom');

table.appendChild(captionTop);
table.appendChild(thead);
table.appendChild(tbody);
table.appendChild(tfoot);
table.appendChild(captionBottom);


function stripStatistics(statistics) {
  statistics = statistics.split(/\s/);
  return statistics;
}

function buildHeader() {
  let empty1 = document.createElement("th");
  let empty2 = document.createElement("th");
  thead.appendChild(empty1);
  thead.appendChild(empty2);

  let length = data.data[20].headers.length;

  for (let k = 0; k < length; k++) {
    let hdr = data.data[20].headers[k];
    let thHdr = document.createElement("th");
    thHdr.innerHTML = hdr;
    thead.appendChild(thHdr);
  }
}

function buildFoot() {
  let line1Foot = document.createElement("th");
  let line2Foot = document.createElement("th");
  let label = document.createElement("td");
  let labelLength = data.data[21].footPositions.length;
  let positions = data.data[21];
  let labelText = "";

  for (let l = 0; l < labelLength; l++)
    labelText += `<i class="fa-solid fa-square lbl${l}"></i>  ${positions.footPositions[l]}&emsp; `;

  label.innerHTML = labelText;
  line1Foot.append(label);
  label = document.createElement("td");
  labelLength = data.data[22].footAcronyms.length;
  let acronyms = data.data[22];
  labelText = "";

  for (let m = 0; m < labelLength; m++)
    labelText += `${acronyms.footAcronyms[m]}&emsp; `;

  label.innerHTML = labelText;
  line2Foot.append(label);

  tfoot.append(line1Foot);
  tfoot.append(line2Foot);
}

function buildTable() {
  captionTop.innerHTML = "Campeonato ACME 2022 - Tabela de classificação"
  captionBottom.innerHTML = "Atualizado em 31/12/22 23h:59min"
  buildHeader();
  buildFoot();
  for (let i = 0; i < 20; i++) {
    let index = document.createElement("td");
    let name = document.createElement("td");
    let stats = stripStatistics(data.data[i].statistics);

    row[i] = document.createElement("tr");
    tbody.appendChild(row[i]);

    index.innerHTML = i + 1;
    row[i].appendChild(index);

    name.innerHTML = data.data[i].name;
    row[i].appendChild(name);

    length = stats.length;

    for (let j = 0; j < length; j++) {
      let _data = stats.shift();
      rowData[j] = document.createElement("td");
      rowData[j].innerHTML = _data;
      row[i].appendChild(rowData[j]);
    }
  }

  document.getElementById("body").appendChild(table);
}

buildTable();
