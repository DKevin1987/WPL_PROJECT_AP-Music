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
  async function delete_request(route) {
    let response = null;
    response = await fetch(route, {
      method: "DELETE",
      // HTTP method
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    return response;
  }
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

  // detailspage.ts
  var require_detailspage = __commonJS({
    "detailspage.ts"() {
      init_funcs();
      init_header();
      add_search_event();
      add_menu_event();
      add_input_event();
      var track_details = document.getElementById("track_details");
      var like_button = document.getElementById("like_button");
      var if_liked = track_details.getAttribute("if_liked");
      var img_elm = like_button.children[0];
      img_elm.src = if_liked?.toLowerCase() == "true" ? "/assets/icons/redHeart.png" : "/assets/icons/heart.png";
      like_button.addEventListener("click", (event) => {
        console.log("event some");
        const if_liked_string = track_details.getAttribute("if_liked") == "true" ? "false" : "true";
        const if_liked2 = if_liked_string === "true" ? true : false;
        img_elm.src = if_liked2 ? "/assets/icons/redHeart.png" : "/assets/icons/heart.png";
        track_details.setAttribute("if_liked", if_liked_string);
        const id = track_details.getAttribute("track_id");
        const response = {
          track_id: Number(id),
          added_on: /* @__PURE__ */ new Date(),
          label: ""
        };
        if_liked2 ? post_request("/api/like/like", response) : delete_request(`/api/like/dislike/${id}`);
      });
    }
  });
  require_detailspage();
})();
