// Add some Javascript code here, to run on the front end.

export function setError(message) {
  const msg = document.getElementById("err")
  msg.textContent = message;
}

export function addRoll() {
  const input = document.getElementById("add"),
    json = {
      character: input.elements[0].value,
      diceType: input.elements[1].value,
      quantity: input.elements[2].value,
      modifier: input.elements[3].value
    },
    body = JSON.stringify(json);

  fetch("/add", {
    method: "POST",
    body
  }).then(function(response) {
    if (response.status === 200) {
      console.log(body);
      update(response);
      return true;
    }
    else {
      return response.text();
    }
  }).then(function(text) {
    if(text === true) {
      setError("");
      return true;
    }
    else {
      console.log("ERROR 2");
      console.log(text);
      setError(text);
    }
  });

  return false;
}

export function deleteRoll() {
  const input = document.getElementById("delete"),
    json = {
      id: input.elements[0].value,
      character: input.elements[1].value
    },
    body = JSON.stringify(json);

  fetch("/delete", {
    method: "POST",
    body
  }).then(function(response) {
    if (response.status === 200) {
      console.log(body);
      update(response);
      return true;
    }
    else {
      return response.text();
    }
  }).then(function(text) {
    if(text === true) {
      setError("");
      return true;
    }
    else {
      console.log("ERROR 2")
      console.log(text)
      setError(text);
    }
  });

  return false;
}

export function clearRolls() {
  fetch("/clear", {
    method: "GET"
  }).then(function(response) {
    if (response.status === 200) {
      update(response);
      return true;
    }
  });
  return false;
}

export function sortRolls() {
  fetch("/sort", {
    method: "GET"
  }).then(function(response) {
    if (response.status === 200) {
      update(response);
      return true;
    }
  });
  return false;
}

export function updateOnLoad() {
  fetch("/load", {
    method: "GET"
  }).then(function(response) {
    if (response.status === 200) {
      update(response);
      return true;
    }
  });
  return false;
}

export function update(results) {
  let table = document.getElementById("table_list");
  let newTable = document.createElement("tbody");

  table.replaceChild(newTable, table.lastChild);

  console.log(results);

  results.json().then(function(data) {
    let nRows = data.nRows;
    let rowData = data.rowData;

    for (let i = 0; i < nRows; i++) {
      let newRow = newTable.insertRow(i);
      newRow.insertCell(0).innerHTML = `${rowData[i].id}`;
      newRow.insertCell(1).innerHTML = `${rowData[i].character}`;
      newRow.insertCell(2).innerHTML = `d${rowData[i].diceType}`;
      newRow.insertCell(3).innerHTML = `${rowData[i].quantity}`;
      newRow.insertCell(4).innerHTML = `${rowData[i].modifier}`;
      newRow.insertCell(5).innerHTML = `${rowData[i].roll}`;
    }
  });

  return 0;
}
