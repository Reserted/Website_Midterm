// Globals
let isFetching = false;
let currentPage = 1;
let currentCol = 0; // start from 0

const gridColumnCount = 4;
const imgContainer = document.getElementById("images-container");
const loader = document.getElementById("loader");

// Helper: random integer
const genRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) return; // ignore while waiting
  scrollTimeout = setTimeout(async () => {
    scrollTimeout = null;
    if (isFetching) return;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      await fetchImages();
    }
  }, 300); // check every 300ms
});

const fetchImages = async () => {
  loader.classList.add("show");
  isFetching = true;

  try {
    // Delay artificially to slow down loading
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second

    const response = await fetch(
      `https://picsum.photos/v2/list?limit=12&page=${currentPage}`
    );
    const images = await response.json();
    updateDom(images);
    currentPage++;
  } catch (err) {
    console.error("Error fetching images:", err);
  }

  isFetching = false;
  loader.classList.remove("show");
};

// Update DOM
const updateDom = (images) => {
  const shuffledImages = shuffleArray(images);

  shuffledImages.forEach((img) => {
    // ✅ use shuffledImages here
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-wrapper", "loading");

    const width = genRandomInt(800, 1200);
    const height = genRandomInt(500, 2000);
    const compressedUrl = `https://picsum.photos/id/${img.id}/${width}/${height}`;

    imageContainer.innerHTML = `
      <img 
        src="${compressedUrl}" 
        alt="Random image" 
        loading="lazy" 
        style="width: 100%; display: block;"
      />
    `;

    // Place image in the next column
    imgContainer.children[currentCol].appendChild(imageContainer);
    currentCol = (currentCol + 1) % gridColumnCount;

    // Smooth fade-in
    setTimeout(() => imageContainer.classList.remove("loading"), 100);
  });
};

// Infinite scroll
window.addEventListener("scroll", async () => {
  if (isFetching) return;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    await fetchImages();
  }
});

// Initial fetch

// postBtn.addEventListener("click", (event) => {
//   event.preventDefault(); // Prevent form submission / page reload

//   const text = postTextInput.value.trim();
//   const file = postImageInput.files[0];

//   if (!text) {
//     alert("Please enter some text.");
//     return;
//   }

//   if (!file) {
//     alert("Please select an image.");
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = function (e) {
//     const imageDataUrl = e.target.result;

//     // Create post container
//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("image-wrapper", "loading");

//     // Wrap in link to separate post page
//     imageContainer.innerHTML = `
//       <a href="post.?text=${encodeURIComponent(
//         text
//       )}&image=${encodeURIComponent(imageDataUrl)}" target="_blank">
//         <img src="${imageDataUrl}" alt="User uploaded image" style="width:100%; display:block;" />
//       </a>
//     `;

//     // Prepend to the next column
//     imgContainer.children[currentCol].prepend(imageContainer);
//     currentCol = (currentCol + 1) % gridColumnCount;

//     setTimeout(() => imageContainer.classList.remove("loading"), 100);

//     // Clear inputs
//     postTextInput.value = "";
//     postImageInput.value = "";
//     fileNameSpan.textContent = "No file chosen";
//   };

//   reader.readAsDataURL(file);
// });

// Update file name when a file is selected'

document.addEventListener("DOMContentLoaded", fetchImages);

const postBtn = document.getElementById("add-post-btn");
const postImageInput = document.getElementById("post-image");
const postTextInput = document.getElementById("new-post-content");
const fileNameSpan = document.getElementById("file-name");

postImageInput.addEventListener("change", () => {
  fileNameSpan.textContent = postImageInput.files.length
    ? postImageInput.files[0].name
    : "No file chosen";
});
postImageInput.addEventListener("change", () => {
  fileNameSpan.textContent = postImageInput.files.length
    ? postImageInput.files[0].name
    : "No file chosen";
});

postBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const text = postTextInput.value.trim();
  const file = postImageInput.files[0];

  if (!text) return alert("Please enter some text.");
  if (!file) return alert("Please select an image.");

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageDataUrl = e.target.result;

    // Create a div for the user post
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("user-post", "image-wrapper", "loading");

    // Create a dummy link to post.html
    const postLink = document.createElement("a");
    postLink.href = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`; // dummy link
    postLink.target = "_blank"; // open in new tab
    // postLink.textContent = "View Post"; // optional

    // Create the image element
    const imgEl = document.createElement("img");
    imgEl.src = imageDataUrl;
    imgEl.alt = "User uploaded image";
    imgEl.style.width = "100%";
    imgEl.style.display = "block";

    // Append image to link, link to container
    postLink.appendChild(imgEl);
    imageContainer.appendChild(postLink);

    // Prepend to the next column
    const column = imgContainer.children[currentCol]; // make sure imgContainer is your grid container
    if (!column) return console.error("Column does not exist");
    column.prepend(imageContainer);
    currentCol = (currentCol + 1) % gridColumnCount;

    setTimeout(() => imageContainer.classList.remove("loading"), 100);

    // Clear inputs
    postTextInput.value = "";
    postImageInput.value = "";
    fileNameSpan.textContent = "No file chosen";
  };

  reader.readAsDataURL(file);
});
