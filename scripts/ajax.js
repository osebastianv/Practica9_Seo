var form = document.getElementsByName("contacto")[0];

var xhr = new XMLHttpRequest();

function getDataAjax() {
  makeRequest("GET", "http://localhost:8000/api/task", null, function(
    status,
    responseText
  ) {
    if (status != 200 && status != 201) {
      alert("Error al obtener los datos, vuelva a intentarlo por favor");
      return false;
    }

    var response = JSON.parse(responseText);

    generate_table(response);

    openModalContactList();
  });
}

function createDataAjax(data) {
  makeRequest("POST", "http://localhost:8000/api/task", data, function(
    status,
    responseText
  ) {
    if (status === 200 || status === 201) {
      alert("Datos enviados correctamente");
      resetData();
    } else {
      alert("Error al enviar los datos, vuelva a intentarlo por favor");
    }
  });
}

function makeRequest(method, url, body, callbackSuccess) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  //xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
  //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  //xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTION");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callbackSuccess(xhr.status, xhr.responseText);
    }
  };

  if (body) {
    console.log(JSON.stringify(body));
    xhr.send(JSON.stringify(body));
  } else {
    xhr.send();
  }
}
