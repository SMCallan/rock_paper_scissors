const choices = ['Rock', 'Paper', 'Scissors'];
const images = {
    Rock: 'Rock.png',
    Paper: 'Paper.png',
    Scissors: 'Scissors.png'
};

const startButton = document.getElementById('startButton');
const countdownDiv = document.getElementById('countdown');
const countdownImage = document.getElementById('countdownImage');
const choicesDiv = document.getElementById('choices');
const resultDiv = document.getElementById('result');
const leftResult = document.getElementById('leftResult');
const rightResult = document.getElementById('rightResult');
const audio = document.getElementById('rpsAudio');
const resultText = document.getElementById('resultText');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');
let playerScore = 0;
let computerScore = 0;

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    playCountdown(showChoices);
});

Array.from(document.getElementsByClassName('choice')).forEach(img => {
    img.addEventListener('click', () => {
        const playerChoice = img.getAttribute('data-choice');
        choicesDiv.style.display = 'none';
        playCountdown(() => showResult(playerChoice));
    });
});

function playCountdown(callback) {
    let index = 0;
    countdownDiv.style.display = 'block';
    audio.currentTime = 0;
    audio.play();
    countdownImage.src = images[choices[index % 3]];
    const interval = setInterval(() => {
        index++;
        if (index >= 6) {
            clearInterval(interval);
            countdownDiv.style.display = 'none';
            callback();
        } else {
            countdownImage.src = images[choices[index % 3]];
        }
    }, 1000);
}

function showChoices() {
    choicesDiv.style.display = 'block';
}

function showResult(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    leftResult.src = images[computerChoice];
    rightResult.src = images[playerChoice];
    leftResult.className = 'player-image left';
    rightResult.className = 'player-image right';
    resultDiv.style.display = 'block';

    let outcome;
    if (playerChoice === computerChoice) {
        outcome = "It's a tie!";
    } else if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        outcome = 'You win!';
        playerScore++;
    } else {
        outcome = 'Computer wins!';
        computerScore++;
    }

    resultText.textContent = outcome;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
}
