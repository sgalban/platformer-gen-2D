import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';
import Particle from './Particle';
import {spriteCoordinates} from '../constants';

class Spike extends GameObject {

    constructor(pos: vec2 | number[]) {
        super(false, true, true);
        this.setPosition(pos);
    }

    getSpriteUv() {
        return spriteCoordinates.SPRITE_SPIKE;
    }
}

export default Spike