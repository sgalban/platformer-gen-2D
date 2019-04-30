import {vec2} from 'gl-matrix';
import RhythmGroupGenerator from './RhythmGroupGenerator'
import RhythmGroup, {Action, Verb, JumpType} from './RhythmGroup';
import sceneAttributes from '../scene/SceneAttributes';
import Terrain from '../scene/Terrain';
import Spike from '../scene/Spike';
import Coin from '../scene/Coin';
import Checkpoint from '../scene/Checkpoint';
import Gem from '../scene/Gem';
import Platform from '../scene/Platform';
import {spriteCoordinates} from '../constants';

type MovementState = {state: string, duration: number}
type JumpState = {startTime: number, jumpHold: number};

export default class GeometryGenerator {

    terrain: Terrain;
    currentPos: vec2;
    jumpHeights: Map<JumpType, {height: number, time: number}>
    curTime: number;
    topTiles: Set<vec2|number[]>;
    restTiles: Map<number, Set<Number>>;

    constructor(_terrain: Terrain) {
        this.terrain = _terrain;
        this.currentPos = vec2.fromValues(-3, -1);
        this.jumpHeights = new Map();
        this.jumpHeights.set(JumpType.SHORT, this.getJumpHeight(JumpType.SHORT));
        this.jumpHeights.set(JumpType.MEDIUM, this.getJumpHeight(JumpType.MEDIUM));
        this.jumpHeights.set(JumpType.LONG, this.getJumpHeight(JumpType.LONG));
        this.topTiles = new Set<vec2|number[]>();
        this.restTiles = new Map();
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

    private addTopTile(tile: number[]|vec2, rest: boolean = false) {
        this.topTiles.add([tile[0], tile[1]]);
        if (rest) {
            if (this.restTiles.has(tile[0])) {
                this.restTiles.get(tile[0]).add(tile[1]);
            }
            else {
                this.restTiles.set(tile[0], new Set<number>([tile[1]]));
            }
        }
    }

    isRestTile(tile: vec2|number[]): boolean {
        if (this.restTiles.has(tile[0])) {
            return this.restTiles.get(tile[0]).has(tile[1]);
        }
        return false;
    }

    private generateSimpleJump(jumpType: JumpType) {
        let height = this.jumpHeights.get(jumpType);
        let minHeight = Math.max(-4, sceneAttributes.deathHeight + 5 - this.currentPos[1]);
        let endHeight = Math.floor(Math.random() * (height.height - minHeight) + minHeight);
        let totalFrames = height.time * 60 + Math.sqrt((height.height - endHeight) / (sceneAttributes.gravity / 60));
        let totalDistance = Math.floor(sceneAttributes.playerSpeed * totalFrames / 60);

        if (totalDistance === 2 && endHeight === 0){
            endHeight = 1
        }

        this.currentPos[0] += totalDistance;
        this.currentPos[1] += endHeight;
        this.terrain.setTileAt(this.currentPos);
        this.addTopTile(this.currentPos);
    }

    private generateSpikeJump(jumpType: JumpType) {
        let height = this.jumpHeights.get(jumpType);
        let peakDistance = Math.floor(sceneAttributes.playerSpeed * height.time);
        let totalFrames = height.time * 60 + Math.sqrt(height.height / (sceneAttributes.gravity / 60));
        let totalDistance = Math.floor(sceneAttributes.playerSpeed * totalFrames / 60) + 2;
        
        for (let i = 0; i <= totalDistance; i++) {
            if (i === peakDistance) {
                this.terrain.setColumnAt([this.currentPos[0] + i, this.currentPos[1] - 1]);
            }
            else {
                this.terrain.setColumnAt([this.currentPos[0] + i, this.currentPos[1]]);
                this.addTopTile([this.currentPos[0] + i, this.currentPos[1]]);
            }
        }

        for (let i = 0; i < height.height; i++) {
            new Spike([this.currentPos[0] + peakDistance, this.currentPos[1] + i]);
        }
        for (let i = 0; i < 4; i++) {
            new Spike([
                this.currentPos[0] + peakDistance,
                height.height + this.currentPos[1] + 4 + i]);
        }

        if (Math.random() < 0.25) {
            new Coin([this.currentPos[0] + peakDistance + 0, this.currentPos[1] + height.height + 1]);
        }

        for (let i = -1; i <= 1; i++) {
            for (let j = 0; j <= 1; j++) {
                this.terrain.setTileAt([
                    this.currentPos[0] + peakDistance + i,
                    height.height + this.currentPos[1] + 9 + j
                ]);
            }
        }

        this.currentPos[0] += totalDistance;
    }

    generateSpikeGap (jumpType: JumpType) {
        let height = this.jumpHeights.get(jumpType);
        let totalFrames = height.time * 60 + Math.sqrt((height.height) / (sceneAttributes.gravity / 60));
        let totalDistance = Math.floor(sceneAttributes.playerSpeed * totalFrames / 60);
        let peakDistance = Math.floor(sceneAttributes.playerSpeed * height.time);

        for (let jump of this.jumpHeights.keys()) {
            if (jumpType != jump) {
                new Spike([
                    this.currentPos[0] + peakDistance,
                    this.currentPos[1] + this.jumpHeights.get(jump).height
                ])
            }
            else {
                new Coin([
                    this.currentPos[0] + peakDistance,
                    this.currentPos[1] + this.jumpHeights.get(jump).height
                ])
            }
        }

        this.currentPos[0] += totalDistance;
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

    private gentleDecline(length: number, decline: number) {
        let currentHeight = this.currentPos[1];
        for (let i = 0; i < Math.round(length); i++) {
            this.terrain.setColumnAt(this.currentPos);
            this.addTopTile(this.currentPos);
            currentHeight -= decline / length;
            this.currentPos[0] += 1;
            this.currentPos[1] = Math.round(currentHeight);
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
            let obstacleType = Math.random();
            if (obstacleType < 0.2) {
                this.generateSpikeGap(jump.jumpHold);
            }
            else if (obstacleType < 0.4) {
                this.generateSpikeJump(jump.jumpHold);
            }
            else {
                this.generateSimpleJump(jump.jumpHold);
            }
            let jumpTime = (this.currentPos[0] - prevX) / playerSpeed;
            let remainingTime = beatDuration - jumpTime;
            if (remainingTime > 0) {
                let remainingLength = remainingTime * playerSpeed;
                if (Math.random() < 0.25) {
                    this.gentleDecline(remainingLength, Math.random() < 0.5 ? 1 : 2);
                }
                else {
                    this.generateStraightPath(remainingLength);
                }
            }
        }
    }


    generateRestArea(length: number, lastRest: boolean = false) {
        for (let i = 1; i <= length; i++) {
            this.addTopTile([this.currentPos[0] + i, this.currentPos[1] - 1], true);
            this.terrain.setTileAt([this.currentPos[0] + i, this.currentPos[1] - 1]);
            this.terrain.setTileAt([this.currentPos[0] + i, this.currentPos[1] - 2]);
        }

        this.terrain.setColumnAt([this.currentPos[0] + 1, this.currentPos[1] - 2])
        this.terrain.setColumnAt([this.currentPos[0] + length, this.currentPos[1] - 2])

        this.currentPos[0] += length;
        this.currentPos[1] -= 1;

        if (lastRest) {
            new Gem([
                Math.floor(this.currentPos[0] - length / 2),
                this.currentPos[1] + 2
            ]);
        }
        else {
            new Checkpoint([
                Math.floor(this.currentPos[0] - length / 2),
                this.currentPos[1] + 1
            ]);
        }  
    }

    generateStartArea() {
        for (let i = -4; i <= 4; i++) {
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

        let m = (time: number) => {
            return vec2.fromValues(
                0,
                1 - Math.cos(time)
            );
        }
    }
}
