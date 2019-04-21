import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';
import {spriteCoordinates} from '../constants';

const WALK_CYCLE_LENGTH: number = 10;

class Player extends GameObject {

    // Whether or not the player is affecting their jump by holding the jump button
    jumping: boolean;

    // The amount of time the player has been holding the jump button
    jumpTime: number;

    // Prevents the player from regrounding the frist frame of a jump
    groundedImmunity: boolean;

    // The direction the player is currently facing: 1 for right, -1 for left
    direction: number;

    // The current frame of the player's walk cycle
    walkFrame: number;

    // Whether or not the player is moving horizontally
    moving: boolean;

    jumpFalloff: number;

    aPressed: boolean;
    dPressed: boolean;
    sPressed: boolean;


    constructor() {
        super(true);
        this.jumping = false;
        this.groundedImmunity = false;
        this.direction = 1;
        this.walkFrame = 0;
        this.moving = false;
        this.aPressed = false;
        this.dPressed = false;
        this.sPressed = false;
        this.setPosition([0, 0]);
        this.jumpFalloff = 0.0;
    }

    onUpdate(delta: number) {
        if (this.jumping) {
            this.jumpTime -= delta;
            let t = Math.max(0, this.jumpTime / sceneAttributes.maxJumpHold);
            this.inputVelocity[1] = t * sceneAttributes.playerJump;
            /*
            let jumpDecay = Math.pow(this.jumpFalloff, this.jumpTime * 50);
            let jumpAmount = sceneAttributes.playerJump * jumpDecay;
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(0, jumpAmount));
            this.jumpTime += delta;*/
        }
        if (this.jumpTime <= 0 || (this.isGrounded && !this.groundedImmunity)) {
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
            this.walkFrame = 0;
        };

        if (this.getPosition()[1] < sceneAttributes.deathHeight) {
            this.setPosition([0, 0]);
        }
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
            this.jumpTime = sceneAttributes.maxJumpHold;
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
            return spriteCoordinates.SPRITE_PLAYER_JUMP;
        }
        else if (this.moving) {
            return this.walkFrame % WALK_CYCLE_LENGTH < WALK_CYCLE_LENGTH / 2 ?
                spriteCoordinates.SPRITE_PLAYER_WALK_1 : 
                spriteCoordinates.SPRITE_PLAYER_WALK_2;
        }
        else if (this.sPressed) {
            return spriteCoordinates.SPRITE_PLAYER_CROUCH
        }
        return spriteCoordinates.SPRITE_PLAYER_STAND;
    }
}

export default Player;