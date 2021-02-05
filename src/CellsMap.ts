import Cell from './Cell';

class CellsMap {
  private _rows: number;
  private _cols: number;
  private _cells_matrix: Cell[][] = [];
  private _ones: Cell[] = [];

  // Constructor class
  constructor(n: number, m: number) {
    this._rows = n;
    this._cols = m;
  }

  // --------------------------------------------------------------------------

  // getters

  get cells_matrix(): Cell[][] {
    return this._cells_matrix;
  }

  get ones(): Cell[] {
    return this._ones;
  }

  // --------------------------------------------------------------------------

  is_valid(): boolean {
    return this._ones.length >= 1
  }

  append_row(row: number[]) {
    if(row.length == this._cols) {
      let cells_row: Cell[] = [];

      row.forEach( (cell_value, index) => {
        let cell:Cell = new Cell(this._cells_matrix.length, index, cell_value);
        cells_row.push(cell);
        if(cell.is_one_value()) {
          this._ones.push(cell);
        }
      });
      this._cells_matrix.push(cells_row);
    }
  }
}

export default CellsMap;