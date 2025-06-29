document.addEventListener("DOMContentLoaded", () => {
  // 🔄 Dynamic Recipe Slideshow (from Google Sheets)
  const recipeLatest1 = document.querySelector(".recipe-latest1");
  const recipeLatest2 = document.querySelector(".recipe-latest2");
  const dishText = document.querySelector(".dish1");
  const diveInBtn = document.getElementById("dive-btn");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  let latestRecipes = [];
  let currentIndex = 0;

  fetch("https://script.google.com/macros/s/AKfycbzHbmZc7dgAw8RQ-E1ZwK7_GnRGxFi_9oUA_TdlJLROCw5IFSFr3nMOANEb7z_nW2y3/exec")
    .then(res => res.json())
    .then(data => {
      latestRecipes = data
        .filter(recipe => recipe["TITLE"] && recipe["IMAGE URL"])
        .slice(-3)
        .reverse();

      updateSlide();
    });

  function updateSlide() {
    if (latestRecipes.length === 0) return;

    const recipe = latestRecipes[currentIndex];
    const image = recipe["IMAGE URL"];
    const description = recipe["DESCRIPTION"] || "";
    const encoded = encodeURIComponent(recipe["TITLE"]);

    recipeLatest1.style.backgroundImage = `url('${image}')`;
    recipeLatest2.style.backgroundImage = `url('${image}')`;
    dishText.innerHTML = description;
    if (diveInBtn) diveInBtn.href = `html/recipe.html?title=${encoded}`;
  }

  nextBtn.addEventListener("click", () => {
    if (latestRecipes.length === 0) return; 
    currentIndex = (currentIndex + 1) % latestRecipes.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    if (latestRecipes.length === 0) return;
    currentIndex = (currentIndex - 1 + latestRecipes.length) % latestRecipes.length;
    updateSlide();
  });

  // 🛠 TRIPLE-CLICK ADMIN MODAL LOGIN
  let clickCount = 0;
  let clickTimer;
  const logo = document.getElementById("site-logo");
  const modal = document.getElementById("admin-login-modal");
  const closeBtn = document.getElementById("close-modal");

  logo.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 3) {
      clickCount = 0;
      clearTimeout(clickTimer);
      modal.style.display = "flex";
    }
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => (clickCount = 0), 500);
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// 👁️ Toggle Admin Password Visibility
document.getElementById("toggle-password").addEventListener("click", function () {
  const pwdField = document.getElementById("admin-password");
  const icon = this;

  if (pwdField.type === "password") {
    pwdField.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    pwdField.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

// 🔐 Simulated Admin Login
document.getElementById("admin-login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;
  const modalContent = document.querySelector(".modal-content");

  if (username !== "admin@example.com" || password !== "1234") {
    modalContent.classList.add("shake");
    setTimeout(() => modalContent.classList.remove("shake"), 500);
  } else {
    alert("Welcome Admin!");
    document.getElementById("admin-login-modal").style.display = "none";
  }
});

// 🔎 Search Bar with Suggestions
window.onload = function () {
  let allRecipes = [];

  const searchInput = document.getElementById("search-input");
  const suggestionsList = document.getElementById("suggestions-list");

  fetch("https://script.google.com/macros/s/AKfycbzHbmZc7dgAw8RQ-E1ZwK7_GnRGxFi_9oUA_TdlJLROCw5IFSFr3nMOANEb7z_nW2y3/exec")
    .then(res => res.json())
    .then(data => {
      allRecipes = data;
    })
    .catch(err => {
      console.error("❌ Error fetching recipes:", err);
    });

  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsList.innerHTML = "";

    if (!query || allRecipes.length === 0) return;

    const matches = allRecipes.filter(recipe =>
      recipe["TITLE"]?.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No matches found.";
      li.style.color = "#888";
      suggestionsList.appendChild(li);
      return;
    }

    matches.forEach(recipe => {
      const li = document.createElement("li");
      li.textContent = recipe["TITLE"];
      li.style.cursor = "pointer";
      li.style.color = "#5a3a2c";
      li.addEventListener("click", () => {
        const encoded = encodeURIComponent(recipe["TITLE"]);
        window.location.href = `recipe.html?title=${encoded}`;
      });
      suggestionsList.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (!document.querySelector(".search-bar")?.contains(e.target)) {
      suggestionsList.innerHTML = "";
    }
  });
};
