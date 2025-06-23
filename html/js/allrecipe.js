const sheetURL = 'https://script.google.com/macros/s/AKfycbzHbmZc7dgAw8RQ-E1ZwK7_GnRGxFi_9oUA_TdlJLROCw5IFSFr3nMOANEb7z_nW2y3/exec';

fetch(sheetURL)
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("recipe-grid");
    const template = document.getElementById("recipe-template");

    data.forEach(recipe => {
      const clone = template.content.cloneNode(true);

      const img = clone.querySelector("img");
      const titleElem = clone.querySelector(".title");

      img.src = recipe["IMAGE URL"] || "images/default.jpg";
      titleElem.textContent = recipe["TITLE"] || "Untitled";

      // ✅ Redirect to recipe.html on click
      clone.querySelector(".recipe-card").addEventListener("click", () => {
        const encodedTitle = encodeURIComponent(recipe["TITLE"]);
        window.location.href = `recipe.html?title=${encodedTitle}`;
      });

      // ✅ Veg/Non-Veg Dot
      const status = clone.querySelector(".status-dot");
      const type = (recipe["TYPE"] || "").toLowerCase();

      if (type === "veg") {
        status.style.backgroundColor = "#2e7d32";
        status.title = "Veg";
      } else if (type === "non-veg") {
        status.style.backgroundColor = "#b71c1c";
        status.title = "Non-Veg";
      } else {
        status.style.backgroundColor = "#ccc";
        status.title = "Unknown";
      }

      grid.appendChild(clone);
    });
  })
  .catch(err => {
    console.error("Error loading recipes:", err);
  });



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
      
  