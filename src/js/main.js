document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  fetch("../src/data/users.json")
    .then((response) => response.json())
    .then((data) => {
      const user = data.users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "../index.html";
      } else {
        alert("Invalid credentials!");
      }
    });
});
