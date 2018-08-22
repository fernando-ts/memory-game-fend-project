//*** Retrieve a list of all the card elements from the DOM  
const allCards = Array.from(document.querySelectorAll('.card'));
console.log(allCards);

//*** Shuffle all the cards and display'em 
function randomDisplay() {
    const deckContainer = document.querySelector('.deck');
    const cardsShuffled = shuffle(allCards);
    cardsShuffled.forEach(function(element) {
        deckContainer.appendChild (element);
    });
}
randomDisplay();


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



 //* set up the event listener for a card. If a card is clicked:
 
let selectedCards = [];  // here I will put the 2 cards selected for comparison 
let matchedCardsLst = [];  //here the cards matched will be stored 
let countClickedCards = 0;

//* Add event listeners to each card's loop
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
    console.log(selectedCards);
}

//match cards function 
function lookForMatch() {
    if (selectedCards.length === 2) {
        const cardA = selectedCards[0];
        const cardB = selectedCards[1];
        if (cardA.dataset.name === cardB.dataset.name) {
            cardA.classList.add('match');
            cardB.classList.add('match');
            matchedCardsLst.push(selectedCards.splice(0, selectedCards.length));
            countClickedCards = 0;
            console.log("this was a match");
            completedGame();
        } else {
            setTimeout(function () {
                cardA.classList.remove('open', 'show');
                cardB.classList.remove('open', 'show');
                countClickedCards = 0;
            }, 1000);
            //selectedCards = [];
            //countClickedCards = 0;
        }
        selectedCards.splice(0, selectedCards.length);
    }        
}

// Game completed successfully function for modal  
function completedGame() {
    if (matchedCardsLst.length ===8) {
        document.querySelector('.end-modal').style.display = 'flex';
    }
}

// Close the modal function 
const close = document.querySelector('.close');
close.addEventListener('click', function () {
    document.querySelector('.end-modal').style.display = 'none';   
});

//Restart game 
const restartBtn = document.querySelector('.restart').firstElementChild;
restartBtn.addEventListener('click', function () {
    randomDisplay();
});    


 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
