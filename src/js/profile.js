function loadProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  document.getElementById("profile-name").textContent = currentUser.name;
  document.getElementById("profile-bio").textContent = currentUser.bio;
  const userPosts = document.getElementById("user-posts");
  userPosts.innerHTML = currentUser.posts
    .map(
      (post) => `
    <div class="post">
      <p>${post.content}</p>
      <small>${new Date(post.timestamp).toLocaleString()}</small>
    </div>
  `
    )
    .join("");
}

loadProfile();
