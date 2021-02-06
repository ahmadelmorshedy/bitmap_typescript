import Cell from './../src/Cell';
import CellsMap from './../src/CellsMap';
import BruteForceScoreCalculator from './../src/BruteForceScoreCalculator';
import IncrementalDistanceScoreCalculator from './../src/IncrementalDistanceScoreCalculator';
import RecursionScoreCalculator from './../src/RecursionScoreCalculator';
import MatricesEqual from './helpers/matrix_helpers';

describe('Score calculation', function() {
  describe('Brute Force Score Calculator', function() {
    it('handles square matrix', function() {
      // Given
      let lines = [[0, 1], [1, 1]];
      let cells_map: CellsMap = new CellsMap(2, 2);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[1, 0], [0, 0]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles all-1 matrix', function() {
      // Given
      let lines = [[1, 1], [1, 1]];
      let cells_map: CellsMap = new CellsMap(2, 2);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[0, 0], [0, 0]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles rectangular matrix - more rows', function() {
      // Given
      let lines = [[0, 0, 1],
                   [0, 0, 0],
                   [0, 0, 0],
                   [1, 0, 0]];

      let cells_map: CellsMap = new CellsMap(4, 3);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[2, 1, 0],
                             [2, 2, 1],
                             [1, 2, 2],
                             [0, 1, 2]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles rectangular matrix - more cols', function() {
      // Given
      let lines = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]];

      let cells_map: CellsMap = new CellsMap(3, 4);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[3, 2, 1, 0], [2, 1, 0, 0], [1, 0, 0, 1]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-row matrices', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 1]];
      let cells_map: CellsMap = new CellsMap(1, 7);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6,5,4,3,2,1,0]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-column matrices', function() {
      // Given
      let lines = [[0], [0], [0], [0], [1], [0], [0], [0], [0]];
      let cells_map: CellsMap = new CellsMap(9, 1);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[4], [3], [2], [1], [0], [1], [2], [3], [4]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-cell matrices', function() {
      // Given
      let lines = [[1]];
      let cells_map: CellsMap = new CellsMap(1, 1);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[0]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles sparse matrices', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 0, 1],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 1, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [1, 0, 0, 0, 0, 0, 0, 0]];
      let cells_map: CellsMap = new CellsMap(9, 8);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6, 5, 4, 3, 3, 2, 1, 0],
                             [5, 4, 3, 2, 3, 3, 2, 1],
                             [4, 3, 2, 1, 2, 3, 3, 2],
                             [3, 2, 1, 0, 1, 2, 3, 3],
                             [4, 3, 2, 1, 2, 3, 4, 4],
                             [3, 4, 3, 2, 3, 4, 5, 5],
                             [2, 3, 4, 3, 4, 5, 6, 6],
                             [1, 2, 3, 4, 5, 6, 7, 7],
                             [0, 1, 2, 3, 4, 5, 6, 7]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles matrices having close ones', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 0, 1],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 1, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [1, 0, 0, 0, 0, 0, 1, 0]];
      let cells_map: CellsMap = new CellsMap(9, 8);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6, 5, 4, 3, 3, 2, 1, 0],
                             [5, 4, 3, 2, 3, 3, 2, 1],
                             [4, 3, 2, 1, 2, 3, 3, 2],
                             [3, 2, 1, 0, 1, 2, 3, 3],
                             [4, 3, 2, 1, 2, 3, 4, 4],
                             [3, 4, 3, 2, 3, 4, 3, 4],
                             [2, 3, 4, 3, 4, 3, 2, 3],
                             [1, 2, 3, 4, 3, 2, 1, 2],
                             [0, 1, 2, 3, 2, 1, 0, 1]];

      let brute_force_score_calculator = new BruteForceScoreCalculator(cells_map.cells_matrix,
                                                                       cells_map.ones);

      // When
      let scores = brute_force_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });
  });

  describe('Incremental distance Score Calculator', function() {
    it('handles square matrix', function() {
      // Given
      let lines = [[0, 1], [1, 1]];
      let cells_map: CellsMap = new CellsMap(2, 2);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[1, 0], [0, 0]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles all-1 matrix', function() {
      // Given
      let lines = [[1, 1], [1, 1]];
      let cells_map: CellsMap = new CellsMap(2, 2);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[0, 0], [0, 0]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles rectangular matrix - more rows', function() {
      // Given
      let lines = [[0, 0, 1],
                   [0, 0, 0],
                   [0, 0, 0],
                   [1, 0, 0]];

      let cells_map: CellsMap = new CellsMap(4, 3);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[2, 1, 0],
                             [2, 2, 1],
                             [1, 2, 2],
                             [0, 1, 2]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles rectangular matrix - more cols', function() {
      // Given
      let lines = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]];

      let cells_map: CellsMap = new CellsMap(3, 4);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[3, 2, 1, 0], [2, 1, 0, 0], [1, 0, 0, 1]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-row matrices', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 1]];
      let cells_map: CellsMap = new CellsMap(1, 7);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6,5,4,3,2,1,0]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-column matrices', function() {
      // Given
      let lines = [[0], [0], [0], [0], [1], [0], [0], [0], [0]];
      let cells_map: CellsMap = new CellsMap(9, 1);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[4], [3], [2], [1], [0], [1], [2], [3], [4]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-cell matrices', function() {
      // Given
      let lines = [[1]];
      let cells_map: CellsMap = new CellsMap(1, 1);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[0]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles sparse matrices', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 0, 1],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 1, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [1, 0, 0, 0, 0, 0, 0, 0]];
      let cells_map: CellsMap = new CellsMap(9, 8);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6, 5, 4, 3, 3, 2, 1, 0],
                             [5, 4, 3, 2, 3, 3, 2, 1],
                             [4, 3, 2, 1, 2, 3, 3, 2],
                             [3, 2, 1, 0, 1, 2, 3, 3],
                             [4, 3, 2, 1, 2, 3, 4, 4],
                             [3, 4, 3, 2, 3, 4, 5, 5],
                             [2, 3, 4, 3, 4, 5, 6, 6],
                             [1, 2, 3, 4, 5, 6, 7, 7],
                             [0, 1, 2, 3, 4, 5, 6, 7]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles matrices having close ones', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 0, 1],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 1, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [1, 0, 0, 0, 0, 0, 1, 0]];
      let cells_map: CellsMap = new CellsMap(9, 8);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6, 5, 4, 3, 3, 2, 1, 0],
                             [5, 4, 3, 2, 3, 3, 2, 1],
                             [4, 3, 2, 1, 2, 3, 3, 2],
                             [3, 2, 1, 0, 1, 2, 3, 3],
                             [4, 3, 2, 1, 2, 3, 4, 4],
                             [3, 4, 3, 2, 3, 4, 3, 4],
                             [2, 3, 4, 3, 4, 3, 2, 3],
                             [1, 2, 3, 4, 3, 2, 1, 2],
                             [0, 1, 2, 3, 2, 1, 0, 1]];

      let incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                         cells_map.ones);

      // When
      let scores = incremental_distance_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });
  });

  xdescribe('Recursion Score Calculator', function() {
    it('handles square matrix', function() {
      // Given
      let lines = [[0, 1], [1, 1]];
      let cells_map: CellsMap = new CellsMap(2, 2);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[1, 0], [0, 0]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles all-1 matrix', function() {
      // Given
      let lines = [[1, 1], [1, 1]];
      let cells_map: CellsMap = new CellsMap(2, 2);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[0, 0], [0, 0]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles rectangular matrix - more rows', function() {
      // Given
      let lines = [[0, 0, 1],
                   [0, 0, 0],
                   [0, 0, 0],
                   [1, 0, 0]];

      let cells_map: CellsMap = new CellsMap(4, 3);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[2, 1, 0],
                             [2, 2, 1],
                             [1, 2, 2],
                             [0, 1, 2]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles rectangular matrix - more cols', function() {
      // Given
      let lines = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]];

      let cells_map: CellsMap = new CellsMap(3, 4);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[3, 2, 1, 0], [2, 1, 0, 0], [1, 0, 0, 1]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-row matrices', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 1]];
      let cells_map: CellsMap = new CellsMap(1, 7);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6,5,4,3,2,1,0]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-column matrices', function() {
      // Given
      let lines = [[0], [0], [0], [0], [1], [0], [0], [0], [0]];
      let cells_map: CellsMap = new CellsMap(9, 1);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[4], [3], [2], [1], [0], [1], [2], [3], [4]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles 1-cell matrices', function() {
      // Given
      let lines = [[1]];
      let cells_map: CellsMap = new CellsMap(1, 1);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[0]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles sparse matrices', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 0, 1],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 1, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [1, 0, 0, 0, 0, 0, 0, 0]];
      let cells_map: CellsMap = new CellsMap(9, 8);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6, 5, 4, 3, 3, 2, 1, 0],
                             [5, 4, 3, 2, 3, 3, 2, 1],
                             [4, 3, 2, 1, 2, 3, 3, 2],
                             [3, 2, 1, 0, 1, 2, 3, 3],
                             [4, 3, 2, 1, 2, 3, 4, 4],
                             [3, 4, 3, 2, 3, 4, 5, 5],
                             [2, 3, 4, 3, 4, 5, 6, 6],
                             [1, 2, 3, 4, 5, 6, 7, 7],
                             [0, 1, 2, 3, 4, 5, 6, 7]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });

    it('handles matrices having close ones', function() {
      // Given
      let lines = [[0, 0, 0, 0, 0, 0, 0, 1],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 1, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0],
                   [1, 0, 0, 0, 0, 0, 1, 0]];
      let cells_map: CellsMap = new CellsMap(9, 8);

      lines.forEach( (line) => {
        cells_map.append_row(line);
      });

      let expected_output = [[6, 5, 4, 3, 3, 2, 1, 0],
                             [5, 4, 3, 2, 3, 3, 2, 1],
                             [4, 3, 2, 1, 2, 3, 3, 2],
                             [3, 2, 1, 0, 1, 2, 3, 3],
                             [4, 3, 2, 1, 2, 3, 4, 4],
                             [3, 4, 3, 2, 3, 4, 3, 4],
                             [2, 3, 4, 3, 4, 3, 2, 3],
                             [1, 2, 3, 4, 3, 2, 1, 2],
                             [0, 1, 2, 3, 2, 1, 0, 1]];

      let recursion_score_calculator = new RecursionScoreCalculator(cells_map.cells_matrix);

      // When
      let scores = recursion_score_calculator.calculate_scores_matrix();

      // Then
      expect(MatricesEqual(scores, expected_output)).toBe(true);
    });
  });
});