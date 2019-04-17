import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';

class Player extends GameObject {

    playerVelocity: vec2;
    jumping: boolean;
    jumpTime: number;
    groundedImmunity: boolean;

    constructor() {
        super(true);
        this.playerVelocity = vec2.fromValues(0, 0);
        this.jumping = false;
        this.groundedImmunity = false;
    }

    onUpdate(delta: number) {
        this.translate(vec2.scale(this.playerVelocity, this.playerVelocity, delta * 4));
        this.playerVelocity = vec2.fromValues(0, 0);
        if (this.jumping) {
            let jumpDecay = Math.pow(sceneAttributes.jumpFalloff, this.jumpTime * 50);
            let jumpAmount = sceneAttributes.playerJump * jumpDecay;
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(0, jumpAmount));
            this.jumpTime += delta;
            console.log("jumping");
        }
        if (this.jumpTime > sceneAttributes.maxJumpHold || (this.isGrounded && !this.groundedImmunity)) {
            this.jumping = false;
        }
        this.groundedImmunity = false;
    }

    onKeyPress(key: string) {
        let playerMovement = this.isGrounded ? sceneAttributes.playerSpeed : sceneAttributes.playerSpeed;
        if (key === "a") {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(-playerMovement, 0));
        }
        else if (key === "d") {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(playerMovement, 0));
        }
    }

    onKeyDown(key: string) {
        if (key === 'w' && this.isGrounded) {
            this.jumping = true;
            this.jumpTime = 0;
            this.groundedImmunity = true;
        }
    }

    onKeyUp(key: string) {
        if (key === 'w') {
            this.jumping = false;
            this.jumpTime = 0;
        }
    }

    getSpriteUv() {
        return vec2.fromValues(0, 7);
    }
}

export default Player;