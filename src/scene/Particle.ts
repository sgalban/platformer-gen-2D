import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';

export default class Particle extends GameObject {

    private spriteUv: vec2;
    private lifetime: number;
    private time: number;
    private movement: (t: number) => vec2;
    private startingPos: vec2;


    constructor (_spriteUv: vec2, _startingPos: vec2, _lifetime: number = Infinity) {
        super(false, true, false);
        this.spriteUv = _spriteUv;
        this.lifetime = _lifetime;
        this.time = 0;
        this.startingPos = _startingPos;
        this.movement = () => vec2.create();;
    }

    setMovement(move: (time: number) => vec2) {
        this.movement = move;
    }

    onUpdate (delta: number) {
        this.time += delta;
        if (this.time > this.lifetime) {
            this.destroy();
        }
        this.setPosition(vec2.add(vec2.create(), this.movement(this.time), this.startingPos));
    }

    getSpriteUv() {
        return this.spriteUv;
    }

}