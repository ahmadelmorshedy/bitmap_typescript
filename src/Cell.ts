class Cell {
  private _i: number;
  private _j: number;
  private _val: number;

  // Constructor class
  constructor(i: number, j: number, val: number) {
    this._i = i;
    this._j = j;
    this._val = val;
  }

  // --------------------------------------------------------------------------

  // getters
  get i(): number {
    return this._i;
  }

  get j(): number {
    return this._j;
  }

  // --------------------------------------------------------------------------

  is_one_value() :boolean {
    return this._val == 1;
  }

  get_distance_from(other_cell: Cell): number {
    return Math.abs(this._i - other_cell.i) + Math.abs(this._j - other_cell.j)
  }

  get_closest_cells_indexes(max_row: number, max_column: number): number[][] {
    let cells_indexes: number[][] = [];

    if (this._i > 0) {
      cells_indexes.push([this._i - 1, this._j]);
    }
    if (this._j < max_column) {
      cells_indexes.push([this._i, this._j + 1]);
    }
    if (this._i < max_row) {
      cells_indexes.push([this._i + 1, this._j]);
    }
    if (this._j > 0) {
      cells_indexes.push([this._i, this._j - 1]);
    }

    return cells_indexes;
  }
}

export default Cell;