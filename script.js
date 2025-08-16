const choices = ['Rock', 'Paper', 'Scissors'];
const images = {
    Rock: 'Rock.png',
    Paper: 'Paper.png',
    Scissors: 'Scissors.png'
};

// Preload all images so they're ready when needed
const preloadedImages = Object.values(images).map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

const startButton = document.getElementById('startButton');
const countdownDiv = document.getElementById('countdown');
const countdownImage = document.getElementById('countdownImage');
const choicesDiv = document.getElementById('choices');
const resultDiv = document.getElementById('result');
const leftResult = document.getElementById('leftResult');
const rightResult = document.getElementById('rightResult');
const replayButton = document.getElementById('replayButton');
const audio = document.getElementById('rpsAudio');
const muteButton = document.getElementById('muteButton');
const resultText = document.getElementById('resultText');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');
let playerScore = 0;
let computerScore = 0;

playerScoreSpan.classList.add('tie');
computerScoreSpan.classList.add('tie');

// Wait for all images to load before enabling the start button
startButton.disabled = true;
Promise.all(
    preloadedImages.map(img =>
        new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        })
    )
).then(() => {
    startButton.disabled = false;
});

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    showChoices();
});

muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? '🔇' : '🔊';
});

replayButton.addEventListener('click', () => {
    resultDiv.style.display = 'none';
    replayButton.style.display = 'none';
    resultText.textContent = '';
    resultText.classList.remove('win', 'lose', 'tie');
    leftResult.src = '';
    rightResult.src = '';
    startButton.style.display = 'inline-block';
});

document.querySelectorAll('.choice').forEach(button => {
    const handleChoice = () => {
        const playerChoice = button.getAttribute('data-choice');
        choicesDiv.style.display = 'none';
        playCountdown(() => showResult(playerChoice));
    };
    button.addEventListener('click', handleChoice);
    button.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleChoice();
        }
    });
});

function playCountdown(callback) {
    let index = 0;
    countdownDiv.style.display = 'block';
    audio.currentTime = 0;
    audio.play();
    countdownImage.src = images[choices[index]];
    const interval = setInterval(() => {
        index++;
        if (index >= choices.length) {
            clearInterval(interval);
            countdownDiv.style.display = 'none';
            callback();
        } else {
            countdownImage.src = images[choices[index]];
        }
    }, 1000);
}

function showChoices() {
    choicesDiv.style.display = 'block';
}

function showResult(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    leftResult.src = images[playerChoice];
    rightResult.src = images[computerChoice];
    leftResult.alt = playerChoice;
    rightResult.alt = computerChoice;
    leftResult.className = 'player-image';
    rightResult.className = 'player-image';
    resultDiv.style.display = 'block';

    let outcome, outcomeClass;
    if (playerChoice === computerChoice) {
        outcome = "It's a tie!";
        outcomeClass = 'tie';
    } else if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        outcome = 'You win!';
        outcomeClass = 'win';
        playerScore++;
    } else {
        outcome = 'Computer wins!';
        outcomeClass = 'lose';
        computerScore++;
    }

    resultText.textContent = outcome;
    resultText.classList.remove('win', 'lose', 'tie');
    resultText.classList.add(outcomeClass);

    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;

    playerScoreSpan.classList.remove('win', 'lose', 'tie');
    computerScoreSpan.classList.remove('win', 'lose', 'tie');

    if (playerScore > computerScore) {
        playerScoreSpan.classList.add('win');
        computerScoreSpan.classList.add('lose');
    } else if (playerScore < computerScore) {
        playerScoreSpan.classList.add('lose');
        computerScoreSpan.classList.add('win');
    } else {
        playerScoreSpan.classList.add('tie');
        computerScoreSpan.classList.add('tie');
    }

    replayButton.style.display = 'block';
}
