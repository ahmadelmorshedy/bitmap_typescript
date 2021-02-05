import CellsMap from './../src/CellsMap';

describe('CellsMap', function() {
  it('gets cells matrix', function() {
    // Given
    let cells_map: CellsMap = new CellsMap(2, 2);
    cells_map.append_row([0, 1]);
    cells_map.append_row([1, 0]);
    // When
    let cells_matrix = cells_map.cells_matrix;
    // Then
    expect(cells_matrix.length).toBe(2);
    expect(cells_matrix[0].length).toBe(2);
    expect(cells_matrix[0][0].is_one_value()).toBe(false);
    expect(cells_matrix[0][1].is_one_value()).toBe(true);
    expect(cells_matrix[1][0].is_one_value()).toBe(true);
    expect(cells_matrix[1][1].is_one_value()).toBe(false);
  })

  it('gets list of ones (cells with one values)', function() {
    // Given
    let cells_map: CellsMap = new CellsMap(2, 2);
    cells_map.append_row([0, 1]);
    cells_map.append_row([1, 1]);
    // When
    let ones = cells_map.ones;
    // Then
    expect(ones.length).toBe(3);
  })

  describe('Getting the validity of input', function() {
    it('returns true for input having at least a 1-value cell', function() {
      // Given
      let cells_map: CellsMap = new CellsMap(3, 3);
      cells_map.append_row([0, 0, 0]);
      cells_map.append_row([0, 0, 0]);
      cells_map.append_row([0, 0, 1]);
      // Then
      expect(cells_map.is_valid()).toBe(true);
    })

    it('returns false if no 1-value cell', function() {
      // Given
      let cells_map: CellsMap = new CellsMap(3, 3);
      cells_map.append_row([0, 0, 0]);
      cells_map.append_row([0, 0, 0]);
      cells_map.append_row([0, 0, 0]);
      // Then
      expect(cells_map.is_valid()).toBe(false);
    })
  })
})