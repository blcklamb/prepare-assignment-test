const Table = (listData) => {
  const headContent = ["picture", "name", "position", "role", "phone", "email"];
  const displayTableHead = (firstData) => {
    const thead = document.createElement("thead");
    const theadTr = document.createElement("tr");
    for (const header of Object.keys(firstData)) {
      if (headContent.indexOf(header) != -1) {
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(header));
        theadTr.append(th);
      }
    }
    for (let i = 0; i < firstData.length; i++) {}
    thead.appendChild(theadTr);
    return thead;
  };
  const displayTableData = (data) => {
    const tr = document.createElement("tr");
    for (const [key, value] of Object.entries(data)) {
      if (headContent.indexOf(key) != -1) {
        const td = document.createElement("td");
        td.appendChild(document.createTextNode(value));
        tr.appendChild(td);
      }
    }
    return tr;
  };

  const render = () => {
    const table = document.createElement("table");
    // Create tHead
    const thead = displayTableHead(listData[0]);
    table.appendChild(thead);

    // Create tbody
    const tbody = document.createElement("tbody");
    for (let i = 0; i < listData.length; i++) {
      let tbodyTr = displayTableData(listData[i]);
      tbody.appendChild(tbodyTr);
    }
    table.appendChild(tbody);

    // Connect to DOM
    document.getElementById("table").appendChild(table);
  };
  render();
};

export default Table;
