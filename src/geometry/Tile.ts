import {vec2, vec3} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

class Tile extends Drawable {
    indices: Uint32Array;
    positions: Float32Array;
    uvs: Float32Array;
    offsets: Float32Array;
    mirrors: Int32Array;
    scales: Float32Array;

    constructor() {
        super();
    }

    create() {
        this.indices = new Uint32Array([0, 1, 2, 0, 2, 3]);
        this.positions = new Float32Array([
            0, 0,
            1, 0,
            1, 1,
            0, 1
        ]);

        this.count = this.indices.length;

        this.generateIdx();
        this.generatePos();
        this.generateUV();
        this.generateOff();
        this.generateMir();
        this.generateScale();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);
    }

    isInstanced() {
        return true;
    }

    setInstanceVBOs(posOffsets: vec2[], uvOffsets: vec2[], mirrors: boolean[], scales: number[]) {
        let posOffsetArray = [];
        let uvOffsetArray = [];
        let mirrorArray = [];
        for (let posOffset of posOffsets) {
            posOffsetArray.push(posOffset[0], posOffset[1]);
        }
        for (let uvOffset of uvOffsets) {
            uvOffsetArray.push(uvOffset[0], uvOffset[1]);
        }
        for (let mirror of mirrors) {
            mirrorArray.push(mirror ? 1 : 0);
        }
        this.offsets = new Float32Array(posOffsetArray);
        this.uvs = new Float32Array(uvOffsetArray);
        this.mirrors = new Int32Array(mirrorArray);
        this.scales = new Float32Array(scales);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufOff);
        gl.bufferData(gl.ARRAY_BUFFER, this.offsets, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufUV);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufMir);
        gl.bufferData(gl.ARRAY_BUFFER, this.mirrors, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufScale);
        gl.bufferData(gl.ARRAY_BUFFER, this.scales, gl.STATIC_DRAW);
    }
}

export default Tile;