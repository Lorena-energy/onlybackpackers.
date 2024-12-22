document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("create-post-form");
  const postsContainer = document.getElementById("posts-container");
  const emojiButton = document.getElementById("emoji-button");
  const emojiPanel = document.getElementById("emoji-panel");
  const postContent = document.getElementById("post-content");

  // Toggle emojis
  emojiButton.addEventListener("click", () => {
    emojiPanel.classList.toggle("hidden");
  });

  // Insert emoji
  emojiPanel.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      postContent.value += e.target.textContent;
    }
  });

  // Handle form submission
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = postContent.value.trim();
    const files = document.getElementById("post-media").files;

    if (content || files.length > 0) {
      const post = document.createElement("div");
      post.classList.add("post");

      const text = document.createElement("p");
      text.textContent = content;
      post.appendChild(text);

      if (files.length > 0) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const media = document.createElement(file.type.startsWith("image") ? "img" : "video");
            media.src = e.target.result;
            if (file.type.startsWith("video")) media.controls = true;
            post.appendChild(media);
          };
          reader.readAsDataURL(file);
        });
      }

      postsContainer.prepend(post);
      postForm.reset();
    }
  });
});
