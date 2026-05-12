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
    }
  });
  require_registratie();
})();
