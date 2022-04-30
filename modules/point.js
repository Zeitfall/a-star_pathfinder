export class Point {
  constructor(
    i, 
    j, 
    h = 0,
    g = 0,
    role = 'guess',
    showInfo = true
  ) {
    this.i = i; // which row
    this.j = j; // which column
    this.h = h; // dist to the end
    this.g = g; // dist to the neighbors
    this.f = this.g + this.h;
    this.id = `${this.i}/${this.j}`;
    this.role = role;
    this.showInfo = showInfo;
  }
}
