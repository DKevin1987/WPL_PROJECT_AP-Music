"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // shared/types.ts
  var init_types = __esm({
    "shared/types.ts"() {
      "use strict";
    }
  });

  // shared/funcs.ts
  async function post_request(route, body) {
    let response = null;
    response = await fetch(route, {
      method: "POST",
      // HTTP method
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      credentials: "include"
    });
    return response;
  }
  var moodIcon;
  var init_funcs = __esm({
    "shared/funcs.ts"() {
      "use strict";
      init_types();
      moodIcon = document.getElementById("moodIcon");
    }
  });

  // registratie.ts
  var require_registratie = __commonJS({
    "registratie.ts"() {
      init_funcs();
      var registrationform = document.getElementById("registrationform");
      var usernameInput = document.getElementById("usernameInput");
      var emailInput = document.getElementById("emailInput");
      var paswordInput = document.getElementById("paswordInput");
      var paswordInputCheck = document.getElementById("paswordInputCheck");
      var buttonRegister = document.getElementById("buttonRegister");
      var registratieInputCheck = document.getElementById("registratieInputCheck");
      var usernameCheck = document.getElementById("usernameCheck");
      var emailCheckValid = document.getElementById("emailCheckValid");
      var emailCheck = document.getElementById("emailCheck");
      var paswordCheck = document.getElementById("paswordCheck");
      var paswordCheckValid = document.getElementById("paswordCheckValid");
      var error_notification_button = document.getElementById("buttonErrorRegistratie");
      error_notification_button.addEventListener("click", clear_error);
      function clear_error() {
        registratieInputCheck.classList.add("hidden");
        usernameCheck.classList.add("hidden");
        emailCheckValid.classList.add("hidden");
        emailCheck.classList.add("hidden");
        paswordCheck.classList.add("hidden");
        paswordCheckValid.classList.add("hidden");
      }
      async function register() {
        const usernameInputVal = usernameInput.value;
        const emailInputVal = emailInput.value;
        const paswordInputVal = paswordInput.value;
        const paswordInputCheckVal = paswordInputCheck.value;
        const email_pattern = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;
        const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        clear_error();
        if (usernameInputVal === "") {
          usernameCheck.classList.remove("hidden");
        } else if (!email_pattern.test(emailInputVal)) {
          emailCheckValid.classList.remove("hidden");
        } else if (!password_pattern.test(paswordInputVal)) {
          paswordCheck.classList.remove("hidden");
        } else if (paswordInputVal != paswordInputCheckVal) {
          paswordCheckValid.classList.remove("hidden");
        } else {
          const user = {
            "email": emailInputVal,
            "username": usernameInputVal,
            "password": paswordInputVal
          };
          const responds = await post_request("/api/register", user);
          if (responds.ok) {
            window.location.href = responds.url;
            return;
          } else {
            emailCheck.classList.remove("hidden");
          }
        }
        registratieInputCheck.classList.remove("hidden");
      }
      buttonRegister.addEventListener("click", register);
    }
  });
  require_registratie();
})();
