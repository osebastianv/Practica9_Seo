var navbarItems = document.getElementsByClassName("navbar__item");

for (var i = 0; i < navbarItems.length; i++) {
  navbarItems[i].addEventListener("click", function(event) {
    var goTo = this.getElementsByTagName("a")[0].href.split("#");
    deleteActiveClass();
    this.classList.add("navbar__item--active");

    if (goTo.length === 2) {
      event.preventDefault();
      var sectionToGo = goTo[goTo.length - 1];
      var elementToGo = getElementToScroll(sectionToGo);
      scrollToElement(elementToGo);
    }
  });
}

function deleteActiveClass() {
  for (var i = 0; i < navbarItems.length; i++) {
    navbarItems[i].classList.remove("navbar__item--active");
  }
}

function getElementToScroll(id) {
  var elem;
  if (id === "") {
    elem = document.getElementsByClassName("header")[0];
  } else {
    elem = document.getElementById(id);
  }

  return elem;
}

function scrollToElement(element) {
  var jump = parseInt(element.getBoundingClientRect().top * 0.2);
  document.body.scrollTop += jump;
  document.documentElement.scrollTop += jump;

  if (!element.lastJump || element.lastJump > Math.abs(jump)) {
    element.lastJump = Math.abs(jump);
    setTimeout(function() {
      scrollToElement(element);
    }, 25);
  } else {
    element.lastJump = null;
  }
}

var acumulativeOffset = function(element) {
  var top = 0;

  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top - 50;
};

var quienSoyOffset = acumulativeOffset(document.getElementById("quien-soy"));
var estudiosOffset = acumulativeOffset(document.getElementById("estudios"));
var experienciaOffset = acumulativeOffset(
  document.getElementById("experiencia")
);
var sobreMiOffset = acumulativeOffset(document.getElementById("sobre-mi"));
var contactoOffset = acumulativeOffset(document.getElementById("contacto"));

window.addEventListener("scroll", changeMenuStyle);

var previous;

function changeMenuStyle(event) {
  var pageOffset = window.pageYOffset;

  if (pageOffset >= 0 && pageOffset < quienSoyOffset) {
    if (!previous || previous !== 1) {
      previous = 1;
    } else {
      return false;
    }

    deleteActiveClass();
    setActiveItem("a[href='#']");
  } else if (pageOffset >= quienSoyOffset && pageOffset < estudiosOffset) {
    if (!previous || previous !== 2) {
      previous = 2;
    } else {
      return false;
    }

    deleteActiveClass();
    setActiveItem("a[href$='quien-soy']");
  } else if (pageYOffset >= estudiosOffset && pageYOffset < experienciaOffset) {
    if (!previous || previous !== 3) {
      previous = 3;
    } else {
      return false;
    }

    deleteActiveClass();
    setActiveItem("a[href$='estudios']");
  } else if (pageYOffset >= experienciaOffset && pageYOffset < sobreMiOffset) {
    if (!previous || previous !== 4) {
      previous = 4;
    } else {
      return false;
    }

    deleteActiveClass();
    setActiveItem("a[href$='experiencia']");
  } else if (pageYOffset >= sobreMiOffset && pageYOffset < contactoOffset) {
    if (!previous || previous !== 5) {
      previous = 5;
    } else {
      return false;
    }

    deleteActiveClass();
    setActiveItem("a[href$='sobre-mi']");
  } else if (pageYOffset >= contactoOffset) {
    if (!previous || previous !== 6) {
      previous = 6;
    } else {
      return false;
    }

    deleteActiveClass();
    setActiveItem("a[href$='contacto']");
  }
}

function setActiveItem(selector) {
  document
    .querySelector(selector)
    .parentNode.classList.add("navbar__item--active");
}
