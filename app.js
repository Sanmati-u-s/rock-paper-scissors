let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const paper_div = document.getElementById("p");
const rock_div = document.getElementById("r");
const scissors_div = document.getElementById("s");


function getComputerChoice(){
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function converToWord(letter){
    if(letter == "r") return "Rock";
    if(letter == "p") return "Paper";
    if(letter == "s") return "Scissors";
}

function win(userChoice, computerChoice){
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${converToWord(userChoice)}${smallUserWord} beats ${converToWord(computerChoice)}${smallCompWord} you WON!🌟`;
    document.getElementById(userChoice).classList.add('.green-glow);')
}

function lose(userChoice, computerChoice){
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${converToWord(userChoice)}${smallUserWord} loses to  ${converToWord(computerChoice)}${smallCompWord} you LOST 😔`;
    computerScore_span.innerHTML = computerScore;
}

function draw(userChoice, computerChoice){
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${converToWord(userChoice)} matches ${converToWord(computerChoice)} it's a DRAW 🐱`;
}

function game(userChoice){
    const computerChoice = getComputerChoice();
    console.log("User choice: " + userChoice);
    console.log("Computer choice: " + computerChoice);
    switch(userChoice + computerChoice){
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

function main(){
rock_div.addEventListener('click', function(){
    game("r");
})

paper_div.addEventListener('click', function(){
    game("p");
})
scissors_div.addEventListener('click', function(){
    game("s");
})
}

main();

