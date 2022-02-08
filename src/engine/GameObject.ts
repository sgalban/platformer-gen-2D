import {vec2} from 'gl-matrix';
import Drawable from './../rendering/gl/Drawable';
import GameEngine from './GameEngine';
import Terrain from '../scene/Terrain';
import sceneAttributes from '../scene/SceneAttributes';

abstract class GameObject {
    private drawable: Drawable;
    private position: vec2;
    private velocity: vec2;
    public size: number;
    protected inputVelocity: vec2;
    protected prevInputVelocty: vec2;
    protected passive: boolean;
    protected collidable: boolean;
    protected dynamic: boolean;
    protected grounded: boolean;
    protected direction: number;
    protected goCollide: boolean;
    get isGrounded() : boolean {
        return this.grounded;
    }

    constructor(isDynamic: boolean, isPassive: boolean, isCollidable: boolean) {
        this.dynamic = isDynamic;
        this.passive = isPassive;
        this.collidable = isCollidable;
        this.position = vec2.fromValues(0, 0);
        this.velocity = vec2.fromValues(0, 0);
        this.inputVelocity = vec2.fromValues(0, 0);
        this.prevInputVelocty = vec2.fromValues(0, 0);
        this.direction = 1;
        this.size = 1;

        GameEngine.getEngine().addGameObject(this);
    }

    destroy(): void {
        GameEngine.getEngine().destroyGameObject(this);
        this.drawable = null;
    }

    isPassive(): boolean {
        return this.passive;
    }

    isCollidable(): boolean {
        return this.collidable;
    }

    facingLeft(): boolean {
        return this.direction === -1;
    }

    getPosition(): vec2 {
        return vec2.fromValues(this.position[0], this.position[1]);
    }

    setPosition(newPosition: vec2 | number[]): void {
        this.position[0] = newPosition[0];
        this.position[1] = newPosition[1];
    }

    scale(amount: number) {
        this.size *= amount;
    }

    setSize(size: number) {
        this.size = size;
    }

    abstract getSpriteUv(): vec2;

    translate(amount: vec2 | number[]): void {
        vec2.add(this.position, this.position, vec2.fromValues(amount[0], amount[1]));
    }

    getVelocity(): vec2 {
        return vec2.fromValues(this.velocity[0], this.velocity[1]);
    }

    physicsUpdate(delta: number): void {
        if (!this.dynamic) {
            return;
        }

        let prevVelocity: vec2 = this.velocity;
        //this.velocity = vec2.fromValues(0, 0);

        // Apply gravity
        if (this.grounded) {
            this.velocity[1] = 0;
        }
        else {
            this.velocity[1] -= sceneAttributes.gravity;
        }

        // Apply non-physical motion
        if (Math.abs(this.inputVelocity[0]) > 0.001) {
            let influence = this.grounded ? 0.2 : 0.11;
            this.velocity[0] = (1 - influence) * this.velocity[0] + influence * this.inputVelocity[0];
        }
        else if (this.grounded) {
            this.velocity[0] *= 0.7;
        }
        else {
            this.velocity[0] *= 0.95;
        }
        this.velocity[1] += this.inputVelocity[1];
        // Scale back velocity if it's too high
        let speed: number = vec2.length(this.velocity);
        if (speed > sceneAttributes.maxObjectSpeed) {
            vec2.scale(this.velocity, this.velocity, sceneAttributes.maxObjectSpeed / speed);
        }

        // Update the object position, accounting for collisions
        // We assume that before applying any motion this frame, the object is not intersecting anything
        // We will use the following technique to do this:
        //   - Apply the velocity vector to our position in the x axis only
        //   - Check if, in this new position, the object intersects with the terrain (in all axes)
        //   - If the object is now intersecting with a tile, we respond by pushing back the object by
        //     the amount of the overlap
        //     - Note that this pushback will only have to be in the x axis
        //   - Repeat with the y-axis
        let deltaPos: vec2 = vec2.scale(vec2.create(), this.velocity, 1.0 / 60);
        this.goCollide = false;
        for (let axis = 0; axis < 2; axis++) {
            if (Math.abs(deltaPos[axis]) > 10e-6) {
                this.position[axis] += deltaPos[axis];
                let adjacentTiles: number[][] = this.getAdjacentTiles();
                for (let tile of adjacentTiles) {
                    for (let terrain of GameEngine.getEngine().terrainObjects) {
                        let response: vec2 = this.testTerrainCollision(terrain, tile, axis);
                        vec2.add(this.position, this.position, response)
                    }
                }
                for (let go of GameEngine.getEngine().getCollidableObjects()) {
                    if (go.constructor.name === "Platform") {
                        let response: vec2 = this.goCollisionResponse(go, axis);
                        if (response[1] > 0.0001) {
                            this.goCollide = true;
                        }
                        vec2.add(this.position, this.position, response);
                    }
                }
            }
        }

        let groundedCheck = this.checkIfGrounded();
        if (!this.grounded && groundedCheck) {
            this.onGrounded(this.velocity[1]);
        }
        this.grounded = groundedCheck;
        vec2.copy(this.prevInputVelocty, this.inputVelocity);
        this.inputVelocity = vec2.fromValues(0, 0);
    }

    checkObjectCollisions(other: GameObject) {
        if (this.testGameObjectCollision(other)) {
            this.onCollision(other);
        }
    }

    private getAdjacentTiles(): number[][] {
        let x = Math.floor(this.position[0]);
        let y = Math.floor(this.position[1]);
        return [
            [x - 1, y + 1], [x + 0, y + 1], [x + 1, y + 1],
            [x - 1, y + 0], [x + 0, y + 0], [x + 1, y + 0],
            [x - 1, y - 1], [x + 0, y - 1], [x + 1, y - 1]
        ];
    }

    private testTerrainCollision(terrain: Terrain, tile: vec2 | number[], axis: number): vec2 {
        let tX = tile[0];
        let tY = tile[1];
        let pX = this.position[0];
        let pY = this.position[1];

        if (!terrain.tileAt(tX, tY)) {
            return vec2.create();
        }
        
        let xIntersect: boolean = pX < (tX + 1) && tX < (pX + 1);
        let yIntersect: boolean = pY < (tY + 1) && tY < (pY + 1);
        let isIntersecting: boolean = xIntersect && yIntersect;

        let axisVelocity: number = this.velocity[axis];
        if (isIntersecting) {
            let pushback: vec2 = vec2.create();
            if (axisVelocity > 0) {
                let isY = (axis == 1) ? 0 : 0;
                pushback[axis] = tile[axis] - (this.position[axis] + 1 + isY);
            }
            else {
                pushback[axis] = (tile[axis] + 1) - this.position[axis];
            }
            return pushback;
        }
        else {
            return vec2.create();
        }
    }

    private testGameObjectCollision(other: GameObject): boolean {
        let tX = other.getPosition()[0];
        let tY = other.getPosition()[1];
        let pX = this.position[0];
        let pY = this.position[1];

        // Anti-frustration feature
        if (other.constructor.name === "Spike" || other.constructor.name === "Baddie") {
            tX += 0.5;
            tY += 0.5;
            let xIntersect: boolean = tX > pX && tX < pX + 1;
            let yIntersect: boolean = tY > pY && tY < pY + 1;
            return xIntersect && yIntersect;;
        }
        
        let xIntersect: boolean = pX < (tX + 0.99) && tX < (pX + 0.99);
        let yIntersect: boolean = pY < (tY + 0.99) && tY < (pY + 0.99);
        let isIntersecting: boolean = xIntersect && yIntersect;
        return isIntersecting;
    }

    private goCollisionResponse(other: GameObject, axis: number): vec2 {
        let tX = other.position[0];
        let tY = other.position[1];
        let pX = this.position[0];
        let pY = this.position[1];

        if (other.passive || !other.collidable) {
            return vec2.create();
        }
        
        let xIntersect: boolean = pX < (tX + 1) && tX < (pX + 1);
        let yIntersect: boolean = pY < (tY + 1) && tY < (pY + 1);
        let isIntersecting: boolean = xIntersect && yIntersect;

        let axisVelocity: number = this.velocity[axis];
        if (isIntersecting) {
            let pushback: vec2 = vec2.create();
            if (axisVelocity > 0) {
                let isY = (axis == 1) ? 0 : 0;
                pushback[axis] = other.position[axis] - (this.position[axis] + 1 + isY);
            }
            else {
                pushback[axis] = (other.position[axis] + 1) - this.position[axis];
            }
            return pushback;
        }
        else {
            return vec2.create();
        }
    }

    private checkIfGrounded(): boolean {

        // Check if we would be colliding with a block if we were just a teensy bit lower
        let newPos: vec2 = vec2.subtract(vec2.create(), this.position, vec2.fromValues(0, 0.05));
        let gridPosition: vec2 = vec2.fromValues(
            Math.floor(newPos[0]),
            Math.floor(newPos[1])
        );

        for (let x = 0; x < 2; x++) {
            let tX = gridPosition[0] + x;
            let tY = gridPosition[1];
            let existsTile = false;
            for (let terrain of GameEngine.getEngine().terrainObjects) {
                if (terrain.tileAt(tX, tY)) {
                    existsTile = true;
                    break;
                }
            }
            if (!existsTile) {
                continue;
            }
            if (newPos[0] < (tX + 1) && tX < (newPos[0] + 1) &&
                newPos[1] < (tY + 1) && tY < (newPos[1] + 1))
            {
                return true;
            }
        }

        let oldPos = [this.position[0], this.position[1]];
        this.setPosition(newPos);
        for (let go of GameEngine.getEngine().getCollidableObjects()) {
            if (go.constructor.name === "Platform" && this.testGameObjectCollision(go)) {
                this.setPosition(oldPos);
                return true;
            }
        }
        this.setPosition(oldPos);
        return false;
    }

    onUpdate(delta: number): void {/* Please implement me*/};

    onKeyPress(key: string): void {/* Or don't */};

    onKeyDown(key: string): void {/* I don't really care too much at this point */};

    onKeyUp(key: string): void {/* I'm just holding out til graduation at this point */}

    protected onGrounded(verticalVelocity: number): void {}

    protected onCollision(other: GameObject): void {}

}

export default GameObject;