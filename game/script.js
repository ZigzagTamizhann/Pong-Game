// Initialize variables
var canvas;
var ctx;
var ballX, ballY, ballRadius, ballSpeedX, ballSpeedY;
var paddleWidth, paddleHeight, leftPaddleY, rightPaddleY, paddleSpeed;
var leftPlayerScore, rightPlayerScore;
var keys = {};

// Game initialization function
function init() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	// Set canvas dimensions
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Set initial game variables
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
	ballRadius = 15;
	ballSpeedX = 8;
	ballSpeedY = 8;
	paddleWidth = 10;
	paddleHeight = 100;
	leftPaddleY = (canvas.height - paddleHeight) / 2;
	rightPaddleY = (canvas.height - paddleHeight) / 2;
	paddleSpeed = 10;
	leftPlayerScore = 0;
	rightPlayerScore = 0;

	// Add event listeners
	window.addEventListener("keydown", function(e) {
		keys[e.keyCode] = true;
	});
	window.addEventListener("keyup", function(e) {
		delete keys[e.keyCode];
	});

	// Start game loop
	requestAnimationFrame(gameLoop);
}

// Game loop function
function gameLoop() {
	update();
	draw();
	requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
	// Move paddles
	if (keys[87]) {
		leftPaddleY -= paddleSpeed;
	}
	if (keys[83]) {
		leftPaddleY += paddleSpeed;
	}
	if (keys[38]) {
		rightPaddleY -= paddleSpeed;
	}
	if (keys[40]) {
		rightPaddleY += paddleSpeed;
	}

	// Keep paddles within canvas bounds
	if (leftPaddleY < 0) {
		leftPaddleY = 0;
	}
	if (leftPaddleY > canvas.height - paddleHeight) {
		leftPaddleY = canvas.height - paddleHeight;
	}
	if (rightPaddleY < 0) {
		rightPaddleY = 0;
	}
	if (rightPaddleY > canvas.height - paddleHeight) {
		rightPaddleY = canvas.height - paddleHeight;
	}

	// Move ball
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Check collision with paddles
	if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
		ballSpeedX = -ballSpeedX;
	}
	if (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        }
    // Check collision with top/bottom walls
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Check if ball goes out of bounds
    if (ballX - ballRadius < 0) {
        rightPlayerScore++;
        resetBall();
    }
    if (ballX + ballRadius > canvas.width) {
        leftPlayerScore++;
        resetBall();
    }
    }

    // Reset ball to center of canvas
    function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() * 10 - 5;
    }

    // Draw game objects
    function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();

    // Draw left paddle
    ctx.beginPath();
    ctx.rect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();

    // Draw right paddle
    ctx.beginPath();
    ctx.rect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();

    // Draw scores
    ctx.font = "32px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(leftPlayerScore, 50, 50);
    ctx.fillText(rightPlayerScore, canvas.width - 50, 50);
    }