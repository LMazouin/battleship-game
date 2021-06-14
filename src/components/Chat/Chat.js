import React, { useState, useEffect } from "react";

const Chat = () => {
  console.log("RENDERING Chat");

  return (
    <React.Fragment>
      <h1>Chat</h1>
      <input type="text" value="" />
      <button>Send</button>
    </React.Fragment>
  );
};

export default Chat;
