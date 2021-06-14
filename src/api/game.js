// constants and functions for the game

const GRID_SIZE = 20;

const WATER = 0;
const SHIP = 1;

const MAP_COLORS = ["#0AF", "#A00"];

const VERTICAL = "V";
const HORIZONTAL = "H";

const createMap = (width, height) => {
  const map = { height: height, width: width, cells: [] };
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      map.cells.push({
        x: i,
        y: j,
        type: WATER,
      });
    }
  }
  return map;
};

const drawMap = (map, context) => {
  context.lineWidth = 1;
  context.strokeStyle = "#666";

  for (const cell of map.cells) {
    const { x, y } = cell;
    const type = cell.type;
    const color = MAP_COLORS[type];
    context.fillStyle = color;
    context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    context.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }
};

const clearMap = (map) => {
  map.cells = map.cells.map((cell) => cell.type === WATER);
};

const isWithinBoundaries = (map, x, y) => {
  if (x < 0 || x >= map.height || y < 0 || y >= map.width) {
    return false;
  } else {
    return true;
  }
};

const isShip = (map, index) => {
  return map.cells[index].type === SHIP ? true : false;
};

const canPlace = (map, x, y) => {
  const index = map.width * x + y;
  if (isWithinBoundaries(map, x, y) && !isShip(map, index)) {
    return true;
  } else {
    return false;
  }
};

const placeShip = (map, startX, startY, length, orientation) => {
  const shipPositions = [];
  if (orientation === HORIZONTAL) {
    const x = startX;
    for (let y = startY; y < length + startY; y++) {
      if (canPlace(map, x, y)) {
        const index = map.width * x + y;
        shipPositions.push(index);
      } else {
        return [false, []];
      }
    }
  }
  if (orientation === VERTICAL) {
    const y = startY;
    for (let x = startX; x < length + startX; x++) {
      if (canPlace(map, x, y)) {
        const index = map.width * x + y;
        shipPositions.push(index);
      } else {
        return [false, []];
      }
    }
  }
  shipPositions.forEach((index) => {
    map.cells[index].type = SHIP;
  });
  return [true, shipPositions];
};

const initCanvas = (map, canvas) => {
  const context = canvas.getContext("2d");
  context.canvas.width = map.width * GRID_SIZE;
  context.canvas.height = map.height * GRID_SIZE;
  context.fillStyle = "transparent";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  return context;
};

const selectCell = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const bb = e.target.getBoundingClientRect();
  const offsetX = bb.left;
  const offsetY = bb.top;

  const x = Math.floor(Number(e.clientX - offsetX) / GRID_SIZE);
  const y = Math.floor(Number(e.clientY - offsetY) / GRID_SIZE);

  return [x, y];
};

export { createMap, drawMap, clearMap };
export { placeShip, initCanvas };
export { selectCell };
