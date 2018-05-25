import * as THREE from 'three';
import Group from './../display/group';
import { DEFAULT_LENGTH, DEFAULT_START_Y } from './../constant/index';
const TrackballControls = require('three-trackballcontrols');

export default class PlayGround {
  constructor(options) {
    this.mScene = null;
    this.mCamera = null;
    this.mRender = null;
    this.mTrackballControl = null;

    this.mMeshes = [];

    this.mOptions = Object.assign({
      domElement: document.querySelector('body'),
      showGridHelper: true,
      showAxisHelper: false,
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
      this.mScene.add(new THREE.GridHelper(100, 10));
    }

    if (this.mOptions.showAxisHelper) {
      this.mScene.add(new THREE.AxisHelper(50));
    }

    //this.mCamera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000);
    // const aspect = window.innerWidth / window.innerHeight;
    const ratio = 1 / 2;
    this.mCamera = new THREE.OrthographicCamera(
      ratio * window.innerWidth / -2,
      ratio * window.innerWidth / 2,
      ratio * window.innerHeight / 2,
      ratio * window.innerHeight / -2,
      1,
      2000);
    // position and point the camera to the center of the scene
    this.mCamera.position.x = 200;
    this.mCamera.position.y = 240;
    this.mCamera.position.z = 200;
    this.mCamera.lookAt(this.mScene.position.add(new THREE.Vector3(20, 0, 20)));

    this.mElapsedTime = 0;
    this.mLastTime = 0;

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
    this.mRender.shadowMap.enabled = true;

    this.mAmbientLight = new THREE.AmbientLight(0xcccccc);
    this.mScene.add(this.mAmbientLight);

    this.mDirectionlight = new THREE.DirectionalLight(0xffffff, 2);
    this.mDirectionlight.position.set(100, 100, 100);
    this.mScene.add(this.mDirectionlight);

    this.mPlanGeometry = new THREE.BoxBufferGeometry(100, 4, 100);
    // this.mPlanGeometry.rotateX( - Math.PI / 2 );
    this.mPlane = new THREE.Mesh(this.mPlanGeometry, new THREE.MeshBasicMaterial({
      color: 0x444488,
      opacity: 0.5,
      transparent: true,
    }));
    this.mPlane.position.sub(new THREE.Vector3(0, 4 / 2, 0));
    this.mScene.add(this.mPlane);

    this.mCurrentCube = null;

    this.mOptions.domElement.appendChild(this.mRender.domElement);

    this.render();
  }

  addCubeByMousePosition(position) {
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

      this.addCube(pos);
    }
  }

  addCube(pos) {
    const position = new THREE.Vector3(
      0 || pos.x,
      DEFAULT_START_Y,
      0 || pos.z
    );
    const matrixGroup = new Group();
    const group = matrixGroup.getMesh();
    group.position.copy(position);

    this.mScene.add(group);
    this.mMeshes.push(group);

    this.mCurrentCube = group;
  }

  // move mCurrentCube down
  updateCube(step) {
    if (!this.mCurrentCube) {
      return;
    }

    if (this.mCurrentCube.position.y <= 0) {
      this.mCurrentCube = null;
      return;
    }
    // const pos = new THREE.Vector3();
    this.mCurrentCube.position.y -= step;
  }

  render() {
    this.mTrackballControl.update();

    this.mElapsedTime = Date.now() - this.mLastTime;
    this.mLastTime = Date.now();
    if (this.mCurrentCube) {
      this.updateCube(this.mElapsedTime / DEFAULT_LENGTH / 10);
    // } else {
    //   this.addCube({});
    }

    var timer = Date.now() * 0.0001;
    this.mCamera.position.x = Math.cos(timer) * 200;
    this.mCamera.position.z = Math.sin(timer) * 200;
    this.mCamera.lookAt(this.mScene.position);

    // this.mMeshes.forEach(mesh => {
    //   mesh.rotation.x += Math.random() / 10;
    //   mesh.rotation.y += Math.random() / 10;
    //   mesh.rotation.z += Math.random() / 10;
    // });

    requestAnimationFrame(this.render);
    this.mRender.render(this.mScene, this.mCamera);
  }
}