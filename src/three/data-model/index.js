import {
  DEFAULT_PLAYGROUND_HEIGHT,
  DEFAULT_PLAYGROUND_WIDTH,
  DEFAULT_PLAYGROUND_DEPTH,
  DEFAULT_TETRIS_HEIGHT,
  DEFAULT_TETRIS_WIDTH,
  DEFAULT_TETRIS_DEPTH
} from './../constant/index';

export class CubeData {
  constructor(x, y, z) {
    this.mOptions = {
      width: Number.isInteger(x) ? x : DEFAULT_TETRIS_WIDTH,
      height: Number.isInteger(y) ? y : DEFAULT_TETRIS_HEIGHT,
      depth: Number.isInteger(z) ? z : DEFAULT_TETRIS_DEPTH,
    };

    // width — Width of the sides on the X axis.
    // height — Height of the sides on the Y axis.
    // depth — Depth of the sides on the Z axis.
    this.mData = [];
    // [
    //   // 0 0 0
    //   [ 0, 0, 0 ],
    //   [ 1, 0, 0 ],
    //   [ 2, 0, 0 ],
    // ],
  }

  create(groupData) {
    if (Array.isArray(groupData)) {
      return;
    }

    groupData.forEach(cubePos => {
      if (Number.isInteger(cubePos[0]) &&
        Number.isInteger(cubePos[1]) &&
        Number.isInteger(cubePos[2])) {
        this.mData.push([
          cubePos[0],
          cubePos[1],
          cubePos[2],
        ]);
      }
    });
  }
}

export class TetrisData extends CubeData {
  constructor(x, y, z) {
    super(x, y, z);

    // h * w * d
    // this.mCubesPosition = Array(this.mOptions.depth).fill([]);
  }

  create(cubes) {
    if (!Array.isArray(cubes)) {
      return;
    }

    // fill cubes position...
  }
}

export class PlayGroundData extends TetrisData {
  constructor(x, y, z) {
    super(x, y, z);

    this.mOptions = Object.assign(this.mOptions, {
      width: Number.isInteger(x) ? x : DEFAULT_PLAYGROUND_WIDTH,
      height: Number.isInteger(y) ? y : DEFAULT_PLAYGROUND_HEIGHT,
      depth: Number.isInteger(z) ? z : DEFAULT_PLAYGROUND_DEPTH,
    });
  }

  create(height) {
    // random
    this.mData = Array(this.mOptions.height).fill([Array(this.mOptions.width).fill(Array(this.mOptions.width).fill(0))]);

    
  }

  intersect() {
    
  }
}
