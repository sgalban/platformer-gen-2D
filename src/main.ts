import {vec2, vec3} from 'gl-matrix';

import {setGL} from './globals';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';
import Camera from './Camera';
import GameEngine from './engine/GameEngine';
import GameObject from './engine/GameObject';

import Player from './scene/Player';

import Tile from './geometry/Tile';

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

    let engine: GameEngine = GameEngine.getEngine();
    const camera: Camera = engine.getCamera();

    const renderer = new OpenGLRenderer(canvas);
    renderer.setClearColor(0.9, 0.9, 0.9, 1);
    engine.setRenderer(renderer);
    engine.addGameObject(new Player());

    // This function will be called every frame
    function tick() {
        time++;

        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.clear();
        GameEngine.getEngine().drawGameObjects();
    
        // Tell the browser to call `tick` again whenever it renders a new frame
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