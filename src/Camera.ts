import {vec2, mat4} from 'gl-matrix';
import GameObject from './engine/GameObject';

class Camera {
    controls: any;
    projectionMatrix: mat4 = mat4.create();
    viewMatrix: mat4 = mat4.create();
    aspectRatio: number = 1;
    position: vec2 = vec2.create();
    child: GameObject = null;
  
    constructor(position: vec2) {
        this.position = vec2.fromValues(position[0], position[1]);
    }
  
    setAspectRatio(aspectRatio: number) {
        this.aspectRatio = aspectRatio;
    }
  
    updateProjectionMatrix() {
        mat4.ortho(this.projectionMatrix, -10 * this.aspectRatio, 10 * this.aspectRatio, -10, 10, -1, 1);
    }

    setPosition(newPos: vec2 | number[]) {
        this.position = vec2.fromValues(newPos[0], newPos[1]);
        mat4.translate(this.viewMatrix, mat4.create(), [newPos[0], newPos[1], 0]);
    }

    translate(amount: vec2 | number[]) {
        vec2.add(this.position, this.position, amount);
        mat4.translate(this.viewMatrix, mat4.create(), [this.position[0], this.position[1], 0]);
    }

    makeParent(child: GameObject) {
        this.child = child;
    }

    update(): void {
        if (this.child) {
            this.setPosition([-this.child.getPosition()[0], this.position[1]]);
        }
    }
};

export default Camera;
