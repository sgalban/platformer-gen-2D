import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';
import Particle from './Particle';
import {spriteCoordinates} from '../constants';

const ANIMATION_FRAME_LENGTH: number = 10;

function random1(p: vec2, seed: vec2) : number {
    let fract = (n: number) => n - Math.floor(n);
    return fract(Math.sin(vec2.dot(
        vec2.add(vec2.create(), p, seed),
        vec2.fromValues(127.1, 311.7))
    ) * 41352.5245);
} 

class Checkpoint extends GameObject {

    animationFrame: number;
    claimed: boolean;

    constructor(pos: vec2 | number[]) {
        super(false, false, true);
        this.animationFrame = 0;
        this.setPosition(pos);
        this.claimed = false;
    }

    onUpdate(delta: number) {
        this.animationFrame = (this.animationFrame + 1) % (ANIMATION_FRAME_LENGTH * 3);
    }

    onCollision(other: GameObject) {
        if (other.constructor.name === "Player" && !this.claimed) {
            this.claimed = true;
            let numParticles = 30;
            for (let i = 0; i < numParticles; i++) {
                let p = new Particle(
                    spriteCoordinates.SPRITE_SPARKLE,
                    this.getPosition(),
                    1
                );
                p.setMovement((time: number) => {
                    let angle = 2 * Math.floor(i / 2) * Math.PI / numParticles;
                    let offset = random1(vec2.fromValues(i, 0), vec2.fromValues(0.231, 0.5436)) * 0.5;
                    p.setSize(1 - time);
                    return vec2.fromValues(
                        Math.cos(angle) * time * 8 + offset,
                        Math.sin(angle) * time * 8 + offset - time * time * 10
                    );
                })
            }
        }
    }

    getSpriteUv(): vec2 {
        if (this.claimed) {
            if (this.animationFrame < 1 * ANIMATION_FRAME_LENGTH) {
                return spriteCoordinates.SPRITE_CHECK_1;
            }
            else if (this.animationFrame < 2 * ANIMATION_FRAME_LENGTH) {
                return spriteCoordinates.SPRITE_CHECK_2;
            }
            else {
                return spriteCoordinates.SPRITE_CHECK_3;
            }
        }
        else {
            if (this.animationFrame < 1 * ANIMATION_FRAME_LENGTH) {
                return spriteCoordinates.SPRITE_FLAG_1;
            }
            else if (this.animationFrame < 2 * ANIMATION_FRAME_LENGTH) {
                return spriteCoordinates.SPRITE_FLAG_2;
            }
            else {
                return spriteCoordinates.SPRITE_FLAG_3;
            }
        }
    }
}

export default Checkpoint;