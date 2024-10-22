document.addEventListener("DOMContentLoaded", () => {
    let gameBoard = document.getElementById('game-board');
    let restartBtn = document.getElementById('restart-btn');

    let cardImages = ['🐱', '🐶', '🦊', '🐻', '🐼', '🦁', '🐸', '🐵']; // sample icons
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Initialize the game board
    function initGame() {
        gameBoard.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;

        // Duplicate and shuffle cards
        cards = [...cardImages, ...cardImages];
        shuffle(cards);

        // Create card elements
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.cardValue = card;

            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">${card}</div>
                    <div class="card-back">?</div>
                </div>
            `;

            cardElement.addEventListener('click', handleCardClick);
            gameBoard.appendChild(cardElement);
        });
    }

    // Handle card click
    function handleCardClick(event) {
        const clickedCard = event.currentTarget;
        if (flippedCards.length < 2 && !clickedCard.classList.contains('flip')) {
            clickedCard.classList.add('flip');
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    // Check if the two flipped cards match
    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.cardValue === card2.dataset.cardValue) {
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === cardImages.length) {
                setTimeout(() => alert('You won!'), 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                flippedCards = [];
            }, 1000);
        }
    }

    // Restart game function
    restartBtn.addEventListener('click', initGame);

    // Start game
    initGame();
});
