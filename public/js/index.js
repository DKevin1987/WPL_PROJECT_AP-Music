"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // index.ts
  var require_index = __commonJS({
    "index.ts"() {
      var projectBtns = document.querySelectorAll(".projectkeuze-button");
      var errorMenu = document.getElementById("inlogErrorBox");
      var okBtn = document.querySelector(".buttonError");
      var inlogBtn = document.querySelector(".buttonInlog");
      var projectkeuze_button = document.querySelector(".projectkeuze-button-ToHome");
      projectBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          errorMenu.classList.remove("hidden");
        });
      });
      okBtn.addEventListener("click", () => {
        errorMenu.classList.add("hidden");
      });
      inlogBtn.addEventListener("click", () => {
        window.location.href = "inlog.html";
      });
      projectkeuze_button.addEventListener("click", () => {
        window.location.href = "inlog.html";
      });
    }
  });
  require_index();
})();
