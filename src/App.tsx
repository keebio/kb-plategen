import React from "react";
import Blueprint from "react-blueprint-svg";
import SwitchPlate from "./keyboard-plate";
import makerjs from "makerjs";
import FileSaver from "file-saver";
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
        <p />
        <button onClick={saveSvg}>Save SVG</button>
        <button onClick={saveDxf}>Save DXF</button>
      </div>
      <div className="configuration">
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

  function saveSvg() {
    let options = {
      accuracy: 0.000001,
      units: makerjs.unitType.Millimeter,
    };
    let output = makerjs.exporter.toSVG(plate, options);
    let blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "kbplate.svg");
  }

  function saveDxf() {
    let options = {
      units: makerjs.unitType.Millimeter,
    };
    let output = makerjs.exporter.toDXF(plate, options);
    let blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "kbplate.dxf");
  }
}

export default App;
