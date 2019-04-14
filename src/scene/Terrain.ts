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
}

export default Terrain;