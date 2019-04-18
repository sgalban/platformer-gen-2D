import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from '../scene/SceneAttributes';

class Terrain {

    tiles: Map<number, Set<number>>;

    constructor() {
        this.tiles = new Map();
    }

    static makeTestTerrain(): Terrain {
        let terrain: Terrain = new Terrain();
        for (let i = -2; i < 15; i++) {
            if (i < 4 || i > 7) {
                terrain.setTileAt(i, -3);
                terrain.setTileAt(i, -4);
            }
            if (i > 9) {
                terrain.setTileAt(i, -2);
            }
            if (i > 11) {
                terrain.setTileAt(i, -1);
                terrain.setTileAt(i, 0);
            }
        }

        terrain.setTileAt(18, 0);
        terrain.setTileAt(23, 2);
        return terrain;
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

    setColumnAt(x: number, y: number) {
        for (let i = sceneAttributes.deathHeight - 1; i <= y; i++) {
            this.setTileAt(x, i);
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

        if (!cr && !cl && !tc && !bc) {
            return vec2.fromValues(4, 0);
        }
        else if (!tc && cl && cr) {
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
        else if (!tl && tc && cl && bc && cr) {
            return vec2.fromValues(3, 0);
        }
        else if (!tr && tc && cl && bc && cr) {
            return vec2.fromValues(3, 1);
        }
        else {
            return vec2.fromValues(1, 1);
        }
    }
}

export default Terrain;