import { DEFAULT_PLAYGROUND_LENGTH, DEFAULT_PLAYGROUND_WIDTH, DEFAULT_PLAYGROUND_DEPTH } from './../constant';

export class MatrixData {
  constructor(x, y, z) {
    this.mOptions = {
      length: Number.isInteger(x) ? x : DEFAULT_PLAYGROUND_LENGTH,
      width: Number.isInteger(y) ? y : DEFAULT_PLAYGROUND_WIDTH,
      depth: Number.isInteger(z) ? z : DEFAULT_PLAYGROUND_DEPTH,
    };

    // l * w * d
    this.mCubesPosition = Array(this.mOptions.z).fill([]);
  }

  fill(cubes) {
    if (!Array.isArray(cubes)) {
      return;
    }

    // fill cubes position...
  }
}

export class PlayGround extends MatrixData {
  constructor(x, y, z) {
    super(x, y, z);
  }

  intersect() {
    
  }
}
