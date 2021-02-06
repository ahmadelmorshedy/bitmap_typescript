import * as readline from 'readline';

import Cell from './Cell';
import CellsMap from './CellsMap';
import ScoreCalculatorInterface from './ScoreCalculatorInterface';
import IncrementalDistanceScoreCalculator from './IncrementalDistanceScoreCalculator';
import Matrix2DPrinter from './Matrix2DPrinter';

let number_of_tests: number = 0;
let test_examples: number[][][] = [];

function get_user_input() {
  console.log('Welcome to matrix scores calculator.');

  // Reading user input

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Please enter number of test cases:\n', (test_cases) => {
    if (isNaN(Number(test_cases))) {
      console.log('Invalid option - Use positive integers for the number of tests');
      process.exit();
    }

    number_of_tests = Number(test_cases);

    rl.close();
    get_test_examples();
  });
}

function get_test_examples() {
  console.log('Enter matrix dimension as space separated row col dimensions');
  console.log('Next enter example data one ROW per line as concatenated value (001 for [0, 0, 1])');
  console.log('Separate each example with a new line');
  console.log('Add a new line after last test');

  let new_lines: number = 0;
  let dimensions: number[] = [0, 0];
  let single_example: number[][] = [];

  let reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  reader.prompt();
  reader.on('line', function(cmd) {
    if (cmd.length == 0) {
      // new line case - end of row inputs
      new_lines += 1;
      validate_and_add_test(dimensions, single_example);
      dimensions = [0, 0];
      single_example = [];
    }
    else{
      if (dimensions[0] == 0) {
        // dimensions not set, we're reading dimensions line
        let dim_values = cmd.split(' ');
        dimensions[0] = Number(dim_values[0]);
        dimensions[1] = Number(dim_values[1]);
      }
      else {
        // Reading row line
        let row_string_arr: string[] = cmd.split('');
        let row_number_arr: number[] = [];

        row_string_arr.forEach( (digi_char) => {
           row_number_arr.push(Number(digi_char));
        });
        single_example.push(row_number_arr);
      }
    }

    if (new_lines == number_of_tests) {
      reader.close();
      run_app();
    }
  });
}

// ------------------------------------------------------------------------------------

function run_app() {
  // Operating
  test_examples.forEach( (example) => {
    let cells_map: CellsMap = new CellsMap(example.length, example[0].length);

    example.forEach( (example_row) => {
      cells_map.append_row(example_row);
    });

    let incremental_distance_score_calculator: IncrementalDistanceScoreCalculator;
    incremental_distance_score_calculator = new IncrementalDistanceScoreCalculator(cells_map.cells_matrix,
                                                                                   cells_map.ones);

    let scores: number[][] = incremental_distance_score_calculator.calculate_scores_matrix();

    Matrix2DPrinter(scores);

    console.log('-----------------------------------------------------');

  });

  console.log('Tests finished');
}

// ------------------------------------------------------------------------------------

function validate_and_add_test(dimensions: number[], single_example: number[][]) {
  if (single_example.length != dimensions[0]) {
    console.log('Invalid rows length - exiting');
    process.exit();
  }
  single_example.forEach( (row) => {
    if (row.length != dimensions[1]) {
      console.log('Invalid cols length - exiting');
      process.exit();
    }

    row.forEach( (cell) => {
      if (cell != 0 && cell != 1) {
        console.log('Invalid example data - exiting');
        process.exit();
      }
    });
  });

  test_examples.push(single_example);
}

get_user_input();