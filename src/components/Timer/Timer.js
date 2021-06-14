import React, { useState, useEffect } from "react";
import {
  connect,
  disconnect,
  startTimer,
  updateTimer,
  stopTimer,
} from "../../api/api";

let initialTime = 0;

const Timer = () => {
  const [time, setTime] = useState(initialTime);

  console.log("RENDERING Timer");

  useEffect(() => {
    console.log("CALLING useEffect() FOR Timer");
    updateTimer((err, seconds) => {
      setTime(seconds);
    });
    initialTime = time;
    return () => disconnect();
  }, []);

  return (
    <React.Fragment>
      <button onClick={() => startTimer(initialTime)}>Start Timer</button>
      <button onClick={() => stopTimer(time)}>Stop Timer</button>
      <p>This is the timer value: {time}</p>
    </React.Fragment>
  );
};

export default Timer;
