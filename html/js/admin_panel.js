function uploadImageToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff'];
    if (!allowedTypes.includes(file.type)) {
      alert("❌ Unsupported file type.");
      reject("Unsupported file type");
      return;
    }

    const cloudName = "dx8feprl9";
    const uploadPreset = "dangd_unsigned";
    const uploadFolder = "dangd_recipeimages";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", uploadFolder);

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.secure_url) {
          resolve(data.secure_url);
        } else {
          console.error("Upload failed response:", data);
          reject("Image upload failed");
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        reject(err);
      });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const postCard = document.querySelector('.card1');
  const modal = document.getElementById('recipeModal');
  const overlay = document.getElementById('modalOverlay');
  const closeButton = document.querySelector('.close');
  const form = document.getElementById('recipeForm');
  const imageInput = document.getElementById('image');
  const imageInput2 = document.getElementById('image2');
  const typeInput = document.getElementById('type');
  const videoInput = document.getElementById('video');
  const genreInput = document.getElementById('genre');
  const datePostedInput = document.getElementById('datePosted');
  const submitButton = form.querySelector('button[type="submit"]');

  postCard.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
  });

  const closeModal = () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  };

  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    submitButton.disabled = true;
    const originalBtnText = submitButton.textContent;
    submitButton.textContent = 'Submitting... ⏳';

    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    datePostedInput.value = currentDate;

    const imageFile = imageInput.files[0];
    const imageFile2 = imageInput2.files[0];
    const videoLink = videoInput.value;

    if (!imageFile) {
      alert("❌ Please select the main image.");
      resetButton();
      return;
    }

    // Optional Instagram validation
    if (!videoLink.includes("instagram.com")) {
      alert("❌ Please enter a valid Instagram video URL.");
      resetButton();
      return;
    }

    // Upload both images in parallel
    Promise.all([
      uploadImageToCloudinary(imageFile),
      imageFile2 ? uploadImageToCloudinary(imageFile2) : Promise.resolve("") // allow image2 to be optional
    ])
      .then(([imageUrl, imageUrl2]) => {
        const formData = new FormData(form);
        const data = {
          title: formData.get('title'),
          description: formData.get('description'),
          ingredients: formData.get('ingredients'),
          instructions: formData.get('instructions'),
          datePosted: currentDate,
          imageUrl: imageUrl,
          imageUrl2: imageUrl2,
          type: formData.get('type'),
          video: formData.get('video'),
          genre: formData.get('genre')
        };

        const webAppUrl = 'https://script.google.com/macros/s/AKfycbw0SUhQ_wz0ZaGVoIUk_tF8M8VBtrFrDwHjvyjeTqt0mOeQ0hZr6gcW2rmZy3ZqN3ZG/exec';

        return fetch(webAppUrl, {
          method: 'POST',
          body: new URLSearchParams(data)
        });
      })
      .then(res => res.text())
      .then(result => {
        alert('✅ Recipe submitted successfully!');
        closeModal();
        form.reset();
      })
      .catch(err => {
        console.error('Error:', err);
        alert('❌ Something went wrong. Please try again.');
      })
      .finally(() => {
        resetButton();
      });

    function resetButton() {
      submitButton.disabled = false;
      submitButton.textContent = originalBtnText;
    }
  });
});
