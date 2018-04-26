function Cell(cellColor) {
  if (cellColor === undefined)
    this.cellColor = color(255, 255, 255);
  else
    this.cellColor = cellColor;
  this.lifetime = 0;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function CellGrid(columns, rows) {
  this.columns = columns;
  this.rows = rows;
  this.grid = make2DArray(columns, rows);
  this.nextGrid = make2DArray(columns, rows);
}

CellGrid.prototype.evaluateNeighbors = function (x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + this.columns) % this.columns;
      let row = (y + j + this.rows) % this.rows;
      if (this.grid[col][row] != null)
        sum++;
    }
  }
  if (this.grid[x][y] != null)
    sum--;
  return sum;
}

CellGrid.prototype.initialize = function () {
  console.log("initialization started");
  for (let i = 0; i < this.columns; i++) {
    for (var j = 0; j < this.rows; j++) {
      if (floor(random(2)) == 1) {
        this.grid[i][j] = new Cell();
      } else {
        this.grid[i][j] = null
      }
    }
  }
  console.log("initialization finished");
}

CellGrid.prototype.updateGrid = function () {
  //clone the originalArray

  // this.nextGrid = make2DArray(this.columns, this.rows);
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      // this.nextGrid[i][j] = null;

      let isCellValid = this.grid[i][j] != null;
      let neighbors = cellGrid.evaluateNeighbors(i, j);



      if (!isCellValid && neighbors == 3) {
        this.nextGrid[i][j] = new Cell();
      } else if (isCellValid && (neighbors < 2 || neighbors > 3)) {
        this.nextGrid[i][j] = null;
      } else {
        //cell stays as is
        this.nextGrid[i][j] = this.grid[i][j];
        // console.log("stays as is. next: " +this.nextGrid[i][j]+"\n dis:" + this.grid[i][j])
      }
      // console.log(this.nextGrid[i][j]);
    }
  }
  let temp = this.grid;
  this.grid = this.nextGrid;
  this.nextGrid = temp;
  // this.grid = this.nextGrid;
}

CellGrid.prototype.reset = function () {
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j] = null;
    }
  }
}

CellGrid.prototype.logGrid = function () {
  console.log(this.nextGrid);
}
