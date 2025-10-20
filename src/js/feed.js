// function loadPosts() {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   fetch("../src/data/users.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const allPosts = data.users.flatMap((user) => user.posts);
//       const feed = document.getElementById("feed");
//       feed.innerHTML = allPosts
//         .map(
//           (post) => `
//         <div class="post">
//           <h3>${data.users.find((u) => u.id === currentUser.id).name}</h3>
//           <p>${post.content}</p>
//           <small>${new Date(post.timestamp).toLocaleString()}</small>
//         </div>
//       `
//         )
//         .join("");
//     });
// }

// document.getElementById("add-post-btn")?.addEventListener("click", () => {
//   const content = document.getElementById("new-post-content").value;
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const newPost = {
//     id: Date.now(),
//     content,
//     timestamp: new Date().toISOString(),
//   };
//   currentUser.posts.push(newPost);
//   localStorage.setItem("currentUser", JSON.stringify(currentUser));
//   document.getElementById("new-post-content").value = "";
//   loadPosts();
// });

// loadPosts();

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser && window.location.pathname !== "/pages/login.html") {
  window.location.href = "pages/login.html";
}

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

// Greet user
if (currentUser) {
  document.getElementById(
    "user-greeting"
  ).textContent = `Welcome, ${currentUser.name}!`;
}
