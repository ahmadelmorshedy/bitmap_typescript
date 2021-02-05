import ScoreCalculatorInterface from './ScoreCalculatorInterface';
import Cell from './Cell';

class IncrementalDistanceScoreCalculator implements ScoreCalculatorInterface {
  private _cells_matrix: Cell[][];
  private _ones_matrix: Cell[];
  private _scores_matrix: number[][] = [];

  // Constructor class
  constructor(cells_matrix: Cell[][], ones_matrix: Cell[]) {
    this._cells_matrix = cells_matrix;
    this._ones_matrix = ones_matrix;
    this._cells_matrix.forEach( (cell_row, index) => {
      let null_row = [];
      cell_row.forEach( () => {
        null_row.push(null);
      });
      this._scores_matrix.push(null_row);
    });
  }

  // --------------------------------------------------------------------------

  // getters
  get scores_matrix(): number[][] {
    return this._scores_matrix;
  }

  // --------------------------------------------------------------------------

  calculate_scores_matrix(): number[][] {
    let calculated_scores: number = this._ones_matrix.length;
    this.fill_scores_matrix_with(this._ones_matrix, 0);

    this._ones_matrix.forEach( (one_cell) => {
      this.reset_cell(one_cell);
    });

    let distance: number = 1;
    let cells: Cell[] = this._ones_matrix;

    while(calculated_scores < this._cells_matrix.length * this._cells_matrix[0].length) {
      cells = this.pop_next_cells(cells);
      this.fill_scores_matrix_with(cells, distance);
      calculated_scores += cells.length;
      distance += 1;
    }

    return this._scores_matrix;
  }

  // --------------------------------------------------------------------------

  private fill_scores_matrix_with(cells: Cell[], score: number) {
    cells.forEach( (cell) => {
      this._scores_matrix[cell.i][cell.j] = score;
    });
  }

  private reset_cell(cell: Cell) {
    this._cells_matrix[cell.i][cell.j] = null;
  }

  private pop_next_cells(cells: Cell[]): Cell[] {
    let next_cells_list: Cell[] = [];
    cells.forEach ( (cell) => {
      let cells_indexes = cell.get_closest_cells_indexes(this._cells_matrix.length - 1,
                                                         this._cells_matrix[0].length - 1);
      cells_indexes.forEach( (cell_indexes) => {
        let cell_at_indexes = this._cells_matrix[cell_indexes[0]][cell_indexes[1]];
        if (cell_at_indexes != null) {
          next_cells_list.push(cell_at_indexes);
          this.reset_cell(cell_at_indexes);
        }
      });
    });

    return next_cells_list;
  }
}

export default IncrementalDistanceScoreCalculator;