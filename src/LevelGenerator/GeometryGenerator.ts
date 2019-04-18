import {vec2} from 'gl-matrix';
import RhythmGroupGenerator from './RhythmGroupGenerator'
import RhythmGroup, {Action, Verb, JumpType} from './RhythmGroup';
import sceneAttributes from '../scene/SceneAttributes';
import Terrain from '../scene/Terrain';

export default class GeometryGenerator {

    terrain: Terrain;
    currentPos: vec2;

    constructor(_terrain: Terrain) {
        this.terrain = _terrain;
        this.currentPos = vec2.fromValues(-3, -1);
    }

    private queuesFromRhythm(rhythm: RhythmGroup): object {
        let movement: object[] = [];
        let jumps = [];
        let lastMoveStartTime: number = 0;
        let lastMoveDuration: number = 0;
        for (let action of rhythm.actions) {
            if (action.type === Verb.MOVE) {
                if (movement.length > 0) {
                    let curMoveStartTime = action.startTime;
                    let lastMove = movement[movement.length - 1];
                    movement.push({
                        state: "waiting",
                        duration: curMoveStartTime - (lastMoveStartTime + lastMoveDuration)
                    });
                }
                lastMoveDuration = action.duration;
                movement.push({
                    state: "moving",
                    duration: action.duration
                })
            }
            else if (action.type === Verb.JUMP) {
                jumps.push({
                    startTime: action.startTime,
                    jumpHold: action.duration,
                });
            }
        }
        return {moveStates: movement, jumpStates: jumps};
    }

    generateGroupGeometry(rhythm: RhythmGroup) {
        let playerSpeed = sceneAttributes.playerSpeed;
        let queues = this.queuesFromRhythm(rhythm);
    }


    generateRestArea(length: number) {
        for (let i = 0; i < length; i++) {
            this.terrain.setTileAt(this.currentPos[0] + i, this.currentPos[1]);
            this.terrain.setTileAt(this.currentPos[0] + i, this.currentPos[1] - 1);
        }
        this.currentPos[0] += length + 2;
    }
}