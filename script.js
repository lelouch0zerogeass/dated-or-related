// Automatically determine answers from filenames
const gameData = [
  "images/VarshavskiSiblings.png",
  "images/VarshavskiDating.png",
  "images/DejakuRelated.png",
  "images/DejakuDated.png"
].map(imagePath => {
  const filename = imagePath.toLowerCase();
  return {
    image: imagePath,
    answer: (filename.includes("sibling") || filename.includes("related")) ? 0 : 1
  };
});

let currentRound = 0;
let isLoading = false;

function loadImage() {
  const container = document.getElementById("image-container");
  container.innerHTML = '';
  
  // Show loader while image loads
  const loader = document.createElement("div");
  loader.className = "loader";
  container.appendChild(loader);
  loader.style.display = "block";
  
  const img = new Image();
  img.src = gameData[currentRound].image;
  img.alt = "Dated or Related?";
  img.className = "game-image";
  img.style.opacity = "0";
  
  img.onload = function() {
    container.innerHTML = '';
    container.appendChild(img);
    setTimeout(() => { img.style.opacity = "1"; }, 50);
  };
  
  img.onerror = function() {
    container.innerHTML = `<p>⚠️ Image failed to load</p>`;
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
  };
}

function checkGuess(guess) {
  if (isLoading) return;
  isLoading = true;
  
  // Remove focus from buttons to prevent outline
  document.activeElement.blur();
  
  const result = gameData[currentRound].answer === guess;
  const resultElement = document.getElementById("result");
  
  resultElement.innerText = result ? "✅ Correct!" : "❌ Wrong!";
  resultElement.style.color = result ? "#27ae60" : "#e74c3c";
  
  // Preload next image
  const nextRound = (currentRound + 1) % gameData.length;
  const nextImage = new Image();
  nextImage.src = gameData[nextRound].image;
  
  setTimeout(() => {
    currentRound = nextRound;
    resultElement.innerText = "";
    loadImage();
    isLoading = false;
  }, 1000);
}

// Initialize game
document.addEventListener("DOMContentLoaded", () => {
  loadImage();
  
  // Set up buttons with focus prevention
  document.getElementById("related-btn").addEventListener("click", () => checkGuess(0));
  document.getElementById("related-btn").addEventListener("mousedown", (e) => e.preventDefault());
  
  document.getElementById("dating-btn").addEventListener("click", () => checkGuess(1));
  document.getElementById("dating-btn").addEventListener("mousedown", (e) => e.preventDefault());
});
