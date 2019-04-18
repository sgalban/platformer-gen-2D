import {vec2} from 'gl-matrix';
import RhythmGroupGenerator from './RhythmGroupGenerator'
import RhythmGroup, {Action, Verb, JumpType} from './RhythmGroup';
import sceneAttributes from '../scene/SceneAttributes';
import Terrain from '../scene/Terrain';

type MovementState = {state: string, duration: number}
type JumpState = {startTime: number, jumpHold: number};

export default class GeometryGenerator {

    terrain: Terrain;
    currentPos: vec2;

    constructor(_terrain: Terrain) {
        this.terrain = _terrain;
        this.currentPos = vec2.fromValues(-3, -1);
    }

    private queuesFromRhythm(rhythm: RhythmGroup): {moveStates: MovementState[], jumpStates: JumpState[]} {
        let movement: MovementState[] = [];
        let jumps: JumpState[] = [];
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

    // Calculate the height of a jump when the jump button is held for a specified amount of time
    // Also find the time it takes to get to that height
    private getJumpHeight(jumpHold: number): object {
        // This is, at its core, a ballistics problem. However, it's complicated by the fact
        // that the velocity is controlled by the player even after the jump begins. This means 
        // that to find the max height, we have to separate the jump into 2 parts: the part 
        // where the jump key is being held, and the part afterward. We have to find the height
        // and upward velocity acheived at the end of the first part, and then the second part
        // just becomes a simple physics problem. Getting those vectors will rely heavily on the
        // jumping implementation though.
        let gravity = sceneAttributes.gravity;
        let jumpVel = sceneAttributes.playerJump;
        let jumpFalloff = sceneAttributes.jumpFalloff;



        return {height: 0, time: 0}
    }

    generateGroupGeometry(rhythm: RhythmGroup) {
        let playerSpeed = sceneAttributes.playerSpeed;
        let queues = this.queuesFromRhythm(rhythm);
        for (let jump of queues.jumpStates) {
            if (jump.jumpHold === JumpType.SHORT) {

                if (Math.random() < 0.5) {
                    this.currentPos[0] += 5;
                    this.terrain.setColumnAt(this.currentPos[0] - 4, this.currentPos[1]);
                    this.terrain.setColumnAt(this.currentPos[0], this.currentPos[1]);
                }
                else {
                    this.currentPos[0] += 3;
                    this.currentPos[1] += 1;
                    this.terrain.setColumnAt(this.currentPos[0] - 2, this.currentPos[1] - 1);
                    this.terrain.setColumnAt(this.currentPos[0] - 1, this.currentPos[1]);
                    this.terrain.setColumnAt(this.currentPos[0], this.currentPos[1]);
                }
            }

            if (jump.jumpHold === JumpType.MEDIUM) {
                if (Math.random() < 0.5) {
                    this.currentPos[0] += 6;
                    this.terrain.setColumnAt(this.currentPos[0] - 5, this.currentPos[1]);
                    this.terrain.setColumnAt(this.currentPos[0], this.currentPos[1]);
                }
                else {
                    this.currentPos[0] += 7;
                    this.currentPos[1] -= 1;
                    this.terrain.setColumnAt(this.currentPos[0] - 6, this.currentPos[1] + 1);
                    this.terrain.setColumnAt(this.currentPos[0], this.currentPos[1]);
                }
            }

            else if (jump.jumpHold === JumpType.LONG) {
                if (Math.random() < 0.5) {
                    this.currentPos[0] += 8;
                    this.terrain.setColumnAt(this.currentPos[0] - 7, this.currentPos[1]);
                    this.terrain.setColumnAt(this.currentPos[0], this.currentPos[1]);
                }
                else {
                    this.currentPos[0] += 9;
                    this.currentPos[1] -= 3;
                    this.terrain.setColumnAt(this.currentPos[0] - 8, this.currentPos[1] + 3);
                    this.terrain.setColumnAt(this.currentPos[0], this.currentPos[1]);
                }
            }
        }
    }


    generateRestArea(length: number) {
        for (let i = 0; i < length; i++) {
            this.terrain.setTileAt(this.currentPos[0] + i, this.currentPos[1]);
            this.terrain.setTileAt(this.currentPos[0] + i, this.currentPos[1] - 1);
        }
        this.currentPos[0] += length + 2;
    }
}