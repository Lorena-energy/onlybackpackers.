document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  const postList = document.getElementById("post-list");
  const questionForm = document.getElementById("question-form");
  const questionList = document.getElementById("question-list");

  let posts = []; // Array para almacenar las publicaciones
  let questions = []; // Array para almacenar las preguntas

  // Manejar la creación de publicaciones
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postContent = document.getElementById("post-content").value.trim();
    const postMedia = document.getElementById("post-media").files;

    if (!postContent && postMedia.length === 0) return;

    // Crear objeto de publicación
    const newPost = {
      id: Date.now(),
      content: postContent,
      likes: 0,
      comments: [],
      media: [...postMedia].map((file) => URL.createObjectURL(file)),
    };

    // Añadir publicación al array
    posts.unshift(newPost);

    // Renderizar publicaciones
    renderPosts();

    // Limpiar el formulario
    postForm.reset();
  });

  // Renderizar publicaciones
  function renderPosts() {
    postList.innerHTML = ""; // Limpiar publicaciones existentes

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.setAttribute("data-id", post.id);

      // Contenido de la publicación
      const contentHTML = `
        <div class="post-header">
          <h3>Usuario Anónimo</h3>
          <span>Hace unos momentos</span>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
          ${post.media
            .map((src) => `<img src="${src}" alt="Media" class="post-media">`)
            .join("")}
        </div>
        <div class="post-actions">
          <button class="like-button">👍 Me gusta <span>${post.likes}</span></button>
          <button class="comment-button">💬 Comentar</button>
        </div>
        <div class="comment-section">
          <div class="comments">
            ${post.comments
              .map(
                (comment) =>
                  `<div class="comment"><strong>Usuario:</strong> ${comment}</div>`
              )
              .join("")}
          </div>
          <form class="comment-form">
            <input type="text" placeholder="Escribe un comentario..." required>
            <button type="submit">Enviar</button>
          </form>
        </div>
      `;

      postElement.innerHTML = contentHTML;
      postList.appendChild(postElement);
    });
  }

  // Manejar interacciones (Me gusta, comentarios)
  postList.addEventListener("click", (e) => {
    const postId = e.target.closest(".post")?.getAttribute("data-id");

    if (!postId) return;

    const post = posts.find((p) => p.id === Number(postId));

    // Manejar "Me gusta"
    if (e.target.classList.contains("like-button")) {
      post.likes++;
      renderPosts();
    }
  });

  // Manejar envío de comentarios
  postList.addEventListener("submit", (e) => {
    if (e.target.classList.contains("comment-form")) {
      e.preventDefault();

      const postId = e.target.closest(".post").getAttribute("data-id");
      const commentInput = e.target.querySelector("input");
      const commentText = commentInput.value.trim();

      if (!commentText) return;

      const post = posts.find((p) => p.id === Number(postId));
      post.comments.push(commentText);

      renderPosts();
    }
  });

  // Manejar la creación de preguntas
  questionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const questionContent = document.getElementById("question-content").value.trim();

    if (!questionContent) return;

    // Crear objeto de pregunta
    const newQuestion = {
      id: Date.now(),
      content: questionContent,
      answers: [],
    };

    // Añadir pregunta al array
    questions.unshift(newQuestion);

    // Renderizar preguntas
    renderQuestions();

    // Limpiar el formulario
    questionForm.reset();
  });

  // Renderizar preguntas
  function renderQuestions() {
    questionList.innerHTML = ""; // Limpiar preguntas existentes

    questions.forEach((question) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.setAttribute("data-id", question.id);

      // Contenido de la pregunta
      const contentHTML = `
        <div class="question-header">
          <h3>Usuario Anónimo</h3>
          <span>Hace unos momentos</span>
        </div>
        <div class="question-content">
          <p>${question.content}</p>
        </div>
        <div class="answer-section">
          <div class="answers">
            ${question.answers
              .map(
                (answer) =>
                  `<div class="answer"><strong>Usuario:</strong> ${answer}</div>`
              )
              .join("")}
          </div>
          <form class="answer-form">
            <input type="text" placeholder="Escribe una respuesta..." required>
            <button type="submit">Responder</button>
          </form>
        </div>
      `;

      questionElement.innerHTML = contentHTML;
      questionList.appendChild(questionElement);
    });
  }

  // Manejar envío de respuestas
  questionList.addEventListener("submit", (e) => {
    if (e.target.classList.contains("answer-form")) {
      e.preventDefault();

      const questionId = e.target.closest(".question").getAttribute("data-id");
      const answerInput = e.target.querySelector("input");
      const answerText = answerInput.value.trim();

      if (!answerText) return;

      const question = questions.find((q) => q.id === Number(questionId));
      question.answers.push(answerText);

      renderQuestions();
    }
  });
});
