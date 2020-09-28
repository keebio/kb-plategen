import React from "react";

function AppInfo() {
  return (
    <div className="app-info">
      <div className="ui container">
        <h3 className="ui dividing header">
          <i className="info circle icon" />General Information
        </h3>
        <h4>About</h4>
        This is a keyboard switch plate generator that takes in output
        from&nbsp;
        <a href="http://www.keyboard-layout-editor.com/">
          Keyboard Layout Editor
        </a>&nbsp;and generates a switch plate based on the parameters you
        specify.

        <h4>Development & Contributing</h4>
        This is currently a work in progress, and here’s the list of initial
        basic functionalities that need to be added in:
        <p />
        Partial Todo List:
        <ul>
          <li>
            SVG/DXF export options (like precision, line color, line width)
          </li>
          <li>KLE data import from file</li>
          <li>Save configuration</li>
          <li>Layout presets</li>
          <li>Dark mode</li>
          <li>And more...(See Trello board)</li>
        </ul>

        If you’d like to contribute code to this project, the GitHub repository
        will be opened to the public shortly after some code cleanup.
        <p />
        <a href="https://github.com/keebio/kb-plategen">
          <button className="ui github button">
            <i className="github icon" />GitHub
          </button>
        </a>
        <p />

        If you’d like to support this project monetarily, you can become a
        sponsor! Any amount is appreciated.
        <p />
        <a href="https://github.com/sponsors/nooges">
          <button className="ui purple button">
            <i className="heart icon" />Sponsor project
          </button>
        </a>

        <h4>Project Status & Future Features</h4>
        <ul>
          <li>
            <a href="https://trello.com/b/Kfx0hbyo/plate-generator">
              Project status board
            </a>
          </li>
          <li>
            <a href="https://github.com/keebio/kb-plategen/issues">
              GitHub Issue Tracker
            </a>
          </li>
        </ul>

        <p />
        &nbsp;
      </div>
    </div>
  );
}

export default AppInfo;
