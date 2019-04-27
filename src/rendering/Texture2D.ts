import {gl} from '../globals';

// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL

class Texture2D {
    image: HTMLImageElement;
    slot: number;
    loaded: boolean;

    constructor(path: string, slot: number = 0) {
        this.loaded = false;
        this.image = new Image();
        this.image.onload = () => {this.loaded = true}
        this.image.src = path;
        this.slot = slot;
    }

    private loadTextureCallback(texture: WebGLTexture): void {
        this.loaded = true;
        gl.activeTexture(gl.TEXTURE0 + this.slot);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    }

    loadTexture(): void {
        const texture = gl.createTexture();
        if (this.loaded) {
            this.loadTextureCallback(texture);
        }
        else {
            gl.bindTexture(gl.TEXTURE_2D, texture)
            this.image.onload = () => {this.loadTextureCallback(texture)};
        }
    }
}

export default Texture2D;