import {vec3} from 'gl-matrix';
import {setGL} from './globals';

function loadScene() {

}

function main() {
    // get canvas and webgl context
    const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
    if (!gl) {
        alert('WebGL 2 not supported!');
    }
    // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
    // Later, we can import `gl` from `globals.ts` to access it
    setGL(gl);
    loadScene();

    // This function will be called every frame
    function tick() {
        //camera.update();
        //time++;

        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        //renderer.clear();
    
        // Tell the browser to call `tick` again whenever it renders a new frame
        requestAnimationFrame(tick);
    }
  
    window.addEventListener('resize', function() {
        //renderer.setSize(window.innerWidth, window.innerHeight);
        //camera.setAspectRatio(window.innerWidth / window.innerHeight);
        //camera.updateProjectionMatrix();
    }, false);
  
    //renderer.setSize(window.innerWidth, window.innerHeight);
    //camera.setAspectRatio(window.innerWidth / window.innerHeight);
    //camera.updateProjectionMatrix();

    // Start the render loop
    tick();
}

main();