document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  const postList = document.getElementById("post-list");

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("post-content").value.trim();

    if (content) {
      const post = document.createElement("div");
      post.className = "post";
      post.innerHTML = `
        <div class="post-header">
          <img src="https://via.placeholder.com/40" alt="User">
          <span>Usuario Anónimo</span>
        </div>
        <div class="post-content">
          <p>${content}</p>
        </div>
        <div class="post-actions">
          <button>👍 Me gusta</button>
          <button>💬 Comentar</button>
        </div>
      `;
      postList.prepend(post);
      postForm.reset();
    }
  });
});
