import {vec2, vec3} from 'gl-matrix';
import GameObject from '../engine/GameObject';
import sceneAttributes from '../scene/SceneAttributes';
import {spriteCoordinates} from '../constants';

function random1(p: vec2, seed: vec2) : number {
    let fract = (n: number) => n - Math.floor(n);
    return fract(Math.sin(vec2.dot(
        vec2.add(vec2.create(), p, seed),
        vec2.fromValues(127.1, 311.7))
    ) * 41352.5245);
} 

class Terrain {

    tiles: Map<number, Set<number>>;
    randomOffset: number;

    constructor() {
        this.tiles = new Map();
        this.randomOffset = Math.random();
    }

    static makeTestTerrain(): Terrain {
        let terrain: Terrain = new Terrain();
        for (let i = -2; i < 15; i++) {
            if (i < 4 || i > 7) {
                terrain.setTileAt([i, -3]);
                terrain.setTileAt([i, -4]);
            }
            if (i > 9) {
                terrain.setTileAt([i, -2]);
            }
            if (i > 11) {
                terrain.setTileAt([i, -1]);
                terrain.setTileAt([i, 0]);
            }
        }

        terrain.setTileAt([18, 0]);
        terrain.setTileAt([23, 2]);
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

    setTileAt(pos: number[] | vec2) {
        let [x, y] = pos;
        x = Math.floor(x);
        y = Math.floor(y);
        if (this.tiles.has(x)) {
            this.tiles.get(x).add(y);
        }
        else {
            this.tiles.set(x, new Set([y]));
        }
    }

    setColumnAt(pos: number[] | vec2) {
        let [x, y] = pos;
        for (let i = sceneAttributes.deathHeight - 1; i <= y; i++) {
            this.setTileAt([x, i]);
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
            return spriteCoordinates.SPRITE_TERRAIN_SINGLE;
        }
        else if (tc && !cr && !cl) {
            return spriteCoordinates.SPRITE_TERRAIN_COLUMN;
        }
        else if (!cr && !cl) {
            return spriteCoordinates.SPRITE_TERRAIN_CAP;
        }
        else if (!tc && cl && cr) {
            return spriteCoordinates.SPRITE_TERRAIN_TOP;
        }
        else if (!bc && cl && cr) {
            return spriteCoordinates.SPRITE_TERRAIN_BOTTOM;
        }
        else if (!cr && tc && bc) {
            return spriteCoordinates.SPRITE_TERRAIN_RIGHT;
        }
        else if (!cl && tc && bc) {
            return spriteCoordinates.SPRITE_TERRAIN_LEFT;
        }
        else if (!tc && !cl) {
            return spriteCoordinates.SPRITE_TERRAIN_TOP_LEFT;
        }
        else if (!tc && !cr) {
            return spriteCoordinates.SPRITE_TERRAIN_TOP_RIGHT;
        }
        else if (!br && !bc && !cr) {
            return spriteCoordinates.SPRITE_TERRAIN_BOTTOM_RIGHT;
        }
        else if (!bl && !bc && !cl) {
            return spriteCoordinates.SPRITE_TERRAIN_BOTTOM_LEFT;
        }
        else if (!tl && tc && cl && bc && cr) {
            return spriteCoordinates.SPRITE_TERRAIN_LEFT_INNER_CORNER;
        }
        else if (!tr && tc && cl && bc && cr) {
            return spriteCoordinates.SPRITE_TERRAIN_RIGHT_INNER_CORNER;
        }
        else {
            let tileRng = random1(vec2.fromValues(x, y), vec2.fromValues(0.1324, 0.4234 + this.randomOffset));
            if (tileRng < 0.05) {
                return spriteCoordinates.SPRITE_TERRAIN_MIDDLE_ALT_1;
            }
            else if (tileRng < 0.10) {
                return spriteCoordinates.SPRITE_TERRAIN_MIDDLE_ALT_2;
            }
            else if (tileRng < 0.15) {
                return spriteCoordinates.SPRITE_TERRAIN_MIDDLE_ALT_3;
            }
            else if (tileRng < 0.20) {
                return spriteCoordinates.SPRITE_TERRAIN_MIDDLE_ALT_4;
            }
            else {
                return spriteCoordinates.SPRITE_TERRAIN_MIDDLE;
            }
        }
    }
}

export default Terrain;