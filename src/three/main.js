import * as THREE from 'three';
const TrackballControls = require('three-trackballcontrols');

export default function startThreeJs() {
  init();
}

let trackballControls;
var scene;
var cube;

function createProjectPlane(geom) {
  // assign two materials
  var meshMaterial = new THREE.MeshNormalMaterial();
  meshMaterial.side = THREE.DoubleSide;
  meshMaterial.transparent = true;
  var wireFrameMat = new THREE.MeshBasicMaterial();
  wireFrameMat.wireframe = true;

  // create a multimaterial
  var projectPlane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
  // projectPlane.position.setY(5);
  projectPlane.position.setZ(-10);

  let plane = new THREE.Plane(projectPlane.position);

  let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
  let lineGeometry = new THREE.Geometry();

  cube.geometry.vertices.forEach((vertex) => {
    console.log(vertex);
    let newv = vertex.clone();
    //newv.projectOnPlane(projectPlane.position);
    //newv.setZ(0);
    lineGeometry.vertices.push(newv);
  });

  // lineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  // lineGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
  // lineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));

  let line = new THREE.Line(lineGeometry, lineMaterial);
  line.position.setX(projectPlane.position.x);
  line.position.setY(projectPlane.position.y);
  line.position.setZ(projectPlane.position.z);
  scene.add(line);

  var newCubeMatrix = cube.matrix;
  newCubeMatrix.identity();
  // newCubeMatrix.multiplySelf(THREE.Matrix4.translationMatrix(projectPlane.position.x, projectPlane.position.y, projectPlane.position.z));
  cube.updateMatrix();

  return projectPlane;
}

function addTrackBall(camera) {
  trackballControls = new TrackballControls(camera);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.2;
  trackballControls.panSpeed = 0.8;
  trackballControls.noZoom = false;
  trackballControls.noPan = false;
  trackballControls.staticMoving = true;
  trackballControls.dynamicDampingFactor = 0.3;
}

// once everything is loaded, we run our Three.js stuff.
function init() {

  var stats = initStats();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  var camera = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 1000);

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setClearColor(new THREE.Color(0x99cc00, 0.7));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(70, 70, 1, 1);
  var planeMaterial = new THREE.MeshNormalMaterial({
    color: 0xffffff,
    opacity: 0.6,
  });
  planeMaterial.side = THREE.DoubleSide;
  planeMaterial.opacity = 0.7;
  planeMaterial.transparent = true;
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  addTrackBall(camera);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, 20);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  // call the render function
  var step = 0;

  var controls = new function () {
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;

    this.positionX = 0;
    this.positionY = 4;
    this.positionZ = 0;

    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.scale = 1;

    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;

    this.visible = true;

    this.origin = false;

    this.translate = function () {

      cube.translateX(controls.translateX);
      cube.translateY(controls.translateY);
      cube.translateZ(controls.translateZ);

      controls.positionX = cube.position.x;
      controls.positionY = cube.position.y;
      controls.positionZ = cube.position.z;
    };
  };

  var material = new THREE.MeshNormalMaterial({
    color: 0x44ff44,
    opacity: 0.8,
    transparent: true,
  });
  var geom = new THREE.BoxGeometry(5, 8, 3);
  cube = new THREE.Mesh(geom, material);
  cube.position.y = 4;
  cube.castShadow = true;
  scene.add(cube);

  var projectPlane = createProjectPlane(new THREE.PlaneGeometry(20, 20, 4, 4));
  // add the sphere to the scene
  scene.add(projectPlane);


  render();

  function render() {
    trackballControls.update();
    cube.visible = controls.visible;

    if (controls.origin) {
      camera.position.x = -30;
      camera.position.y = 40;
      camera.position.z = 30;
      camera.lookAt(scene.position);
    }


    cube.rotation.x = controls.rotationX;
    cube.rotation.y = controls.rotationY;
    cube.rotation.z = controls.rotationZ;

    cube.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ);


    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function initStats() {
  }
}