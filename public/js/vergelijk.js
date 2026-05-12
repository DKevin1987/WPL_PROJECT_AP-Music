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

  // vergelijk.ts
  var require_vergelijk = __commonJS({
    "vergelijk.ts"() {
      init_funcs();
      init_header();
      add_search_event();
      add_menu_event();
      add_input_event();
      var user = void 0;
      async function get_user() {
        const result = await get_request(`/api/mood`);
        if (!result.ok) {
          return void 0;
        }
        user = await result.json();
        set_user_mood(user.mood);
        return user;
      }
      get_user();
      var input_one = document.getElementById("one");
      var search_suggestions_one = document.getElementById("search_suggestions_one");
      var input_two = document.getElementById("two");
      var search_suggestions_two = document.getElementById("search_suggestions_two");
      async function search_songs(query) {
        const response = await get_request("/api/search/" + query);
        if (!response.ok) {
          console.log("failed");
          return void 0;
        } else {
          const result = await response.json();
          return result;
        }
      }
      vergelijk_search_event(input_one, search_suggestions_one, input_two, true);
      vergelijk_search_event(input_two, search_suggestions_two, input_one, false);
      function vergelijk_search_event(input_tag, datalist, second_input_tag, first) {
        input_tag.addEventListener("keydown", async (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const track_id_2 = second_input_tag.getAttribute("track_id");
            const text = e.target.value;
            const songs = await search_songs(text);
            if (!songs || songs.length == 0) {
              return;
            }
            if (first) {
              window.location.href = "/vergelijk/?track_one=" + songs[0].id + "&track_two=" + track_id_2;
            } else {
              window.location.href = "/vergelijk/?track_one=" + track_id_2 + "&track_two=" + songs[0].id;
            }
          }
        });
        input_tag.addEventListener("keyup", async (e) => {
          const input_tag2 = e.target;
          console.log("e is pressed");
          const if_songs = await search_songs(input_tag2.value);
          if (!if_songs) {
            console.log("failed");
          } else {
            datalist.innerHTML = "";
            for (const track of if_songs) {
              datalist.innerHTML += `<option value="${track.title}">
`;
            }
          }
        });
      }
    }
  });
  require_vergelijk();
})();
