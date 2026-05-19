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

  // game.ts
  var require_game = __commonJS({
    "game.ts"() {
      init_funcs();
      init_header();
      add_search_event();
      add_menu_event();
      add_input_event();
      var user = void 0;
      async function get_user() {
        const result = await get_request("/api/mood");
        if (!result.ok) return void 0;
        user = await result.json();
        set_user_mood(user.mood);
        return user;
      }
      get_user();
      var game_section = document.getElementById("game_section");
      var songs = [];
      var currentIndex = 0;
      var score = 0;
      var isPlaying = false;
      var previewTimeout = null;
      var gameAudio = new Audio();
      var PREVIEW_MS = 5e3;
      var cover_container;
      var play_btn;
      var play_icon;
      var feedback_text;
      var score_value;
      var song_counter;
      var reset_btn;
      function bind_dom() {
        cover_container = document.getElementById("cover_container");
        play_btn = document.getElementById("play_btn");
        play_icon = document.getElementById("play_icon");
        feedback_text = document.getElementById("feedback_text");
        score_value = document.getElementById("score_value");
        song_counter = document.getElementById("song_counter");
        reset_btn = document.getElementById("reset_btn");
        play_btn.addEventListener("click", on_play_click);
        reset_btn.addEventListener("click", () => load_songs());
      }
      async function load_songs() {
        const response = await get_request("/api/game/songs");
        if (!response.ok) {
          show_feedback("Kon geen nummers laden. Probeer opnieuw.", false);
          return;
        }
        songs = await response.json();
        currentIndex = 0;
        score = 0;
        if (score_value) score_value.innerText = "0";
        show_current_song();
      }
      function show_current_song() {
        stop_game_audio();
        cover_container.innerHTML = '<span class="question-mark">?</span>';
        cover_container.style.border = "3px dashed #b07a7a";
        hide_feedback();
        song_counter.innerText = `${currentIndex + 1} / ${songs.length}`;
        gameAudio.src = songs[currentIndex].preview;
        fill_options();
      }
      function fill_options() {
        const decoys = songs.filter((_, i) => i !== currentIndex).sort(() => Math.random() - 0.5).slice(0, 4);
        const options = [songs[currentIndex], ...decoys].sort(() => Math.random() - 0.5);
        const container = document.getElementById("song_options_container");
        container.innerHTML = "";
        options.forEach((track) => {
          const btn = document.createElement("button");
          btn.className = "option-btn";
          btn.innerText = `${track.artist} - ${track.title}`;
          btn.addEventListener("click", () => check_guess(track));
          container.appendChild(btn);
        });
      }
      function on_play_click() {
        isPlaying ? stop_game_audio() : start_preview();
      }
      function start_preview() {
        gameAudio.currentTime = 0;
        gameAudio.play();
        play_icon.src = "/assets/icons/pause-icon.png";
        isPlaying = true;
        previewTimeout = setTimeout(stop_game_audio, PREVIEW_MS);
      }
      function stop_game_audio() {
        gameAudio.pause();
        if (previewTimeout) {
          clearTimeout(previewTimeout);
          previewTimeout = null;
        }
        if (play_icon) play_icon.src = "/assets/icons/playIcon.png";
        isPlaying = false;
      }
      function check_guess(selected) {
        if (songs.length === 0) return;
        const song = songs[currentIndex];
        const is_correct = selected.title === song.title && selected.artist === song.artist;
        const btns = document.querySelectorAll(".option-btn");
        btns.forEach((btn) => btn.disabled = true);
        if (is_correct) {
          handle_correct(song);
        } else {
          show_feedback("Fout! Probeer opnieuw.", false);
        }
      }
      function handle_correct(song) {
        score++;
        score_value.innerText = String(score);
        cover_container.style.border = "none";
        cover_container.innerHTML = `<img src="${song.image}" alt="${song.title}">`;
        stop_game_audio();
        show_feedback(`Juist! Het was ${song.artist} - ${song.title}.`, true);
        if (user) {
          post_request("/api/mood", { increment: 1 }).catch(() => {
          });
        }
        setTimeout(next_song, 3e3);
      }
      function next_song() {
        currentIndex = (currentIndex + 1) % songs.length;
        show_current_song();
      }
      function show_feedback(message, correct) {
        feedback_text.innerText = message;
        feedback_text.className = `feedback ${correct ? "correct" : "wrong"}`;
      }
      function hide_feedback() {
        feedback_text.className = "feedback hidden";
        feedback_text.innerText = "";
      }
      bind_dom();
      load_songs();
    }
  });
  require_game();
})();
