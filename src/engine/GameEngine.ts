import {vec2} from 'gl-matrix';
import GameObject from './GameObject';
import Tile from '../geometry/Tile';
import {gl} from '../globals';
import Camera from '../Camera';
import OpenGlRenderer from '../rendering/gl/OpenGLRenderer';
import ShaderProgram, {Shader} from '../rendering/gl/ShaderProgram';

class GameEngine {

    private static engine: GameEngine;

    static getEngine() {
        if (GameEngine.engine) {
            return GameEngine.engine;
        }
        else {
            let tile: Tile = new Tile();
            tile.create();
            GameEngine.engine = new GameEngine(tile);
            return GameEngine.engine;
        }
    }

    private gameObjects: GameObject[];
    private lastTick: number;
    private tile: Tile;
    private spriteShader: ShaderProgram;
    private renderer: OpenGlRenderer;
    private camera: Camera;
    private downkeys: Set<string>

    private constructor(_tile: Tile) {
        this.gameObjects = [];
        this.tile = _tile;
        this.camera = new Camera(vec2.fromValues(0, 0));
        this.downkeys = new Set();
        this.spriteShader = new ShaderProgram([
            new Shader(gl.VERTEX_SHADER, require('../shaders/tile-vert.glsl')),
            new Shader(gl.FRAGMENT_SHADER, require('../shaders/tile-frag.glsl')),
        ]);

        window.addEventListener("keydown", (keyEvent) => {
            this.downkeys.add(keyEvent.key);
        });
        window.addEventListener("keyup", (keyEvent) => {
            this.downkeys.delete(keyEvent.key);
        });
    }

    setRenderer(renderer: OpenGlRenderer) {
        this.renderer = renderer;
    }

    getCamera(): Camera {
        return this.camera;
    }

    drawGameObjects() {
        let goPositions: vec2[] = [];
        for (let go of this.gameObjects) {
            goPositions.push(go.getPosition());
        }

        this.tile.setInstanceVBOs(goPositions, goPositions);
        this.tile.setNumInstances(this.gameObjects.length);

        this.renderer.render(this.camera, this.spriteShader, [this.tile]);
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
            for (let key of this.downkeys) {
                go.onKeyPress(key);
            }
            go.onUpdate(deltaTime);
        }
    }

    startGame() {
        this.lastTick = Date.now();

        let tick = () => {

            let curTime = Date.now();
            let deltaTime = curTime - this.lastTick;
            this.lastTick = curTime;
            this.updateGameObjects(deltaTime / 1000.0);
            window.setTimeout(tick, 16);
        }
        tick();
    }
}

export default GameEngine;