document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Fetch existing users
  fetch("../src/data/users.json")
    .then((response) => response.json())
    .then((data) => {
      const userExists = data.users.some(
        (u) => u.username === username || u.email === email
      );

      if (userExists) {
        alert("Username or email already exists!");
        return;
      }

      // Create new user
      const newUser = {
        id: data.users.length + 1,
        username,
        email,
        password, // NOTE: For demo only; never store plain passwords in production
        name,
        bio: "",
        posts: [],
      };

      // Add to users array
      data.users.push(newUser);

      // Save in localStorage for demo purposes
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      // Redirect to home page
      alert("Sign Up Successful!");
      window.location.href = "../pages/index.html";

      // Optional: save updated users.json via backend in real app
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to fetch users data.");
    });
});
