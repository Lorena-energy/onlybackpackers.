document.addEventListener("DOMContentLoaded", () => {
  console.log("muro.js: con fotos en comentarios y respuestas + puntos ajustados.");

  /************************************************************
   * MENÚ HAMBURGUESA (con .show)
   ************************************************************/
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  /************************************************************
   * LÓGICA DE POSTS (+10 al publicar)
   ************************************************************/
  const postForm = document.getElementById("post-form");
  const postList = document.getElementById("post-list");

  // Estructura de posts
  let posts = []; // Each post: { id, content, media[], likes, comments[] }

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("post-content").value.trim();
    const mediaFiles = document.getElementById("post-media").files;
    if (!content && mediaFiles.length === 0) return;

    // +10 puntos al publicar
    alert("¡Has ganado 10 puntos por publicar tu aventura!");

    // Crear post
    const newPost = {
      id: Date.now(),
      content,
      media: Array.from(mediaFiles).map((file) => URL.createObjectURL(file)),
      likes: 0,
      comments: [], // cada comment: { text, media[] }
    };

    posts.unshift(newPost);
    renderPosts();
    postForm.reset();
  });

  function renderPosts() {
    postList.innerHTML = "";
    posts.forEach((p) => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.dataset.id = p.id;

      // Generar media
      let mediaHTML = "";
      if (p.media && p.media.length > 0) {
        mediaHTML = p.media.map(src => `<img src="${src}" alt="Media" class="post-media">`).join("");
      }

      // Generar comentarios
      let commentsHTML = "";
      p.comments.forEach((c) => {
        // c: { text, media[] }
        let cmediaHTML = "";
        if (c.media && c.media.length > 0) {
          cmediaHTML = c.media.map(m => `<img src="${m}" alt="Cmedia" style="max-width:100px; margin-top:5px;"/>`).join("");
        }
        commentsHTML += `
          <div class="comment">
            <strong>Usuario:</strong> ${c.text}
            <div>${cmediaHTML}</div>
          </div>
        `;
      });

      postDiv.innerHTML = `
        <div class="post-header">
          <h3>Usuario Anónimo</h3>
          <span>Hace un momento</span>
        </div>
        <div class="post-content">
          <p>${p.content}</p>
          ${mediaHTML}
        </div>
        <div class="post-actions">
          <button class="like-button">👍 Me gusta <span>${p.likes}</span></button>
          <button class="comment-button">💬 Comentar</button>
        </div>
        <div class="comment-section">
          <div class="comments">${commentsHTML}</div>
          <form class="comment-form">
            <input type="text" placeholder="Escribe un comentario..." required>
            <!-- input para adjuntar imagen/video en el comentario -->
            <input type="file" multiple accept="image/*,video/*" class="comment-media">
            <button type="submit">Enviar</button>
          </form>
        </div>
      `;

      postList.appendChild(postDiv);
    });
  }

  // Manejar interacciones en posts
  postList.addEventListener("click", (e) => {
    const postElement = e.target.closest(".post");
    if (!postElement) return;
    const postId = postElement.dataset.id;
    const postObj = posts.find((p) => p.id == postId);

    // Me gusta
    if (e.target.classList.contains("like-button")) {
      postObj.likes++;
      renderPosts();
    }
  });

  // Manejar envío de comentarios => +5 puntos
  postList.addEventListener("submit", (e) => {
    if (e.target.classList.contains("comment-form")) {
      e.preventDefault();
      const postElement = e.target.closest(".post");
      const postId = postElement.dataset.id;
      const postObj = posts.find((p) => p.id == postId);

      const commentInput = e.target.querySelector("input[type='text']");
      const commentText = commentInput.value.trim();
      const commentMediaFiles = e.target.querySelector(".comment-media").files;

      if (!commentText && commentMediaFiles.length === 0) return;

      // +5 puntos al comentar
      alert("¡Has ganado 5 puntos por tu comentario!");

      const commentMediaURLs = Array.from(commentMediaFiles).map(f => URL.createObjectURL(f));

      postObj.comments.push({
        text: commentText,
        media: commentMediaURLs
      });

      renderPosts();
    }
  });

  /************************************************************
   * LÓGICA DE PREGUNTAS (0 al preguntar, +10 al responder)
   ************************************************************/
  const questionForm = document.getElementById("question-form");
  const questionList = document.getElementById("question-list");

  let questions = []; // each question: { id, content, answers: [ { text, media[] }, ... ] }

  // El que pregunta no gana puntos
  questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const qContent = document.getElementById("question-content").value.trim();
    if (!qContent) return;

    const newQ = {
      id: Date.now(),
      content: qContent,
      answers: [],
    };
    questions.unshift(newQ);
    renderQuestions();
    questionForm.reset();
  });

  function renderQuestions() {
    questionList.innerHTML = "";
    questions.forEach((q) => {
      const qDiv = document.createElement("div");
      qDiv.classList.add("question");
      qDiv.dataset.id = q.id;

      let answersHTML = "";
      q.answers.forEach((ans) => {
        // ans: { text, media[] }
        let ansMediaHTML = "";
        if (ans.media && ans.media.length > 0) {
          ansMediaHTML = ans.media.map(m => `<img src="${m}" alt="AnsMedia" style="max-width:100px; margin-top:5px;"/>`).join("");
        }
        answersHTML += `
          <div class="answer">
            <strong>Usuario:</strong> ${ans.text}
            <div>${ansMediaHTML}</div>
          </div>
        `;
      });

      qDiv.innerHTML = `
        <div class="question-header">
          <h3>Usuario Anónimo</h3>
          <span>Hace un momento</span>
        </div>
        <div class="question-content">
          <p>${q.content}</p>
        </div>
        <div class="answer-section">
          <div class="answers">${answersHTML}</div>
          <form class="answer-form">
            <input type="text" placeholder="Escribe una respuesta..." required>
            <!-- input para adjuntar media en la respuesta -->
            <input type="file" multiple accept="image/*,video/*" class="answer-media">
            <button type="submit">Responder</button>
          </form>
        </div>
      `;
      questionList.appendChild(qDiv);
    });
  }

  // Quien RESPONDE gana +10 puntos
  questionList.addEventListener("submit", (e) => {
    if (e.target.classList.contains("answer-form")) {
      e.preventDefault();
      const questionElement = e.target.closest(".question");
      const questionId = questionElement.dataset.id;
      const questionObj = questions.find((qq) => qq.id == questionId);

      const answerInput = e.target.querySelector("input[type='text']");
      const answerText = answerInput.value.trim();
      const answerMediaFiles = e.target.querySelector(".answer-media").files;

      if (!answerText && answerMediaFiles.length === 0) return;

      // +10 puntos a quien responde
      alert("¡Has ganado 10 puntos por tu respuesta!");

      const ansMediaURLs = Array.from(answerMediaFiles).map(f => URL.createObjectURL(f));

      questionObj.answers.push({
        text: answerText,
        media: ansMediaURLs,
      });

      renderQuestions();
    }
  });
});
