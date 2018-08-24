//--> Retrieve a list of all the card elements from the DOM  
const allCards = Array.from(document.querySelectorAll('.card'));

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

 
let selectedCards = [];  
let matchedCardsLst = [];   
let countClickedCards = 0;

//--> Add event listeners to each card's loop
for (let card of allCards) {
    card.addEventListener('click', showCard)
}

// --> Show cards function 
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

//--> Match cards function
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

//--> Function: count moves made by user
let moves = document.querySelector('.moves');
let totalMoves = 0;
function countMoves() {
    totalMoves++;
    moves.textContent = totalMoves;
    if (totalMoves ===1) {
        startTimer();
    }
    performanceRating();
} 

//--> Function: sets a timer for the game
const timerElmnt = document.querySelector('.timer');
let timePeriod;
let seconds = 0;
let minutes = 0;
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

//--> Function: rates the performance of player
const allStars = Array.from(document.querySelectorAll('.fa-star'));
function performanceRating() {
    if (totalMoves > 9 && totalMoves < 14 ) {
        allStars[2].classList.add('star-down');
    } else if (totalMoves >= 14) {
        allStars[1].classList.add('star-down');
    }
}

//--> Game completed successfully function for modal
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

//--> Close the modal function
const close = document.querySelector('.close');
close.addEventListener('click', function () {
    document.querySelector('.end-modal').style.display = 'none';   
});

//--> Restart game
const restartBtn = document.querySelector('.restart').firstElementChild;
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
const playAgain = document.getElementById('new-game');
playAgain.addEventListener('click', function () {
    restartGame();
    document.querySelector('.end-modal').style.display = 'none';
});
