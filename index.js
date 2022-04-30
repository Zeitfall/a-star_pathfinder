/** imports */
import { Point } from './modules/point.js';
import { Grid } from './modules/grid.js';
import {
  findWinner,
  removeFromArray,
  isEqual,
  isContains,
  getHCost,
  findNeighbors,
  updatePoints,
  generateObstacles
} from './modules/utils.js';


/** setup */
const gridDOM = document.querySelector('.grid');
const [gridWidth, gridHeight] = [640, 640];
const [gridRows, gridColumns] = [12, 12];

const grid = new Grid({
  DOM: gridDOM,
  gridWidth,
  gridHeight,
  gridRows,
  gridColumns
});

grid.setup();


/** other */
const A = new Point( /** start point */
  0, 
  0, 
  0, 
  0, 
  'start'
);
const B = new Point( /** finish point */
  gridRows - 1, 
  gridColumns - 1, 
  0, 
  0, 
  'finish'
);

let PATH_FOUND;
let openSet; // points which need to be evaluated
let closedSet; // points which already evaluated, we dont need evaluate them again
let path; // ??? contains points with the lowest Fcost and the lowest Gcost from closedSet;
let obstacles;
let winnerPoint;
let neighbors;

/** reset */
function reset() {
  PATH_FOUND = false;
  openSet = [];
  closedSet = [];
  path = [];
  obstacles = generateObstacles(64, [A, B], gridRows, gridColumns);
  winnerPoint;
  neighbors;

  openSet.push(A);
}

  
function pathSearch() {
  /** find winnerPoint */
  winnerPoint = findWinner(openSet);
  /** remove winnerPoint from openSet */
  openSet = removeFromArray(winnerPoint, openSet);
  /** push winnerPoint from openSet */
  closedSet.push(winnerPoint);
  /** find winnerPoint neighbors */
  neighbors = findNeighbors(winnerPoint, B, gridRows, gridColumns);

  winnerPoint.role = 'visited';
  
  for(let i = 0; i < neighbors.length; i++) {
    /** check if neighbor contains in openSet and closedSet */
    if(isContains(neighbors[i], closedSet)) continue;
    if(
      !isContains(neighbors[i], openSet) && 
      !isContains(neighbors[i], obstacles)
    ) {
      openSet.push(neighbors[i]);
    }
  }
}

/** loop */
function loop() {
  pathSearch();
  updatePoints([...openSet, ...closedSet, ...obstacles], [A, B]);

  if(isEqual(winnerPoint, B)) {
    document.querySelector('body').classList.add('body_succeed');
    return console.log('A*: path found!');
  }
  if(openSet.length === 0) {
    document.querySelector('body').classList.add('body_failed');
    return console.log('A*: path not found!');
  }

  setTimeout(() => requestAnimationFrame(loop), 1000 / 30);
}

/** init */
window.addEventListener('click', () => {
  document.querySelector('body').classList.value = '';
  grid.setup();
  reset();
  loop();
});
