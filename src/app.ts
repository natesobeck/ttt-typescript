/*-------------------------------- Constants --------------------------------*/

const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let turn: number, winner: boolean, tie: boolean, board: number[]

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr') as NodeListOf<HTMLDivElement>
const messageEl = document.querySelector('#message') as HTMLHeadingElement
const resetBtnEl = document.getElementById('resetBtn') as HTMLButtonElement

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(squareEl => {
  squareEl.addEventListener('click', handleClick)
})
resetBtnEl.addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/

init()
render()

function init(): void {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turn = 1
  winner=false
  tie=false
  resetSquareEls()
  render()
}

function resetSquareEls(): void {
  squareEls.forEach(squareEl => {
    if(squareEl.classList.contains('X')) {
      squareEl.classList.remove('X')
    } else if(squareEl.classList.contains('O')) {
      squareEl.classList.remove('O')
    }
  })
}

function render(): void {
  updateBoard()
  updateMessage()
}

function updateBoard(): void {
  board.forEach((cellVal, i) => {
    if (cellVal === 1) {
      squareEls[i].textContent = 'X'
      squareEls[i].classList.toggle('X')
    } else if (cellVal === -1) {
      squareEls[i].textContent = 'O'
      squareEls[i].classList.toggle('O')
    } else {
      squareEls[i].textContent = ''
    }
  })
}

function updateMessage(): void {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn.`
  } else if (!winner && tie) {
    messageEl.textContent = `It's a tie! Play again?`
  } else {
    messageEl.textContent = `Congratulations! Player ${turn === 1 ? 'X' : 'O'} has won the game! Rematch?`
  }
}

function handleClick(evt: MouseEvent) {
  if (!evt.target) return
  
  const target = evt.target as Element
  let sqIdx: number = parseInt(target.id.replace('sq', ''))
  if (board[sqIdx] !== 0 || winner) return
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function placePiece(i: number): void {
  board[i] = turn
}

function checkForTie(): void {
  if (!board.includes(0)) tie = true
}

function checkForWinner(): void {
  winningCombos.forEach(combo => {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
      winner = true
      // confetti.start(2000)
    }
  })
}

function switchPlayerTurn(): void {
  if (winner === true) {
    return 
  } else {
    turn *= -1
  }
}