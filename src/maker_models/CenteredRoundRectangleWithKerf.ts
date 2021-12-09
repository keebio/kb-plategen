import CenteredRoundRectangle from "./CenteredRoundRectangle";

class CenteredRoundRectangleWithKerf extends CenteredRoundRectangle {
  constructor(width: number, height: number, radius: number, kerf: number) {
    super(width - kerf, height - kerf, radius);
  }
}

export default CenteredRoundRectangleWithKerf;
