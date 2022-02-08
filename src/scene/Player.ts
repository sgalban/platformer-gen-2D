import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';
import Particle from './Particle';
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

    aPressed: boolean;
    dPressed: boolean;
    sPressed: boolean;

    private startPos: vec2;
    private dead: boolean;
    private idleTime: number;
    private zTime: number;
    private deathTimer: number;
    win: boolean;

    constructor(_startPos: vec2 | number[]) {
        super(true, false, true);
        this.jumping = false;
        this.groundedImmunity = false;
        this.direction = 1;
        this.walkFrame = 0;
        this.moving = false;
        this.aPressed = false;
        this.dPressed = false;
        this.sPressed = false;
        this.startPos = vec2.create();
        vec2.copy(this.startPos, vec2.fromValues(_startPos[0], _startPos[1]));
        this.setPosition(this.startPos);
        this.idleTime = 0;
        this.zTime = 0;
        this.dead = false;
        this.deathTimer = 0;
        this.win = false;
    }

    onUpdate(delta: number) {
        if (this.win) {
            return
        }
        if (this.dead) {
            this.dynamic = false;
            this.grounded = true;
            this.deathTimer++;
            this.direction = this.deathTimer % 20 < 10 ? 1 : -1;
            if (this.deathTimer > 40 && this.deathTimer < 70) {
                this.translate([0, (70 - this.deathTimer) * 0.025 - 15.0 / 60]);
            }
            if (this.deathTimer > 70) {
                this.translate([0, -15.0 / 60])
            }
        }
        if (this.jumping) {
            // I have decided to perform this operation in units of frames instead of seconds to ensure
            // that the jump height is consistent. It makes geometry generator calculations easier too
            this.jumpTime -= 0.016;
            let t = Math.max(0, this.jumpTime / 0.4);
            this.inputVelocity[1] = t * sceneAttributes.playerJump;
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
            let skidThresh = sceneAttributes.playerSpeed / 4
            if (this.isGrounded && (
                (this.aPressed && this.getVelocity()[0] > skidThresh) ||
                (this.dPressed && this.getVelocity()[0] < -skidThresh))
            ) {
                let poff1 = new Particle(
                    spriteCoordinates.SPRITE_POFF,
                    vec2.fromValues(this.getPosition()[0], this.getPosition()[1] - 0.5),
                    0.25
                );
                poff1.scale(0.5)
                poff1.setMovement((time: number) => {
                    poff1.scale(1.03)
                    return vec2.fromValues(0, time * time * 10);
                })
                let poff2 = new Particle(
                    spriteCoordinates.SPRITE_POFF,
                    vec2.fromValues(this.getPosition()[0], this.getPosition()[1] - 0.5),
                    0.25
                );
                poff2.scale(0.5)
                poff2.setMovement((time: number) => {
                    poff2.scale(1.03)
                    return vec2.fromValues(0, time * time * 5);
                })
            }
        }
        else {
            this.walkFrame = 0;
        };

        if (this.getPosition()[1] < sceneAttributes.deathHeight) {
            this.onDeath();
        }

        if (!this.isGrounded || this.sPressed || this.moving) {
            this.idleTime = 0;
        }
        else {
            this.idleTime += delta;
        }

        if (this.idleTime > 20) {
            if (this.zTime > 2) {
                let z: Particle = new Particle(
                    spriteCoordinates.SPRITE_Z,
                    vec2.fromValues(this.getPosition()[0], this.getPosition()[1]),
                    3.5
                )
                z.setMovement((time: number) => {
                    if (time > 1) {
                        z.scale(0.99);
                    }
                    return vec2.fromValues(time, Math.sin(time * 3) * 0.3 + time);
                })
                this.zTime = 0;
            }
            this.zTime += delta;
        }
        else {
            this.zTime = 0;
        }
    }

    onGrounded(verticalVelocity: number) {
        if (verticalVelocity < -40) {
            let thisPos = this.getPosition();
            let poff1: Particle = new Particle(
                spriteCoordinates.SPRITE_POFF,
                vec2.fromValues(thisPos[0], thisPos[1] - 0.5),
            3);
            poff1.setMovement((time: number) => {
                poff1.scale(1 - time / 3);
                return vec2.fromValues(4 * time, 5 * time * time);
            })
            let poff2: Particle = new Particle(
                spriteCoordinates.SPRITE_POFF,
                vec2.fromValues(thisPos[0], thisPos[1] - 0.5),
            3);
            poff2.setMovement((time: number) => {
                poff2.scale(1 - time / 3);
                return vec2.fromValues(-4 * time, 5 * time * time);
            })
        }
    }

    onKeyPress(key: string) {
        if (this.dead || this.win) {
            return;
        }
        let playerMovement = this.isGrounded ? sceneAttributes.playerSpeed : sceneAttributes.playerSpeed;
        if (key === "a" || key === "ArrowLeft") {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(-playerMovement, 0));
            this.direction = -1;
            this.moving = true;
        }
        else if (key === "d" || key === "ArrowRight") {
            vec2.add(this.inputVelocity, this.inputVelocity, vec2.fromValues(playerMovement, 0));
            this.direction = 1;
            this.moving = true;
        }
    }

    onKeyDown(key: string) {
        if (this.dead || this.win) {
            return;
        }
        if ((key === 'w' || key === " " || key === "ArrowUp") && this.isGrounded) {
            this.jumping = true;
            this.jumpTime = sceneAttributes.maxJumpHold;
            this.groundedImmunity = true;
        }
        else if (key === 'a' || key === "ArrowLeft") {
            this.aPressed = true;
        }
        else if (key === 'd' || key === "ArrowRight") {
            this.dPressed = true;
        }
        else if (key === 's' || key === "ArrowDown") {
            this.sPressed = true;
        }
    }

    onKeyUp(key: string) {
        if (key === 'w' || key === " " || key === "ArrowUp") {
            this.jumping = false;
            this.jumpTime = 0;
        }
        else if (key === 'a' || key === "ArrowLeft") {
            this.aPressed = false;
        }
        else if (key === 'd' || key === "ArrowRight") {
            this.dPressed = false;
        }
        else if (key === 's' || key === "ArrowDown") {
            this.sPressed = false;
        }
    }

    onCollision(other: GameObject) {
        if (other.constructor.name === "Coin") {
            for (let i = 0; i < 8; i++) {
                let angle = i * Math.PI * 2 / 8;
                let direction = vec2.fromValues(Math.cos(angle), Math.sin(angle));
                let sparkle = new Particle(
                    spriteCoordinates.SPRITE_SPARKLE,
                    vec2.add(vec2.create(), other.getPosition(), vec2.scale(vec2.create(), direction, 0.3)),
                    0.2
                );
                sparkle.setSize(0.5);
                sparkle.setMovement((time: number) => {
                    return vec2.scale(vec2.create(), direction, time * 2);
                })
            }
            other.destroy();
        }
        else if (other.constructor.name === "Spike" || other.constructor.name === "Baddie") {
            this.dead = true;
        }
        else if (other.constructor.name === "Checkpoint") {
            vec2.copy(this.startPos, other.getPosition());
        }
        else if (other.constructor.name === "Gem") {
            this.win = true;
        }
    }

    onDeath() {
        this.setPosition(this.startPos);
        this.dead = false;
        this.dynamic = true;
        this.deathTimer = 0;
    }

    getSpriteUv() {
        if (this.dead) {
            return spriteCoordinates.SPRITE_PLAYER_DEATH;
        }
        if (!this.isGrounded) {
            return spriteCoordinates.SPRITE_PLAYER_JUMP;
        }
        else if (this.moving) {
            return this.walkFrame % WALK_CYCLE_LENGTH < WALK_CYCLE_LENGTH / 2 ?
                spriteCoordinates.SPRITE_PLAYER_WALK_1 : 
                spriteCoordinates.SPRITE_PLAYER_WALK_2;
        }
        else if (this.sPressed) {
            return spriteCoordinates.SPRITE_PLAYER_CROUCH;
        }
        else if (this.idleTime >= 20) {
            return spriteCoordinates.SPRITE_PLAYER_IDLE2;
        }
        else if (this.idleTime >= 10) {
            return spriteCoordinates.SPRITE_PLAYER_IDLE1;
        }
        return spriteCoordinates.SPRITE_PLAYER_STAND;
    }
}

export default Player;