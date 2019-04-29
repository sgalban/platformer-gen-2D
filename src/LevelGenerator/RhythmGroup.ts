import sceneAttributes from '../scene/SceneAttributes';

export enum Verb {
    MOVE,
    JUMP
}

export enum JumpType {
    SHORT = sceneAttributes.maxJumpHold * 0.75,
    MEDIUM = sceneAttributes.maxJumpHold * 0.875,
    LONG = sceneAttributes.maxJumpHold,
}

export class Action {
    type: Verb;
    startTime: number;
    duration: number;

    constructor(_type: Verb, _startTime: number, _duration: number) {
        this.type = _type;
        this.startTime = _startTime;
        this.duration = _duration;
    }
}

class RhythmGroup {

    actions: Action[];
    duration: number;

    constructor(_duration: number) {
        this.duration = _duration;
        this.actions = [];
    }

    addAction(type: Verb, startTime: number, actionDuration: number): boolean {

        let groupDuration = this.duration;
        if (startTime > groupDuration) {
            return false;
        }

        if (startTime + actionDuration > groupDuration && type !== Verb.JUMP) {
            actionDuration = groupDuration - startTime;
        }
        let newAction = new Action(type, startTime, actionDuration);
        this.actions.push(newAction);
        return true;
    }
}

export default RhythmGroup;