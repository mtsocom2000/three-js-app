import * as THREE from 'three';
import { DEFAULT_LENGTH } from './../constant';
import { getRandomColor } from './../utils';

export default class Base {
  constructor(options) {
    this.mOptions = Object.assign({
      x: 0,
      y: 0,
      z: 0,
      xSize: DEFAULT_LENGTH,
      ySize: DEFAULT_LENGTH,
      zSize: DEFAULT_LENGTH,
      color: getRandomColor(),
    }, options);

    this.createMesh();
  }

  /* virtual begin */
  createMesh() {
    this.mBoxGeometry = new THREE.BoxBufferGeometry(this.mOptions.xSize, this.mOptions.ySize, this.mOptions.zSize);
    this.mBoxMaterial = new THREE.MeshLambertMaterial({
      color: this.mOptions.color,
      //wireframe: true,
    });
    this.mBoxMesh = new THREE.Mesh(this.mBoxGeometry, this.mBoxMaterial);
    this.mBoxMesh.position.x = this.mOptions.x;
    this.mBoxMesh.position.y = this.mOptions.y;
    this.mBoxMesh.position.z = this.mOptions.z;
    this.mBoxMesh.castShadow = true;
  }
  setName(name) {
    this.mBoxMesh.name = name;
  }
  getName() {
    return this.mBoxMesh;
  }
  getMesh() {
    return this.mBoxMesh;
  }
  /* virtual end */

}