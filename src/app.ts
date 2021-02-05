import * as readline from 'readline';

import Cell from './Cell';
import CellsMap from './CellsMap';
import ScoreCalculatorInterface from './ScoreCalculatorInterface';
import IncrementalDistanceScoreCalculator from './IncrementalDistanceScoreCalculator';
import Matrix2DPrinter from './Matrix2DPrinter';

let user_input: string[] = [];
let number_of_tests: number = 0;

function get_user_input() {
  console.log('Welcome to matrix scores calculator.');

  console.log('Please enter your input using the following format:');

  console.log('1) enter a single number in first line, representing number of test cases.');

  console.log('2) In the next line, enter two space separated numbers representing no of rows & cols for first test case.');

  console.log('3) Next, enter first ROW of the test example in form of 0 & 1 string, non-spaced');

  console.log('4) Continue entering the test example rows, one row per line');

  console.log('5) Use empty line to separate test examples');

  console.log('6) Use empty line only to when a test example is finished');

  console.log('7) Repeat steps 2 to 5, until test examples are all input');

  console.log('8) Output will be displayed for each test example');

  console.log('------------------------------------------------------------------');

  // Reading user input

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.prompt();

  rl.on('line', function (cmd) {
    user_input.push(cmd);

    if (cmd.length == 0) {
      number_of_tests += 1;
      console.log(`${number_of_tests} tests entered out of ${Number(user_input[0])}`);
    }
    if (number_of_tests >= Number(user_input[0])) {
      rl.close();
      run_app();
    }
  });
}

// ------------------------------------------------------------------------------------

function run_app() {
  // Handling Input
  number_of_tests = Number(user_input[0]);

  let reading_index = 1;

  let test_examples:number[][][] = [];

  for (let i = 0; i < number_of_tests; i++) {
    reading_index = add_test_example(user_input, test_examples, reading_index);
  }

  // ------------------------------------------------------------------------------------

  // Operating

  test_examples.forEach( (test_example) => {
    let cells_map: CellsMap = new CellsMap(test_example.length, test_example[0].length);

    test_example.forEach( (test_line) => {
      cells_map.append_row(test_line);
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

function add_test_example(user_input: string[], test_examples: number[][][], reading_index: number): number {
  let dimensions: string[] = user_input[reading_index].split(' ');
  let next_test: number[][] = [];
  for (let i = 0; i < Number(dimensions[0]); i++) {
    let row:string[] = user_input[reading_index + 1 + i].split('');
    let row_num:number[] = [];
    row.forEach( (digi_char) => {
      row_num.push(Number(digi_char));
    });
    next_test.push(row_num);
  }
  test_examples.push(next_test);
  return reading_index + 1 + Number(dimensions[0]) + 1;
}

get_user_input();