// Define constants
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 60;
const BALL_RADIUS = 8;
const PADDLE_SPEED = 2;
const BALL_SPEED = 2;

// Initialize variables
let canvas, ctx;
let player1Y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
let player2Y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
let ballX = CANVAS_WIDTH / 2;
let ballY = CANVAS_HEIGHT / 2;
let ballSpeedX = BALL_SPEED;
let ballSpeedY = BALL_SPEED;

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check collision with top/bottom walls
  if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > CANVAS_HEIGHT) {
    ballSpeedY = -ballSpeedY;
  }

  // Check collision with paddles
  if (
    (ballX - BALL_RADIUS < PADDLE_WIDTH && ballY > player1Y && ballY < player1Y + PADDLE_HEIGHT) ||
    (ballX + BALL_RADIUS > CANVAS_WIDTH - PADDLE_WIDTH && ballY > player2Y && ballY < player2Y + PADDLE_HEIGHT)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check if ball passed left/right boundary
  if (ballX < 0 || ballX > CANVAS_WIDTH) {
    resetBall();
  }
}

// Draw game elements
function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // Draw paddles
  ctx.fillRect(0, player1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, player2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fill();
}

// Reset ball position
function resetBall() {
  ballX = CANVAS_WIDTH / 2;
  ballY = CANVAS_HEIGHT / 2;
  ballSpeedX = -ballSpeedX; // Serve to opposite direction
  ballSpeedY = Math.random() * 2 - 1; // Randomize vertical direction
}

// Handle player controls
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      player1Y -= PADDLE_SPEED;
      break;
    case "s":
      player1Y += PADDLE_SPEED;
      break;
    case "ArrowUp":
      player2Y -= PADDLE_SPEED;
      break;
    case "ArrowDown":
      player2Y += PADDLE_SPEED;
      break;
  }
  // Ensure paddles stay within the canvas
  player1Y = Math.max(0, Math.min(player1Y, CANVAS_HEIGHT - PADDLE_HEIGHT));
  player2Y = Math.max(0, Math.min(player2Y, CANVAS_HEIGHT - PADDLE_HEIGHT));
});

// Initialize game
canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");
gameLoop();
