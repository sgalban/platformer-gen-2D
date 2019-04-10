import {vec2, vec3} from 'gl-matrix';
import {setGL} from './globals';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';
import Camera from './Camera';
import GameEngine from './engine/GameEngine';

import Tile from './geometry/Tile';

let time: number = 0.0;

let tile: Tile;
let character: Tile;

function loadScene() {
    tile = new Tile();
    tile.create();
    character = new Tile();
    character.create();

    tile.setNumInstances(1);
    tile.setInstanceVBOs([vec2.fromValues(0, 0)], [vec2.fromValues(0, 0)]);
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

    const camera: Camera = new Camera(vec2.fromValues(0, 0));

    const renderer = new OpenGLRenderer(canvas);
    renderer.setClearColor(0.9, 0.9, 0.9, 1);

    // Compile the shaders
    const tileShader = new ShaderProgram([
        new Shader(gl.VERTEX_SHADER, require('./shaders/tile-vert.glsl')),
        new Shader(gl.FRAGMENT_SHADER, require('./shaders/tile-frag.glsl')),
    ]);

    // This function will be called every frame
    function tick() {
        time++;

        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.clear();
        renderer.render(camera, tileShader, [tile]);
    
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
    GameEngine.getEngine().startGame();
    tick();
}

main();