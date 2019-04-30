import {vec2} from 'gl-matrix';
import RhythmGroup from './RhythmGroup';
import RhythmGroupGenerator from './RhythmGroupGenerator';
import GeometryGenerator from './GeometryGenerator';
import Terrain from '../scene/Terrain';
import Coin from '../scene/Coin';
import Spike from '../scene/Spike';
import Baddie from '../scene/Baddie';

export default class LevelGenerator {
    
    totalGroups: number;
    terrain: Terrain
    groupGenerator: RhythmGroupGenerator;
    geometryGenerator: GeometryGenerator;
    rhythmGroups: RhythmGroup[];

    constructor(
        _totalGroups: number,
        _terrain: Terrain,
        minGroupDuration: number,
        maxGroupDuration: number,
        density: number,
        jumpFrequency: number,
        beatFrequencies: number[]
    ) {
        this.totalGroups = _totalGroups;
        this.terrain = _terrain;
        this.rhythmGroups = [];

        // Create the rhythm generator
        this.groupGenerator = new RhythmGroupGenerator(
            minGroupDuration,
            maxGroupDuration,
            density,
            jumpFrequency,
            beatFrequencies
        );

        // Create the geometry generator
        this.geometryGenerator = new GeometryGenerator(this.terrain);
    }

    generateRhythms() {
        for (let i = 0; i < this.totalGroups; i++) {
            this.rhythmGroups.push(this.groupGenerator.generateRhythmGroup());
        }
    }

    generateGeometry(): Set<vec2|number[]> {
        this.geometryGenerator.generateStartArea();
        for (let i = 0; i < this.rhythmGroups.length; i++) {
            let group = this.rhythmGroups[i];
            this.geometryGenerator.generateGroupGeometry(group);
            this.geometryGenerator.generateRestArea(14, i == this.rhythmGroups.length - 1);
        }
        return this.geometryGenerator.topTiles;
    }

    addCoins(topTiles: Set<vec2|number[]>) {
        let topTileCopy = new Map<string, number[]>();
        for (let tt of topTiles) {
            let tile = [tt[0], tt[1]];
            topTileCopy.set(tile.toString(), tile);
        }
        let platforms = [];
        let leftmost = -1;
        let rightmost = -1;
        while (topTileCopy.size > 0) {
            let curPlatform: number[][] = [];
            let curTile = topTileCopy.values().next().value;
            let curKey = curTile.toString();
            curPlatform.push(curTile);
            leftmost = curTile[0];
            rightmost = curTile[0];
            topTileCopy.delete(curKey);
            while (topTileCopy.has([leftmost - 1, curTile[1]].toString())) {
                let leftTile = [leftmost - 1, curTile[1]];
                curPlatform.push(leftTile)
                topTileCopy.delete(leftTile.toString());
                leftmost--;
            }
            while (topTileCopy.has([rightmost + 1, curTile[1]].toString())) {
                let rightTile = [rightmost + 1, curTile[1]];
                curPlatform.push(rightTile)
                topTileCopy.delete(rightTile.toString());
                rightmost++;
            }
            platforms.push(curPlatform);
        }

        let firstPlatform = true;
        for (let platform of platforms) {
            if (Math.random() < 0.25) {
                for (let tile of platform) {
                    new Coin([tile[0], tile[1] + 1]);
                }
            }
            else if (
                platform.length >= 3 &&
                Math.random() < 0.2 &&
                !firstPlatform &&
                !this.geometryGenerator.isRestTile(platform[0])
            ) {
                let pos = platform[Math.floor(Math.random() * platform.length)];
                new Baddie([pos[0], pos[1] + 1], this.terrain);
            }
            firstPlatform = false;
        }
    }
}