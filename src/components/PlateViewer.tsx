import React from 'react'
import Blueprint from 'react-blueprint-svg'
import makerjs from 'makerjs'
import FileSaver from 'file-saver'

interface Props {
  switchPlate: makerjs.IModel
}

const PlateViewer = ({ switchPlate }: Props) => (
  <div className="plateviewer">
    <h3>
      Keyboard Plate Generator by{' '}
      <a href="https://github.com/keebio">Keebio</a>
    </h3>
    <Blueprint model={switchPlate} options={{ fitOnScreen: true }} />
    <p />
    <button className="ui primary button" onClick={(e) => saveSvg(switchPlate)}>
      <i className="download icon" />
      Download SVG
    </button>
    <button className="ui primary button" onClick={(e) => saveDxf(switchPlate)}>
      <i className="download icon" />
      Download DXF
    </button>
  </div>
)

const saveSvg = (model: makerjs.IModel) => {
  const options = {
    accuracy: 0.000001,
    units: makerjs.unitType.Millimeter,
    strokeWidth: '0.25mm',
  }
  const output = makerjs.exporter.toSVG(model, options)
  const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
  FileSaver.saveAs(blob, 'kbplate.svg')
}

const saveDxf = (model: makerjs.IModel) => {
  const options = {
    accuracy: 0.000001,
    units: makerjs.unitType.Millimeter,
  }
  const output = makerjs.exporter.toDXF(model, options)
  const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
  FileSaver.saveAs(blob, 'kbplate.dxf')
}

export default PlateViewer
