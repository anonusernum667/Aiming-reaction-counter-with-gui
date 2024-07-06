const startBtn = document.getElementById('start-btn');
const target = document.getElementById('target');
const message = document.getElementById('message');
const gameArea = document.getElementById('game-area');

let startTime;
let clicks = 0;
let totalAccuracy = 0;
const maxAttempts = 12;

startBtn.addEventListener('click', startGame);

target.addEventListener('click', () => {
    const endTime = new Date().getTime();
    const reactionTime = (endTime - startTime) / 1000;
    const accuracy = calculateAccuracy();
    
    totalAccuracy += accuracy;

    clicks++;
    if (clicks >= maxAttempts) {
        const averageAccuracy = totalAccuracy / maxAttempts;
        message.textContent = `Average reaction time: ${reactionTime.toFixed(2)} seconds | Accuracy: ${averageAccuracy.toFixed(2)}%`;
        target.style.display = 'none';
        startBtn.style.display = 'block';
        clicks = 0;
        totalAccuracy = 0;
    } else {
        showTarget();
    }
});

function startGame() {
    message.textContent = '';
    startBtn.style.display = 'none';
    clicks = 0;
    totalAccuracy = 0;
    showTarget();
}

function showTarget() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const targetSize = 50;

    const maxLeft = gameAreaRect.width - targetSize;
    const maxTop = gameAreaRect.height - targetSize;

    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    target.style.left = `${randomLeft}px`;
    target.style.top = `${randomTop}px`;
    target.style.display = 'block';

    startTime = new Date().getTime();
}

function calculateAccuracy() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const gameAreaWidth = gameAreaRect.width;
    const gameAreaHeight = gameAreaRect.height;

    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const gameAreaCenterX = gameAreaRect.left + gameAreaWidth / 2;
    const gameAreaCenterY = gameAreaRect.top + gameAreaHeight / 2;

    const distance = Math.sqrt(
        Math.pow(targetCenterX - gameAreaCenterX, 2) +
        Math.pow(targetCenterY - gameAreaCenterY, 2)
    );

    // Calculate maximum distance from the center of the game area to any corner
    const maxDistance = Math.sqrt(
        Math.pow(gameAreaWidth / 2, 2) + 
        Math.pow(gameAreaHeight / 2, 2)
    );

    // Calculate accuracy as a percentage based on the distance
    const accuracy = ((maxDistance - distance) / maxDistance) * 100;

    return accuracy;
}

