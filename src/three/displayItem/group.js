import * as THREE from 'three';
import Base from './base.js';
import { DEFAULT_LENGTH } from './../constant';
import { getMatrixDefination } from './defination';

export default class Group extends Base {
  constructor() {
    super({
      structure: getMatrixDefination(),
    });
  }

  /* override method */
  createMesh() {
    this.mBoxGeometry = new THREE.BoxBufferGeometry(DEFAULT_LENGTH, DEFAULT_LENGTH, DEFAULT_LENGTH);
    this.mBoxMaterial = new THREE.MeshLambertMaterial({ color: this.mOptions.color });

    this.mGroup = new THREE.Group();
    this.mOptions.structure.forEach(position => {
      const cube = new THREE.Mesh(this.mBoxGeometry, this.mBoxMaterial);
      cube.castShadow = true;
      cube.position.set(position[0] * DEFAULT_LENGTH, position[1] * DEFAULT_LENGTH, position[2] * DEFAULT_LENGTH);
      this.mGroup.add(cube);
    });

    this.mGroup.rotateX( parseInt(Math.random() * 4, 10) * Math.PI / 2 );
    this.mGroup.rotateY( parseInt(Math.random() * 4, 10) * Math.PI / 2 );
    this.mGroup.rotateZ( parseInt(Math.random() * 4, 10) * Math.PI / 2 );
  }
  getMesh() {
    return this.mGroup;
  }
  /* override method */
}