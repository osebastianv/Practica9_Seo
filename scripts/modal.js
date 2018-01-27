// DECLARACIONES DE VARIABLES
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Ventana modal que muestra la lista de contactos enviados
var modalWindow = document.getElementById("modal-window");
var modalWindowContent = document.getElementById("modal-window-content");
var receiveButton = document.getElementById("receive-button");
var closeButton = document.getElementsByClassName("close")[0];

// DECLARACIÓN DE EVENTOS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
receiveButton.addEventListener("click", receiveContactList);
window.addEventListener("click", closeModalContactList);
closeButton.addEventListener("click", closeContactList);

// FUNCIONES
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function openModalContactList() {
  modalWindow.style.display = "block";
}

function closeModalContactList(event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
    delete_table();
  }
}

function closeContactList() {
  modalWindow.style.display = "none";
  delete_table();
}

function delete_table() {
  var tabla = document.getElementById("tabla-contacto");
  tabla.remove();
}

// Generación de la tabla en la ventana modal
function generate_table(data) {
  // Crea un elemento <table> y un elemento <tbody>
  var tabla = document.createElement("table");
  tabla.id = "tabla-contacto";
  //console.log(tabla.id);

  var tblHead = document.createElement("tHead");

  // Crea la celda de cabecera
  var hilera = document.createElement("tr");

  for (var i = 0; i < 5; i++) {
    // Crea un elemento <td> y un nodo de texto, haz que el nodo de
    // texto sea el contenido de <td>, ubica el elemento <td> al final
    // de la hilera de la tabla
    var celda = document.createElement("th");

    var mitexto = "";
    switch (i) {
      case 0:
        mitexto = "Nombre";
        break;
      case 1:
        mitexto = "Apellidos";
        break;
      case 2:
        mitexto = "Correo electrónico";
        break;
      case 3:
        mitexto = "Número de Teléfono";
        break;
      case 4:
        mitexto = "Cómo me conociste";
        break;
    }

    var textoCelda = document.createTextNode(mitexto);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
  }

  // agrega la hilera al final de la tabla (al final del elemento tblHead)
  tblHead.appendChild(hilera);

  var tblBody = document.createElement("tbody");

  // Crea las celdas
  for (var i = 0; i < data.length; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 0; j < 5; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");

      var mitexto = "";
      switch (j) {
        case 0:
          mitexto = data[i].name;
          break;
        case 1:
          mitexto = data[i].surname;
          break;
        case 2:
          mitexto = data[i].email;
          break;
        case 3:
          mitexto = data[i].phone;
          break;
        case 4:
          mitexto = data[i].option;
          if (data[i].option.toUpperCase() == "OTROS") {
            mitexto += " (" + data[i].other + ")";
          }
          break;
      }

      var textoCelda = document.createTextNode(mitexto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  tabla.appendChild(tblHead);

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);

  // appends <table> into <body>
  modalWindowContent.appendChild(tabla);

  // modifica el atributo "border" de la tabla y lo fija a "1";
  tabla.setAttribute("border", "1");
}
