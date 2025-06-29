import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9o8MzJjf9yp95oWy8GUfebBU0GQHAiU8",
  authDomain: "dangdeliciouss-285b9.firebaseapp.com",
  projectId: "dangdeliciouss-285b9",
  storageBucket: "dangdeliciouss-285b9.appspot.com",
  messagingSenderId: "70747649108",
  appId: "1:70747649108:web:4374a3351b365f0e3369c1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("admin-login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("admin-email").value;
      const password = document.getElementById("admin-password").value;

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // ✅ Redirect to admin panel on successful login
          window.location.href = "../html/admin_panel.html";
        })
        .catch((error) => {
          alert("Login failed: " + error.message);
        });
    });
  }
});
