import {vec2, mat4} from 'gl-matrix';
import GameObject from './engine/GameObject';
import sceneAttributes from './scene/SceneAttributes';
import Player from './scene/Player';

class Camera {
    controls: any;
    projectionMatrix: mat4 = mat4.create();
    viewMatrix: mat4 = mat4.create();
    aspectRatio: number = 1;
    position: vec2 = vec2.create();
    child: Player = null;
    width: number;
    height: number;
  
    constructor(position: vec2, height: number) {
        this.position = vec2.fromValues(position[0], position[1]);
        this.height = height;
        this.width = height;
    }
  
    setAspectRatio(aspectRatio: number) {
        this.aspectRatio = aspectRatio;
        this.width = this.height * aspectRatio;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
  
    updateProjectionMatrix() {
        let w = this.width / 2;
        let h = this.height / 2;
        mat4.ortho(this.projectionMatrix, -w, w, -h, h, -1, 1);
    }

    setPosition(newPos: vec2 | number[]) {
        this.position = vec2.fromValues(newPos[0], newPos[1]);
        mat4.translate(this.viewMatrix, mat4.create(), [newPos[0], newPos[1], 0]);
    }

    translate(amount: vec2 | number[]) {
        vec2.add(this.position, this.position, vec2.fromValues(amount[0], amount[1]));
        mat4.translate(this.viewMatrix, mat4.create(), [this.position[0], this.position[1], 0]);
    }


    makeParent(child: Player) {
        this.child = child;
    }

    update(): void {
        if (this.child) {
            let yPos = this.position[1];
            let offset = this.child.sPressed && this.child.isGrounded ? -3 : 2
            let goalPos = -Math.max(this.child.getPosition()[1] + offset, sceneAttributes.deathHeight + 10);

            if (this.child.isGrounded && Math.abs(yPos - goalPos) > 0.01) {
                yPos += (goalPos - yPos) * 0.06;
            }
            else {
                yPos += (goalPos - yPos) * 0.015;
            }
            this.setPosition([-this.child.getPosition()[0], yPos]);            
        }
    }
};

export default Camera;
