var numberSelected,
  tileSelected,
  disableSelect,
  timeElapsed = 0,
  timerID = -1,
  mistakes = 0,
  tilesFilled = 0,
  numbersAvailable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function selectNumber() {
  disableSelect ||
    this.classList.contains("number-completed") ||
    (this.classList.contains("number-selected")
      ? (this.classList.remove("number-selected"), (numberSelected = null))
      : (numberSelected && numberSelected.classList.remove("number-selected"),
        this.classList.add("number-selected"),
        (numberSelected = this),
        update()));
}
function fillTile() {
  disableSelect ||
    this.classList.contains("tile-filled") ||
    (this.classList.contains("tile-selected")
      ? (this.classList.remove("tile-selected"), (tileSelected = null))
      : (tileSelected && tileSelected.classList.remove("tile-selected"),
        this.classList.add("tile-selected"),
        (tileSelected = this),
        update()));
}
function checkTile(e) {
  return (
    document.getElementById("solution").textContent.charAt(e.id) ==
    e.textContent
  );
}
function update() {
  tileSelected &&
    numberSelected &&
    ((tileSelected.textContent = numberSelected.textContent),
    checkTile(tileSelected)
      ? (tileSelected.classList.remove("tile-selected"),
        tileSelected.classList.add("tile-filled"),
        9 == ++numbersAvailable[tileSelected.textContent] &&
          (numberSelected.classList.add("number-completed"),
          (numberSelected = null)),
        tileSelected.classList.contains("incorrect") &&
          tileSelected.classList.remove("incorrect"),
        (tileSelected = null),
        81 == ++tilesFilled && completedSudoku())
      : (tileSelected.classList.add("incorrect"),
        mistakes++,
        (document.getElementById("mistakes").textContent = "x" + mistakes)));
}
function loadSudoku() {
  (sudokuBoard = document.getElementById("board").textContent),
    (sudokuBoard = sudokuBoard.match(/.{1,9}/g)),
    (disableSelect = !1),
    setSudoku();
}
function setSudoku() {
  clearSudoku();
  let e = 0;
  for (let t = 0; t < 9; t++)
    for (let l = 0; l < 9; l++) {
      let s = document.createElement("p");
      "*" != sudokuBoard[t].charAt(l)
        ? ((s.textContent = sudokuBoard[t].charAt(l)),
          s.classList.add("tile-default"),
          (s.style.fontWeight = "bold"),
          tilesFilled++,
          numbersAvailable[s.textContent]++)
        : s.addEventListener("click", fillTile),
        (s.id = e++),
        s.classList.add("tile"),
        (2 != t && 5 != t) || s.classList.add("bottom-border"),
        (2 != l && 5 != l) || s.classList.add("right-border"),
        document.getElementById("sudoku-board").appendChild(s);
    }
  setTimer();
}
function clearSudoku() {
  const e = document.querySelectorAll(".tile");
  for (let t = 0; t < e.length; t++) e[t].remove();
  clearTimer();
  const t = document.getElementById("select-number").children;
  for (let e = 0; e < t.length; e++)
    t[e].classList.contains("number-selected") &&
      t[e].classList.remove("number-selected"),
      t[e].classList.contains("number-completed") &&
        t[e].classList.remove("number-completed");
  (tileSelected = null),
    (numberSelected = null),
    (tilesFilled = 0),
    (numbersAvailable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    (mistakes = 0),
    (document.getElementById("mistakes").textContent = "x" + mistakes);
}
function solveSudoku() {
  let e = document.getElementById("solution").textContent;
  (sudokuBoard = e.match(/.{1,9}/g)),
    (numberSelected = null),
    (tileSelected = null),
    (disableSelect = !0),
    setSudoku("solve"),
    (document.getElementById("timer").textContent = "--:--"),
    completedSudoku();
}
function tick() {
  timeElapsed++,
    (document.getElementById("timer").textContent = formatTimer(timeElapsed));
}
function setTimer() {
  -1 == timerID && (timerID = setInterval(tick, 1e3));
}
function stopTimer() {
  -1 != timerID && (clearInterval(timerID), (timerID = -1));
}
function clearTimer() {
  stopTimer(), (timeElapsed = 0), tick();
}
function formatTimer() {
  let e = Math.floor(timeElapsed / 60),
    t = timeElapsed % 60;
  return t < 10 && (t = "0" + t), e + ":" + t;
}
function completedSudoku() {
  (disableSelect = !0), stopTimer();
}
window.onload = function () {
  loadSudoku(),
    document
      .getElementById("load-sudoku")
      .addEventListener("click", loadSudoku),
    document
      .getElementById("solve-sudoku")
      .addEventListener("click", solveSudoku);
  let e = document.getElementById("select-number").children;
  for (let t = 0; t < e.length; t++)
    e[t].addEventListener("click", selectNumber);
};
