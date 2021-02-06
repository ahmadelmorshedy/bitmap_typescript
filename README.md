## Dott test

Calculate the shortest distance between each black (zero) pixel and white pixels (1) in a given rectangular bitmap.

### Technical dependencies

  - TypeScript
  - Jest

### Running the App
  - Clone the app
  - I've already installed typescript & ts-node packages globally, so keep note you may need them.
  - run `npm i` to install dependencies
  - run `npm test` to run the unit tests
  - run `npm start` to start using the app through the command line.

### Main Hierarchy of the solution
- Cell class, it represents the single unit in our bitmap
- CellsMap class, it's the class representing the bitmap itself, handles setting the cells, selecting the white ones, etc...
- Score Calculator Interface, just a simple interface to be implemented by any score calculator
- BruteForceScoreCalculator, calculates the scores just by passing all over the matrix (n square, where we can assume m and n are close to each other) and comparing each cell to all the one-cells or the white cells, so if we have almost n elements, this algorithm has a time complexity of n cube.
- IncrementalDistanceScoreCalculator: Named though because it relies on extracting the nearest cells to the white ones, then the nearest to them, and so on, it can be thought as a grapgh implementation, but actually I found that, by problem definition, we have a two dimensional matrix, and selecting cells (or vertices) that are 1-distance closed to all the white cells would be already done if we go for the graph solution.
- app.ts, it's the main app file, and I use it to interact with the user and as the application controller/manager.
- Also there is some RecursionScoreCalculator, the tricky part with recursion is that you have to pay attention because by problem definition, every cell can call the other. I developed some algorithm using a subset of a cell surrounding connections, and repeating the calclation wile changing the subset. Unfortuately some ruby version of it worked with me but not the ts one... I've included it in a separate branch
-
### Comparing the Algorithms
- the Brute force is not required, it has a time complexity n cube, while they are more efficient (at least in term of memory)
- The Recursion is coupled with dynamic programming, which helps generally improving the results, but I dn't recommend Recursion due to its performance and memory consumption.
- I think that the incremental distance calculator is the best, in terms of complexity and performance, it extracts the cells layer by layer, or distance by distance, and it takes O(n2) to complete