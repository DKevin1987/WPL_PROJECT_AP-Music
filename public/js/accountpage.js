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
  async function get_request(route) {
    let response = null;
    response = await fetch(route, {
      method: "GET",
      // HTTP method
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    return response;
  }
  function set_user_mood(mood) {
    switch (mood) {
      case "angry" /* angry */:
        moodIcon.src = "/assets/icons/moods/angry.png";
        break;
      case "sad" /* sad */:
        moodIcon.src = "/assets/icons/moods/sad.png";
        break;
      case "happy" /* happy */:
        moodIcon.src = "/assets/icons/moods/happy.png";
        break;
      case "neutral" /* neutral */:
        moodIcon.src = "/assets/icons/moods/neutral.png";
        break;
      default:
        break;
    }
  }
  function create_func_with_one_param(func, param) {
    function run_func_with_param() {
      return func(param);
    }
    return run_func_with_param;
  }
  function set_events_to_button_with_one_param(buttons, func, attr_name) {
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const attr_value = button.getAttribute(attr_name);
      if (!attr_value) {
        console.log("error");
      } else {
        button.addEventListener("click", create_func_with_one_param(func, attr_value));
      }
    }
  }
  function set_events_to_button(buttons, func) {
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      button.addEventListener("click", func);
    }
  }
  var moodIcon;
  var init_funcs = __esm({
    "shared/funcs.ts"() {
      "use strict";
      init_types();
      moodIcon = document.getElementById("moodIcon");
    }
  });

  // shared/header.ts
  function add_search_event() {
    search_button.addEventListener("click", () => {
      searchbar.classList.toggle("hidden");
      moodIcon_container.classList.toggle("hidden");
      menu_button.classList.toggle("hidden");
    });
  }
  function add_menu_event() {
    menu_button.addEventListener("click", () => {
      dropdownMenu.classList.toggle("hidden");
    });
  }
  function add_input_event() {
    search_input.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const text = e.target.value;
        window.location.href = "/searchpage/" + text;
      }
    });
    search_input.addEventListener("keyup", async (e) => {
      const input_tag = e.target;
      console.log("e is pressed");
      const response = await get_request("/api/search/" + input_tag.value);
      if (!response.ok) {
        console.log("failed");
      } else {
        const result = await response.json();
        console.log(result);
        search_suggestions.innerHTML = "";
        for (const track of result) {
          search_suggestions.innerHTML += `<option value="${track.title}">
`;
        }
      }
    });
  }
  var dropdownMenu, searchbar, search_button, menu_button, search_input, moodIcon_container, search_suggestions;
  var init_header = __esm({
    "shared/header.ts"() {
      "use strict";
      init_funcs();
      dropdownMenu = document.getElementById("dropdownMenu");
      searchbar = document.getElementById("searchbar");
      search_button = document.getElementById("search_button");
      menu_button = document.getElementById("menu_button");
      search_input = document.getElementById("search_input");
      moodIcon_container = document.getElementById("moodIcon_container");
      search_suggestions = document.getElementById("search_suggestions");
    }
  });

  // accountpage.ts
  var require_accountpage = __commonJS({
    "accountpage.ts"() {
      init_funcs();
      init_header();
      var gebruikersnaam = document.getElementById("gebruikersnaam");
      var gebruikers_icon = document.getElementById("gebruikers_icon");
      var beveiligin = document.getElementById("beveiligin");
      var mood = document.getElementById("mood");
      var user_icon = document.getElementById("user_icon");
      var user = void 0;
      async function get_user() {
        const result = await get_request(`/api/mood`);
        if (!result.ok) {
          return;
        }
        user = await result.json();
        set_user_mood(user.mood);
      }
      get_user();
      async function change_mood(mood2) {
        set_user_mood(mood2);
        const result = await post_request(`/api/mood/${mood2}`, {});
        console.log(await result.json());
      }
      var mood_buttons = document.getElementsByClassName("change_mood");
      set_events_to_button_with_one_param(mood_buttons, change_mood, "mood");
      function view(text) {
        gebruikersnaam.classList.add("hidden");
        gebruikers_icon.classList.add("hidden");
        beveiligin.classList.add("hidden");
        mood.classList.add("hidden");
        switch (text) {
          case "gebruikersnaam":
            gebruikersnaam.classList.remove("hidden");
            break;
          case "gebruikers_icon":
            gebruikers_icon.classList.remove("hidden");
            break;
          case "beveiligin":
            beveiligin.classList.remove("hidden");
            break;
          case "mood":
            mood.classList.remove("hidden");
            break;
        }
      }
      function change_user_icon() {
        const img_elm = this.children[0];
        user_icon.src = img_elm.src;
      }
      var user_buttons = document.getElementsByClassName("change_user");
      set_events_to_button(user_buttons, change_user_icon);
      view("gebruikersnaam");
      var sidebar_buttons = document.getElementsByClassName("view_button");
      set_events_to_button_with_one_param(sidebar_buttons, view, "view");
      add_search_event();
      add_menu_event();
      add_input_event();
    }
  });
  require_accountpage();
})();
