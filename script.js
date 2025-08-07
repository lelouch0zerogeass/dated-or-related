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

function loadImage() {
  const container = document.getElementById("image-container");
  container.innerHTML = `<img src="${gameData[currentRound].image}" alt="Dated or Related?" class="game-image">`;
}

function checkGuess(guess) {
  const result = gameData[currentRound].answer === guess;
  document.getElementById("result").innerText = result ? "✅ Correct!" : "❌ Wrong!";
  document.getElementById("result").style.color = result ? "#2ecc71" : "#e74c3c";

  setTimeout(() => {
    currentRound = (currentRound + 1) % gameData.length;
    document.getElementById("result").innerText = "";
    loadImage();
  }, 1000);
}

document.getElementById("related-btn").addEventListener("click", () => checkGuess(0));
document.getElementById("dating-btn").addEventListener("click", () => checkGuess(1));

// Initialize game
document.addEventListener("DOMContentLoaded", loadImage);
