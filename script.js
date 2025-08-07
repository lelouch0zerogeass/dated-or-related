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
  imageContainer.innerHTML = ""; // Clear previous content
  
  const img = document.createElement("img");
  img.src = gameData[currentRound].image;
  img.alt = "Dated or Related?";
  img.style.maxWidth = "100%";
  img.style.maxHeight = "100%";
  img.style.borderRadius = "8px";
  
  img.onload = () => imageContainer.appendChild(img);
  img.onerror = () => {
    imageContainer.innerHTML = `<p>⚠️ Image failed to load</p>
                               <p>${gameData[currentRound].image}</p>`;
    imageContainer.style.display = "flex";
    imageContainer.style.flexDirection = "column";
    imageContainer.style.justifyContent = "center";
  };
}
  
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
