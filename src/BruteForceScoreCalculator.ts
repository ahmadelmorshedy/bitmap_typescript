import ScoreCalculatorInterface from './ScoreCalculatorInterface';
import Cell from './Cell';

class BruteForceScoreCalculator implements ScoreCalculatorInterface {
  private _cells_matrix: Cell[][];
  private _ones_matrix: Cell[];
  private _scores_matrix: number[][] = [];

  // Constructor class
  constructor(cells_matrix: Cell[][], ones_matrix: Cell[]) {
    this._cells_matrix = cells_matrix;
    this._ones_matrix = ones_matrix;
  }

  // --------------------------------------------------------------------------

  // getters
  get scores_matrix(): number[][] {
    return this._scores_matrix;
  }

  // --------------------------------------------------------------------------

  calculate_scores_matrix(): number[][] {
    this._cells_matrix.forEach( (cells_row, row_index) => {
      let scores_row: number[] = []
      cells_row.forEach( (cell, col_index) => {
        if(cell.is_one_value()) {
          scores_row.push(0);
        }
        else {
          let distance:number = cell.get_distance_from(this._ones_matrix[0]);
          for(let i=1; i < this._ones_matrix.length; i++) {
            let dist = cell.get_distance_from(this._ones_matrix[i]);
            if (dist < distance) {
              distance = dist;
            }
          }
          scores_row.push(distance);
        }
      });
      this._scores_matrix.push(scores_row);
    });
    return this._scores_matrix;
  }
}

export default BruteForceScoreCalculator;