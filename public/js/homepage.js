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
  function set_events_to_button_with_index_param(buttons, func) {
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      button.addEventListener("click", function() {
        func(button, i);
      });
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

  // shared/playbar.ts
  function previous_next_addEvent(func) {
    const previous_event = create_func_with_one_param(func, false);
    const next_event = create_func_with_one_param(func, true);
    previousbtn.addEventListener("click", previous_event);
    nextbtn.addEventListener("click", next_event);
  }
  function start_pause_addEvent(func) {
    start_pausebtn.addEventListener("click", func);
  }
  var previousbtn, start_pausebtn, nextbtn;
  var init_playbar = __esm({
    "shared/playbar.ts"() {
      "use strict";
      init_funcs();
      previousbtn = document.getElementById("previous");
      start_pausebtn = document.getElementById("start_pause");
      nextbtn = document.getElementById("next");
    }
  });

  // homepage.ts
  var require_homepage = __commonJS({
    "homepage.ts"() {
      init_funcs();
      init_header();
      init_playbar();
      previous_next_addEvent(change_play_pos);
      start_pause_addEvent(play_pause);
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
      var start_pause_icon = document.getElementById("start_pause_icon");
      var aanbeveling_div = document.getElementById("aanbeveling_div");
      var artist_bar = document.getElementById("artist_bar");
      var titel_bar = document.getElementById("titel_bar");
      var music_logo = document.getElementById("music_cover");
      function like(event, index) {
        const imgelm = event.children[0];
        playfeed[index].liked = !playfeed[index].liked;
        imgelm.src = playfeed[index].liked ? "./assets/icons/redHeart.png" : "./assets/icons/heart.png";
        const response = {
          track_id: playfeed[index].id,
          added_on: /* @__PURE__ */ new Date(),
          label: ""
        };
        playfeed[index].liked ? post_request("/api/like/like", response) : delete_request(`/api/like/${playfeed[index].id}`);
      }
      function set_music(pos) {
        if (pos == play_pos) {
          play_pause();
        } else {
          play_pos = pos;
          audio.src = playfeed[pos].preview;
          audio.play();
        }
        start_pause_icon.src = audio.paused ? "/assets/icons/playIcon.png" : "/assets/icons/pauseIcon.png";
        set_selected();
      }
      function add_tracks_to_playlist(tracks) {
        tracks.forEach((track, index) => {
          const if_liked = playfeed[index].liked ? "/assets/icons/redHeart.png" : "/assets/icons/heart.png";
          const track_template = `<div class="aanbevelingLiedje">
                <img src="${track.image}" alt="cover">
                
                <div class="album-info">
                    <h2 class="aanbeveling-artiest">${track.artist}</h2>
                    <p class="aanbeveling-title">${track.title}</p>
                </div>

                <div class="album_options">
                    <button onclick="set_music(${index})" >
                        <img draggable="false" src="./assets/icons/playIcon.png" alt="">    
                    </button>
                    <button>
                        <img draggable="false" src="./assets/icons/plus-icon.png" alt="">    
                    </button>
                    <button class="info_button" track_id="${track.id}" >
                        <img draggable="false" src="./assets/icons/info.png" alt="">    
                    </button>
                    <button class="like">
                        <img draggable="false" src="${if_liked}" alt="">    
                    </button>
                </div>
            </div>`;
          aanbeveling_div.innerHTML += track_template;
        });
        const album_options = document.getElementsByClassName("album_options");
        for (let i = 0; i < album_options.length; i++) {
          const button = album_options[i].children[0];
          button.addEventListener("click", create_func_with_one_param(set_music, i));
        }
        const like_buttons = document.getElementsByClassName("like");
        set_events_to_button_with_index_param(like_buttons, like);
        const info_buttons = document.getElementsByClassName("info_button");
        for (let i = 0; i < info_buttons.length; i++) {
          info_buttons[i].addEventListener("click", (event) => {
            window.location.href = `/details/${info_buttons[i].getAttribute("track_id")}`;
          });
        }
      }
      function set_selected() {
        for (let i = 0; i < aanbeveling_div.children.length; i++) {
          aanbeveling_div.children[i].classList.remove("selected");
          const img_elm2 = aanbeveling_div.children[i].children[2].children[0].children[0];
          img_elm2.src = "./assets/icons/playIcon.png";
        }
        aanbeveling_div.children[play_pos].classList.add("selected");
        const img_elm = aanbeveling_div.children[play_pos].children[2].children[0].children[0];
        artist_bar.innerText = playfeed[play_pos].artist;
        titel_bar.innerText = playfeed[play_pos].title;
        music_logo.src = playfeed[play_pos].image;
        img_elm.src = start_pause_icon.src;
      }
      var audio = new Audio();
      var play_pos = 0;
      var playfeed = [];
      async function main() {
        const response = await get_request("/api/get_playlist");
        if (!response.ok) {
          playfeed = [];
        } else {
          playfeed = await response.json();
          console.log(playfeed);
          audio.src = playfeed[0].preview;
        }
        add_tracks_to_playlist(playfeed);
        console.log(5);
        set_selected();
        audio.addEventListener("ended", function() {
          change_play_pos(true);
        });
      }
      main();
      async function change_play_pos(if_forward) {
        console.log("change_play_pos");
        console.log(audio.src);
        play_pos += if_forward ? 1 : -1;
        if (playfeed.length == play_pos) {
          play_pos = 0;
        }
        if (play_pos == -1) {
          play_pos = 0;
        }
        aanbeveling_div.children[play_pos].scrollIntoView({ behavior: "smooth" });
        audio.src = playfeed[play_pos].preview;
        await audio.play();
        start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png";
        console.log(2);
        set_selected();
      }
      async function play_pause() {
        audio.paused ? await audio.play() : audio.pause();
        start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png";
        console.log(3);
        set_selected();
      }
    }
  });
  require_homepage();
})();
