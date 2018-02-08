import MatrixApp from './matrixApp';
export function startApp() {
  const matrixApp = new MatrixApp();
  matrixApp.init();
  matrixApp.hookEvents();
}

// import * as THREE from 'three';
// const TrackballControls = require('three-trackballcontrols');
// const TransformControls = require('threejs-transformcontrols');

// export default function startThreeJs() {
//   init();
// }

// let trackballControls;
// var scene;
// var cube;
// let transformControl;

// function createProjectPlane(geom) {
//   // assign two materials
//   var meshMaterial = new THREE.MeshNormalMaterial();
//   meshMaterial.side = THREE.DoubleSide;
//   meshMaterial.transparent = true;
//   var wireFrameMat = new THREE.MeshBasicMaterial();
//   wireFrameMat.wireframe = true;

//   // create a multimaterial
//   var projectPlane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
//   // projectPlane.position.setY(5);
//   projectPlane.position.setZ(-10);

//   let plane = new THREE.Plane(projectPlane.position);

//   let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
//   let lineGeometry = new THREE.Geometry();

//   cube.geometry.vertices.forEach((vertex) => {
//     let newv = vertex.clone();
//     //newv.projectOnPlane(projectPlane.position);
//     //newv.setZ(0);
//     lineGeometry.vertices.push(newv);
//   });

//   // lineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
//   // lineGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
//   // lineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));

//   let line = new THREE.Line(lineGeometry, lineMaterial);
//   line.position.setX(projectPlane.position.x);
//   line.position.setY(projectPlane.position.y);
//   line.position.setZ(projectPlane.position.z);
//   scene.add(line);

//   var newCubeMatrix = cube.matrix;
//   newCubeMatrix.identity();
//   // newCubeMatrix.multiplySelf(THREE.Matrix4.translationMatrix(projectPlane.position.x, projectPlane.position.y, projectPlane.position.z));
//   cube.updateMatrix();

//   return projectPlane;
// }

// function addTrackBall(camera) {
//   trackballControls = new TrackballControls(camera);
//   trackballControls.rotateSpeed = 1.0;
//   trackballControls.zoomSpeed = 1.2;
//   trackballControls.panSpeed = 0.8;
//   trackballControls.noZoom = false;
//   trackballControls.noPan = false;
//   trackballControls.staticMoving = true;
//   trackballControls.dynamicDampingFactor = 0.3;
// }

// function createMeshes() {
//   for (let i=0; i < 100; i++) {
//     const geometry = new THREE.BoxGeometry(5, 8, 3);
//     const material = new THREE.MeshLambertMaterial({
//       color: Math.random() * 0xffffff,
//       // opacity: 0.8,
//       // transparent: true,
//     });
//     cube = new THREE.Mesh(geometry, material);
//     cube.name = `mycube ${i}`;
//     cube.position.x = Math.random(100) * i;
//     cube.position.y = Math.random(100) * i;
//     cube.position.z = Math.random(100) * i;
//     cube.castShadow = true;
//     scene.add(cube);
//   }
// }

// function init() {
//   scene = new THREE.Scene();
//   // scene.add(new THREE.GridHelper(1000, 100));
//   // var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10000);
//   const camera = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 1000);
//   // position and point the camera to the center of the scene
//   camera.position.x = 30;
//   camera.position.y = 40;
//   camera.position.z = 30;
//   camera.lookAt(scene.position);
//   addTrackBall(camera);

//   const renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setClearColor(new THREE.Color(0x99cc88, 0.7));
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.shadowMapEnabled = true;

//   // the ground plane
//   const planeGeometry = new THREE.PlaneGeometry(70, 70, 1, 1);
//   const planeMaterial = new THREE.MeshNormalMaterial({
//     color: 0xffffff,
//     opacity: 0.6,
//   });
//   planeMaterial.side = THREE.DoubleSide;
//   planeMaterial.opacity = 0.7;
//   planeMaterial.transparent = true;
//   const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
//   groundPlane.receiveShadow = true;
//   groundPlane.name = 'groundPlane';

//   // rotate and position the plane
//   groundPlane.rotation.x = 0.5 * Math.PI;
//   groundPlane.position.x = 0;
//   groundPlane.position.y = 0;
//   groundPlane.position.z = 0;

//   // add the plane to the scene
//   scene.add(groundPlane);

//   // add subtle ambient lighting
//   var ambientLight = new THREE.AmbientLight(0x0c0c0c);
//   scene.add(ambientLight);

//   // add spotlight for the shadows
//   var spotLight = new THREE.SpotLight(0xffffff);
//   spotLight.position.set(100, 60, 20);
//   spotLight.castShadow = true;
//   scene.add(spotLight);

//   createMeshes();

//   // add the output of the renderer to the html element
//   document.getElementById('WebGL-output').appendChild(renderer.domElement);

//   var material = new THREE.MeshNormalMaterial({
//     // color: 0x44ff44,
//     opacity: 0.8,
//     transparent: true,
//   });
//   var geom = new THREE.BoxGeometry(5, 8, 3);
//   cube = new THREE.Mesh(geom, material);
//   cube.name = 'mycube';
//   cube.position.y = 4;
//   cube.castShadow = true;
//   scene.add(cube);

//   var projectPlane = createProjectPlane(new THREE.PlaneGeometry(20, 20, 4, 4));
//   // add the sphere to the scene
//   projectPlane.name = 'myplane';
//   scene.add(projectPlane);

//   let boXGeometry = new THREE.BoxGeometry(8, 8, 8);
//   let boXMaterial = new THREE.MeshLambertMaterial({
//     color: 0xFF4556,
//   });
//   let boxMesh = new THREE.Mesh(boXGeometry, boXMaterial);
//   boxMesh.position.x = 10;
//   boxMesh.position.y = 0;
//   boxMesh.position.z = 3;
//   boxMesh.castShadow = true;
//   boxMesh.name = 'mybox';
//   scene.add(boxMesh);

//   // let light = new THREE.DirectionalLight(0xffffff, 2);
//   // light.position.set(100, 100, 100);
//   // scene.add(light);

//   // transformControl = new TransformControls(camera, renderer.domElement);
//   // transformControl.addEventListener('change', render);
//   // transformControl.attach(boxMesh);
//   // scene.add(transformControl);

//   window.addEventListener('mousemove', function (event) {
//     let mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera( mouse, camera );
//     // const vector = new THREE.Vector3(mouse.x, mouse.y, 1).unproject(camera);
//     // raycaster.set(camera.position, vector.sub(camera.position).normalize());
//     const intersects = raycaster.intersectObjects(scene.children);
//     for ( var i = 0; i < intersects.length; i++ ) {
//       console.log('inserscet->>>>');
//       let element = intersects[i];
//       console.log(`${element.object.type}: ${element.object.name}`);
//       if (element.object && element.object.material && element.object.material.color) {
//         element.object.material.color.set(0xff0000);
//       }
//       console.log('<<<<-inserscet');
//     }
//     // const intersectedObject = intersects[0].object;
//   });

//   render();

//   function render() {
//     trackballControls.update();

//     requestAnimationFrame(render);
//     renderer.render(scene, camera);
//   }
// }