// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Initialize player variables
let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
let playerSpeed = 60;

// Initialize enemy variables
let enemyX = Math.random() * (canvas.width - 50);
let enemyY = -50;
let enemySpeed = 1.5;

// Initialize score variable
let score = 0;

// Initialize game loop
let gameLoopId = null;

function startGame() {
    // Reset score
    score = 0;

    // Reset enemy position and speed
    enemyX = Math.random() * (canvas.width - 50);
    enemyY = -5;
    enemySpeed = 1.5;

    // Disable start button
    document.getElementById('startButton').disabled = true;

    // Handle keyboard input
    document.addEventListener('keydown', handleKeyDown);

    // Start game loop
    function updateGameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw player
        ctx.fillStyle = 'blue';
        ctx.fillRect(playerX, playerY, 50, 50);

        // Move enemy
        enemyY += enemySpeed;

        // Draw enemy
        ctx.fillStyle = 'red';
        ctx.fillRect(enemyX, enemyY, 50, 50);

        // Check for collision
        if (playerX < enemyX + 50 && playerX + 50 > enemyX && playerY < enemyY + 50 && playerY + 50 > enemyY) {
            // Collision detected, reset enemy position and increase score
            enemyX = Math.random() * (canvas.width - 50);
            enemyY = -50;
            score++;

            // Increase enemy speed every 10 points
            if (score % 10 === 0) {
                enemySpeed += 0.5;
                playerSpeed += 0.5;
            }
        } else if (enemyY > canvas.height) {
            // Player missed enemy, end game
            endGame();
        }

        // Draw score
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${score}`, 10, 30);

        // Request next animation frame
        gameLoopId = requestAnimationFrame(updateGameLoop);
    }

    // Request first animation frame
    gameLoopId = requestAnimationFrame(updateGameLoop);
}

// Handle end of game
function endGame() {
    // Stop game loop
    cancelAnimationFrame(gameLoopId);

    // Show score
    document.getElementById('scoreDisplay').textContent = `Your score is ${score}.`;

    // Remove keyboard input listener
    document.removeEventListener('keydown', handleKeyDown);

    // Enable start button
    document.getElementById('startButton').disabled = false;
}

// Handle keyboard input and start game
function handleKeyDown(event) {
    switch (event.code) {
        case 'ArrowLeft':
            playerX -= playerSpeed;
            if (playerX < 0) {
                playerX = 0;
            }
            break;
        case 'ArrowRight':
            playerX += playerSpeed;
            if (playerX + 50 > canvas.width) {
                playerX = canvas.width - 50;
            }
            break;
    }
}

// Handle start button click
document.getElementById('startButton').addEventListener('click', () => {

    // Start the game
    startGame();
});