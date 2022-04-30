import { Point } from './point.js';

export function findWinner(points) {
  let winnerPoint;

  for(let i = 0; i < points.length; i++) {
    if(i === 0) {
      winnerPoint = points[i];
      continue;
    }

    if(
      winnerPoint.f > points[i].f ||
      (winnerPoint.f === points[i].f && winnerPoint.h > points[i].h)
    ) {
      winnerPoint = points[i];
    }
  }

  return winnerPoint;
}

export function removeFromArray(point, array) {
  return array.filter(e => e.id !== point.id);
}

export function isEqual(a, b) {
  // return JSON.stringify(a) === JSON.stringify(b) ? true : false;
  if(a.i === b.i && a.j === b.j) return true;
  else return false;
}

export function isContains(point, array) {
  return array.some(e => isEqual(e, point));
}

export function getHCost(a, b) {
  const di = Math.abs(a.i - b.i);
  const dj = Math.abs(a.j - b.j);

  return ~~(Math.sqrt(di**2 + dj**2) * 10);
}

export function findNeighbors(point, b, rows, columns) {
  const neighbors = [];

  /** top */
  if(point.i > 0) {
    const tmp = new Point(point.i - 1, point.j);

    neighbors.push(new Point(
      tmp.i, tmp.j,
      getHCost(tmp, b),
      10,
      'guess'
    ));
  }

  /** right */
  if(point.j < columns - 1) {
    const tmp = new Point(point.i, point.j + 1);

    neighbors.push(new Point(
      tmp.i, tmp.j,
      getHCost(tmp, b),
      10,
      'guess'
    ));
  }

  /** bottom */
  if(point.i < rows - 1) {
    const tmp = new Point(point.i + 1, point.j);

    neighbors.push(new Point(
      tmp.i, tmp.j,
      getHCost(tmp, b),
      10,
      'guess'
    ));
  }

  /** left */
  if(point.j > 0) {
    const tmp = new Point(point.i, point.j - 1);

    neighbors.push(new Point(
      tmp.i, tmp.j,
      getHCost(tmp, b),
      10,
      'guess'
    ));
  }

  // diagonals works, but it goes through the walls in some cases
  /** top left */
  if(point.i > 0 && point.j > 0) {
    const tmp = new Point(point.i - 1, point.j - 1);

    neighbors.push(new Point(
      tmp.i, tmp.j,
      getHCost(tmp, b),
      14,
      'guess'
    ));
  }

  /** top right */
  if(point.i > 0 && point.j < columns - 1) {
    const tmp = new Point(point.i - 1, point.j + 1);

    neighbors.push(new Point(
      tmp.i, tmp.j,
      getHCost(tmp, b),
      14,
      'guess'
    ));
  }

  /** bottom left */
  if(point.i < rows - 1 && point.j > 0) {
    const tmp = new Point(point.i + 1, point.j - 1);

    neighbors.push(new Point(
      tmp.i, tmp.j,
      getHCost(tmp, b),
      14,
      'guess'
    ));
  }

  /** bottom right */
  if(point.i < rows - 1 && point.j < columns - 1) {
    const tmp = new Point(point.i + 1, point.j + 1);

    neighbors.push(new Point(
      tmp.i, tmp.j,
      getHCost(tmp, b),
      14,
      'guess'
    ));
  }

  return neighbors;
}

export function updatePoints(points, exceptions) {
  /** what a piece of shitty code... it needs to be changed*/

  if(points.length === 0) return console.log('no points!');

  for(let n = 0; n < points.length; n++) {
    const tmp = document.querySelector(`[data-position="${points[n].i}/${points[n].j}"]`);

    if(!tmp.classList.value.includes(`${points[n].role}`)) {
      tmp.classList = 'grid__cell cell';
      tmp.classList.add(`grid__cell_${points[n].role}`);
    }

    if(!points[n].showInfo) continue; 
    tmp.innerHTML = `
      <div class="cell__h">${~~points[n].h}</div>
      <div class="cell__g">${~~points[n].g}</div>
      <div class="cell__f">${~~points[n].f}</div>
      <div class="cell__p">${points[n].i} / ${points[n].j}</div>
    `;
  }

  for(let n = 0; n < exceptions.length; n++) {
    exceptions[0].role = 'start';
    exceptions[1].role = 'finish';

    const tmp = document.querySelector(`[data-position="${exceptions[n].i}/${exceptions[n].j}"]`);

    tmp.innerHTML = '';
    tmp.classList = 'grid__cell cell';
    tmp.classList.add(`grid__cell_${exceptions[n].role}`);
  }
}

export function generateObstacles(intensivity, exceptions, rows, columns) {
  const obstacles = [];

  for(let n = 0; n < intensivity; n++) {
    let i = ~~(Math.random() * rows);
    let j = ~~(Math.random() * columns);

    for(let k = 0; k < exceptions.length; k++) {
      if(i === exceptions[k].i && j === exceptions[k].j) {
        i = ~~(Math.random() * rows);
        j = ~~(Math.random() * columns);
      }
    }

    obstacles.push(new Point(i, j, 0, 0, 'obstacle', false));
  }

  return obstacles;
}
