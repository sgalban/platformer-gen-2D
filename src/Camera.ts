import {vec2, mat4} from 'gl-matrix';

class Camera {
    controls: any;
    projectionMatrix: mat4 = mat4.create();
    viewMatrix: mat4 = mat4.create();
    aspectRatio: number = 1;
    position: vec2 = vec2.create();
  
    constructor(position: vec2) {
        this.position = vec2.fromValues(position[0], position[1]);
    }
  
    setAspectRatio(aspectRatio: number) {
        this.aspectRatio = aspectRatio;
    }
  
    updateProjectionMatrix() {
        mat4.ortho(this.projectionMatrix, -10 * this.aspectRatio, 10 * this.aspectRatio, -10, 10, -1, 1);
    }

    translate(newPos: vec2) {
        this.position = vec2.fromValues(newPos[0], newPos[1]);
        mat4.translate(this.viewMatrix, mat4.create(), [newPos[0], newPos[1], 0]);
    }
};

export default Camera;
