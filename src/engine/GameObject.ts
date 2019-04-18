import {vec2} from 'gl-matrix';
import Drawable from './../rendering/gl/Drawable';
import GameEngine from './GameEngine';
import Terrain from '../scene/Terrain';
import sceneAttributes from '../scene/SceneAttributes';

abstract class GameObject {
    private drawable: Drawable;
    private position: vec2;
    private velocity: vec2;
    protected inputVelocity: vec2;
    private passive: boolean;
    private dynamic: boolean;
    private grounded: boolean;
    protected direction: number;
    protected get isGrounded() : boolean {
        return this.grounded;
    }

    constructor(isDynamic: boolean) {
        this.dynamic = isDynamic;
        this.passive = false;
        this.position = vec2.fromValues(0, 0);
        this.velocity = vec2.fromValues(0, 0);
        this.inputVelocity = vec2.fromValues(0, 0);
        this.direction = 1;

        GameEngine.getEngine().addGameObject(this);
    }

    destroy(): void {
        GameEngine.getEngine().destroyGameObject(this);
        this.drawable = null;
    }

    isPassive(): boolean {
        return this.passive;
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

    abstract getSpriteUv(): vec2;

    translate(amount: vec2): void {
        vec2.add(this.position, this.position, amount);
    }

    getVelocity(): vec2 {
        return vec2.fromValues(this.velocity[0], this.velocity[1]);
    }

    physicsUpdate(delta: number): void {
        if (!this.dynamic) {
            return;
        }

        let prevVelocity: vec2 = this.velocity;
        this.velocity = vec2.fromValues(0, 0);

        // Apply gravity
        if (!this.grounded) {
            this.velocity[1] = prevVelocity[1] - sceneAttributes.gravity;
        }

        // Apply non-physical motion
        vec2.add(this.velocity, this.velocity, this.inputVelocity);

        // Scale back velocity if it's too high
        let speed: number = this.velocity.length;
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
        let deltaPos: vec2 = vec2.scale(vec2.create(), this.velocity, delta);
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
            }
        }

        this.grounded = this.checkIfGrounded();
        this.inputVelocity = vec2.fromValues(0, 0);
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
        let yIntersect: boolean = pY < (tY + 1) && tY < (pY + 2);
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
        return false;
    }

    onUpdate(delta: number): void {/* Please implement me*/};

    onKeyPress(key: string): void {/* Or don't */};

    onKeyDown(key: string): void {/* I don't really care too much at this point */};

    onKeyUp(key: string): void {/* I'm just holding out til graduation at this point */}
}

export default GameObject;