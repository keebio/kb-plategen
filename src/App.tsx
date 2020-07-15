import React from "react";
import Blueprint from "react-blueprint-svg";
import SwitchPlate from "./keyboard-plate";
import makerjs from "makerjs";
import "./App.css";

function App() {
  let plate: makerjs.IModel = new SwitchPlate();
  return (
    <div className="container">
      <Blueprint model={plate}>
        <h3>
          Keyboard Plate Generator by <a href="https://github.com/keebio">
            Keebio
          </a>
        </h3>
      </Blueprint>
    </div>
  );
}

export default App;
