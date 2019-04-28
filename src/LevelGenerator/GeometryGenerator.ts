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
    jumpHeights: Map<JumpType, {height: number, time: number}>
    curTime: number;
    topTiles: Set<vec2|number[]>;

    constructor(_terrain: Terrain) {
        this.terrain = _terrain;
        this.currentPos = vec2.fromValues(-3, -1);
        this.jumpHeights = new Map();
        this.jumpHeights.set(JumpType.SHORT, this.getJumpHeight(JumpType.SHORT));
        this.jumpHeights.set(JumpType.MEDIUM, this.getJumpHeight(JumpType.MEDIUM));
        this.jumpHeights.set(JumpType.LONG, this.getJumpHeight(JumpType.LONG));
        this.topTiles = new Set<vec2|number[]>();
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
    private getJumpHeight(jumpHold: number): {height: number, time: number} {
        // This is, at its core, a ballistics problem. However, it's complicated by the fact
        // that the velocity is controlled by the player even after the jump begins. This means 
        // that to find the max height, we have to separate the jump into 2 parts: the part 
        // where the jump key is being held, and the part afterward. We have to find the height
        // and upward velocity acheived at the end of the first part, and then the second part
        // just becomes a simple physics problem. Getting those vectors will rely heavily on the
        // jumping implementation though.
        let gravity = sceneAttributes.gravity;
        let jumpVel = sceneAttributes.playerJump;

        // To simplify the math (and because it wouldn't be entirely accurate anyway)
        // I am just going to simulate jumping (assuming perfect framerate)
        let vel = 0;
        let inputvel = 0;
        let pos = 0;
        let jumpTime = jumpHold;
        let totalTime = 0;
        let flag = 0
        while (true) {
            if (flag > 1) {
                if (vel - gravity < 0) {
                    break;
                }
                vel -= gravity;
            }
            flag++;
            vel += inputvel;
            pos += vel / 60.0;
            if (jumpTime > 0) {
                jumpTime -= 0.016;
                let t = Math.max(0, jumpTime / 0.4);
                inputvel = t * sceneAttributes.playerJump;
            }
            else {
                inputvel = 0
            }
            totalTime += 1.0 / 60;
        }
        return {height: pos, time: totalTime};
    }

    private addTopTile(tile: number[]|vec2) {
        this.topTiles.add([tile[0], tile[1]]);
    }

    private generateSimpleJump(jumpType: JumpType) {
        let height = this.jumpHeights.get(jumpType);
        let minHeight = Math.max(-4, sceneAttributes.deathHeight + 5 - this.currentPos[1]);
        let endHeight = Math.floor(Math.random() * (height.height - minHeight) + minHeight);
        let totalFrames = height.time * 60 + Math.sqrt((height.height - endHeight) / sceneAttributes.gravity);
        let totalDistance = Math.floor(sceneAttributes.playerSpeed * totalFrames / 60);

        if (totalDistance === 2 && endHeight === 0){
            endHeight = 1
        }

        this.currentPos[0] += totalDistance;
        this.currentPos[1] += endHeight;
        this.terrain.setTileAt(this.currentPos);
        this.addTopTile(this.currentPos);
    }

    private generateStraightPath(length: number) {
        for (let i = 0; i < Math.round(length); i++) {
            this.terrain.setColumnAt(this.currentPos);
            this.addTopTile(this.currentPos);
            this.currentPos[0] += 1;
        }
    }

    generateGroupGeometry(rhythm: RhythmGroup) {
        let playerSpeed = sceneAttributes.playerSpeed;
        let queues = this.queuesFromRhythm(rhythm);
        let curTime = 0;

        for (let i = 0; i < queues.jumpStates.length; i++) {

            let jump = queues.jumpStates[i];
            let beatDuration = rhythm.duration - jump.startTime;
            if (i < queues.jumpStates.length - 1) {
                beatDuration = queues.jumpStates[i + 1].startTime - jump.startTime;
            }

            let prevX = this.currentPos[0];
            this.generateSimpleJump(jump.jumpHold);
            let jumpTime = (this.currentPos[0] - prevX) / playerSpeed;
            let remainingTime = beatDuration - jumpTime;
            if (remainingTime > 0) {
                let remainingLength = remainingTime * playerSpeed;
                this.generateStraightPath(remainingLength);
            }
        }
    }


    generateRestArea(length: number) {
        for (let i = 1; i <= length; i++) {
            this.addTopTile([this.currentPos[0] + i, this.currentPos[1] - 1]);
            this.terrain.setTileAt([this.currentPos[0] + i, this.currentPos[1] - 1]);
            this.terrain.setTileAt([this.currentPos[0] + i, this.currentPos[1] - 2]);
        }

        this.terrain.setColumnAt([this.currentPos[0] + 1, this.currentPos[1] - 2])
        this.terrain.setColumnAt([this.currentPos[0] + length, this.currentPos[1] - 2])

        this.currentPos[0] += length;
        this.currentPos[1] -= 1;
    }

    generateStartArea() {
        for (let i = -4; i <= 4; i++) {
            //this.addTopTile([i, 0]);
            this.terrain.setTileAt([i,  0]);
            this.terrain.setTileAt([i, -1]);
            this.terrain.setTileAt([i, -3]);
            this.terrain.setTileAt([i, -4]);

            if (i !== -2 && i !== 2) {
                this.terrain.setTileAt([i, -2]);
            }
            this.currentPos[0] = 4;
            this.currentPos[1] = 0;
        }

        for (let i = sceneAttributes.deathHeight; i < -4; i++) {
            this.terrain.setTileAt([-4, i]);
            this.terrain.setTileAt([4, i]);
        }
    }
}
