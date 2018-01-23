//Obtenemos elemento formulario y sus campos
var form = document.getElementsByName("contacto")[0];

var nombreInput = document.getElementById("nombre");
var apellidosInput = document.getElementById("apellidos");
var emailInput = document.getElementById("email");
var telefonoInput = document.getElementById("telefono");
var comentariosInput = document.getElementById("comentarios-texto");
//console.log(comentariosInput);

//var tipoConocidoRadioInput = document.getElementsByClassName("radio");
//console.log(tipoConocidoRadioInput);

var tipoConocidoInput = {
  tipoConocido1: document.getElementById("tipo_conocido_1"),
  tipoConocido2: document.getElementById("tipo_conocido_2"),
  tipoConocido3: document.getElementById("tipo_conocido_3")
};

//Obtenemos elemento radio junto a su campo de texto otros
var contactoTipoConocido = document.getElementById("contacto-tipo-conocido");
var otros = document.getElementsByName("otros");

//Declaramos el elemento de texto otros
/*var containerHtml = '<div class="floating-box"></div>';
var containerElement = document.createElement("div");*/

var textHtml = '<input type="text" name="otros" id="otros" maxlength="20">';
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
  var telefono = telefonoInput.value.trim();

  if (telefono.length != 9) {
    alert("Escriba un teléfono correcto, por favor (9 dígitos)");
    telefonoInput.focus();
    event.preventDefault();
    return false;
  }

  var regex = /[6|9][0-9]+/;
  var resultPhoneValidation = regex.test(telefono);

  if (resultPhoneValidation === false) {
    alert("Escriba un teléfono correcto, por favor (debe empezar por 6 o 9)");
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
      otros[0].focus();
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
  //console.log("L " + i);
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
    //textElement.focus();
    otros[0].focus();
  } else {
    if (currentIndex == 2) {
      //Borro campo de texto otros
      contactoTipoConocido.removeChild(textElement);
      console.log("Borro");
    }
  }

  currentIndex = newIndex;
}

//Contar palabras de textarea
comentariosInput.addEventListener("keypress", filtrarIntro);

function filtrarIntro(event) {
  //Filtramos 13. Intro Y 17. Ctrl. Este último para evitar copy paste
  if (event.keyCode == 13 || event.keyCode == 17) {
    //this.value = previewText;
    event.preventDefault();
    return false;
  }

  //Para evitar que se escriba el carácter y no entre en keyup
  if (previewContador >= 150 && event.keyCode == 32) {
    event.preventDefault();
    return false;
  }
}

comentariosInput.addEventListener("keyup", contarPalabras);
var previewContador = 0;
var previewText = "";

function contarPalabras(event) {
  console.log(event.keyCode);

  var comentario = this.value; // + String.fromCharCode(event.keyCode);
  var arrayPalabras = comentario.split(" ");
  /*if (arrayPalabras == null) {
    event.preventDefault();
    return false;
  }*/

  var contador = 0;

  for (i = 0; i < arrayPalabras.length; i++) {
    if (arrayPalabras[i].length >= 1) {
      contador += 1;
    }
  }

  console.log(contador.toString());

  previewContador = contador;

  if (contador > 150) {
    //this.value = previewText;
    alert(
      "El contenido escrito sobrepasa las 150 palabras, por lo que no está permitido. Disculpe las molestias."
    );
    this.value = previewText;
    this.focus();
    event.preventDefault();
    return false;
  }

  previewText = this.value;

  /*console.log(event.key);
  event.preventDefault();
  return false;*/

  /*if (this.value == "") {
    console.log("nada");
  } else {
    console.log(this.value);
  }*/
}

//Filtramos paste de textarea
comentariosInput.addEventListener("paste", filtrarPaste);

//Si queremos ser estrictos desactivamos el paste y listo
function filtrarPaste(event) {
  event.preventDefault();
  return false;
}
