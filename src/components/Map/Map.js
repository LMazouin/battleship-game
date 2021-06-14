import React, { useState, useEffect, useRef } from "react";
import { getMap, sendMap } from "../../api/api";
import {
  createMap,
  drawMap,
  clearMap,
  placeShip,
  initCanvas,
  selectCell,
} from "../../api/game";
import "./Map.css";

const HEIGHT = 16;
const WIDTH = 16;

const INITIAL_MAP_A = createMap(HEIGHT, WIDTH);
const INITIAL_MAP_B = createMap(HEIGHT, WIDTH);

const Map = (props) => {
  console.log("RENDERING Map");

  const canvasRefA = useRef(null);
  const canvasRefB = useRef(null);

  const ships = useRef([]);

  const [mapA, setMapA] = useState(INITIAL_MAP_A);
  const [mapB, setMapB] = useState(INITIAL_MAP_B);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  // console.log(map);

  const clearMapHandler = () => {
    clearMap(mapA);
    setMapA(mapA);
  };

  const drawShipHandler = (x, y, length, orientation) => {
    const [status, shipPositions] = placeShip(mapA, x, y, length, orientation);

    const newMap = { ...mapA, cells: mapA.cells };

    setMapA(newMap);
    sendMap(newMap);

    ships.current.push({
      length: length,
      orientation: orientation,
      positions: shipPositions,
    });

    console.log(ships.current);
  };

  // check whether the cursor is above a ship (mouseDown)
  // move the ship (mouseMove)
  // place the ship (mouseUp)

  const selectCellHandler = (e) => {
    const [x, y] = selectCell(e);
    setCoordinates({
      ...coordinates,
      x: x,
      y: y,
    });
  };

  useEffect(() => {
    console.log("CALL useEffect() OF Map");

    // draw the map of the player
    const canvasA = canvasRefA.current;
    const contextA = initCanvas(mapA, canvasA);
    drawMap(mapA, contextA);

    getMap((err, mapB) => {
      setMapB(mapB);
    });

    // draw the the map of the opponent
    const canvasB = canvasRefB.current;
    const contextB = initCanvas(mapB, canvasB);
    drawMap(mapB, contextB);
  }, [mapA, mapB]);

  return (
    <main>
      <section>
        <h1>You</h1>
        <canvas ref={canvasRefA} onMouseDown={selectCellHandler} />
        <button onClick={clearMapHandler}>Clear</button>
        <label htmlFor="xCoordinate">x=</label>
        <input
          type="text"
          onChange={(e) =>
            setCoordinates({ ...coordinates, x: Number(e.target.value) })
          }
        />
        <label htmlFor="yCoordinate">y=</label>
        <input
          type="text"
          onChange={(e) =>
            setCoordinates({ ...coordinates, y: Number(e.target.value) })
          }
        />
        <button
          onClick={() => drawShipHandler(coordinates.x, coordinates.y, 1, "H")}
        >
          Draw
        </button>
        <p>
          x={coordinates.x} y={coordinates.y}
        </p>
      </section>
      <section>
        <h1>Enemy</h1>
        <canvas ref={canvasRefB} />
      </section>
    </main>
  );
};

export default Map;
