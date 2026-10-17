let userScore = 0;
let computerScore = 0;
const WINNING_SCORE = 10;
let isGameOver = false;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const paper_div = document.getElementById("p");
const rock_div = document.getElementById("r");
const scissors_div = document.getElementById("s");
const choices_div = document.querySelector(".choices");
const actionMessage_p = document.getElementById("action-message");

// Modal elements
const gameOverModal = document.getElementById("game-over-modal");
const modalCard = document.getElementById("modal-card");
const modalIcon = document.getElementById("modal-icon");
const modalStatus = document.getElementById("modal-status");
const modalSubtext = document.getElementById("modal-subtext");
const finalUserScore_span = document.getElementById("final-user-score");
const finalCompScore_span = document.getElementById("final-comp-score");
const replayBtn = document.getElementById("replay-btn");
const exitBtn = document.getElementById("exit-btn");

// Exit screen elements
const exitScreen = document.getElementById("exit-screen");
const exitRestartBtn = document.getElementById("exit-restart-btn");


function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function converToWord(letter) {
    if (letter == "r") return "Rock";
    if (letter == "p") return "Paper";
    if (letter == "s") return "Scissors";
}

function endGame(isUserWinner) {
    isGameOver = true;
    choices_div.classList.add('disabled');
    actionMessage_p.innerHTML = "Match concluded!";

    if (isUserWinner) {
        modalIcon.innerHTML = "🏆";
        modalStatus.innerHTML = "You won the game!";
        modalStatus.className = "modal-status win";
        modalSubtext.innerHTML = "Congratulations! You reached 10 points first.";
        modalCard.className = "modal-card win-border";
    } else {
        modalIcon.innerHTML = "💀";
        modalStatus.innerHTML = "You lost the game";
        modalStatus.className = "modal-status lose";
        modalSubtext.innerHTML = "The computer reached 10 points first. Better luck next time!";
        modalCard.className = "modal-card loss-border";
    }

    finalUserScore_span.innerHTML = userScore;
    finalCompScore_span.innerHTML = computerScore;

    setTimeout(() => {
        gameOverModal.classList.remove("hidden");
    }, 500);
}

function win(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${converToWord(userChoice)}${smallUserWord} beats ${converToWord(computerChoice)}${smallCompWord} you WON!🌟`;
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 500);

    if (userScore >= WINNING_SCORE) {
        endGame(true);
    }
}

function lose(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${converToWord(userChoice)}${smallUserWord} loses to  ${converToWord(computerChoice)}${smallCompWord} you LOST 😔`;
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 500);

    if (computerScore >= WINNING_SCORE) {
        endGame(false);
    }
}

function draw(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${converToWord(userChoice)}${smallUserWord} matches ${converToWord(computerChoice)}${smallCompWord} it's a DRAW 🐱`;
    userChoice_div.classList.add('blue-glow');
    setTimeout(() => userChoice_div.classList.remove('blue-glow'), 500);
}

function game(userChoice) {
    if (isGameOver) return;

    const computerChoice = getComputerChoice();
    console.log("User choice: " + userChoice);
    console.log("Computer choice: " + computerChoice);
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            console.log("You WON!");
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            console.log("You LOST :(");
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            console.log("It's a DRAW.");
            break;
    }
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    isGameOver = false;

    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = "Waiting for the user to play ...";
    actionMessage_p.innerHTML = "Make Your Move!";

    choices_div.classList.remove('disabled');
    gameOverModal.classList.add("hidden");
    exitScreen.classList.add("hidden");
}

function exitGame() {
    gameOverModal.classList.add("hidden");
    exitScreen.classList.remove("hidden");
    try {
        window.close();
    } catch (e) {
        console.log("Window close not permitted by browser:", e);
    }
}

function main() {
    rock_div.addEventListener('click', () => game("r"));
    paper_div.addEventListener('click', () => game("p"));
    scissors_div.addEventListener('click', () => game("s"));

    replayBtn.addEventListener('click', resetGame);
    exitBtn.addEventListener('click', exitGame);
    exitRestartBtn.addEventListener('click', resetGame);
}

main();

