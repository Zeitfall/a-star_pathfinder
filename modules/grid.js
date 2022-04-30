export class Grid {
  constructor({
    DOM,
    gridWidth,
    gridHeight,
    gridRows,
    gridColumns,
  }) {
    this.DOM = DOM;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.gridRows = gridRows;
    this.gridColumns = gridColumns;
    this.cellWidth = this.gridWidth / this.gridColumns;
    this.cellHeight = this.gridHeight / this.gridRows;

    // this.#setup();
  }

  setup() {
    this.DOM.style.width = `${this.gridWidth}px`;
    this.DOM.style.height = `${this.gridHeight}px`;
    this.DOM.style.gridTemplate = `repeat(auto-fill, ${this.cellWidth}px) / repeat(auto-fill, ${this.cellHeight}px)`;
  
    this.DOM.innerHTML = ''; 
    for(let i = 0; i < this.gridRows; i++) {
      for(let j = 0; j < this.gridColumns; j++) {
        this.DOM.insertAdjacentHTML('beforeend', `<div data-position="${i}/${j}" class="grid__cell cell"></div>`);
      }
    }
  }
}
