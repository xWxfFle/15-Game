class App {
  moveCounter = 0;
  gameTime = 0;
  numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);
  cells = [];
  empty = {
    value: 16,
    top: 3,
    left: 3,
  };
  constructor() {
    this._startResults();
    this._generateNewField();
    document.getElementById("shuffle").addEventListener("click", () => {
      window.location.reload();
    });
  }
  _generateNewField() {
    for (let i = 0; i <= 14; i++) {
      const cell = document.createElement("div");
      const value = this.numbers[i] + 1;
      cell.className = "cell";
      cell.innerHTML = value;

      const left = i % 4;
      const top = (i - left) / 4;

      this.cells.push({
        value: value,
        left: left,
        top: top,
        element: cell,
      });

      cell.style.left = `${left * 25}%`;
      cell.style.top = `${top * 25}%`;

      document.getElementById("field").append(cell);

      cell.addEventListener("click", () => {
        this._move(i);
      });
    }
    this.cells.push(this.empty);
  }

  _move(index) {
    const cell = this.cells[index];
    const leftDiff = Math.abs(this.empty.left - cell.left);
    const topDiff = Math.abs(this.empty.top - cell.top);
    if (leftDiff + topDiff > 1) {
      return;
    }
    this.moveCounter++;

    cell.element.style.left = `${this.empty.left * 25}%`;
    cell.element.style.top = `${this.empty.top * 25}%`;

    const emptyLeft = this.empty.left;
    const emptyTop = this.empty.top;
    this.empty.left = cell.left;
    this.empty.top = cell.top;

    cell.left = emptyLeft;
    cell.top = emptyTop;
    const isFinished = this.cells.every((cell) => {
      return cell.value === cell.top * 4 + cell.left + 1;
    });

    if (isFinished) {
      alert(
        "You solved the puzzle in " +
          this.gameTime +
          " seconds and " +
          this.moveCounter +
          " moves"
      );
      window.location.reload();
    }
  }
  _startResults() {
    const moveContainer = document.querySelector(".move-text");
    const timeContainer = document.querySelector(".time-text");
    moveContainer.innerHTML = "" + this.moveCounter;
    timeContainer.innerHTML = "" + this.gameTime;
    setInterval(() => {
      moveContainer.innerHTML = "" + this.moveCounter;
    }, 100);
    setInterval(() => {
      timeContainer.innerHTML = "" + ++this.gameTime;
    }, 1000);
  }
}
new App();
