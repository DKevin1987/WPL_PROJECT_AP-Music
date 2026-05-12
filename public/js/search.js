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

  // search.ts
  var require_search = __commonJS({
    "search.ts"() {
      init_funcs();
      init_header();
      init_playbar();
      var start_pause_icon = document.getElementById("start_pause_icon");
      var zoekResultaat = document.getElementById("zoekResultaat");
      var artist_bar = document.getElementById("artist_bar");
      var titel_bar = document.getElementById("titel_bar");
      var music_logo = document.getElementById("music_cover");
      var user = void 0;
      async function get_user() {
        console.log("getting mood");
        const result = await fetch("/api/mood", {
          method: "GET"
          // HTTP method
        });
        if (!result.ok) {
          return void 0;
        }
        console.log(result.body);
        user = await result.json();
        console.log(" got it?");
        set_user_mood(user.mood);
        return user;
      }
      get_user();
      add_input_event();
      previous_next_addEvent(change_play_pos);
      start_pause_addEvent(play_pause);
      add_search_event();
      add_menu_event();
      function like(event, index) {
        const imgelm = event.children[0];
        playfeed[index].liked = !playfeed[index].liked;
        imgelm.src = playfeed[index].liked ? "/assets/icons/redHeart.png" : "/assets/icons/heart.png";
        const response = {
          track_id: playfeed[index].id,
          added_on: /* @__PURE__ */ new Date(),
          label: ""
        };
        playfeed[index].liked ? post_request("/api/like/like", response) : delete_request(`/api/like/dislike/${playfeed[index].id}`);
      }
      async function add_tracks_to_playlist(tracks) {
        tracks.forEach((track, index) => {
          const liked = track.liked ? "/assets/icons/redHeart.png" : "/assets/icons/leegHart.png";
          const track_template = `<div class="search_liedje">
                <img src="${track.image}" alt="cover">
                
                <h2 class="aanbeveling-artiest">${track.artist}</h2>
                <p class="aanbeveling-title">${track.title}</p>

                <button  class="like" >
                    <img src="${liked}" alt="">    
                </button>
                <button>
                    <img src="/assets/icons/playIcon.png" alt="">    
                </button>
            </div>`;
          zoekResultaat.innerHTML += track_template;
        });
        const track_divs = document.getElementsByClassName("search_liedje");
        for (let i = 0; i < track_divs.length; i++) {
          const like_button = track_divs[i].children[3];
          const set_music_button = track_divs[i].children[4];
          set_music_button.addEventListener("click", create_func_with_one_param(set_music, i));
        }
        const like_buttons = document.getElementsByClassName("like");
        console.log(like_buttons);
        set_events_to_button_with_index_param(like_buttons, like);
      }
      var audio = new Audio();
      var play_pos = 0;
      var playfeed = [];
      async function main() {
        const url = window.location.href;
        const lastSlash = url.lastIndexOf("/");
        const result = url.slice(lastSlash + 1);
        const response = await get_request("/api/search/" + result);
        console.log(result);
        if (!response.ok) {
          playfeed = [];
        } else {
          playfeed = await response.json();
          if (playfeed.length > 0) {
            audio.src = playfeed[0].preview;
          }
        }
        console.log(playfeed);
        await add_tracks_to_playlist(playfeed);
        set_selected();
        audio.addEventListener("ended", function() {
          change_play_pos(true);
        });
      }
      main();
      function set_selected() {
        const tracks = zoekResultaat.children;
        for (let i = 0; i < tracks.length; i++) {
          tracks[i].classList.remove("selected");
          const img_tag2 = tracks[i].children[4].children[0];
          img_tag2.src = "/assets/icons/playIcon.png";
        }
        tracks[play_pos].classList.add("selected");
        const img_tag = tracks[play_pos].children[4].children[0];
        img_tag.src = start_pause_icon.src;
        console.log(playfeed);
        artist_bar.innerText = playfeed[play_pos].artist;
        titel_bar.innerText = playfeed[play_pos].title;
        music_logo.src = playfeed[play_pos].image;
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
      function change_play_pos(if_forward) {
        play_pos += if_forward ? 1 : -1;
        if (playfeed.length == play_pos) {
          play_pos = 0;
        }
        if (play_pos == -1) {
          play_pos = 0;
        }
        zoekResultaat.children[play_pos].scrollIntoView({ behavior: "smooth" });
        audio.src = playfeed[play_pos].preview;
        audio.play();
        start_pause_icon.src = audio.paused ? "/assets/icons/playIcon.png" : "/assets/icons/pauseIcon.png";
        set_selected();
      }
      function play_pause() {
        audio.paused ? audio.play() : audio.pause();
        start_pause_icon.src = audio.paused ? "/assets/icons/playIcon.png" : "/assets/icons/pauseIcon.png";
        set_selected();
      }
    }
  });
  require_search();
})();
