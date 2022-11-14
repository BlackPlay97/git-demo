setGame();
function setGame() {
  const arrayNumber = boardNumber();
  // const arrayColNumber = boardNumber()[1];
  // const arrayTileNumber = boardNumber()[2];
  // console.log(arrayNumber[1]);
  //Sudoku board
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();
      tile.innerText = arrayNumber[i][j];
      if (tile.innerText != "") {
        tile.classList.add("tileBlock");
        tile.setAttribute("Disabled", "");
      }
      if (i == 2 || i == 5) {
        tile.classList.add("bottomLine");
      }
      if (j == 2 || j == 5) {
        tile.classList.add("rightLine");
      }
      tile.classList.add("tile");
      document.getElementById("board").appendChild(tile);

      //click event
      tile.addEventListener("click", selectTile);
    }
  }

  //random array number board
  function boardNumber() {
    //sort by row
    let arrRow = [[], [], [], [], [], [], [], [], []];
    for (r = 0; r < 9; r++) {
      for (t = 0; t < 9; t++) {
        let newNum = Math.floor(Math.random() * 10);
        if (arrRow[r].includes(newNum) == false && newNum != 0) {
          arrRow[r].push(newNum);
        } else {
          arrRow[r].push("");
        }
      }
    }

    //sort by column
    let arrCol = [[], [], [], [], [], [], [], [], []];
    for (x = 0; x < 9; x++) {
      for (y = 0; y < 9; y++) {
        if (arrCol[x].includes(arrRow[y][x]) == false) {
          arrCol[x].push(arrRow[y][x]);
        } else {
          arrCol[x].push("");
        }
      }
    }
    //sort by big-tile
    let arr = [[], [], [], [], [], [], [], [], []];
    let arrTile = [[], [], [], [], [], [], [], [], []];
    for (g = 0; g < 9; g++) {
      for (h = 0; h < 9; h++) {
        arrTile = [
          [
            arrCol[0][0],
            arrCol[0][1],
            arrCol[0][2],
            arrCol[1][0],
            arrCol[1][1],
            arrCol[1][2],
            arrCol[2][0],
            arrCol[2][1],
            arrCol[2][2],
          ],
          [
            arrCol[0][3],
            arrCol[0][4],
            arrCol[0][5],
            arrCol[1][3],
            arrCol[1][4],
            arrCol[1][5],
            arrCol[2][3],
            arrCol[2][4],
            arrCol[2][5],
          ],
          [
            arrCol[0][6],
            arrCol[0][7],
            arrCol[0][8],
            arrCol[1][6],
            arrCol[1][7],
            arrCol[1][8],
            arrCol[2][6],
            arrCol[2][7],
            arrCol[2][8],
          ],
          [
            arrCol[3][0],
            arrCol[3][1],
            arrCol[3][2],
            arrCol[4][0],
            arrCol[4][1],
            arrCol[4][2],
            arrCol[5][0],
            arrCol[5][1],
            arrCol[5][2],
          ],
          [
            arrCol[3][3],
            arrCol[3][4],
            arrCol[3][5],
            arrCol[4][3],
            arrCol[4][4],
            arrCol[4][5],
            arrCol[5][3],
            arrCol[5][4],
            arrCol[5][5],
          ],
          [
            arrCol[3][6],
            arrCol[3][7],
            arrCol[3][8],
            arrCol[4][6],
            arrCol[4][7],
            arrCol[4][8],
            arrCol[5][6],
            arrCol[5][7],
            arrCol[5][8],
          ],
          [
            arrCol[6][0],
            arrCol[7][1],
            arrCol[8][2],
            arrCol[6][0],
            arrCol[7][1],
            arrCol[8][2],
            arrCol[6][0],
            arrCol[7][1],
            arrCol[8][2],
          ],
          [
            arrCol[6][3],
            arrCol[7][4],
            arrCol[8][5],
            arrCol[6][3],
            arrCol[7][4],
            arrCol[8][5],
            arrCol[6][3],
            arrCol[7][4],
            arrCol[8][5],
          ],
          [
            arrCol[6][6],
            arrCol[7][7],
            arrCol[8][8],
            arrCol[6][6],
            arrCol[7][7],
            arrCol[8][8],
            arrCol[6][6],
            arrCol[7][7],
            arrCol[8][8],
          ],
        ];
        if (arr[g].includes(arrTile[g][h]) == false) {
          arr[g].push(arrTile[g][h]);
        } else {
          arr[g].push("");
        }
      }
    }

    //array sorted
    return arr;
  }

  //Select number board
  for (u = 1; u <= 9; u++) {
    let numSelect = document.createElement("div");
    numSelect.id = u.toString();
    numSelect.innerText = u;
    numSelect.classList.add("numSelect");
    document.getElementById("select").appendChild(numSelect);

    //click event
    numSelect.addEventListener("click", selectNum);
  }

  //click event
  function selectNum() {
    numSelected = this;
    numSelected.classList.toggle("select-number");
    if (document.getElementById(u) != null) {
      numSelected.classList.remove("select-number");
    }
  }

  //click event
  let errors = 0;
  function selectTile() {
    let arrCheck = 0;
    let arrCheckCol = [[], [], [], [], [], [], [], [], []];
    for (a = 0; a < 9; a++) {
      for (b = 0; b < 9; b++) {
        arrCheckCol[a].push(arrayNumber[b][a]);
      }
    }
    let arrCheckTile = [[], [], [], [], [], [], [], [], []];
    arrCheckTile = [
      [
        arrayNumber[0][0],
        arrayNumber[0][1],
        arrayNumber[0][2],
        arrayNumber[1][0],
        arrayNumber[1][1],
        arrayNumber[1][2],
        arrayNumber[2][0],
        arrayNumber[2][1],
        arrayNumber[2][2],
      ],
      [
        arrayNumber[0][3],
        arrayNumber[0][4],
        arrayNumber[0][5],
        arrayNumber[1][3],
        arrayNumber[1][4],
        arrayNumber[1][5],
        arrayNumber[2][3],
        arrayNumber[2][4],
        arrayNumber[2][5],
      ],
      [
        arrayNumber[0][6],
        arrayNumber[0][7],
        arrayNumber[0][8],
        arrayNumber[1][6],
        arrayNumber[1][7],
        arrayNumber[1][8],
        arrayNumber[2][6],
        arrayNumber[2][7],
        arrayNumber[2][8],
      ],
      [
        arrayNumber[3][0],
        arrayNumber[3][1],
        arrayNumber[3][2],
        arrayNumber[4][0],
        arrayNumber[4][1],
        arrayNumber[4][2],
        arrayNumber[5][0],
        arrayNumber[5][1],
        arrayNumber[5][2],
      ],
      [
        arrayNumber[3][3],
        arrayNumber[3][4],
        arrayNumber[3][5],
        arrayNumber[4][3],
        arrayNumber[4][4],
        arrayNumber[4][5],
        arrayNumber[5][3],
        arrayNumber[5][4],
        arrayNumber[5][5],
      ],
      [
        arrayNumber[3][6],
        arrayNumber[3][7],
        arrayNumber[3][8],
        arrayNumber[4][6],
        arrayNumber[4][7],
        arrayNumber[4][8],
        arrayNumber[5][6],
        arrayNumber[5][7],
        arrayNumber[5][8],
      ],
      [
        arrayNumber[6][0],
        arrayNumber[7][1],
        arrayNumber[8][2],
        arrayNumber[6][0],
        arrayNumber[7][1],
        arrayNumber[8][2],
        arrayNumber[6][0],
        arrayNumber[7][1],
        arrayNumber[8][2],
      ],
      [
        arrayNumber[6][3],
        arrayNumber[7][4],
        arrayNumber[8][5],
        arrayNumber[6][3],
        arrayNumber[7][4],
        arrayNumber[8][5],
        arrayNumber[6][3],
        arrayNumber[7][4],
        arrayNumber[8][5],
      ],
      [
        arrayNumber[6][6],
        arrayNumber[7][7],
        arrayNumber[8][8],
        arrayNumber[6][6],
        arrayNumber[7][7],
        arrayNumber[8][8],
        arrayNumber[6][6],
        arrayNumber[7][7],
        arrayNumber[8][8],
      ],
    ];

    numberSelected = this;

    // get position array
    let position = this.id.split("-");
    let n = parseInt(position[0]);
    let m = parseInt(position[1]);
    let k;
    if ((0 <= n <= 2) & (0 <= m <= 2)) {
      k = 0;
    } else if ((3 <= n <= 5) & (0 <= m <= 2)) {
      k = 1;
    }
    console.log(k);
    //check by row
    arrCheck = parseInt(numSelected.id);

    if (
      arrayNumber[n].includes(arrCheck) == false ||
      arrCheckCol[m].includes(arrCheck) == false
      // arrCheckTile[n].includes(arrCheck) == false
    ) {
      arrayNumber[n][m] = parseInt(numSelected.id);
      this.innerText = numSelected.id;
    } else {
      errors += 1;
      document.getElementById("err").innerHTML = "Errors: " + errors;
    }
    // console.log(n);
    // console.log(m);
    // console.log(arrCheckTile);
    // console.log(arrCheckTile[n].includes(arrCheck));
  }
  // else
  // if (arrCheckCol[m].includes(arrCheck) == false) {
  //   arrCheckCol[n][m] = parseInt(numSelected.id);
  //   this.innerText = numberSelected.id;
  // } else if (arrCheckTile[n].includes(arrCheck) == false) {
  //   arrCheckTile[n][m] = parseInt(numSelected.id);
  //   this.innerText = numberSelected;
  // } else {
  //   errors += 1;
  //   document.getElementById("err").innerHTML = "Erro";
  // }
  //  else if (arrayColNumber[n].includes(parseInt(numSelected.id)) === false) {
  //   arrayColNumber[n][m] = parseInt(numSelected.id);
  //   this.innerText = numSelected.id;
  // } else if (arrayTileNumber[n].includes(arrCheckTile[n][m]) == false) {
  //   arrayTileNumber[n][m] = parseInt(numSelected.id);
  //   this.innerText = numSelected.id;
  // }
  // else {
  //
  // console.log(errors);
  // }
  // else if (arrayNumber[1][n].indexOf(arrCheck[n][m]) < 0) {
  //   arrayNumber[1][n][m] = parseInt(numSelected.id);
  //   this.innerText = numberSelected.id;
  // }
  // else {
  //   errors += 1;
  //   document.getElementById("err").innerHTML = "Erro";
  // }
}
