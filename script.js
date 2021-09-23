"use strict";
// Slider
const slider = document.querySelector(".slider");
if (slider) {
  const slides = document.querySelectorAll(".slide");
  const btnPause = document.querySelector(".btn-pause");
  let currentSlide = 0;
  const maxSlides = slides.length;
  let sliderRunning = true;
  let run;
  const pausePlayDelay = 500;
  const nextSlideDelay = 5000;
  // slider headline
  const omrade = document.getElementById("område");
  const omradenOrd = ["Problemlösning", "Effektivisering", "Spelutveckling"];
  const delayTyping = 200;
  let bokstavsIndex = 0;
  let typeInterval;

  const typeText = function (word) {
    if (bokstavsIndex < omradenOrd[word].length) {
      omrade.textContent += omradenOrd[word].charAt(bokstavsIndex);
      bokstavsIndex++;
    } else {
      bokstavsIndex = 0;
      clearInterval(typeInterval);
    }
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    omrade.textContent = "-";
    typeInterval = setInterval(function () {
      typeText(currentSlide);
    }, delayTyping);
  };

  slider.addEventListener("click", function () {
    if (sliderRunning) {
      btnPause.style.display = "block";
      sliderRunning = false;
      clearInterval(run);
      clearInterval(typeInterval);
      btnPause.classList.contains("play")
        ? btnPause.classList.remove("play")
        : "";
      btnPause.classList.add("paused");
      setTimeout(function () {
        btnPause.style.display = "none";
      }, pausePlayDelay);
    } else {
      btnPause.style.display = "block";
      setTimeout(function () {
        btnPause.style.display = "none";
      }, pausePlayDelay);
      sliderRunning = true;
      btnPause.classList.contains("paused")
        ? btnPause.classList.remove("paused")
        : "";
      btnPause.classList.add("play");
      nextSlide();
      bokstavsIndex = 0;
      typeText(currentSlide);
      run = setInterval(nextSlide, nextSlideDelay);
    }
  });
  const startTimer = function () {
    run = setInterval(nextSlide, nextSlideDelay);
  };
  startTimer();
}

//Hamburgermeny
let hamburgerMenyUppe = false;

function hamburgerMenuOpenClose() {
  $(".mobile-menu").slideToggle(100, function () {
    if (!hamburgerMenyUppe) {
      $(".page-to-dim").fadeTo(100, 0.1);
      hamburgerMenyUppe = true;
    } else {
      $(".page-to-dim").fadeTo(100, 1);
      hamburgerMenyUppe = false;
    }
    $(".menu-list").toggle();
  });
}
$(".burger-icon").click(function () {
  hamburgerMenuOpenClose();
});

//Smooth-scrolls mobile

$(".logo").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#first-page").offset().top,
    },
    1000
  );
});

$("#startsida").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#first-page").offset().top,
    },
    1000,
    hamburgerMenuOpenClose()
  );
});
$("#om-oss").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#second-page").offset().top,
    },
    1000,
    hamburgerMenuOpenClose()
  );
});
$("#vi-jobbar-inom").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#third-page").offset().top,
    },
    1000,
    hamburgerMenuOpenClose()
  );
});
$("#kontakta-oss").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#fourth-page").offset().top,
    },
    1000,
    hamburgerMenuOpenClose()
  );
});

//Smooth scrolls browser

$(".logo").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#first-page").offset().top,
    },
    1000
  );
});

$("#startsida-browser").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#first-page").offset().top,
    },
    1000
  );
});
$("#om-oss-browser").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#second-page").offset().top,
    },
    1000
  );
});
$("#vi-jobbar-inom-browser").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#third-page").offset().top,
    },
    1000
  );
});
$("#kontakta-oss-browser").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#fourth-page").offset().top,
    },
    1000
  );
});

//deklarera staplarna som ska fyllas
const staplar = $(".skillbox-to-fill");
const procentStapel = function (stapel, procent) {
  staplar[stapel - 1].procent = procent;
};

//hämta enbart siffror från klassen stapel-to-get,
var kunskapsProcent = $(".stapel-procent").map(function () {
  return $(this).text().replace(/[^\d]/g, "");
});
//funktion för att föra in rätt parametrar i procentStapel
for (let i = 1; i < $(".stapel-procent").length + 1; i++) {
  procentStapel(i, kunskapsProcent[i - 1]);
  console.log((i, kunskapsProcent[i - 1]));
}

//funktion för att fylla staplarna
const fyllstapel = function (stapel) {
  let i = 0;
  setInterval(function () {
    if (i >= stapel.procent) return;
    i++;
    stapel.style.width = `${i}%`;
  }, 30);
};
//Skapa en observer callback
const stapelCallback = function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    fyllstapel(e.target);
    egenskapsObserver.unobserve(e.target);
  });
};

//Skapa en observer
const egenskapsObserver = new IntersectionObserver(stapelCallback, {
  root: null,
  threshold: 0.15,
});

// Fyll staplarna
Array.from(staplar).forEach(function (egenskap) {
  egenskapsObserver.observe(egenskap);
});

//AJAX
function getXML() {
  $.ajax({
    type: "GET",
    url: "XMLFile.xml",
    dataType: "xml",

    error: function (e) {
      alert("Det gick inte att läsa XML-filen");
      console.log("XML reading Failed: ", e);
    },

    success: function (xmlData) {
      $(xmlData)
        .find("project")
        .each(function () {
          const manager = $(this).find("manager").text();
          console.log(manager);

          const title = $(this).find("title").text();
          const customer = $(this).find("customer").text();
          const startDate = $(this).find("startDate").text();
          const endDate = $(this).find("endDate").text();
          const image = $(this).find("image").text();
          const description = $(this).find("description").text();

          // add content to the HTML
          let markup = `
          <li>
              <div class="project">
                <img src="images/${image}" alt="" />
                <div class="facts">
                  <h3>${title}</h3>
                  <p>${description}</p>
                  <p><i> Manager: </i></p>
                  <p>${manager}</p>
                  <p><i> Customer: </i></p>
                  <p>${customer}</p>
                  <h5><i>${startDate} - ${endDate}</i></h5>
                </div>
              </div>
            </li>
          `;
          $(".projectlist").append(markup);
        });
    },
  });
}
getXML();

// Validering
const nameField = document.getElementById("Name");
const emailField = document.getElementById("e-mail");
const phoneField = document.getElementById("Phone");
const errorBoxName = document.getElementById("error-name");
const errorBoxEmail = document.getElementById("error-e-mail");
const errorBoxPhone = document.getElementById("error-phone");
const containsNumber = /\d/;
const containsSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g;
const errorSpecialChar = "Du har skrivit otillåtna tecken";
const errorTooManyChar =
  "Du har skrivit för många tecken, max antal tecken är 25";
const errorTooFewChar = "Du har skrivit för få tecken, min antal tecken är 3";
const errorNotAnEmail = "Email-adressen du angivet är ej giltig";
const errorNotaNumber = "Du har angivet tecken som ej är siffror";
const errorContainsNumber =
  "Du har angivet en siffra, endast bokstäver tillåtna";

const invalidateBox = function (box) {
  box.style.border = "2px ridge red";
};
const validateBox = function (field, errorBox) {
  field.style.border = "";
  errorBox.style.display = "none";
};
const displayErrorBox = function (box, error) {
  box.style.display = "inline";
  box.innerHTML = error;
};

const validateName = function (e) {
  const input = document.getElementById("Name").value;

  if (containsSpecialChars.test(input)) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxName, errorSpecialChar);
    return;
  }

  if (input.length < 3) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxName, errorTooFewChar);
    return;
  }
  if (input.length > 25) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxName, errorTooManyChar);
    return;
  }
  if (containsNumber.test(input)) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxName, errorContainsNumber);
    return;
  } else {
    validateBox(e.target, errorBoxName);
  }
};
const validateEmail = function (e) {
  const input = document.getElementById("e-mail").value;
  if (!/[@]/.test(input) || !/[.]/.test(input)) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxEmail, errorNotAnEmail);
    return;
  }
  if (input.length < 3) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxEmail, errorTooFewChar);
    return;
  }
  if (input.length > 25) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxEmail, errorTooManyChar);
    return;
  } else {
    validateBox(e.target, errorBoxEmail);
  }
};
const validatePhone = function (e) {
  const input = document.getElementById("Phone").value;
  if (!/^\d+$/.test(input)) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxPhone, errorNotaNumber);
    return;
  }
  if (input.length < 3) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxPhone, errorTooFewChar);
    return;
  }
  if (input.length > 25) {
    invalidateBox(e.target);
    displayErrorBox(errorBoxPhone, errorTooManyChar);
    return;
  } else {
    validateBox(e.target, errorBoxPhone);
  }
};
if (nameField && emailField && phoneField) {
  nameField.addEventListener("focusout", validateName);
  emailField.addEventListener("focusout", validateEmail);
  phoneField.addEventListener("focusout", validatePhone);
}

// API
let fullscreen = document.querySelector("#third-page");

document.addEventListener(
  "keydown",
  function (e) {
    if (e.keyCode == 13) {
      toggleFullScreen();
    }
  },
  false
);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    fullscreen?.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
