import {vec2, vec3} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

class Background extends Drawable {
    indices: Uint32Array;
    positions: Float32Array;
    uvs: Float32Array;
    offsets: Float32Array;
    mirrors: Int32Array;
    scales: Float32Array;

    constructor() {
        super();
        this.numInstances = 1;
    }

    create() {
        this.indices = new Uint32Array([0, 1, 2, 0, 2, 3]);
        this.positions = new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
             1.0,  1.0,
            -1.0,  1.0
        ]);
        this.uvs = new Float32Array([
            0, 1,
            1, 1,
            1, 0,
            0, 0
        ]);
        this.count = this.indices.length;

        this.generateIdx();
        this.generatePos();
        this.generateUV();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufUV);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
    }

    isInstanced() {
        return false;
    }
}

export default Background;