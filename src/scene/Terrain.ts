import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';

class Terrain {

    tiles: Map<number, Set<number>>;

    constructor() {
        this.tiles = new Map();
    }

    tileAt(x: number, y: number): boolean {
        x = Math.floor(x);
        y = Math.floor(y);
        if (this.tiles.has(x)) {
            return this.tiles.get(x).has(y);
        }
        return false;
    }

    setTileAt(x: number, y: number) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (this.tiles.has(x)) {
            this.tiles.get(x).add(y);
        }
        else {
            this.tiles.set(x, new Set([y]));
        }
    }

    getSpritePosition(x: number, y: number): vec2 {
        x = Math.floor(x);
        y = Math.floor(y);
        let tl = this.tileAt(x - 1, y + 1);
        let tc = this.tileAt(x + 0, y + 1);
        let tr = this.tileAt(x + 1, y + 1);
        let cl = this.tileAt(x - 1, y + 0);
        let cr = this.tileAt(x + 1, y + 0);
        let bl = this.tileAt(x - 1, y - 1);
        let bc = this.tileAt(x + 0, y - 1);
        let br = this.tileAt(x + 1, y - 1);

        if (!tc && cl && cr) {
            return vec2.fromValues(1, 0);
        }
        else if (!bc && cl && cr) {
            return vec2.fromValues(1, 2);
        }
        else if (!cr && tc && bc) {
            return vec2.fromValues(2, 1);
        }
        else if (!cl && tc && bc) {
            return vec2.fromValues(0, 1);
        }
        else if (!tl && !tc && !cl) {
            return vec2.fromValues(0, 0);
        }
        else if (!tr && !tc && !cr) {
            return vec2.fromValues(2, 0);
        }
        else if (!br && !bc && !cr) {
            return vec2.fromValues(2, 2);
        }
        else if (!bl && !bc && !cl) {
            return vec2.fromValues(0, 2);
        }
        else {
            return vec2.fromValues(1, 1);
        }
    }
}

export default Terrain;