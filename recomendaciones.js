document.addEventListener("DOMContentLoaded", () => {
  console.log("Recomendaciones.js: si no sale la hamburguesa, ¡llamamos a Scooby!");

  // ================== MENÚ HAMBURGUESA ==================
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // ================== FORMULARIO USUARIOS ==================
  const userRecommendationForm = document.getElementById("user-recommendation-form");
  const userRecommendationsList = document.getElementById("user-recommendations-list");

  userRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const contentField = document.getElementById("recommendation-content");
    const mediaField = document.getElementById("recommendation-media");
    const linkField = document.getElementById("recommendation-link");
    const alsoCommunity = document.getElementById("also-community").checked;

    const content = contentField.value.trim();
    const mediaFiles = mediaField.files;
    const link = linkField.value.trim();

    if (!content) return;

    const recommendationDiv = document.createElement("div");
    recommendationDiv.classList.add("recommendation");

    // Manejo de media (fotos/videos)
    let mediaHTML = "";
    if (mediaFiles && mediaFiles.length > 0) {
      mediaHTML += '<div class="media-container">';
      Array.from(mediaFiles).forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        if (file.type.startsWith("video")) {
          mediaHTML += `<video src="${fileURL}" controls></video>`;
        } else {
          mediaHTML += `<img src="${fileURL}" alt="Media" />`;
        }
      });
      mediaHTML += "</div>";
    }

    // Puntos: 10 o 15
    let points = 10;
    if (alsoCommunity) points += 5;

    // Montamos HTML final
    let finalHTML = `
      <p><strong>Tú:</strong> ${content}</p>
      ${link ? `<p><a href="${link}" target="_blank" style="color:#0077cc;">Ver en Google Maps</a></p>` : ""}
      ${mediaHTML}
      <p>¡Has ganado ${points} puntos!</p>
      <button class="cta-button like-button" data-likes="0">Me gusta (0)</button>
      <button class="cta-button comment-button">Comentar</button>
    `;

    recommendationDiv.innerHTML = finalHTML;
    userRecommendationsList.prepend(recommendationDiv);

    // Mensaje
    alert(`¡Has ganado ${points} puntos de recompensa!`);

    userRecommendationForm.reset();
  });

  // ================== FORMULARIO ADMIN ==================
  const isAdmin = true; // Cambia a false si NO es admin
  if (!isAdmin) {
    document.getElementById("add-featured-recommendations").style.display = "none";
  }

  const adminRecommendationForm = document.getElementById("admin-recommendation-form");
  const featuredList = document.getElementById("featured-list");

  adminRecommendationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleField = document.getElementById("recommendation-title");
    const descField = document.getElementById("recommendation-description");
    const linkField = document.getElementById("recommendation-affiliate-link");
    const photoFile = document.getElementById("recommendation-photo").files[0];

    const title = titleField.value.trim();
    const description = descField.value.trim();
    const link = linkField.value.trim();

    if (!title || !description || !link || !photoFile) return;

    const photoURL = URL.createObjectURL(photoFile);

    const featDiv = document.createElement("div");
    featDiv.classList.add("recommendation");
    featDiv.innerHTML = `
      <h3>${title}</h3>
      <img src="${photoURL}" alt="Recomendación destacada" style="max-width:100%; border-radius:5px; margin-top:10px;" />
      <p>${description}</p>
      <a href="${link}" target="_blank" class="cta-button" style="margin-top:10px; display:inline-block;">Reservar ahora</a>
    `;

    featuredList.prepend(featDiv);
    adminRecommendationForm.reset();
  });

  // ================== “ME GUSTA” CON CONTADOR Y COMENTARIOS ==================
  document.addEventListener("click", (e) => {
    // Contador real de “Me gusta”
    if (e.target.classList.contains("like-button")) {
      let currentLikes = parseInt(e.target.getAttribute("data-likes")) || 0;
      currentLikes++;
      e.target.setAttribute("data-likes", currentLikes);
      e.target.textContent = `Me gusta (${currentLikes})`;
    }

    // Botón “Comentar” => crea textarea y un botón “Publicar comentario”
    if (e.target.classList.contains("comment-button")) {
      const parent = e.target.parentElement;

      // Si no existe un “commentBox” + “commentSubmitButton”, los creamos
      if (!parent.querySelector(".comment-box")) {
        const commentBox = document.createElement("textarea");
        commentBox.placeholder = "Escribe un comentario...";
        commentBox.classList.add("comment-box");
        commentBox.style.display = "block";
        commentBox.style.marginTop = "10px";

        const commentSubmitBtn = document.createElement("button");
        commentSubmitBtn.textContent = "Publicar comentario";
        commentSubmitBtn.classList.add("cta-button", "comment-submit-button");
        commentSubmitBtn.style.marginTop = "5px";

        parent.appendChild(commentBox);
        parent.appendChild(commentSubmitBtn);
      }
    }

    // Botón “Publicar comentario”
    if (e.target.classList.contains("comment-submit-button")) {
      const parent = e.target.parentElement;
      const textArea = parent.querySelector(".comment-box");
      if (textArea && textArea.value.trim() !== "") {
        // Crear un div para el comentario
        const commentText = textArea.value.trim();
        const commentDiv = document.createElement("div");
        commentDiv.style.marginTop = "5px";
        commentDiv.innerHTML = `<strong>Comentario:</strong> ${commentText}`;

        parent.insertBefore(commentDiv, textArea);

        // Limpiar el textarea
        textArea.value = "";
      } else {
        alert("No puedes publicar un comentario vacío...");
      }
    }
  });
});
