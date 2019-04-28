import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';
import Particle from './Particle';
import {spriteCoordinates} from '../constants';

const ANIMATION_FRAME_LENGTH: number = 5;

class Coin extends GameObject {

    animationFrame: number;

    constructor(pos: vec2 | number[]) {
        super(false, true, true);
        this.animationFrame = 0;
        this.setPosition(pos);
        this.direction = 1;
    }

    onUpdate(delta: number) {
        this.animationFrame = (this.animationFrame + 1) % (ANIMATION_FRAME_LENGTH * 8);
        if (Math.random() < 0.01) {
            let sparkle = new Particle(
                spriteCoordinates.SPRITE_SPARKLE,
                vec2.fromValues(
                    this.getPosition()[0] + Math.random() - 0.5,
                    this.getPosition()[1] + Math.random() - 0.5,
                ),
                0.5
            );
            sparkle.setMovement((time: number) => {
                sparkle.setSize(time * (0.5 - time) * 8);
                return vec2.create();
            });
        }
    }

    getSpriteUv(): vec2 {
        if (this.animationFrame < ANIMATION_FRAME_LENGTH * 1) {
            return spriteCoordinates.SPRITE_COIN_1
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 2) {
            return spriteCoordinates.SPRITE_COIN_2;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 3) {
            return spriteCoordinates.SPRITE_COIN_3;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 4) {
            return spriteCoordinates.SPRITE_COIN_4;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 5) {
            //this.direction = this.direction = -1;
            return spriteCoordinates.SPRITE_COIN_5;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 6) {
            return spriteCoordinates.SPRITE_COIN_4;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 7) {
            return spriteCoordinates.SPRITE_COIN_3;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 8) {
            return spriteCoordinates.SPRITE_COIN_2;
        }

    }
}

export default Coin;