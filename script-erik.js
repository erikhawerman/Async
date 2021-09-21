$(document).ready(function () {
  //kod här
});
const staplar = Array.from(document.querySelectorAll(".ifylldstapel1"));
const btnSkills = document.getElementById("vad-jag-kan");
const btnMe = document.getElementById("vem-är-jag");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
const egenskaper = document.querySelectorAll(".egenskap-container");

btnSkills.addEventListener("click", function () {
  secondPage.scrollIntoView({ behavior: "smooth" });
});
btnMe.addEventListener("click", function () {
  thirdPage.scrollIntoView({ behavior: "smooth" });
});

const fyllstapel = function (stapel) {
  let i = 0;
  setInterval(function () {
    if (i >= stapel.procent) return;
    i++;
    stapel.style.width = `${i}%`;
  }, 30);
};

const stapelCallback = function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    fyllstapel(e.target);
    observer.unobserve(e.target);
  });
};

const observer = new IntersectionObserver(stapelCallback, {
  root: null,
  threshold: 1,
});
staplar.forEach(function (e) {
  observer.observe(e);
});

const procentStapel = function (stapel, procent) {
  staplar[stapel - 1].procent = procent;
};

procentStapel(1, 75);
procentStapel(2, 50);
procentStapel(3, 25);

//visa egenskaper
const visaEgenskaper = function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    e.target.classList.remove("hidden");
    egenskapsObserver.unobserve(e.target);
  });
};
const egenskapsObserver = new IntersectionObserver(visaEgenskaper, {
  root: null,
  threshold: 0.15,
});

egenskaper.forEach(function (egenskap) {
  egenskapsObserver.observe(egenskap);
});

console.log(egenskaper);

/// NU ÄR DUU TILLBAKA
