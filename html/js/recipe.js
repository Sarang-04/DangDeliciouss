
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const recipeTitle = decodeURIComponent(getQueryParam('title'));

  fetch('https://script.google.com/macros/s/AKfycbzHbmZc7dgAw8RQ-E1ZwK7_GnRGxFi_9oUA_TdlJLROCw5IFSFr3nMOANEb7z_nW2y3/exec')
    .then(res => res.json())
    .then(data => {
      const recipe = data.find(r => r["TITLE"] === recipeTitle);

      if (recipe) {
        document.querySelector('.img1').src = recipe["IMAGE URL"] || "images/default.jpg";
        document.querySelector('.img2').src = recipe["IMAGE URL 2"] || "images/default.jpg";
        document.querySelector('.name p1').innerText = recipe["TITLE"] || "";
        document.querySelector('.description p').innerText = recipe["DESCRIPTION"] || "";
        document.querySelector('.ingredient-text').innerHTML = recipe["INGREDIENTS"].replace(/\n/g, "<br>") || "";
        document.querySelector('.direction-text').innerHTML = recipe["INSTRUCTIONS"].replace(/\n/g, "<br>") || "";

        // If Instagram or video link exists
        if (recipe["VIDEO URL"]) {
          document.querySelector('.insta-url a')?.setAttribute('href', recipe["VIDEO URL"]);
        }
      } else {
        alert("Recipe not found.");
      }
    })
    .catch(err => {
      console.error("Error loading recipe:", err);
    });



    const urlParams = new URLSearchParams(window.location.search);
    const title = decodeURIComponent(urlParams.get("title"));
    

window.onload = function () {
  const input = document.getElementById("search-input");
  const suggestionsList = document.getElementById("suggestions-list");
  let allRecipes = [];

  // Fetch recipe data
  fetch("https://script.google.com/macros/s/AKfycbzHbmZc7dgAw8RQ-E1ZwK7_GnRGxFi_9oUA_TdlJLROCw5IFSFr3nMOANEb7z_nW2y3/exec")
    .then(res => res.json())
    .then(data => {
      allRecipes = data;
    });

  // Show suggestions
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    suggestionsList.innerHTML = "";

    if (!query) return;

    const matches = allRecipes.filter(recipe =>
      recipe["TITLE"] && recipe["TITLE"].toLowerCase().includes(query)
    );

    matches.forEach(recipe => {
      const li = document.createElement("li");
      li.textContent = recipe["TITLE"];
      li.addEventListener("click", () => {
        const encoded = encodeURIComponent(recipe["TITLE"]);
        window.location.href = `recipe.html?title=${encoded}`;
      });
      suggestionsList.appendChild(li);
    });

    if (matches.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No matches found.";
      li.style.color = "#888";
      suggestionsList.appendChild(li);
    }
  });

  // Enter key = exact match redirect
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = input.value.trim().toLowerCase();
      const match = allRecipes.find(recipe =>
        recipe["TITLE"] && recipe["TITLE"].toLowerCase() === query
      );
      if (match) {
        const encoded = encodeURIComponent(match["TITLE"]);
        window.location.href = `recipe.html?title=${encoded}`;
      } else {
        alert("No exact match found. Try picking from the list.");
      }
    }
  });

  // Hide suggestions on outside click
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".search-box").contains(e.target)) {
      suggestionsList.innerHTML = "";
    }
  });

  // Clear suggestions on reset
  document.querySelector(".search-box button[type='reset']").addEventListener("click", () => {
    suggestionsList.innerHTML = "";
  });
};
    
