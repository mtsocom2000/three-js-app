import * as THREE from 'three';
import Base from './displayItem/base';
import Group from './displayItem/group';
import { DEFAULT_LENGTH } from './constant';
const TrackballControls = require('three-trackballcontrols');

export default class PlayGround {
  constructor(options) {
    this.mScene = null;
    this.mCamera = null;
    this.mRender = null;
    this.mTrackballControl = null;

    this.mOptions = Object.assign({
      domElement: document.querySelector('body'),
      showGridHelper: true,
    }, options);

    this.render = this.render.bind(this);
  }

  getScene() {
    return this.mScene;
  }

  getCamera() {
    return this.mCamera;
  }

  getRender() {
    return this.mRender;
  }

  init() {
    this.mScene = new THREE.Scene();
    this.mScene.background = new THREE.Color( 0xffffff );

    if (this.mOptions.showGridHelper) {
      this.mScene.add(new THREE.GridHelper(500, 50));
    }

    this.mCamera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000);
    //this.mCamera = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 1000);
    // position and point the camera to the center of the scene
    this.mCamera.position.x = 50;
    this.mCamera.position.y = 80;
    this.mCamera.position.z = 130;
    this.mCamera.lookAt(this.mScene.position);

    this.mTrackballControl = new TrackballControls(this.mCamera);
    this.mTrackballControl.rotateSpeed = 1.0;
    this.mTrackballControl.zoomSpeed = 1.2;
    this.mTrackballControl.panSpeed = 0.8;
    this.mTrackballControl.noZoom = false;
    this.mTrackballControl.noPan = false;
    this.mTrackballControl.staticMoving = true;
    this.mTrackballControl.dynamicDampingFactor = 0.3;
  
    this.mRender = new THREE.WebGLRenderer({ antialias: true });
    this.mRender.setClearColor(new THREE.Color(0xffffff, 0.8));
    this.mRender.setPixelRatio(window.devicePixelRatio);
    this.mRender.setSize(window.innerWidth, window.innerHeight);
    this.mRender.shadowMapEnabled = true;

    this.mAmbientLight = new THREE.AmbientLight(0xcccccc);
    this.mScene.add(this.mAmbientLight);

    this.mDirectionlight = new THREE.DirectionalLight(0xffffff, 2);
    this.mDirectionlight.position.set(100, 100, 100);
    this.mScene.add(this.mDirectionlight);

    this.mPlanGeometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    this.mPlanGeometry.rotateX( - Math.PI / 2 );
    this.mPlane = new THREE.Mesh(this.mPlanGeometry, new THREE.MeshBasicMaterial({ visible: false }));
    this.mScene.add(this.mPlane);

    this.mOptions.domElement.appendChild(this.mRender.domElement);

    this.render();
  }

  addMatrix(position) {
    const rayCaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = position.x;
    mouse.y = position.y;
    rayCaster.setFromCamera(position, this.mCamera);
    const intersects = rayCaster.intersectObjects(this.mScene.children);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      if (!intersect.face) {
        return;
      }
      
      const pos = new THREE.Vector3();
      pos.copy(intersect.point).add(intersect.face.normal).divideScalar(DEFAULT_LENGTH).floor().multiplyScalar(DEFAULT_LENGTH).addScalar(DEFAULT_LENGTH / 2);
  
      const matrixGroup = new Group();
      const group = matrixGroup.getMesh();
      group.position.copy(pos);

      this.mScene.add(group);
    }
  }

  render() {
    this.mTrackballControl.update();

    requestAnimationFrame(this.render);
    this.mRender.render(this.mScene, this.mCamera);
  }
}