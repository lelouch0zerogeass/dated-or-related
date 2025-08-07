// Game data: Image URLs and answers (0 = Related, 1 = Dating)
const gameData = [
  { image: "images/VarshavskiSiblings.png", answer: 0 },
  { image: "images/VarshavskiDating.png", answer: 1 },
  { image: "images/DejakuRelated.png", answer: 0 }
  { image: "images/DejakuDated.png", answer: 1 }
];

let currentRound = 0;

function loadImage() {
  const imageContainer = document.getElementById("image-container");
  imageContainer.style.backgroundImage = `url('${gameData[currentRound].image}')`;
}

function checkGuess(guess) {
  const resultElement = document.getElementById("result");
  const correct = gameData[currentRound].answer === guess;
  
  resultElement.innerText = correct ? "✅ Correct!" : "❌ Wrong!";
  resultElement.style.color = correct ? "green" : "red";

  setTimeout(() => {
    currentRound = (currentRound + 1) % gameData.length;
    loadImage();
    resultElement.innerText = "";
  }, 1500);
}

// Initialize buttons with fixed IDs
document.getElementById("related-btn").addEventListener("click", () => checkGuess(0));
document.getElementById("dating-btn").addEventListener("click", () => checkGuess(1));

// Start the game
loadImage();
