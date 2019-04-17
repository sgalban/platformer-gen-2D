import {vec2} from 'gl-matrix';
import GameObject from './GameObject';
import Terrain from '../scene/Terrain';
import Tile from '../geometry/Tile';
import {gl} from '../globals';
import Camera from '../Camera';
import OpenGlRenderer from '../rendering/gl/OpenGLRenderer';
import ShaderProgram, {Shader} from '../rendering/gl/ShaderProgram';
import Texture2D from '../rendering/Texture2D';

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
    terrainObjects: Terrain[];
    private collidableObjects: GameObject[];
    private lastTick: number;
    private tile: Tile;
    private spriteShader: ShaderProgram;
    private renderer: OpenGlRenderer;
    private camera: Camera;
    private downkeys: Set<string>

    private constructor(_tile: Tile) {
        this.gameObjects = [];
        this.terrainObjects = [];
        this.collidableObjects = [];
        this.tile = _tile;
        this.camera = new Camera(vec2.fromValues(0, 0));
        this.downkeys = new Set();
        this.spriteShader = new ShaderProgram([
            new Shader(gl.VERTEX_SHADER, require('../shaders/tile-vert.glsl')),
            new Shader(gl.FRAGMENT_SHADER, require('../shaders/tile-frag.glsl')),
        ]);
        this.spriteShader.setSpriteTex(new Texture2D("../../assets/sprites.png"));

        window.addEventListener("keydown", (keyEvent) => {
            if (!this.downkeys.has(keyEvent.key)) {
                this.gameObjects.forEach((go: GameObject) => {go.onKeyDown(keyEvent.key)});
            }
            this.downkeys.add(keyEvent.key);
        });
        window.addEventListener("keyup", (keyEvent) => {
            this.downkeys.delete(keyEvent.key);
            this.gameObjects.forEach((go: GameObject) => {go.onKeyUp(keyEvent.key)});
        });

        let terrain: Terrain = new Terrain();
        for (let i = -2; i < 3; i++) {
            terrain.setTileAt(i, -3);
        }
        terrain.setTileAt(7, -3);
        terrain.setTileAt(8, -3);
        terrain.setTileAt(9, -3);
        terrain.setTileAt(9, 0);
        this.setTerrain(terrain);
    }

    setRenderer(renderer: OpenGlRenderer) {
        this.renderer = renderer;
    }

    setTerrain(terrain: Terrain) {
        this.terrainObjects.push(terrain);
    }

    getCamera(): Camera {
        return this.camera;
    }

    drawGameObjects() {
        let tilePositions: vec2[] = [];
        let tileUvs: vec2[] = [];
        for (let go of this.gameObjects) {
            tilePositions.push(go.getPosition());
            tileUvs.push(go.getSpriteUv());
        }
        for (let ter of this.terrainObjects) {
            for (let x of ter.tiles.keys()) {
                for (let y of ter.tiles.get(x)) {
                    tilePositions.push(vec2.fromValues(x, y));
                    tileUvs.push(ter.getSpritePosition(x, y));
                }
            }
        }

        let totalPositions: vec2
        this.tile.setInstanceVBOs(tilePositions, tileUvs);
        this.tile.setNumInstances(tilePositions.length);

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
            go.physicsUpdate(deltaTime);
            for (let key of this.downkeys) {
                go.onKeyPress(key);
            }
            go.onUpdate(deltaTime);
        }
        this.camera.update();
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