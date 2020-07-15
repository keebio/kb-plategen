import React from "react";
import Blueprint from "react-blueprint-svg";
import SwitchPlate from "./keyboard-plate";
import makerjs from "makerjs";
import "./App.css";

function App() {
  let plate: makerjs.IModel = new SwitchPlate();
  return (
    <div>
      <div className="container">
        <Blueprint model={plate}>
          <h3>
            Keyboard Plate Generator by <a href="https://github.com/keebio">
              Keebio
            </a>
          </h3>
        </Blueprint>
      </div>
      <div className="configuration">
        This is currently a work in progress, and here's the list of initial
        basic functionalities that need to be added in:
        <h4>TODO List:</h4>
        <ul>
          <li>SVG/DXF export</li>
          <li>KLE data import</li>
          <li>Various switch and stabilizer cutouts</li>
          <li>Cutout configuration</li>
          <li>Save configuration</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
