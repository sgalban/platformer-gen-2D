import RhythmGroup, {Verb} from './RhythmGroup';
import sceneAttributes from '../scene/SceneAttributes';

export enum BeatPattern {
    REGULAR,
    RANDOM,
    SWING
}

class RhythmGroupGenerator {
    minGroupDuration: number;
    maxGroupDuration: number;
    patternFrequencies: Map<BeatPattern, number>;
    density: number;
    jumpFrequency: number;

    constructor(
        minDuration: number,
        maxDuration: number,
        density: number,
        jumpFrequency: number,
        beatFrequencies: number[],
    ) {
        this.minGroupDuration = minDuration;
        this.maxGroupDuration = maxDuration;
        this.patternFrequencies = new Map<BeatPattern, number>();
        this.jumpFrequency = jumpFrequency;

        let normalizer = beatFrequencies.reduce((prev: number, cur: number) => prev + cur);
        let patterns = [BeatPattern.REGULAR, BeatPattern.RANDOM, BeatPattern.SWING];
        for (let idx = 0; idx < patterns.length; idx++) {
            this.patternFrequencies.set(patterns[idx], beatFrequencies[idx] / normalizer);
        }
        this.density = density;
    }

    private getBeatTimes(groupDuration: number, pattern: BeatPattern): number[] {
        let out: number[] = [];
        let amount = Math.floor(groupDuration * this.density);
        console.log(amount);

        for (let i = 0; i < amount; i++) {
            if (pattern === BeatPattern.REGULAR) {
                out.push(i * (groupDuration * 1.0 / amount))
            }
            else if (pattern === BeatPattern.RANDOM) {
                out.push(Math.random() * groupDuration);
            }
        }
        return out;
    }

    generateRhythmGroup(): RhythmGroup {
        let groupDuration: number = this.minGroupDuration === this.maxGroupDuration ?
            this.maxGroupDuration :
            Math.abs(Math.random() * (this.maxGroupDuration - this.minGroupDuration) + this.minGroupDuration);

        // Decide the beat pattern randomly
        let rng = Math.random();
        let cumulative = 0;
        let chosenPattern: BeatPattern;
        for (let frequency of this.patternFrequencies) {
            cumulative += frequency[1];
            if (cumulative > rng) {
                chosenPattern = frequency[0];
                break;
            }
        }

        let group: RhythmGroup = new RhythmGroup(groupDuration);
        let beatTimes: number[] = this.getBeatTimes(groupDuration, chosenPattern);

        let maxJumpHold = sceneAttributes.maxJumpHold;
        let jumpLengths = [maxJumpHold, maxJumpHold / 2.0, maxJumpHold / 4.0];

        let lastJumpTime = -1;
        let lastJumpDuration = 0;
        group.addAction(Verb.MOVE, 0, groupDuration);
        for (let time of beatTimes) {
            if (time > lastJumpTime + lastJumpDuration + 1) {
                if (Math.random() < this.jumpFrequency) {
                    let jumpType = Math.floor(Math.random() * jumpLengths.length);
                    group.addAction(Verb.JUMP, time, jumpLengths[jumpType]);
                }
            }
        }

        console.log(group);
        return group
    }
}

export default RhythmGroupGenerator;