import {vec2, vec3} from 'gl-matrix';
import * as Stats from 'stats-js';

import {setGL} from './globals';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';
import Camera from './Camera';
import GameEngine from './engine/GameEngine';
import GameObject from './engine/GameObject';

import Player from './scene/Player';

import RhythmGropuGenerator from './LevelGenerator/RhythmGroupGenerator';

let time: number = 0.0;

function loadScene() {

}

function main() {

    // get canvas and webgl context
    const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
    if (!gl) {
        alert('WebGL 2 not supported!');
    }
    setGL(gl);
    loadScene();

    // Initial display for framerate
    const stats = Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    let engine: GameEngine = GameEngine.getEngine();
    const camera: Camera = engine.getCamera();

    const renderer = new OpenGLRenderer(canvas);
    renderer.setClearColor(0.9, 0.9, 0.9, 1);
    engine.setRenderer(renderer);
    let player: Player = new Player();
    engine.addGameObject(player);
    camera.makeParent(player);
    //new RhythmGropuGenerator(20, 20, 0.5, 0.6, [1, 0, 0]).generateRhythmGroup();

    // This function will be called every frame
    function tick() {
        stats.begin();
        time++;
        engine.tick();

        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.clear();
        GameEngine.getEngine().drawGameObjects();
    
        // Tell the browser to call `tick` again whenever it renders a new frame
        stats.end();
        requestAnimationFrame(tick);
    }
  
    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.setAspectRatio(window.innerWidth / window.innerHeight);
        camera.updateProjectionMatrix();
    }, false);
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.setAspectRatio(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

    // Start the render loop
    engine.startGame();
    tick();
}

main();