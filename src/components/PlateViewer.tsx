import React from "react";
import Blueprint from "react-blueprint-svg";
import makerjs from "makerjs";
import FileSaver from "file-saver";

export type PlateProps = {
  switchPlate: makerjs.IModel;
};

class PlateViewer extends React.Component<PlateProps> {
  render() {
    return (
      <div className="plateviewer">
        <Blueprint model={this.props.switchPlate}>
          <h3>
            Keyboard Plate Generator by <a href="https://github.com/keebio">
              Keebio
            </a>
          </h3>
        </Blueprint>
        <p />
        <button
          className="ui button"
          onClick={(e) => this.saveSvg(this.props.switchPlate)}
        >
          <i className="download icon" />Download SVG
        </button>
        <button
          className="ui button"
          onClick={(e) => this.saveDxf(this.props.switchPlate)}
        >
          <i className="download icon" />Download DXF
        </button>
      </div>
    );
  }

  saveSvg(model: makerjs.IModel) {
    let options: makerjs.exporter.ISVGRenderOptions = {
      accuracy: 0.000001,
      units: makerjs.unitType.Millimeter,
      strokeWidth: "0.25mm",
    };
    let output = makerjs.exporter.toSVG(model, options);
    let blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "kbplate.svg");
  }

  saveDxf(model: makerjs.IModel) {
    let options: makerjs.exporter.IDXFRenderOptions = {
      accuracy: 0.000001,
      units: makerjs.unitType.Millimeter,
    };
    let output = makerjs.exporter.toDXF(model, options);
    let blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "kbplate.dxf");
  }
}

export default PlateViewer;
