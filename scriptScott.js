$(document).ready(function () {
  //Funktion för att splitta stringar i arrays, följt av for-loopar med delay för att skriva in det
  //När första arrayen har skrivits ut så startar vi en ny funktion som sätter texten till inget
  //och startar en ny for-loop som skriver in nästa array, följt av en timeout på 4s som sedan callar
  //hela denna funktion igen.
  //Denna kod fungerar inte om arrayerna blir för långa, då timeouten är hårdkodad på 4s. (Går självklart att manuellt änra det dock)
  function writeName() {
    $(".name-written").text("");
    const arrayen2 = "Systemutvecklare".split("");
    const arrayen = "Scott Jander".split("");
    const a = arrayen.values();
    const a2 = arrayen2.values();
    for (let i = 0; i < arrayen.length; i++) {
      setTimeout(function () {
        $(`.name-written`).append(a.next().value);
      }, 150 * i);
    }
    setTimeout(function () {
      $(".name-written").text("");

      for (let i = 0; i < arrayen2.length; i++) {
        setTimeout(function () {
          $(`.name-written`).append(a2.next().value);
        }, 150 * i);
      }
      setTimeout(function () {
        writeName();
      }, 4000);
    }, 4000);
  }
  writeName();
});
