// Get all image paths from your repository
const allImages = [
  "images/VarshavskiSiblings.png",
  "images/VarshavskiDating.png",
  "images/DejakuRelated.png",
  "images/DejakuDated.png",
  // Add more images here later
];

// Extract surname from filename
function getSurname(filename) {
  filename = filename.toLowerCase();
  if (filename.includes("varshavski")) return "varshavski";
  if (filename.includes("dejaku")) return "dejaku";
  // Add more surnames when you add more images
  return filename.split(/(?:dated|dating|related|siblings)/i)[0];
}

// Create game session with unique surnames
function createGameSession() {
  const surnameMap = new Map();
  const sessionData = [];
  
  allImages.forEach(path => {
    const surname = getSurname(path);
    if (!surnameMap.has(surname)) {
      surnameMap.set(surname, true);
      sessionData.push({
        image: path,
        answer: path.toLowerCase().includes("sibling") || 
                path.toLowerCase().includes("related") ? 0 : 1
      });
    }
  });
  
  // Shuffle the session data
  return sessionData.sort(() => Math.random() - 0.5);
}

let gameData = [];
let currentRound = 0;
let isLoading = false;

// Preload all images at start
function preloadImages() {
  allImages.forEach(path => {
    const img = new Image();
    img.src = path;
  });
}

function loadImage() {
  const container = document.getElementById("image-container");
  container.innerHTML = '<div class="loader"></div>';
  
  const img = new Image();
  img.src = gameData[currentRound].image;
  img.className = 'game-image';
  img.alt = 'Dated or Related?';
  
  img.onload = function() {
    container.innerHTML = '';
    container.appendChild(img);
  };
  
  img.onerror = function() {
    container.innerHTML = '<p>⚠️ Image failed to load</p>';
  };
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
    currentRound++;
    if (currentRound >= gameData.length) {
      // Game over - create new session
      gameData = createGameSession();
      currentRound = 0;
    }
    
    resultElement.innerText = "";
    loadImage();
    isLoading = false;
  }, 800);
}

// Initialize game
document.addEventListener("DOMContentLoaded", () => {
  preloadImages();
  gameData = createGameSession();
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
