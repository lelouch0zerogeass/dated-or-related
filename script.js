const gameData = [
  { image: "images/VarshavskiSiblings.png", answer: 0 },
  { image: "images/VarshavskiDating.png", answer: 1 },
  { image: "images/DejakuRelated.png", answer: 0 },
  { image: "images/DejakuDated.png", answer: 1 }
];

let currentRound = 0;
let score = 0;
let totalRounds = 0;

function loadImage() {
  const imageContainer = document.getElementById("image-container");
  const img = new Image();
  
  img.onload = function() {
    imageContainer.style.backgroundImage = `url('${gameData[currentRound].image}')`;
  };
  
  img.onerror = function() {
    console.error("Failed to load image:", gameData[currentRound].image);
    imageContainer.style.backgroundImage = "none";
    imageContainer.innerHTML = `<p>Image not loaded</p><p>${gameData[currentRound].image}</p>`;
    imageContainer.style.display = "flex";
    imageContainer.style.alignItems = "center";
    imageContainer.style.justifyContent = "center";
  };
  
  img.src = gameData[currentRound].image;
}

function checkGuess(guess) {
  totalRounds++;
  const resultElement = document.getElementById("result");
  const correct = gameData[currentRound].answer === guess;
  
  if (correct) score++;
  
  resultElement.innerText = correct ? "✅ Correct!" : "❌ Wrong!";
  resultElement.style.color = correct ? "#2ecc71" : "#e74c3c";

  setTimeout(() => {
    currentRound = (currentRound + 1) % gameData.length;
    resultElement.innerText = "";
    loadImage();
    
    // Show score after all rounds
    if (totalRounds === gameData.length) {
      setTimeout(() => {
        resultElement.innerHTML = `Game Over!<br>Score: ${score}/${gameData.length}`;
        resultElement.style.color = "#f39c12";
        score = 0;
        totalRounds = 0;
      }, 500);
    }
  }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("related-btn").addEventListener("click", () => checkGuess(0));
  document.getElementById("dating-btn").addEventListener("click", () => checkGuess(1));
  loadImage();
});
