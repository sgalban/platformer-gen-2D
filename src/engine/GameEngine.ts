import GameObject from './GameObject';

class GameEngine {

    private static engine: GameEngine;

    static getEngine() {
        if (GameEngine.engine) {
            return GameEngine.engine;
        }
        else {
            GameEngine.engine = new GameEngine();
            return GameEngine.engine;
        }
    }

    private gameObjects: GameObject[];
    private lastTick: number;

    private constructor() {
        this.gameObjects = [];
    }

    // Only call from GameObject class
    addGameObject(go: GameObject) {
        if (this.gameObjects.indexOf(go) < 0) {
            this.gameObjects.push(go);
        }
    }

    // Only call from the GameObject cass
    destroyGameObject(go: GameObject) {
        let idx = this.gameObjects.indexOf(go);
        if (idx >= 0) {
            this.gameObjects.splice(idx, 1);
        }
    }

    private updateGameObjects(deltaTime: number) {
        for (let go of this.gameObjects) {
            go.update(deltaTime);
        }
    }

    startGame() {
        this.lastTick = Date.now();

        let tick = () => {

            let curTime = Date.now();
            let deltaTime = curTime - this.lastTick;
            this.lastTick = curTime;
            for (let go of this.gameObjects) {
                go.update(deltaTime / 1000.0)
            }
            window.setTimeout(tick, 16);
        }
        tick();
    }
}

export default GameEngine;