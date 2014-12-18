/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  for (var i=0; i<n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(0);
    }
    row[i] = 1;
    solution.push(row);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) return 0;
  var solutionCount = 1;
  for (var i=1; i<=n; i++) {
    solutionCount *= i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, allSolutions) {
  var start = new Date();
  var solution = [];
  var currentSolution = [];
  var board = new Board({'n':n});

  if (n === 2) return [[],[]];
  if (n === 3) return [[], [], []];

  var checkRow = function(rowNumber) {
    if (rowNumber === n) {
      solution.push(currentSolution.slice());
    } else {
      for (var i=0; i<n; i++) {
        board.togglePiece(rowNumber,i);
        if (!board.hasAnyQueensConflicts()) {
          currentSolution.push(i);
          checkRow(rowNumber+1);
          currentSolution.pop();
        }
        // remove queen if illegal or if all solutions from this point have been found.
        board.togglePiece(rowNumber,i);
      }
    }
  };
  checkRow(0);

  var singleSolution = this.decode(solution[0]);

  var end = new Date();
  var diff = end.getTime() - start.getTime();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(singleSolution),' in ',diff,'ms');
  if (!allSolutions) {
    return singleSolution;
  }
  return solution;
};

window.decode = function(arr) {
  var result = [];
  for (var i=0; i<arr.length; i++) {
    result[i] = [];
    for (var j=0; j<arr.length; j++) {
      if (j === arr[i]) {
        result[i][j] = 1;
      } else {
        result[i][j] = 0;
      }
    }
  }
  return result;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n===2 || n===3) return 0;
  var solutionCount = this.findNQueensSolution(n, true).length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
