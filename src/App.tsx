import React from "react";
import makerjs from "makerjs";
import SwitchPlate from "./maker_models/SwitchPlate";
import PlateViewer from "./components/PlateViewer";
import PlateConfiguration from "./components/PlateConfiguration";

function App() {
  let state = {
    kleData: require("./sample/quefrency-rev2.json"),
  };
  let switchPlate: makerjs.IModel = new SwitchPlate(state.kleData);
  return (
    <div>
      <PlateViewer switchPlate={switchPlate} />
      <div className="configuration">
        <PlateConfiguration />

        This is currently a work in progress, and here's the list of initial
        basic functionalities that need to be added in:
        <h4>TODO List:</h4>
        <ul>
          <li>
            SVG/DXF export options (like precision, line color, line width)
          </li>
          <li>KLE data import</li>
          <li>Various switch and stabilizer cutouts</li>
          <li>Cutout configuration</li>
          <li>Save configuration</li>
        </ul>
        <p>
          <a href="https://trello.com/b/Kfx0hbyo/plate-generator">
            Project status board
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
