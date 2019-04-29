import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';

// This was a failed experiment. Please ignore any mention of this class in the codebase

export default class Platform extends GameObject {

    spriteUv: vec2;
    startPos: vec2;
    time: number;
    movement: (time: number) => vec2;

    constructor(spriteUv: vec2|number[], startPos: vec2|number[]) {
        super(false, false, true);
        this.spriteUv = vec2.fromValues(spriteUv[0], spriteUv[1]);
        this.startPos = vec2.fromValues(startPos[0], startPos[1]);
        this.setPosition(this.startPos);
        this.movement = (time: number) => vec2.create();
        this.time = 0;
    }

    onUpdate(delta: number) {
        this.time += delta;
        this.setPosition(vec2.add(vec2.create(), this.movement(this.time), this.startPos));
    }

    setMovement(m: (time: number) => vec2) {
        this.movement = m;
    }

    getSpriteUv() {
        return this.spriteUv;
    }
}