const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const startCells = ['', '', '', '', '', '','', '', ''];
const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]];

let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
    startCells.forEach((_cell, index) => {
        
        const cellElement = document.createElement('div');
        cellElement.id = index;
        cellElement.classList.add('square');
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement);
    });
}



function addGo(e) {
    console.log(e.target);
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);

    go = go === 'circle' ? 'cross' : 'circle';
    infoDisplay.textContent = "it is now " + go + "'s go";
    e.target.removeEventListener('click', addGo);
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll('.square');
    console.log(allSquares);

    winningCombos.forEach(array => {

        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'));
        
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross'));

        if (circleWins) {
            infoDisplay.textContent = "Circle wins !";
        }
        if (crossWins) {
            infoDisplay.textContent = "Cross wins !";
        }

        if (circleWins || crossWins) {
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
         
    })


}

createBoard();