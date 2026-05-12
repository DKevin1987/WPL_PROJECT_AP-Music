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
  function create_func_with_one_param(func, param) {
    function run_func_with_param() {
      return func(param);
    }
    return run_func_with_param;
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

  // collectie.ts
  var require_collectie = __commonJS({
    "collectie.ts"() {
      init_funcs();
      init_header();
      init_playbar();
      var music_grid = document.getElementById("music_grid");
      add_search_event();
      add_menu_event();
      add_input_event();
      previous_next_addEvent(change_play_pos);
      start_pause_addEvent(play_pause);
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
      var artist_bar = document.getElementById("artist_bar");
      var titel_bar = document.getElementById("titel_bar");
      var music_logo = document.getElementById("music_cover");
      function set_selected() {
        for (let i = 0; i < music_grid.children.length; i++) {
          music_grid.children[i].classList.remove("selected");
          const img_elm2 = music_grid.children[i].children[1].children[0];
          img_elm2.src = "/assets/icons/playIcon.png";
        }
        const selected_div = music_grid.children[play_pos];
        selected_div.classList.add("selected");
        const img_elm = selected_div.children[1].children[0];
        img_elm.src = start_pause_icon.src;
        artist_bar.innerText = playfeed[play_pos].artist;
        titel_bar.innerText = playfeed[play_pos].title;
        music_logo.src = playfeed[play_pos].image;
      }
      async function add_tracks_to_collection(tracks) {
        music_grid.innerHTML = "";
        tracks.forEach((track, index) => {
          const track_template = `<div class="track">
                <img src="${track.image}" alt="">
                <button class="play_pause">
                    <img  src="/assets/icons/playIcon.png" alt="">
                </button>
                <div class="cover_buttons">
                    <div>
                        <h3>${track.title}</h3>
                        <p>${track.artist}</p>
                    </div>
                    <div class="img_cont">
                        <img src="/assets/icons/info.png" alt="">
                    </div>
                    
                </div>
            </div>`;
          music_grid.innerHTML += track_template;
        });
        const play_buttons = document.getElementsByClassName("play_pause");
        for (let i = 0; i < play_buttons.length; i++) {
          play_buttons[i].addEventListener("click", create_func_with_one_param(set_music, i));
        }
      }
      async function set_music(pos) {
        if (pos == play_pos) {
          await play_pause();
        } else {
          play_pos = pos;
          audio.src = playfeed[pos].preview;
          await audio.play();
        }
        start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png";
        set_selected();
      }
      async function play_pause() {
        audio.paused ? await audio.play() : audio.pause();
        start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png";
        set_selected();
      }
      var audio = new Audio();
      var play_pos = 0;
      var playfeed = [];
      var all_playfeed = [];
      async function main() {
        const response = await get_request("/api/collectie");
        if (!response.ok) {
          playfeed = [];
          return;
        } else {
          all_playfeed = await response.json();
          playfeed = all_playfeed;
          audio.src = playfeed[0].preview;
        }
        add_tracks_to_collection(playfeed);
        set_selected();
        audio.addEventListener("ended", function() {
          change_play_pos(true);
        });
      }
      main();
      var sortby = document.getElementById("sortby");
      var sort_param = "";
      sortby.addEventListener("change", async (event) => {
        const target = event.target;
        sort_param = "sortby=" + target.value;
        const response = await get_request("/api/collectie?" + sort_param);
        if (!response.ok) {
          playfeed = [];
          return;
        } else {
          all_playfeed = await response.json();
          playfeed = all_playfeed;
          audio.src = playfeed[0].preview;
          add_tracks_to_collection(playfeed);
          await set_music(0);
          await play_pause();
        }
      });
      var start_pause_icon = document.getElementById("start_pause_icon");
      async function change_play_pos(if_forward) {
        play_pos += if_forward ? 1 : -1;
        if (playfeed.length == play_pos) {
          play_pos = 0;
        }
        if (play_pos == -1) {
          play_pos = 0;
        }
        music_grid.children[play_pos].scrollIntoView({ behavior: "smooth" });
        audio.src = playfeed[play_pos].preview;
        await audio.play();
        start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png";
        set_selected();
      }
      var artist_input = document.getElementById("artist_input");
      var artist_datalist = document.getElementById("artist_datalist");
      var label_input = document.getElementById("label_input");
      var label_datalist = document.getElementById("label_datalist");
      function filter_all() {
        function filter_playfeed(input_tag_p, datalist, if_artist_or_label) {
          console.log(input_tag_p.value);
          if (input_tag_p.value == "") {
            return console.log("stopped");
          }
          const pattern = new RegExp(input_tag_p.value, "gi");
          playfeed = all_playfeed.filter((track) => {
            const result = if_artist_or_label ? pattern.test(track.artist) : pattern.test(track.label);
            return result;
          });
          datalist.innerHTML = "";
          playfeed.forEach((track) => datalist.innerHTML += if_artist_or_label ? `<option value="${track.artist}">
` : `<option value="${track.label}">
`);
        }
        playfeed = all_playfeed;
        filter_playfeed(artist_input, artist_datalist, true);
        filter_playfeed(label_input, label_datalist, false);
        audio.src = playfeed[0].preview;
        add_tracks_to_collection(playfeed);
        set_music(0);
        play_pause();
      }
      artist_input.addEventListener("keyup", filter_all);
      label_input.addEventListener("keyup", filter_all);
    }
  });
  require_collectie();
})();
