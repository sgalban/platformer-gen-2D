import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';

const WALK_CYCLE_LENGTH: number = 10;

class Player extends GameObject {

    playerVelocity: vec2;
    jumping: boolean;
    jumpTime: number;
    groundedImmunity: boolean;
    direction: number;
    walkFrame: number;
    moving: boolean;

    aPressed: boolean;
    dPressed: boolean;
    sPressed: boolean;


    constructor() {
        super(true);
        this.playerVelocity = vec2.fromValues(0, 0);
        this.jumping = false;
        this.groundedImmunity = false;
        this.walkFrame = 0;
        this.moving = false;
        this.aPressed = false;
        this.dPressed = false;
    }

    onUpdate(delta: number) {
        this.translate(vec2.scale(this.playerVelocity, this.playerVelocity, delta * 4));
        this.playerVelocity = vec2.fromValues(0, 0);
        if (this.jumping) {
            let jumpDecay = Math.pow(sceneAttributes.jumpFalloff, this.jumpTime * 50);
            let jumpAmount = sceneAttributes.playerJump * jumpDecay;
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(0, jumpAmount));
            this.jumpTime += delta;
        }
        if (this.jumpTime > sceneAttributes.maxJumpHold || (this.isGrounded && !this.groundedImmunity)) {
            this.jumping = false;
        }
        this.groundedImmunity = false;

        if (!this.aPressed && !this.dPressed || (this.aPressed && this.dPressed)) {
            this.moving = false;
        } 

        if (this.moving) {
            this.walkFrame++;
        }
        else {
            this.walkFrame = 0
        };
    }

    onKeyPress(key: string) {
        let playerMovement = this.isGrounded ? sceneAttributes.playerSpeed : sceneAttributes.playerSpeed;
        if (key === "a") {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(-playerMovement, 0));
            this.direction = -1;
            this.moving = true;
        }
        else if (key === "d") {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(playerMovement, 0));
            this.direction = 1;
            this.moving = true;
        }
    }

    onKeyDown(key: string) {
        if (key === 'w' && this.isGrounded) {
            this.jumping = true;
            this.jumpTime = 0;
            this.groundedImmunity = true;
        }
        else if (key === 'a') {
            this.aPressed = true;
        }
        else if (key === 'd') {
            this.dPressed = true;
        }
        else if (key === 's') {
            this.sPressed = true;
        }
    }

    onKeyUp(key: string) {
        if (key === 'w') {
            this.jumping = false;
            this.jumpTime = 0;
        }
        else if (key === 'a') {
            this.aPressed = false;
        }
        else if (key === 'd') {
            this.dPressed = false;
        }
        else if (key === 's') {
            this.sPressed = false;
        }
    }

    getSpriteUv() {
        if (!this.isGrounded) {
            return vec2.fromValues(1, 7);
        }
        else if (this.moving) {
            return vec2.fromValues(this.walkFrame % WALK_CYCLE_LENGTH < WALK_CYCLE_LENGTH / 2 ? 2 : 3, 7);
        }
        else if (this.sPressed) {
            return vec2.fromValues(4, 7);
        }
        return vec2.fromValues(0, 7);
    }
}

export default Player;