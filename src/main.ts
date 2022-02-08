import {vec2, vec3} from 'gl-matrix';

import {setGL} from './globals';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';
import Camera from './Camera';
import GameEngine from './engine/GameEngine';
import GameObject from './engine/GameObject';

import Player from './scene/Player';
import Coin from './scene/Coin';
import sceneAttributes from './scene/SceneAttributes';

import RhythmGropuGenerator from './LevelGenerator/RhythmGroupGenerator';

let Stats = require("stats-js")

let time: number = 0.0;
let gameStart: boolean = false;

function main() {

    // Rhythm Type
    let rhythmTypeSelect = <HTMLSelectElement> document.getElementById("rhythmSelect");
    rhythmTypeSelect.onchange = () => {
        sceneAttributes.rhythmType = parseInt(rhythmTypeSelect.value);
    }

    // Rhythm Group Length
    let groupLengthSlider = <HTMLInputElement> document.getElementById("timeSelect");
    let groupLengthOutput = document.getElementById("timeSelectDisplay");
    groupLengthOutput.innerHTML = groupLengthSlider.value + " sec";
    groupLengthSlider.oninput = () => {
        groupLengthOutput.innerHTML = groupLengthSlider.value + " sec";
        sceneAttributes.rhythmGroupLength = parseInt(groupLengthSlider.value);
    }

    // Rhythm Group Number
    let groupNumberSelect = <HTMLInputElement> document.getElementById("numberSelect");
    let groupNumberOutput = document.getElementById("numberDisplay");
    groupNumberOutput.innerHTML = groupNumberSelect.value;
    groupNumberSelect.oninput = () => {
        groupNumberOutput.innerHTML = groupNumberSelect.value;
        sceneAttributes.numberOfGroups = parseInt(groupNumberSelect.value);
    }

    // Gravity
    let gravitySelect = <HTMLSelectElement> document.getElementById("gravitySelect");
    gravitySelect.onchange = function() {
        sceneAttributes.gravity = parseFloat(gravitySelect.value);
    }

    // Jump
    let jumpSelect = <HTMLSelectElement> document.getElementById("jumpSelect");
    jumpSelect.onchange = () => {
        sceneAttributes.playerJump = parseFloat(jumpSelect.value);
    }

    // Speed
    let speedSelect = <HTMLSelectElement> document.getElementById("speedSelect");
    speedSelect.onchange = () => {
        sceneAttributes.playerSpeed = parseFloat(speedSelect.value);
    }

    // Density
    let densitySelect = <HTMLSelectElement> document.getElementById("densitySelect");
    densitySelect.onchange = () => {
        sceneAttributes.levelDensity = parseFloat(densitySelect.value);
    }

    // Generate Level
    let startButton = <HTMLButtonElement> document.getElementById("generateLevelButton");
    startButton.onclick = () => {
        document.body.innerHTML = "";
        BeginGame();
    }

    //BeginGame();
}

function BeginGame() {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");

    document.body.appendChild(canvas);

    // get canvas and webgl context
    //const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
    if (!gl) {
        alert('WebGL 2 not supported!');
    }
    setGL(gl);

    // Initial display for framerate (only for development)
    let displayStats = false;
    const stats = Stats();
    if (window.location.hostname === "localhost") {
        displayStats = true;
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    let engine: GameEngine = GameEngine.getEngine();
    const camera: Camera = engine.getCamera();

    const renderer = new OpenGLRenderer(canvas);
    renderer.setClearColor(0.9, 0.9, 0.9, 1);
    engine.setRenderer(renderer);
    engine.generateLevel();
    let player: Player = new Player([0, 1]);
    camera.makeParent(player);
    //new RhythmGropuGenerator(20, 20, 0.5, 0.6, [1, 0, 0]).generateRhythmGroup();

    // This function will be called every frame
    function tick() {
        if (displayStats) {
            stats.begin();
        }
        time++;
        engine.tick();

        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.clear();
        GameEngine.getEngine().drawGameObjects();
    
        // Tell the browser to call `tick` again whenever it renders a new frame
        if (displayStats) {
            stats.end();
        }
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