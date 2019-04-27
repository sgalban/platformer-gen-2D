import {vec2} from 'gl-matrix';
import GameObject from './GameObject';
import Terrain from '../scene/Terrain';
import Tile from '../geometry/Tile';
import Background from '../geometry/Background';
import {gl} from '../globals';
import Camera from '../Camera';
import OpenGlRenderer from '../rendering/gl/OpenGLRenderer';
import ShaderProgram, {Shader} from '../rendering/gl/ShaderProgram';
import Texture2D from '../rendering/Texture2D';
import LevelGenerator from '../LevelGenerator/LevelGenerator';

class GameEngine {

    private static engine: GameEngine;

    static getEngine() {
        if (GameEngine.engine) {
            return GameEngine.engine;
        }
        else {
            let tile: Tile = new Tile();
            let background: Background = new Background();
            tile.create();
            background.create()
            GameEngine.engine = new GameEngine(tile, background);
            return GameEngine.engine;
        }
    }

    private gameObjects: GameObject[];
    terrainObjects: Terrain[];
    private collidableObjects: GameObject[];
    private lastTick: number;
    private tile: Tile;
    private background: Background;
    private spriteShader: ShaderProgram;
    private backgroundShader: ShaderProgram;
    private renderer: OpenGlRenderer;
    private camera: Camera;
    private downkeys: Set<string>
    private ticks: number;

    private constructor(_tile: Tile, _background: Background) {
        this.gameObjects = [];
        this.terrainObjects = [];
        this.collidableObjects = [];
        this.tile = _tile;
        this.background = _background;
        this.camera = new Camera(vec2.fromValues(0, -3), 20);
        this.downkeys = new Set();
        this.ticks = 0;

        this.spriteShader = new ShaderProgram([
            new Shader(gl.VERTEX_SHADER, require('../shaders/tile-vert.glsl')),
            new Shader(gl.FRAGMENT_SHADER, require('../shaders/tile-frag.glsl')),
        ]);
        const spriteSheet = 'http://' + window.location.host + '/src/assets/sprites.png'
        let spriteTex: Texture2D = new Texture2D(spriteSheet, 0)
        this.spriteShader.setSpriteTex(spriteTex);

        this.backgroundShader = new ShaderProgram([
            new Shader(gl.VERTEX_SHADER, require('../shaders/background-vert.glsl')),
            new Shader(gl.FRAGMENT_SHADER, require('../shaders/background-frag.glsl')),
        ])
        const backgrounds = 'http://' + window.location.host + '/src/assets/backgrounds.png'
        let backgroundTex: Texture2D = new Texture2D(backgrounds, 1);
        this.backgroundShader.setSpriteTex(backgroundTex);

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
        this.setTerrain(terrain);

        let levelGen = new LevelGenerator(3, terrain, 15, 15, 1, 0.7, [1, 0, 0]);
        levelGen.generateRhythms();
        levelGen.generateGeometry();
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
        let tileMirrors: boolean[] = [];
        let tileScales: number[] = [];
        for (let go of this.gameObjects) {
            tilePositions.push(go.getPosition());
            tileUvs.push(go.getSpriteUv());
            tileMirrors.push(go.facingLeft());
            tileScales.push(go.size);
        }
        for (let ter of this.terrainObjects) {
            for (let x of ter.tiles.keys()) {
                for (let y of ter.tiles.get(x)) {
                    let horCamDist = Math.abs(x + this.camera.position[0]);
                    let verCamDist = Math.abs(y + this.camera.position[1]);
                    if (horCamDist > this.camera.getWidth() / 2 + 1 ||
                        verCamDist > this.camera.getHeight() / 2 + 1
                    ) {
                        continue;
                    }
                    tilePositions.push(vec2.fromValues(x, y));
                    tileUvs.push(ter.getSpritePosition(x, y));
                    tileMirrors.push(false);
                    tileScales.push(1);
                }
            }
        }

        let totalPositions: vec2
        this.tile.setInstanceVBOs(tilePositions, tileUvs, tileMirrors, tileScales);
        this.tile.setNumInstances(tilePositions.length);

        this.renderer.render(this.camera, this.backgroundShader, [this.background]);
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
            go.onUpdate(deltaTime);
            for (let key of this.downkeys) {
                go.onKeyPress(key);
            }
        }
        this.camera.update();
    }

    // Maybe integrate this with the main tick()
    startGame() {
        this.lastTick = Date.now();
    }

    tick() {
        this.ticks++;
        this.backgroundShader.setTime(this.ticks);
        let curTime = Date.now();
        let deltaTime = curTime - this.lastTick;
        this.lastTick = curTime;
        this.updateGameObjects(deltaTime / 1000.0);
    }
}

export default GameEngine;