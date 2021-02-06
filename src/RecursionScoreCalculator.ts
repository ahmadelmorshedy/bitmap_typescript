import ScoreCalculatorInterface from './ScoreCalculatorInterface';
import Cell from './Cell';

class RecursionScoreCalculator implements ScoreCalculatorInterface {
  private _cells_matrix: Cell[][];
  private _scores_matrix: number[][] = [];
  private _scores_upper_left: number[][] = [];
  private _scores_down_left: number[][] = [];
  private _scores_upper_right: number[][] = [];
  private _scores_down_right: number[][] = [];

  // Constructor class
  constructor(cells_matrix: Cell[][]) {
    this._cells_matrix = cells_matrix;

    this._cells_matrix.forEach( (cell_row, index) => {
      let null_row = [];
      cell_row.forEach( () => {
        null_row.push(null);
      });
      this._scores_upper_left.push(null_row);
      this._scores_down_right.push(null_row);
      this._scores_upper_right.push(null_row);
      this._scores_down_left.push(null_row);
    });
  }

  // --------------------------------------------------------------------------

  // getters
  get scores_matrix(): number[][] {
    return this._scores_matrix;
  }

  // --------------------------------------------------------------------------

  calculate_scores_matrix() {
    // Recursive algorithm from all the 4 corners
    for (let i = 0; i < this._cells_matrix.length; i++) {
      for (let j = 0; i < this._cells_matrix[0].length; j++) {
        this.calculate_score_from_upper_left(this._cells_matrix[i][j], 0);
      }
    }

    for (let i = this._cells_matrix.length - 1; i >= 0; i--) {
      for (let j = this._cells_matrix[0].length - 1; j >= 0 ; j--) {
        this.calculate_score_from_down_right(this._cells_matrix[i][j], 0);
      }
    }

    for (let i = 0; i < this._cells_matrix.length; i++) {
      for (let j = this._cells_matrix[0].length - 1; j >= 0 ; j--) {
        this.calculate_score_from_upper_right(this._cells_matrix[i][j], 0);
      }
    }

    for (let i = this._cells_matrix.length - 1; i >= 0; i--) {
      for (let j = 0; i < this._cells_matrix[0].length; j++) {
        this.calculate_score_from_down_left(this._cells_matrix[i][j], 0);
      }
    }

    // Get min score for each cell
    let temp_scores: number[] = [];
    for (let i = 0; i < this._cells_matrix.length; i++) {
      for (let j = 0; i < this._cells_matrix[0].length; j++) {
        if (this._scores_upper_left[i][j] != null) {
          temp_scores.push(this._scores_upper_left[i][j]);
        }
        if (this._scores_down_right[i][j] != null) {
          temp_scores.push(this._scores_down_right[i][j]);
        }
        if (this._scores_upper_right[i][j] != null) {
          temp_scores.push(this._scores_upper_right[i][j]);
        }
        if (this._scores_down_left[i][j] != null) {
          temp_scores.push(this._scores_down_left[i][j]);
        }

        this._scores_matrix[i][j] = Math.min(...temp_scores);
      }
    }
  }

  calculate_score_from_upper_left(cell: Cell, neighborhood_dist: number) {
    if(cell == null) {
      return null;
    }

    if(this._scores_upper_left[cell.i][cell.j] != null) {
      return this._scores_upper_left[cell.i][cell.j] + neighborhood_dist;
    }

    if (cell.is_one_value()) {
      this._scores_upper_left[cell.i][cell.j] = 0;
      return neighborhood_dist;
    }

    let scores: number[] = [this.calculate_score_from_upper_left(this.right(cell), 1),
                            this.calculate_score_from_upper_left(this.down(cell), 1)]

    let scores_not_null: number[] = [];
    scores.forEach( (sc) => {
      if(sc != null) {
        scores_not_null.push(sc);
      }
    });

    if (scores_not_null.length > 0) {
      this._scores_upper_left[cell.i][cell.j] = Math.min(...scores_not_null);
      return Math.min(...scores_not_null) + neighborhood_dist;
    }
  }

  calculate_score_from_upper_right(cell: Cell, neighborhood_dist: number) {
    if(cell == null) {
      return null;
    }

    if(this._scores_upper_right[cell.i][cell.j] != null) {
      return this._scores_upper_right[cell.i][cell.j] + neighborhood_dist;
    }

    if (cell.is_one_value()) {
      this._scores_upper_right[cell.i][cell.j] = 0;
      return neighborhood_dist;
    }

    let scores: number[] = [this.calculate_score_from_upper_right(this.left(cell), 1),
                            this.calculate_score_from_upper_right(this.down(cell), 1)]

    let scores_not_null: number[] = [];
    scores.forEach( (sc) => {
      if(sc != null) {
        scores_not_null.push(sc);
      }
    });

    if (scores_not_null.length > 0) {
      this._scores_upper_right[cell.i][cell.j] = Math.min(...scores_not_null);
      return Math.min(...scores_not_null) + neighborhood_dist;
    }
  }

  calculate_score_from_down_left(cell: Cell, neighborhood_dist: number) {
    if(cell == null) {
      return null;
    }

    if(this._scores_down_left[cell.i][cell.j] != null) {
      return this._scores_down_left[cell.i][cell.j] + neighborhood_dist;
    }

    if (cell.is_one_value()) {
      this._scores_down_left[cell.i][cell.j] = 0;
      return neighborhood_dist;
    }

    let scores: number[] = [this.calculate_score_from_down_left(this.right(cell), 1),
                            this.calculate_score_from_down_left(this.upper(cell), 1)]

    let scores_not_null: number[] = [];
    scores.forEach( (sc) => {
      if(sc != null) {
        scores_not_null.push(sc);
      }
    });

    if (scores_not_null.length > 0) {
      this._scores_down_left[cell.i][cell.j] = Math.min(...scores_not_null);
      return Math.min(...scores_not_null) + neighborhood_dist;
    }
  }

  calculate_score_from_down_right(cell: Cell, neighborhood_dist: number) {
    if(cell == null) {
      return null;
    }

    if(this._scores_down_right[cell.i][cell.j] != null) {
      return this._scores_down_right[cell.i][cell.j] + neighborhood_dist;
    }

    if (cell.is_one_value()) {
      this._scores_down_right[cell.i][cell.j] = 0;
      return neighborhood_dist;
    }

    let scores: number[] = [this.calculate_score_from_down_right(this.left(cell), 1),
                            this.calculate_score_from_down_right(this.upper(cell), 1)]

    let scores_not_null: number[] = [];
    scores.forEach( (sc) => {
      if(sc != null) {
        scores_not_null.push(sc);
      }
    });

    if (scores_not_null.length > 0) {
      this._scores_down_right[cell.i][cell.j] = Math.min(...scores_not_null);
      return Math.min(...scores_not_null) + neighborhood_dist;
    }
  }

  upper(cell: Cell): Cell {
    if (cell.i > 0) {
      return this._cells_matrix[cell.i - 1][cell.j];
    }

  }

  down(cell: Cell): Cell {
    if (cell.i < this._cells_matrix.length - 1) {
      return this._cells_matrix[cell.i + 1][cell.j];
    }
  }

  right(cell: Cell): Cell {
    if (cell.j < this._cells_matrix[0].length - 1) {
      return this._cells_matrix[cell.i][cell.j+1];
    }
  }

  left(cell: Cell): Cell {
    if (cell.j > 0) {
      return this._cells_matrix[cell.i][cell.j-1];
    }
  }

}

export default RecursionScoreCalculator;
