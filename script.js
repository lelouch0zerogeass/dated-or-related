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
let preloadedImages = [];

// Preload all images at start
function preloadImages() {
  gameData.forEach(item => {
    const img = new Image();
    img.src = item.image;
    preloadedImages.push(img);
  });
}

function loadImage() {
  const container = document.getElementById("image-container");
  container.innerHTML = '<div class="loader"></div>';
  
  setTimeout(() => {
    container.innerHTML = '';
    const img = document.createElement('img');
    img.src = gameData[currentRound].image;
    img.className = 'game-image';
    img.alt = 'Dated or Related?';
    container.appendChild(img);
  }, 300);
}

function checkGuess(guess) {
  if (isLoading) return;
  isLoading = true;
  
  // Remove focus from buttons
  document.activeElement.blur();
  
  const result = gameData[currentRound].answer === guess;
  const resultElement = document.getElementById("result");
  
  resultElement.innerText = result ? "✅ Correct!" : "❌ Wrong!";
  resultElement.style.color = result ? "#27ae60" : "#e74c3c";
  
  setTimeout(() => {
    currentRound = (currentRound + 1) % gameData.length;
    resultElement.innerText = "";
    loadImage();
    isLoading = false;
  }, 800);
}

// Initialize game
document.addEventListener("DOMContentLoaded", () => {
  preloadImages();
  loadImage();
  
  // Set up buttons
  document.getElementById("related-btn").addEventListener("click", () => checkGuess(0));
  document.getElementById("dating-btn").addEventListener("click", () => checkGuess(1));
  
  // Prevent button focus styles
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.addEventListener("mousedown", (e) => e.preventDefault());
  });
});
