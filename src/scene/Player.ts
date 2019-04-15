import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';

class Player extends GameObject {

    playerVelocity: vec2;

    constructor() {
        super(true);
        this.playerVelocity = vec2.fromValues(0, 0);
    }

    onUpdate(delta: number) {
        this.translate(vec2.scale(this.playerVelocity, this.playerVelocity, delta * 4));
        this.playerVelocity = vec2.fromValues(0, 0);
    }

    onKeyPress(key: string) {
        let playerMovement = this.isGrounded ? sceneAttributes.playerSpeed : sceneAttributes.playerSpeed;
        if (key === "a") {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(-playerMovement, 0));
        }
        else if (key === "d") {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(playerMovement, 0));
        }
        else if (key === "w" && this.isGrounded) {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(0, sceneAttributes.playerJump));
        }
    }
}

export default Player;