$(document).ready(function () {
  const btnSkills = document.getElementById("vad-jag-kan");
  const btnMe = document.getElementById("vem-är-jag");
  const secondPage = document.querySelector(".second-page");
  const thirdPage = document.querySelector(".third-page");
  const egenskaper = document.querySelectorAll(".egenskap-container");

  btnSkills.addEventListener("click", function () {
    secondPage.scrollIntoView({ behavior: "smooth" });
  });
  btnMe.addEventListener("click", function () {
    thirdPage.scrollIntoView({ behavior: "smooth" });
  });

  //visa egenskaper
  const visaEgenskaper = function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove("hidden");
      observerEgenskaper.unobserve(e.target);
    });
  };
  const observerEgenskaper = new IntersectionObserver(visaEgenskaper, {
    root: null,
    threshold: 0.15,
  });

  egenskaper.forEach(function (egenskap) {
    observerEgenskaper.observe(egenskap);
  });

  console.log(egenskaper);
});
