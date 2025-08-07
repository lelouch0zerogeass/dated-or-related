// Game data: Image URLs and answers (0 = Related, 1 = Dating)
const gameData = [
  { image: "URL1", answer: 0 },
  { image: "URL2", answer: 1 },
  { image: "URL3", answer: 0 }
];

let currentRound = 0;

// Load image for the current round
function loadImage() {
  document.getElementById("image-container").style.backgroundImage = 
    `url(${gameData[currentRound].image})`;
}

// Check the player's guess
function checkGuess(guess) {
  const correct = gameData[currentRound].answer === guess;
  document.getElementById("result").innerText = 
    correct ? "✅ Correct!" : "❌ Wrong!";

  // Next round after 1 second
  setTimeout(() => {
    currentRound = (currentRound + 1) % gameData.length;
    loadImage();
    document.getElementById("result").innerText = "";
  }, 1000);
}

// Setup buttons
document.getElementById("related-btn").onclick = () => checkGuess(0);
document.getElementById("dating-btn").onclick = () => checkGuess(1);

// Start the game
loadImage();
