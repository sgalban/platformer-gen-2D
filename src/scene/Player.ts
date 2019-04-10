import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';

class Player extends GameObject {

    playerVelocity: vec2;

    constructor() {
        super();
        this.playerVelocity = vec2.fromValues(0, 0);
    }

    onUpdate(delta: number) {
        this.translate(vec2.scale(this.playerVelocity, this.playerVelocity, delta * 4));
        this.playerVelocity = vec2.fromValues(0, 0);
    }

    onKeyPress(key: string) {
        if (key === "w") {
            vec2.add(this.playerVelocity, this.playerVelocity, vec2.fromValues(0, 1));
        }
        else if (key === "a") {
            vec2.add(this.playerVelocity, this.playerVelocity, vec2.fromValues(-1, 0));
        }
        else if (key === "s") {
            vec2.add(this.playerVelocity, this.playerVelocity, vec2.fromValues(0, -1));
        }
        else if (key === "d") {
            vec2.add(this.playerVelocity, this.playerVelocity, vec2.fromValues(1, 0));
        }
    }
}

export default Player;