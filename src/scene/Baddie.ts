import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from './SceneAttributes';
import Particle from './Particle';
import {spriteCoordinates} from '../constants';
import Terrain from './Terrain';

const ANIMATION_FRAME_LENGTH: number = 12;
const ENEMY_SPEED: number = 4;

class Baddie extends GameObject {
    animationFrame: number;
    terrain: Terrain;

    constructor(pos: vec2 | number[], terrain: Terrain) {
        super(false, false, true);
        this.animationFrame = 0;
        this.setPosition(pos);
        this.direction = 1;
        this.terrain = terrain;
    }

    onUpdate(delta: number) {
        this.animationFrame = (this.animationFrame + 1) % ANIMATION_FRAME_LENGTH;
        let tileBelow = [this.getPosition()[0] + 0.01 * this.direction, this.getPosition()[1] - 0.01];
        let tileInFront = [this.getPosition()[0] + 0.01 * this.direction, this.getPosition()[1]];
        if (this.direction === 1) {
            tileInFront[0] += 1;
            tileBelow[0] += 1;
        }

        if (
            this.terrain.tileAt(tileInFront[0], tileInFront[1]) ||
            !this.terrain.tileAt(tileBelow[0], tileBelow[1])
        ) {
            this.direction *= -1;
        }
        this.translate([ENEMY_SPEED * 1.0 / 60 * this.direction, 0]);
    }

    getSpriteUv() {
        return this.animationFrame > ANIMATION_FRAME_LENGTH / 2 ? 
            spriteCoordinates.SPRITE_BADDIE_1:
            spriteCoordinates.SPRITE_BADDIE_2;
    }
}

export default Baddie;