import RhythmGroup from './RhythmGroup';
import RhythmGroupGenerator from './RhythmGroupGenerator';
import GeometryGenerator from './GeometryGenerator';
import Terrain from '../scene/Terrain';

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

    generateGeometry() {
        this.geometryGenerator.generateRestArea(10);
        for (let group of this.rhythmGroups) {
            this.geometryGenerator.generateGroupGeometry(group);
            this.geometryGenerator.generateRestArea(6);
        }
    }
}