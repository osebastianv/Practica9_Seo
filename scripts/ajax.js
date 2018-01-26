var form = document.getElementsByName("contacto")[0];

var xhr = new XMLHttpRequest();

function getDataAjax() {
  makeRequest("GET", "http://localhost:8000/api/task", null, function(
    status,
    responseText
  ) {
    if (status != 200 && status != 201) {
      alert("Error al obtener los datos, vuelva a intentarlo por favor");
      //return false;
    }

    //var div = document.createElement("div");
    var response = JSON.parse(responseText);

    /*console.log(response);

    var children = "";

    for (i = 0; i < response.length; i++) {
      children += "<p>" + response[i].name + "</p>";
    }

    div.innerHTML = children;

    //modalWindowContent.appendChild(div);*/

    generate_table(response);

    //return true;
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
