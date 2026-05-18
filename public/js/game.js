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
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    return response;
  }
  async function post_request(route, body) {
    let response = null;
    response = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include"
    });
    return response;
  }
  async function get_request(route) {
    let response = null;
    response = await fetch(route, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    return response;
  }
  function set_user_mood(mood) {
    switch (mood) {
      case "angry":
        moodIcon.src = "/assets/icons/moods/angry.png";
        break;
      case "sad":
        moodIcon.src = "/assets/icons/moods/sad.png";
        break;
      case "happy":
        moodIcon.src = "/assets/icons/moods/happy.png";
        break;
      case "neutral":
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
      const response = await get_request("/api/search/" + input_tag.value);
      if (!response.ok) {
        console.log("failed");
      } else {
        const result = await response.json();
        search_suggestions.innerHTML = "";
        for (const track of result) {
          search_suggestions.innerHTML += `<option value="${track.title}">\n`;
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

  // game.ts
  var require_game = __commonJS({
    "game.ts"() {
      init_funcs();
      init_header();
      init_playbar();

      add_search_event();
      add_menu_event();
      add_input_event();

      previous_next_addEvent(change_playbar_pos);
      start_pause_addEvent(toggle_playbar);

      var user = void 0;

      async function get_user() {
        const result = await get_request("/api/mood");
        if (!result.ok) return void 0;
        user = await result.json();
        set_user_mood(user.mood);
        return user;
      }
      get_user();

      // Playbar DOM
      var start_pause_icon = document.getElementById("start_pause_icon");
      var artist_bar = document.getElementById("artist_bar");
      var titel_bar = document.getElementById("titel_bar");
      var music_logo = document.getElementById("music_cover");

      var playbarAudio = new Audio();
      var playbarFeed = [];
      var playbar_pos = 0;

      async function loadPlaybar() {
        const response = await get_request("/api/get_playlist");
        if (!response.ok) return;
        playbarFeed = await response.json();
        if (playbarFeed.length === 0) return;
        playbarAudio.src = playbarFeed[0].preview;
        updatePlaybarUI();
        playbarAudio.addEventListener("ended", () => change_playbar_pos(true));
      }

      function updatePlaybarUI() {
        if (playbarFeed.length === 0) return;
        artist_bar.innerText = playbarFeed[playbar_pos].artist;
        titel_bar.innerText = playbarFeed[playbar_pos].title;
        music_logo.src = playbarFeed[playbar_pos].image;
        start_pause_icon.src = playbarAudio.paused
          ? "/assets/icons/playIcon.png"
          : "/assets/icons/pauseIcon.png";
      }

      async function change_playbar_pos(forward) {
        playbar_pos += forward ? 1 : -1;
        if (playbar_pos >= playbarFeed.length) playbar_pos = 0;
        if (playbar_pos < 0) playbar_pos = playbarFeed.length - 1;
        playbarAudio.src = playbarFeed[playbar_pos].preview;
        await playbarAudio.play();
        updatePlaybarUI();
      }

      async function toggle_playbar() {
        playbarAudio.paused ? await playbarAudio.play() : playbarAudio.pause();
        updatePlaybarUI();
      }

      loadPlaybar();

      // ── GAME ──────────────────────────────────────────────────────────────

      var game_section = document.getElementById("game_section");

      var songs = [];
      var currentIndex = 0;
      var score = 0;
      var isPlaying = false;
      var previewTimeout = null;
      var gameAudio = new Audio();
      var PREVIEW_MS = 5000;

      function build_game_ui() {
        const game_template = `
          <div class="game-card">

            <div class="game-topbar">
              <button id="reset_btn" class="reset-btn">Reset</button>
              <span class="mood-score">Score: <span id="score_value">0</span></span>
            </div>

            <div class="game-body">

              <div class="game-left">
                <div id="cover_container" class="cover-container">
                  <span class="question-mark">?</span>
                </div>
                <button id="play_btn" class="play-btn">
                  <img id="play_icon" src="/assets/icons/playIcon.png" alt="play" />
                </button>
                <p class="play-hint">Klik op play voor een preview</p>
              </div>

              <div class="game-right">
                <h2>Welk nummer hoor je?</h2>
                <p id="song_counter" class="song-counter"></p>
                <div class="input-group">
                  <input
                    type="text"
                    id="guess_input"
                    list="song_options"
                    class="guess-input"
                    placeholder="Typ titel of artiest..."
                    autocomplete="off"
                  />
                  <datalist id="song_options"></datalist>
                </div>
                <button id="submit_btn" class="submit-btn">Raad nummer!</button>
                <p id="feedback_text" class="feedback hidden"></p>
              </div>

            </div>
          </div>
        `;
        game_section.innerHTML = game_template;
      }

      var cover_container;
      var play_btn;
      var play_icon;
      var guess_input;
      var song_options;
      var submit_btn;
      var feedback_text;
      var score_value;
      var song_counter;
      var reset_btn;

      function bind_dom() {
        cover_container = document.getElementById("cover_container");
        play_btn        = document.getElementById("play_btn");
        play_icon       = document.getElementById("play_icon");
        guess_input     = document.getElementById("guess_input");
        song_options    = document.getElementById("song_options");
        submit_btn      = document.getElementById("submit_btn");
        feedback_text   = document.getElementById("feedback_text");
        score_value     = document.getElementById("score_value");
        song_counter    = document.getElementById("song_counter");
        reset_btn       = document.getElementById("reset_btn");

        play_btn.addEventListener("click", on_play_click);
        submit_btn.addEventListener("click", check_guess);
        reset_btn.addEventListener("click", () => load_songs());
        guess_input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") check_guess();
        });
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
        guess_input.value = "";
        hide_feedback();
        song_counter.innerText = `${currentIndex + 1} / ${songs.length}`;
        gameAudio.src = songs[currentIndex].preview;
        fill_options();
      }

      function fill_options() {
        const decoys = songs
          .filter((_, i) => i !== currentIndex)
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        const options = [songs[currentIndex], ...decoys]
          .sort(() => Math.random() - 0.5);

        song_options.innerHTML = "";
        options.forEach((track) => {
          song_options.innerHTML += `<option value="${track.artist} - ${track.title}">`;
        });
      }

      function on_play_click() {
        isPlaying ? stop_game_audio() : start_preview();
      }

      function start_preview() {
        gameAudio.currentTime = 0;
        gameAudio.play();
        play_icon.src = "/assets/icons/pauseIcon.png";
        isPlaying = true;
        previewTimeout = setTimeout(stop_game_audio, PREVIEW_MS);
      }

      function stop_game_audio() {
        gameAudio.pause();
        if (previewTimeout) { clearTimeout(previewTimeout); previewTimeout = null; }
        if (play_icon) play_icon.src = "/assets/icons/playIcon.png";
        isPlaying = false;
      }

      function check_guess() {
        if (songs.length === 0) return;
        const song        = songs[currentIndex];
        const guess       = guess_input.value.trim().toLowerCase();
        const full        = `${song.artist} - ${song.title}`.toLowerCase();
        const title_only  = song.title.toLowerCase();
        const artist_only = song.artist.toLowerCase();

        const is_correct = guess === full || guess === title_only || guess === artist_only;

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
          post_request("/api/mood", { increment: 1 }).catch(() => {});
        }
        setTimeout(next_song, 3000);
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

      build_game_ui();
      bind_dom();
      load_songs();
    }
  });
  require_game();
})();
