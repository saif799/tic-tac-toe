const Board = document.querySelector(".game_board");
const cells = document.querySelectorAll(".cell");
function player(s) {
  let sign = s;
  const getSign = () => sign;
  return { getSign };
}

function cell(x) {
  let sign = x;
  let ocupied = false;

  const isOcupied = () => ocupied;

  const getSign = () => sign;

  const ocupie = () => {
    ocupied = true;
  };
  const unOcupie = () => {
    ocupied = false;
  };

  const setsign = (s) => {
    sign = s;
    ocupie();
  };

  return { getSign, setsign, isOcupied, ocupie, unOcupie };
}

const gameBoard = (function () {
  const gameBooard = [
    cell("."),
    cell("."),
    cell("."),
    cell("."),
    cell("."),
    cell("."),
    cell("."),
    cell("."),
    cell("."),
  ];

  let index;
  Board.addEventListener("click", (e) => {
    index = Array.from(cells).indexOf(e.target);
  });

  const getCell = (i) => gameBooard[i].getSign();

  const getINdex = () => index;

  let filledCount = 0;

  const checkCell = (i) => gameBooard[i].isOcupied();

  const fillCell = (i, val) => {
    if (!checkCell(i)) {
      gameBooard[i].setsign(val);
      filledCount++;
      return true;
    }
    return false;
  };

  function isFilled() {
    if (filledCount === 9) return true;
    return false;
  }

  const resetboard = () => {
    gameBooard.forEach((e) => {
      e.setsign(".");
      e.unOcupie();
      filledCount = 0;
    });
  };

  return { fillCell, isFilled, getINdex, resetboard, getCell };
})();

const game = (function () {
  const players = {
    pl1: player("X"),
    pl2: player("O"),
  };
  let currentPlayer = players.pl1;

  const changeCurentPlayer = () =>
    (currentPlayer = currentPlayer === players.pl1 ? players.pl2 : players.pl1);

  const getCurentPlayer = () => currentPlayer;

  function checkDraw() {
    if (gameBoard.isFilled()) {
      gameBoard.resetboard();
      return true;
    }
    return false;
  }

  function checkRow() {
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = i * 3; j < i * 3 + 3; j++) {
        row.push(gameBoard.getCell(j));
      }
      if (
        row.every((sign) => sign === "O") ||
        row.every((sign) => sign === "X")
      )
        return true;
    }
    return false;
  }
  function checkCol() {
    for (let i = 0; i < 3; i++) {
      const col = [];
      for (let j = 0; j < 3; j++) {
        col.push(gameBoard.getCell(i + 3 * j));
      }
      if (
        col.every((sign) => sign === "O") ||
        col.every((sign) => sign === "X")
      )
        return true;
    }
    return false;
  }
  function checkDiag() {
    const diag1 = [
      gameBoard.getCell(0),
      gameBoard.getCell(4),
      gameBoard.getCell(8),
    ];
    const diag2 = [
      gameBoard.getCell(2),
      gameBoard.getCell(4),
      gameBoard.getCell(6),
    ];
    if (
      diag1.every((sign) => sign === "O") ||
      diag1.every((sign) => sign === "X") ||
      diag2.every((sign) => sign === "X") ||
      diag2.every((sign) => sign === "O")
    )
      return true;
    return false;
  }

  function CheckWin() {
    if (checkCol() || checkDiag() || checkRow()) return true;
    return false;
  }

  function resetTheDomCells() {
    for (let i = 0; i < 9; i++) {
      cells[i].textContent = "";
    }
  }
  const scoreSign = document.querySelector(".score");
  function showscore(t) {
    scoreSign.classList.remove("hidden");
    scoreSign.innerHTML = t;
  }

  scoreSign.addEventListener("click", () => scoreSign.classList.add("hidden"));

  function render(e) {
    let index = gameBoard.getINdex();
    if (gameBoard.fillCell(index, currentPlayer.getSign())) {
      e.target.innerHTML = currentPlayer.getSign();
      if (CheckWin()) {
        gameBoard.resetboard();
        resetTheDomCells();
        const text = "Player " + currentPlayer.getSign() + " won";
        showscore(text);
      } else if (checkDraw()) {
        gameBoard.resetboard();
        resetTheDomCells();
        showscore("DRAW");
      } else changeCurentPlayer();
    }
  }

  Board.addEventListener("click", render);
})();
