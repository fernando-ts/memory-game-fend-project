//--> Retrieve a list of all the card elements from the DOM  
const allCards = Array.from(document.querySelectorAll('.card'));
//--> Stores the selected cards for comparison 
let selectedCards = []; 
//--> Stores all the cards that match
let matchedCardsLst = [];
//--> Counts how many cards have been clicked 
let countClickedCards = 0;
//--> Selects the element where moves will be displayed
let moves = document.querySelector('.moves');
//--> Stores the moves made by user
let totalMoves = 0;
//--> Selects the element where the time will be displayed
const timerElmnt = document.querySelector('.timer');
//--> Stores the time from interval
let seconds = 0;
let minutes = 0;
//--> The setInterval is assigned to this variable to access it in clearInterval 
let timePeriod;
//--> Selects all the stars from the DOM 
const allStars = Array.from(document.querySelectorAll('.fa-star'));
//--> Selects the close sign from the modal 
const close = document.querySelector('.close');
//--> Selects the restart sign from the DOM 
const restartBtn = document.querySelector('.restart').firstElementChild;
//--> Selects the button for a new game from the Modal
const playAgain = document.getElementById('new-game');

//--> ***QUESTION: Previously I declare my variables before each function declaration, as needed, would be that ok, or better like this?

//--> Shuffle all the cards and display'em 
let randomDisplay;
(randomDisplay = function() {
    const deckContainer = document.querySelector('.deck');
    const cardsShuffled = shuffle(allCards);
    cardsShuffled.forEach(function (element) {
        deckContainer.appendChild(element);
        element.classList.remove('open', 'show', 'match');
    });
})();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//--> Add event listeners to each card's loop
for (let card of allCards) {
    card.addEventListener('click', showCard)
}

// --> Show cards 
function showCard() {
    let thisItem = this;
    if (thisItem.classList.contains('show')) {
        return        
    } else if (countClickedCards < 3) {
        selectedCards.push(thisItem);
        countClickedCards++;
        thisItem.classList.add('open', 'show');
        lookForMatch();
    }
}

//--> Match cards 
function lookForMatch() {
    if (selectedCards.length === 2) {
        countMoves();
        const cardA = selectedCards[0];
        const cardB = selectedCards[1];
        if (cardA.dataset.name === cardB.dataset.name) {
            cardA.classList.add('match');
            cardB.classList.add('match');
            matchedCardsLst.push(selectedCards.splice(0, selectedCards.length));
            countClickedCards = 0;
            completedGame();
        } else {
            setTimeout(function () {
                cardA.classList.remove('open', 'show');
                cardB.classList.remove('open', 'show');
                countClickedCards = 0;
            }, 1000);
        }
        selectedCards = []; 
    }        
}

//--> Count moves made by user
function countMoves() {
    totalMoves++;
    moves.textContent = totalMoves;
    if (totalMoves ===1) {
        startTimer();
    }
    performanceRating();
} 

//--> Sets a timer for the game
function startTimer() {
    timePeriod = setInterval(function () {
        timerElmnt.innerHTML = `${minutes} minute(s) ${seconds} seconds`; 
        seconds++;
        if (seconds === 60) {     
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

//--> Rates the performance of player
function performanceRating() {
    if (totalMoves > 9 && totalMoves < 14 ) {
        allStars[2].classList.add('star-down');
    } else if (totalMoves >= 14) {
        allStars[1].classList.add('star-down');
    }
}

//--> Modal when game has been completed successfully
function completedGame() {
    const finalRating = document.querySelector('.stars').innerHTML;
    if (matchedCardsLst.length === 8) {
        clearInterval(timePeriod);
        document.getElementById('total-moves').textContent = totalMoves;
        document.getElementById('total-time').textContent = timerElmnt.textContent;
        document.getElementById('rating-star').innerHTML = finalRating;
        document.querySelector('.end-modal').style.display = 'flex';
    }
}

//--> Close the modal 
close.addEventListener('click', function () {
    document.querySelector('.end-modal').style.display = 'none';   
});

//--> Restart game
function restartGame() {
    clearInterval(timePeriod);
    totalMoves = 0;
    seconds = 0;
    minutes = 0;
    matchedCardsLst = [];
    moves.textContent = totalMoves;
    timerElmnt.textContent = '';
    allStars[2].classList.remove('star-down');
    allStars[1].classList.remove('star-down');
    randomDisplay();
}
restartBtn.addEventListener('click', restartGame);

// --> Function: after successfully finished, play again
playAgain.addEventListener('click', function () {
    restartGame();
    document.querySelector('.end-modal').style.display = 'none';
});
