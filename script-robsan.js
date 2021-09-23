const lådor = document.querySelectorAll(".kunskapsLåda");
const bars = document.querySelectorAll(".bar");
const btnSkills = document.getElementById("skills");
const btnMe = document.getElementById("hittaMig");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
// scrollar i sidorna vid klick på knapparna
btnSkills.addEventListener("click", function () {
  secondPage.scrollIntoView({ behavior: "smooth" });
});
btnMe.addEventListener("click", function () {
  thirdPage.scrollIntoView({ behavior: "smooth" });
});
// fyller kunskapsbaren i procent med hjälp av hoverfunctionen, och klick på mobile first
const procentBar = function (bar, procent) {
  bars[bar - 1].procent = procent;
};
procentBar(1, 59);
procentBar(2, 42);
procentBar(3, 65);
procentBar(4, 83);
procentBar(5, 73);

lådor.forEach(function (låda, i) {
  låda.addEventListener("mouseenter", function () {
    let index = 0;
    setInterval(function () {
      if (index >= bars[i].procent) return;
      index++;
      bars[i].style.width = `${index}%`;
    }, 10);
  });
});
