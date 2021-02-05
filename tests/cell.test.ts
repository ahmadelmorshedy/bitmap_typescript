import Cell from './../src/Cell';
import MatricesEqual from './helpers/matrix_helpers';


describe('Cell', function() {
  it('gets cell indexes', function() {
    // Given
    let cell: Cell = new Cell(3, 2, 0);
    // Then
    expect(cell.i).toBe(3);
    expect(cell.j).toBe(2);
  })

  it('returns whether the cell value is one or not', function() {
    // Given
    let cell_one: Cell = new Cell(3, 2, 1);
    let cell_zero: Cell = new Cell(3, 2, 0);
    // Then
    expect(cell_one.is_one_value()).toBe(true);
    expect(cell_zero.is_one_value()).toBe(false);
  })

  describe('Getting distance from other cells', function() {
    let cell:Cell = new Cell(3, 2, 0);

    it ('returns 1 for upper, down, right & left cell', function() {
      // Given
      let upper_cell = new Cell(2, 2, 0);
      let right_cell = new Cell(3, 3, 0);
      let bottom_cell = new Cell(4, 2, 0);
      let left_cell = new Cell(3, 1, 0);
      // Then
      expect(cell.get_distance_from(upper_cell)).toBe(1);
      expect(cell.get_distance_from(right_cell)).toBe(1);
      expect(cell.get_distance_from(bottom_cell)).toBe(1);
      expect(cell.get_distance_from(left_cell)).toBe(1);
    })

    it ('returns 2 for cells at the corners around it', function() {
      // Given
      let upper_right_cell = new Cell(2, 3, 0);
      let upper_left_cell = new Cell(2, 1, 0);
      let bottom_right_cell = new Cell(4, 3, 0);
      let bottom_left_cell = new Cell(4, 1, 0);
      // Then
      expect(cell.get_distance_from(upper_right_cell)).toBe(2);
      expect(cell.get_distance_from(upper_left_cell)).toBe(2);
      expect(cell.get_distance_from(bottom_right_cell)).toBe(2);
      expect(cell.get_distance_from(bottom_left_cell)).toBe(2);
    })

    it('returns other distances for furhter cells', function() {
      // Given
      let cell_at_5_units = new Cell(7, 1, 0);
      let cell_at_7_units = new Cell(3, 9, 0);
      let cell_at_10_units = new Cell(1, 10, 0);
      let cell_at_20_units = new Cell(0, 19, 0);
      // Then
      expect(cell.get_distance_from(cell_at_5_units)).toBe(5);
      expect(cell.get_distance_from(cell_at_7_units)).toBe(7);
      expect(cell.get_distance_from(cell_at_10_units)).toBe(10);
      expect(cell.get_distance_from(cell_at_20_units)).toBe(20);
    })
  })

  describe('Getting adjacent cells indexes', function() {
    let cell:Cell = new Cell(3, 2, 0);

    it('returns 4 indexes when in middle of matrix', function() {
      // When
      let cells_indexes = cell.get_closest_cells_indexes(6,6);
      // Then
      expect(MatricesEqual(cells_indexes, [[2, 2], [3, 3], [4, 2], [3, 1]])).toBe(true);
    })

    it('returns 3 indexes when in an edge of the matrix', function() {
      // When
      let cells_indexes = cell.get_closest_cells_indexes(3,3);
      // Then
      expect(MatricesEqual(cells_indexes, [[2, 2], [3, 3], [3, 1]])).toBe(true);
    })

    it('returns right and down indexes when in top left corner', function() {
      // Given
      let cell_corner: Cell = new Cell(0, 0, 0)
      // When
      let cells_indexes = cell_corner.get_closest_cells_indexes(10,10);
      // Then
      expect(MatricesEqual(cells_indexes, [[0, 1], [1, 0]])).toBe(true);
    })

    it('returns up and left indexes when in bottom left corner', function() {
      // Given
      let cell_corner: Cell = new Cell(10, 10, 0)
      // When
      let cells_indexes = cell_corner.get_closest_cells_indexes(10,10);
      // Then
      expect(MatricesEqual(cells_indexes, [[9, 10], [10, 9]])).toBe(true);
    })

    it('rerturns only vertical indexes when in single column matrix', function() {
      // Given
      let given_cell: Cell = new Cell(5, 0, 0)
      // When
      let cells_indexes = given_cell.get_closest_cells_indexes(6,0);
      // Then
      expect(MatricesEqual(cells_indexes, [[4, 0], [6, 0]])).toBe(true);
    })

    it('returns single index (left) if in (most right) corner of one row matrix', function() {
      // Given
      let given_cell: Cell = new Cell(0, 5, 0)
      // When
      let cells_indexes = given_cell.get_closest_cells_indexes(0,5);
      // Then
      expect(MatricesEqual(cells_indexes, [[0, 4]])).toBe(true);
    })

    it('returns zero indices when single element matrix', function() {
      // Given
      let given_cell: Cell = new Cell(0, 0, 1)
      // When
      let cells_indexes = given_cell.get_closest_cells_indexes(0,0);
      // Then
      expect(MatricesEqual(cells_indexes, [])).toBe(true);
    })
  })
})