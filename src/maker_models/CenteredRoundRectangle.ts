import makerjs from "makerjs";

class CenteredRoundRectangle extends makerjs.models.RoundRectangle {
  constructor(width: number, height: number, radius: number) {
    super(width, height, radius);
    this.origin = [-width / 2, -height / 2];
  }
}

export default CenteredRoundRectangle;
