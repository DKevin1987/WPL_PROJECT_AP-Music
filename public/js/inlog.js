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

  // inlog.ts
  var require_inlog = __commonJS({
    "inlog.ts"() {
      init_funcs();
      var inlogInputCheck = document.getElementById("inlogInputCheck");
      var userEmail_input = document.getElementById("useremail");
      var userPasword_input = document.getElementById("userpasword");
      var errorEmailPass = document.getElementById("email_pass_error");
      var emptyfields = document.getElementById("emptyfields");
      var errorButton = document.getElementById("buttonError");
      var inlogButton = document.getElementById("inlogButton");
      async function login() {
        hide_error();
        let userEmail = userEmail_input.value;
        let userPasword = userPasword_input.value;
        if (userEmail === "" || userPasword === "") {
          inlogInputCheck.classList.remove("hidden");
          emptyfields.classList.remove("hidden");
          return;
        }
        const user = {
          email: userEmail,
          password: userPasword
        };
        const responds = await post_request("/api/login", user);
        if (responds.ok) {
          window.location.href = responds.url;
        } else {
          console.log(responds.body);
          inlogInputCheck.classList.remove("hidden");
          errorEmailPass.classList.remove("hidden");
        }
      }
      inlogButton.addEventListener("click", login);
      function hide_error() {
        inlogInputCheck.classList.add("hidden");
        errorEmailPass.classList.add("hidden");
        emptyfields.classList.add("hidden");
      }
      errorButton.addEventListener("click", (event) => {
        event.preventDefault();
        hide_error();
      });
      var resetPaswordSection = document.getElementById(".sectionPaswordReset");
      var buttonRecovery = document.getElementById("buttonRecovery");
      var buttonResetCancle = document.getElementById("buttonCancel");
      buttonRecovery.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("aanvraag gedaan");
        resetPaswordSection.classList.remove("hidden");
      });
      buttonResetCancle.addEventListener("click", (event) => {
        resetPaswordSection.classList.add("hidden");
      });
    }
  });
  require_inlog();
})();
