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
  console.log(entries);
  const [stapel1, stapel2, stapel3] = entries;
  if (stapel1.isIntersecting) {
    fyllstapel(stapel1.target);
    observer.unobserve(stapel1.target);
  }
  if (stapel2.isIntersecting) {
    fyllstapel(stapel2.target);
    observer.unobserve(stapel2.target);
  }
  if (stapel3.isIntersecting) {
    fyllstapel(stapel3.target);
    observer.unobserve(stapel3.target);
  }
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
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden");
  this.unobserve(entry.target);
};
const egenskapsObserver = new IntersectionObserver(visaEgenskaper, {
  root: null,
  threshold: 0.15,
});
const egenskapsObserver2 = new IntersectionObserver(visaEgenskaper, {
  root: null,
  threshold: 0.14,
});
egenskaper.forEach(function (egenskap, i) {
  if (i % 2 === 0) egenskapsObserver.observe(egenskap);
  else {
    egenskapsObserver2.observe(egenskap);
  }
});

console.log(egenskaper);

/// NU ÄR DUU TILLBAKA
