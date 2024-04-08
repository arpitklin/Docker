document.getElementById("snake-btn").addEventListener("click", () => {
  loadGame("snake");
});

document.getElementById("pong-btn").addEventListener("click", () => {
  loadGame("pong");
});

function loadGame(gameName) {
  const script = document.createElement("script");
  script.src = `${gameName}.js`;
  document.head.appendChild(script);

  script.onload = () => {
    startGame();
  };
}

function startGame() {
  document.getElementById("game-selection").style.display = "none";
  document.getElementById("game-container").style.display = "block";
}
