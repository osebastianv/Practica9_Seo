var form = document.getElementsByName("contacto")[0];

var nombreInput = document.getElementById("nombre");
var apellidosInput = document.getElementById("apellidos");
var emailInput = document.getElementById("email");
var telefonoInput = document.getElementById("telefono");

//var tipoConocidoRadioInput = document.getElementsByClassName("radio");
//console.log(tipoConocidoRadioInput);

var tipoConocidoInput = {
  tipoConocido1: document.getElementById("tipo_conocido_1"),
  tipoConocido2: document.getElementById("tipo_conocido_2"),
  tipoConocido3: document.getElementById("tipo_conocido_3")
};

var contactoTipoConocido = document.getElementById("contacto-tipo-conocido");
var otros = document.getElementsByName("otros");

//Declaramos el elemento de texto otros
/*var containerHtml = '<div class="floating-box"></div>';
var containerElement = document.createElement("div");*/

var textHtml = '<input type="text" name="otros" maxlength="20">';
var textElement = document.createElement("div");
textElement.innerHTML = textHtml;

//containerElement.appendChild(textElement);

//Declaramos evento del botón de envío
form.addEventListener("submit", enviarInfo);

function enviarInfo(event) {
  //Validamos nombre
  if (nombreInput.checkValidity() === false) {
    alert("Escriba su nombre, por favor");
    nombreInput.focus();
    event.preventDefault();
    return false;
  }
  //Validamos apellidos
  if (apellidosInput.checkValidity() === false) {
    alert("Escriba sus apellidos, por favor");
    apellidosInput.focus();
    event.preventDefault();
    return false;
  }

  //Validamos el email
  var regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
  var resultEmailValidation = regex.test(emailInput.value);

  if (resultEmailValidation === false) {
    alert("Escriba un email correcto, por favor (nombre@compañía.es)");
    emailInput.focus();
    event.preventDefault();
    return false;
  }

  //Validamos el teléfono
  var regex = /[6|9][0-9]+/;
  var resultPhoneValidation = regex.test(telefonoInput.value);

  if (resultPhoneValidation === false) {
    alert(
      "Escriba un teléfono correcto, por favor (9 caracteres, que empiecen por 6 o 9)"
    );
    telefonoInput.focus();
    event.preventDefault();
    return false;
  }

  //Validamos los inputs radio tipo_conocido
  if (tipoConocidoInput.tipoConocido1.checkValidity() === false) {
    alert("Seleccione una opción de cómo me has conocido, por favor");
    event.preventDefault();
    return false;
  }

  //Validamos el campo de texto de otros
  if (currentIndex == 2) {
    if (otros[0].value.trim() == "") {
      alert("Escriba la opción de cómo me has conocido, por favor");
      event.preventDefault();
      return false;
    }
  }

  //Por ahora que no mande nada
  event.preventDefault();
  return false;
}

//Declaramos evento de cambio de los input radio
var radioInput = document.querySelectorAll("input[type=radio]");
//x = radioInput.length;

/*while (x--) {
  console.log(x);
  radioInput[x].addEventListener("change", cambiarOpcionConocido, 0);
}*/

for (var i = 0; i < radioInput.length; i++) {
  radioInput[i].addEventListener("click", cambiarOpcionConocido, 0);
  console.log("L " + i);
}

var currentIndex = -1;

function cambiarOpcionConocido(event) {
  //console.log(radioInput.length);
  var newIndex;

  for (var i = 0; i < radioInput.length; i++) {
    //console.log(radioInput[i].value + " = " + radioInput[i].checked);
    if (radioInput[i].checked === true) {
      newIndex = i;
      break;
    }
  }

  console.log("A " + newIndex);
  if (newIndex == currentIndex) {
    return;
  }

  if (newIndex == 2) {
    //Añado campo de texto otros
    console.log("Añado");
    textElement.value = "";
    //contactoTipoConocido.appendChild(textElement);
    contactoTipoConocido.appendChild(textElement);
    textElement.focus();
  } else {
    if (currentIndex == 2) {
      //Borro campo de texto otros
      contactoTipoConocido.removeChild(textElement);
      console.log("Borro");
    }
  }

  currentIndex = newIndex;

  //  alert(this);

  /*var radioInput = document.querySelectorAll("input[type=radio]"),
  //  x = radioInput.length;
  //while (x--) radioInput[x].addEventListener("change", cambiarOpcionConocido, 0);
  for(var i = 0; i < radioInput.length; i++){
      radioInput[i].addEventListener("change", cambiarOpcionConocido, 0);
  }

  function cambiarOpcionConocido(event) {
    var index = 0;

    for(var i = 0; i < radioInput.length; i++){
      if (radioInput[i].checked){
        index = i;
        break;
      }

      alert (index);
  }*/

  /*if (tipoConocidoRadioInput[0].checked === true) {
    alert("1");
  } else if (tipoConocidoRadioInput[1].checked === true) {
    alert("2");
  } else if (tipoConocidoRadioInput[3].checked === true) {
    alert("3");
  }*/
}
