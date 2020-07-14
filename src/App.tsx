import React from "react";
import Blueprint from "react-blueprint-svg";
import SmileModel from "./makerjs-smile";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let model = new SmileModel();
  return (
    <div className="container">
      <Blueprint model={model}>
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
