document.addEventListener("DOMContentLoaded", () => {
  console.log("muro.js: usando 'show' en lugar de 'active' para hamburguesa.");

  /************************************************************
   * MENÚ HAMBURGUESA
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  // Igual que en tu chats page => .show
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  /************************************************************
   * LÓGICA DE POSTS (+10 puntos)
   ************************************************************/
  const postForm = document.getElementById("post-form");
  const postList = document.getElementById("post-list");
  let posts = [];

  // Nuevo post => +10 puntos
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postContent = document.getElementById("post-content").value.trim();
    const postMedia = document.getElementById("post-media").files;

    if (!postContent && postMedia.length === 0) return;

    // Simular +10 puntos => alert
    alert("¡Has ganado 10 puntos por compartir tu aventura!");

    // Creamos el objeto post
    const newPost = {
      id: Date.now(),
      content: postContent,
      likes: 0,
      comments: [],
      media: [...postMedia].map((file) => URL.createObjectURL(file)),
    };

    posts.unshift(newPost);
    renderPosts();
    postForm.reset();
  });

  function renderPosts() {
    postList.innerHTML = "";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.dataset.id = post.id;

      // Media
      let mediaHTML = "";
      if (post.media && post.media.length > 0) {
        mediaHTML = post.media.map((src) => `<img src="${src}" alt="Media" class="post-media">`).join("");
      }

      postElement.innerHTML = `
        <div class="post-header">
          <h3>Usuario Anónimo</h3>
          <span>Hace unos momentos</span>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
          ${mediaHTML}
        </div>
        <div class="post-actions">
          <button class="like-button">👍 Me gusta <span>${post.likes}</span></button>
          <button class="comment-button">💬 Comentar</button>
        </div>
        <div class="comment-section">
          <div class="comments">
            ${post.comments
              .map(
                (c) => `<div class="comment"><strong>Usuario:</strong> ${c}</div>`
              )
              .join("")}
          </div>
          <form class="comment-form">
            <input type="text" placeholder="Escribe un comentario..." required>
            <button type="submit">Enviar</button>
          </form>
        </div>
      `;

      postList.appendChild(postElement);
    });
  }

  // Manejar interacciones en la lista de posts
  postList.addEventListener("click", (e) => {
    const postElement = e.target.closest(".post");
    if (!postElement) return;
    const postId = postElement.dataset.id;
    const post = posts.find((p) => p.id == postId);

    // Me gusta
    if (e.target.classList.contains("like-button")) {
      post.likes++;
      renderPosts();
    }
  });

  // Manejar envío de comentarios
  postList.addEventListener("submit", (e) => {
    if (e.target.classList.contains("comment-form")) {
      e.preventDefault();

      const postElement = e.target.closest(".post");
      const postId = postElement.dataset.id;
      const post = posts.find((p) => p.id == postId);

      const commentInput = e.target.querySelector("input");
      const commentText = commentInput.value.trim();
      if (!commentText) return;

      post.comments.push(commentText);
      renderPosts();
    }
  });

  /************************************************************
   * LÓGICA DE PREGUNTAS (+10 puntos)
   ************************************************************/
  const questionForm = document.getElementById("question-form");
  const questionList = document.getElementById("question-list");
  let questions = [];

  // Nuevo question => +10 puntos
  questionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const questionContent = document.getElementById("question-content").value.trim();
    if (!questionContent) return;

    // Simular +10 puntos => alert
    alert("¡Has ganado 10 puntos por tu pregunta!");

    const newQuestion = {
      id: Date.now(),
      content: questionContent,
      answers: [],
    };

    questions.unshift(newQuestion);
    renderQuestions();
    questionForm.reset();
  });

  function renderQuestions() {
    questionList.innerHTML = "";
    questions.forEach((q) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.dataset.id = q.id;

      questionElement.innerHTML = `
        <div class="question-header">
          <h3>Usuario Anónimo</h3>
          <span>Hace unos momentos</span>
        </div>
        <div class="question-content">
          <p>${q.content}</p>
        </div>
        <div class="answer-section">
          <div class="answers">
            ${q.answers
              .map(
                (ans) => `<div class="answer"><strong>Usuario:</strong> ${ans}</div>`
              )
              .join("")}
          </div>
          <form class="answer-form">
            <input type="text" placeholder="Escribe una respuesta..." required>
            <button type="submit">Responder</button>
          </form>
        </div>
      `;
      questionList.appendChild(questionElement);
    });
  }

  // Manejar envío de respuestas
  questionList.addEventListener("submit", (e) => {
    if (e.target.classList.contains("answer-form")) {
      e.preventDefault();

      const questionElement = e.target.closest(".question");
      const questionId = questionElement.dataset.id;
      const question = questions.find((qq) => qq.id == questionId);

      const answerInput = e.target.querySelector("input");
      const answerText = answerInput.value.trim();
      if (!answerText) return;

      question.answers.push(answerText);
      renderQuestions();
    }
  });
});
