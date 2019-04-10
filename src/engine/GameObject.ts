import {vec2} from 'gl-matrix';
import Drawable from './../rendering/gl/Drawable';

abstract class GameObject {
    private drawable: Drawable;
    private position: vec2;
    private velocity: vec2;
    private passive: boolean;

    private static gameObjects: GameObject[];

    constructor(_drawable: Drawable = null) {
        this.drawable = _drawable;
        GameObject.gameObjects.push(this);
    }

    destroy(): void {
        GameObject.gameObjects.splice(GameObject.gameObjects.indexOf(this), 1);
        this.drawable = null;
    }

    isPassive(): boolean {
        return this.passive;
    }

    getPosition(): vec2 {
        return vec2.fromValues(this.position[0], this.position[1]);
    }

    setPosition(newPosition: vec2): void {
        this.position[0] = newPosition[0];
        this.position[1] = newPosition[1];
    }

    translate(amount: vec2): void {
        vec2.add(this.position, this.position, amount);
    }

    getVelocity(): vec2 {
        return vec2.fromValues(this.velocity[0], this.velocity[1]);
    }

    abstract update(delta: number): void;
}

export default GameObject;