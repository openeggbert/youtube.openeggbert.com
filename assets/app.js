
(function () {
  "use strict";

  // --- Theme selector (auto/light/dark), persisted across page loads ---
  var THEME_KEY = "yt-frontend-theme";
  var themeSelect = document.getElementById("theme-select");
  if (themeSelect) {
    var savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "auto" || savedTheme === "light" || savedTheme === "dark") {
      themeSelect.value = savedTheme;
    }
    themeSelect.addEventListener("change", function () {
      localStorage.setItem(THEME_KEY, themeSelect.value);
    });
  }

  // --- Video title filter (each input filters the .card elements inside
  // the grid named by its data-filter-target id) ---
  var filterInputs = document.querySelectorAll("[data-filter-target]");
  for (var i = 0; i < filterInputs.length; i++) {
    (function (input) {
      var grid = document.getElementById(input.getAttribute("data-filter-target"));
      if (!grid) return;

      var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
      input.addEventListener("input", function () {
        var query = input.value.trim().toLowerCase();
        cards.forEach(function (card) {
          var titleEl = card.querySelector(".card-title");
          var title = titleEl ? titleEl.textContent.toLowerCase() : "";
          var match = !query || title.indexOf(query) !== -1;
          card.style.display = match ? "" : "none";
        });
      });
    })(filterInputs[i]);
  }
})();
