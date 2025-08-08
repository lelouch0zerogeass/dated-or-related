// Get all image paths
const allImages = [
  "images/VarshavskiSiblings.png",
  "images/VarshavskiDating.png",
  "images/DejakuRelated.png",
  "images/DejakuDated.png",
  // Add more images here as: "images/SurnameType.png"
];

// Automatically extract surname from filename
function getSurname(filename) {
  // Remove file extension and make lowercase
  const cleanName = filename.toLowerCase().replace(/\.[^/.]+$/, "");
  
  // Extract text before keywords (dated/dating/related/siblings)
  const surnameMatch = cleanName.match(/(.*?)(?:dated|dating|related|siblings)/);
  
  // Return surname or full filename if no match
  return surnameMatch ? surnameMatch[1].replace(/[^a-z]/g, '') : cleanName;
}

// Create balanced game session (50% dated, 50% related)
function createGameSession() {
  // Group images by surname
  const surnameGroups = new Map();
  
  allImages.forEach(path => {
    const filename = path.split('/').pop();
    const surname = getSurname(filename);
    
    if (!surnameGroups.has(surname)) {
      surnameGroups.set(surname, []);
    }
    
    surnameGroups.get(surname).push({
      path,
      type: filename.toLowerCase().includes("sibling") || 
            filename.toLowerCase().includes("related") ? "related" : "dated"
    });
  });
  
  // Prepare balanced session data
  const relatedImages = [];
  const datedImages = [];
  
  // Process each surname group
  surnameGroups.forEach(images => {
    // Randomly select one image per surname
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    if (randomImage.type === "related") {
      relatedImages.push(randomImage);
    } else {
      datedImages.push(randomImage);
    }
  });
  
  // Calculate how many of each type we need (50/50 balance)
  const maxPairs = Math.min(relatedImages.length, datedImages.length);
  const halfCount = Math.max(2, Math.floor(maxPairs)); // Minimum 2 images
  
  // Select random images for each type
  const selectedRelated = shuffleArray(relatedImages).slice(0, halfCount);
  const selectedDated = shuffleArray(datedImages).slice(0, halfCount);
  
  // Combine and shuffle all selected images
  const sessionData = shuffleArray([...selectedRelated, ...selectedDated]).map(item => ({
    image: item.path,
    answer: item.type === "related" ? 0 : 1
  }));
  
  return sessionData;
}

// Helper to shuffle arrays
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
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
      // Create new balanced session
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
