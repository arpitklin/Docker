// Define constants
const GRID_SIZE = 20;
const TILE_COUNT = 20;

// Initialize variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;

// Load images
const snakeImg = new Image();
snakeImg.src = 'snake.png';

const fruitImg = new Image();
fruitImg.src = 'fruit.png';

// Function to draw the snake
function drawSnake(ctx) {
  snake.forEach(segment => {
    ctx.drawImage(snakeImg, segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  });
}

// Function to draw the food
function drawFood(ctx) {
  ctx.drawImage(fruitImg, food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

// Function to move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }
}

// Function to generate food at a random position
function generateFood() {
  food.x = Math.floor(Math.random() * TILE_COUNT);
  food.y = Math.floor(Math.random() * TILE_COUNT);
}

// Function to check for collisions
function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= TILE_COUNT ||
    snake[0].y < 0 ||
    snake[0].y >= TILE_COUNT
  ) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

// Main game loop
function gameLoop(ctx) {
  if (checkCollision()) {
    clearInterval(intervalId);
    alert("Game Over!");
    return;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  drawSnake(ctx);
  drawFood(ctx);
  moveSnake();
}

// Handle key presses
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;
  }
});

// Start the game
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
generateFood();
const intervalId = setInterval(() => gameLoop(ctx), 100);
