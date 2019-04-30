import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import GameEngine from '../engine/GameEngine';
import sceneAttributes from './SceneAttributes';
import Particle from './Particle';
import {spriteCoordinates} from '../constants';

export default class Gem extends GameObject {

    constructor(pos: vec2 | number[]) {
        super(false, false, true);
        this.setPosition(pos);
    }

    getSpriteUv(): vec2 {
        return spriteCoordinates.SPRITE_GEM;
    }

    onUpdate(delta: number) {
        if (Math.random() < 0.02) {
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

    onCollision(other: GameObject) {
        if (other.constructor.name === "Player") {
            GameEngine.getEngine().onWin();
            this.destroy();
        }
    }

}