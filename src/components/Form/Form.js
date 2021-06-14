import React, { useState, useEffect } from "react";
import { setPlayer } from "../../api/api";

const Form = () => {
  console.log("RENDERING Form");

  const [username, setUsername] = useState("");

  return (
    <React.Fragment>
      <h1>Enter a user name:</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => setPlayer(username)}>Submit</button>
    </React.Fragment>
  );
};

export default Form;
