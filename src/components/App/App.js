import React, { useState, useEffect } from "react";
import Timer from "../Timer/Timer";
import Map from "../Map/Map";
import Form from "../Form/Form";
import { broadcast, sendWelcomeMessage } from "../../api/api";
import "./App.css";

const App = () => {
  console.log("RENDERING App");

  const [numberOfUsers, setNumberOfUsers] = useState(1);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    broadcast((err, numberOfUsers) => {
      setNumberOfUsers(numberOfUsers);
    });
    sendWelcomeMessage((err, welcomeMessage) => {
      setWelcomeMessage(welcomeMessage);
    });
  }, []);

  return (
    <React.Fragment>
      <Form />
      <p>{welcomeMessage}</p>
      <p>There are currently {numberOfUsers} clients connected.</p>
      <Timer />
      <Map />
    </React.Fragment>
  );
};

export default App;
