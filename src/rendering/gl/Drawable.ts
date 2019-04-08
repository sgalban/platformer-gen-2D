import {gl} from '../../globals';

abstract class Drawable {
    count: number = 0;
  
    bufIdx: WebGLBuffer;
    bufPos: WebGLBuffer;
    bufOff: WebGLBuffer;
    bufUV: WebGLBuffer;
  
    idxGenerated: boolean = false;
    posGenerated: boolean = false;
    uvGenerated: boolean = false;
    offGenerated: boolean = false;
  
    numInstances: number = 0; // How many instances of this Drawable the shader program should draw
  
    abstract create() : void;
  
    destroy() {
        gl.deleteBuffer(this.bufIdx);
        gl.deleteBuffer(this.bufPos);
        gl.deleteBuffer(this.bufOff);
        gl.deleteBuffer(this.bufUV);
    }
  
    generateIdx() {
        this.idxGenerated = true;
        this.bufIdx = gl.createBuffer();
    }
  
    generatePos() {
        this.posGenerated = true;
        this.bufPos = gl.createBuffer();
    }
  
    generateUV() {
        this.uvGenerated = true;
        this.bufUV = gl.createBuffer();
    }

    generateOff() {
        this.offGenerated = true;
        this.bufOff = gl.createBuffer();
    }
  
    bindIdx(): boolean {
        if (this.idxGenerated) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        }
        return this.idxGenerated;
    }
  
    bindPos(): boolean {
        if (this.posGenerated) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        }
        return this.posGenerated;
    }
  
    bindUV(): boolean {
        if (this.uvGenerated) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufUV);
        }
        return this.uvGenerated;
    }

    bindOff(): boolean {
        if (this.offGenerated) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufOff);
        }
        return this.offGenerated;
    }
  
    elemCount(): number {
      return this.count;
    }
  
    drawMode(): GLenum {
      return gl.TRIANGLES;
    }
  
    setNumInstances(num: number) {
      this.numInstances = num;
    }
};

export default Drawable;
