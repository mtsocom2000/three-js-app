import PlayGround from './playGround';

export default class MatrixApp {
  constructor() {
    this.mEventManager = null;
    this.mPlayGround = null;
    this.onMouseDown = this.onMouseDown.bind(this);

    this.mOptions = {
      domElement: document.querySelector('#WebGL-output'),
    };
  }

  init(options) {
    this.mPlayGround = new PlayGround(options);
    this.mPlayGround.init();
  }

  hookEvents() {
    document.addEventListener('mousedown', this.onMouseDown, false);
  }

  onMouseDown(event) {
    const x = ( event.clientX / this.mOptions.domElement.clientWidth ) * 2 - 1;
    const y = - ( event.clientY / this.mOptions.domElement.clientHeight ) * 2 + 1;
    this.mPlayGround.addMatrix({ x, y });
  }
}