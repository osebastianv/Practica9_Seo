// DECLARACIONES DE VARIABLES
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var form = document.getElementsByName("contact")[0];

var nameInput = document.getElementById("contact-name");
var surnameInput = document.getElementById("contact-surname");
var emailInput = document.getElementById("contact-email");
var phoneInput = document.getElementById("contact-phone");
var commentsInput = document.getElementById("comments-text");
var commentsCounter = document.getElementById("comments-counter");

var knownTypeInput = {
  knownType1: document.getElementById("contact-know-type-1"),
  knownType2: document.getElementById("contact-know-type-2"),
  knownType3: document.getElementById("contact-know-type-3")
};

// Contenedor e input text dinámico de otros
var contactKnowTypeOthers = document.getElementById("contact-know-type-others"); //Contenedor div

var contactKnowTypeOthersText = document.getElementsByName(
  "contact-know-type-others-text" //input text otros
);

// Input text otros (creación dinámica)
var textHtml =
  '<input type="text" name="contact-know-type-others-text" id="contact-know-type-others-text" maxlength="20">';
var textElement = document.createElement("div");
textElement.innerHTML = textHtml;

var sendButton = document.getElementById("send-button");

// DECLARACIÓN DE EVENTOS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Envío de datos de contacto
form.addEventListener("submit", sendContact);

// Cambio de elemento del input radio
var radioInput = document.querySelectorAll("input[type=radio]");
for (var i = 0; i < radioInput.length; i++) {
  radioInput[i].addEventListener("click", changeKnowType, 0);
}

// Contar palabras de textarea
commentsInput.addEventListener("keyup", checkMaxWords);
commentsInput.addEventListener("paste", filterPaste);

// FUNCIONES
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Función de envío de contactos
function sendContact(event) {
  var contactOK = checkContact(event);
  if (contactOK == false) {
    return false;
  }

  sendButton.setAttribute("disabled", "");
  event.preventDefault();

  var data = getContactData();

  createDataAjax(data);

  setTimeout(function() {
    sendButton.removeAttribute("disabled");
  }, 1000);
}

function getContactData() {
  var option = "";
  for (var i = 0; i < radioInput.length; i++) {
    if (radioInput[i].checked === true) {
      option = radioInput[i].value;
      break;
    }
  }

  var option_others = "";
  if (currentIndex == radioInput.length - 1) {
    option_others = contactKnowTypeOthersText[0].value.trim();
  }

  var data = new ContactData(
    nameInput.value,
    surnameInput.value,
    emailInput.value,
    phoneInput.value,
    option,
    option_others,
    commentsInput.value
  );

  return data;
}

function checkContact(event) {
  // Validamos nombre
  if (nameInput.checkValidity() === false) {
    alert("Escriba su nombre, por favor");
    nameInput.focus();
    event.preventDefault();
    return false;
  }

  // Validamos apellidos
  if (surnameInput.checkValidity() === false) {
    alert("Escriba sus apellidos, por favor");
    surnameInput.focus();
    event.preventDefault();
    return false;
  }

  // Validamos el email
  var regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
  var resultEmailValidation = regex.test(emailInput.value);

  if (resultEmailValidation === false) {
    alert("Escriba un email correcto, por favor (nombre@compañía.es)");
    emailInput.focus();
    event.preventDefault();
    return false;
  }

  // Validamos el teléfono
  var phone = phoneInput.value.trim();

  if (phone.length != 9) {
    alert("Escriba un teléfono correcto, por favor (9 dígitos)");
    phoneInput.focus();
    event.preventDefault();
    return false;
  }

  var regex = /[6|9][0-9]+/;
  var resultPhoneValidation = regex.test(phone);

  if (resultPhoneValidation === false) {
    alert("Escriba un teléfono correcto, por favor (debe empezar por 6 o 9)");
    phoneInput.focus();
    event.preventDefault();
    return false;
  }

  // Validamos los inputs radio
  if (knownTypeInput.knownType1.checkValidity() === false) {
    alert("Seleccione una opción de cómo me has conocido, por favor");
    event.preventDefault();
    return false;
  }

  //Validamos el campo de texto otros
  if (currentIndex == radioInput.length - 1) {
    if (contactKnowTypeOthersText[0].value.trim() == "") {
      alert("Escriba la opción de cómo me has conocido, por favor");
      contactKnowTypeOthersText[0].focus();
      event.preventDefault();
      return false;
    }
  }

  //Validamos si el campo comentarios sobrepasa las 150 palabras
  var contador = countWords(commentsInput.value);
  if (contador > 150) {
    alert(
      "El contenido escrito sobrepasa las 150 palabras, recorte el texto por favor."
    );

    commentsInput.focus();
    event.preventDefault();
    return false;
  }

  return true;
}

function resetData() {
  var formReset = document.getElementsByName("contact")[0];
  formReset.reset();

  currentIndex = -1;
  contactKnowTypeOthers.removeChild(textElement);

  commentsInput.value = "";

  nameInput.focus();
}

var currentIndex = -1;
function changeKnowType(event) {
  var newIndex;

  for (var i = 0; i < radioInput.length; i++) {
    if (radioInput[i].checked === true) {
      newIndex = i;
      break;
    }
  }

  if (newIndex == currentIndex) {
    return false;
  }

  if (newIndex == radioInput.length - 1) {
    textElement.value = "";
    contactKnowTypeOthers.appendChild(textElement);
    contactKnowTypeOthersText[0].focus();
  } else {
    if (currentIndex == radioInput.length - 1) {
      contactKnowTypeOthers.removeChild(textElement);
    }
  }

  currentIndex = newIndex;
}

function countWords(text) {
  var comentario = text.replace(/\r?\n/g, " ");
  //comentario = comentario.replace(/\r?\n/g, " ");

  var arrayPalabras = comentario.split(" ");

  var contador = 0;

  for (i = 0; i < arrayPalabras.length; i++) {
    if (arrayPalabras[i].length >= 1) {
      contador += 1;
    }
  }
  return contador;
}

var previewContador = 0;
//var previewText = "";
var filtrarMensaje = false;

function checkMaxWords(event) {
  var contador = countWords(this.value);
  refreshWordsCounter(contador);

  if (contador > 150) {
    if (filtrarMensaje == false) {
      alert(
        "El contenido escrito sobrepasa las 150 palabras, recorte el texto por favor."
      );
      filtrarMensaje = true;

      this.focus();
      event.preventDefault();
      return false;
    }
  } else {
    filtrarMensaje = false;
  }

  //previewText = this.value;
}

function filterPaste(event) {
  //Ponemos el setTimeout para poder obtener el valos del campo al completo, ya que en el evento paste la propiedad value no contiene el el texto a pegar
  setTimeout(function() {
    var contador = countWords(commentsInput.value);

    if (previewContador == contador) {
      return false; //para que no saque el mensaje de > 150 en los 2 eventos (keyup y paste) al copiar desde teclado
    }
    refreshWordsCounter(contador);

    if (contador > 150) {
      if (filtrarMensaje == false) {
        alert(
          "El contenido escrito sobrepasa las 150 palabras, recorte el texto por favor."
        );
        filtrarMensaje = true;
        commentsInput.focus();
      }
    } else {
      filtrarMensaje = false;
    }
  }, 500);
}

function refreshWordsCounter(contador) {
  var text;
  if (contador == 1) {
    text = contador + " palabra (máx 150)";
  } else {
    text = contador + " palabras (máx 150)";
  }

  commentsCounter.innerText = text;
  previewContador = contador;
}

// Funciones de visualización de la lista de contactos enviados
function receiveContactList(event) {
  receiveButton.setAttribute("disabled", "");

  getDataAjax();

  setTimeout(function() {
    receiveButton.removeAttribute("disabled");
  }, 1000);
}

//CLASES
function ContactData(name, surname, email, phone, option, other, comments) {
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.phone = phone;
  this.option = option;
  this.other = other;
  this.comments = comments;
}
