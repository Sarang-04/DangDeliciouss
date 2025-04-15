document.addEventListener("DOMContentLoaded", () => {

    // Sticky navbar + logo resize
    window.addEventListener("scroll", function () {
      const nav = document.querySelector(".nav");
      const logoBox = document.querySelector(".logo");
      if (window.scrollY > 50) {
        nav.classList.add("sticky");
        logoBox.classList.add("small");
      } else {
        nav.classList.remove("sticky");
        logoBox.classList.remove("small");
      }
    });
  
    // Recipe image slider
    const images = [
      "images/photo_2025-02-18_23-50-33.jpg",
      "images/photo_2025-02-18_23-50-37.jpg",
      "images/photo_2025-02-18_23-50-40.jpg",
    ];
    const descriptions = [
      "A rich and decadent bowl of<br>Gajar ka Halwa,garnished<br>with silver leaf,<br> nuts, and rose petals<br> for a royal touch.",
      "Golden, flaky puff pastries<br>topped with cheesy,<br>veggie-loaded filling—crispy,<br>creamy,and utterly delicious!",
      "Aromatic fish biryani served<br>on a banana leaf with<br>crispy papad, fresh salad,<br>and flavorful sides—pure<br>indulgence!"
    ];
  
    let currentIndex = 0;
    const recipeLatest1 = document.querySelector(".recipe-latest1");
    const recipeLatest2 = document.querySelector(".recipe-latest2");
    const dishText = document.querySelector(".dish1");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
  
    function updateContent() {
      recipeLatest1.style.backgroundImage = `url('${images[currentIndex]}')`;
      recipeLatest2.style.backgroundImage = `url('${images[currentIndex]}')`;
      dishText.innerHTML = descriptions[currentIndex];
    }
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateContent();
    });
  
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateContent();
    });
  
    updateContent(); // Initial content
  
    // 🛠 TRIPLE-CLICK MODAL LOGIN 🛠
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
  

  // Toggle password visibility
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
  
  // Simulated Login Validation with Shake Animation
  document.getElementById("admin-login-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;
    const modalContent = document.querySelector(".modal-content");
  
    // Simulated check (replace with real auth logic)
    if (username !== "admin@example.com" || password !== "1234") {
      modalContent.classList.add("shake");
  
      setTimeout(() => {
        modalContent.classList.remove("shake");
      }, 500);
    } else {
      alert("Welcome Admin!");
      document.getElementById("admin-login-modal").style.display = "none";
    }
  });
  

  