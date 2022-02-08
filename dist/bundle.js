/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gl": () => (/* binding */ gl),
/* harmony export */   "setGL": () => (/* binding */ setGL)
/* harmony export */ });
var gl;
function setGL(_gl) {
    gl = _gl;
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


// In this file, `gl` is accessible because it is imported above
class OpenGLRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.enable(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.DEPTH_TEST);
    }
    setClearColor(r, g, b, a) {
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.clearColor(r, g, b, a);
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    clear() {
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.clear(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.COLOR_BUFFER_BIT | _globals__WEBPACK_IMPORTED_MODULE_0__.gl.DEPTH_BUFFER_BIT);
    }
    render(camera, prog, drawables) {
        let model = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create();
        let viewProj = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create();
        let color = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(1, 0, 0, 1);
        prog.setCameraPos(camera.position);
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__.identity(model);
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__.multiply(viewProj, camera.projectionMatrix, camera.viewMatrix);
        prog.setModelMatrix(model);
        prog.setViewProjMatrix(viewProj);
        for (let drawable of drawables) {
            prog.draw(drawable);
        }
    }
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OpenGLRenderer);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "adjoint": () => (/* binding */ adjoint),
/* harmony export */   "determinant": () => (/* binding */ determinant),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "translate": () => (/* binding */ translate),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "rotateX": () => (/* binding */ rotateX),
/* harmony export */   "rotateY": () => (/* binding */ rotateY),
/* harmony export */   "rotateZ": () => (/* binding */ rotateZ),
/* harmony export */   "fromTranslation": () => (/* binding */ fromTranslation),
/* harmony export */   "fromScaling": () => (/* binding */ fromScaling),
/* harmony export */   "fromRotation": () => (/* binding */ fromRotation),
/* harmony export */   "fromXRotation": () => (/* binding */ fromXRotation),
/* harmony export */   "fromYRotation": () => (/* binding */ fromYRotation),
/* harmony export */   "fromZRotation": () => (/* binding */ fromZRotation),
/* harmony export */   "fromRotationTranslation": () => (/* binding */ fromRotationTranslation),
/* harmony export */   "fromQuat2": () => (/* binding */ fromQuat2),
/* harmony export */   "getTranslation": () => (/* binding */ getTranslation),
/* harmony export */   "getScaling": () => (/* binding */ getScaling),
/* harmony export */   "getRotation": () => (/* binding */ getRotation),
/* harmony export */   "fromRotationTranslationScale": () => (/* binding */ fromRotationTranslationScale),
/* harmony export */   "fromRotationTranslationScaleOrigin": () => (/* binding */ fromRotationTranslationScaleOrigin),
/* harmony export */   "fromQuat": () => (/* binding */ fromQuat),
/* harmony export */   "frustum": () => (/* binding */ frustum),
/* harmony export */   "perspectiveNO": () => (/* binding */ perspectiveNO),
/* harmony export */   "perspective": () => (/* binding */ perspective),
/* harmony export */   "perspectiveZO": () => (/* binding */ perspectiveZO),
/* harmony export */   "perspectiveFromFieldOfView": () => (/* binding */ perspectiveFromFieldOfView),
/* harmony export */   "orthoNO": () => (/* binding */ orthoNO),
/* harmony export */   "ortho": () => (/* binding */ ortho),
/* harmony export */   "orthoZO": () => (/* binding */ orthoZO),
/* harmony export */   "lookAt": () => (/* binding */ lookAt),
/* harmony export */   "targetTo": () => (/* binding */ targetTo),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "frob": () => (/* binding */ frob),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiplyScalar": () => (/* binding */ multiplyScalar),
/* harmony export */   "multiplyScalarAndAdd": () => (/* binding */ multiplyScalarAndAdd),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "sub": () => (/* binding */ sub)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */

function fromQuat2(out, a) {
  var translation = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Alias for {@link mat4.perspectiveNO}
 * @function
 */

var perspective = perspectiveNO;
/**
 * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Alias for {@link mat4.orthoNO}
 * @function
 */

var ortho = orthoNO;
/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

var sub = subtract;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EPSILON": () => (/* binding */ EPSILON),
/* harmony export */   "ARRAY_TYPE": () => (/* binding */ ARRAY_TYPE),
/* harmony export */   "RANDOM": () => (/* binding */ RANDOM),
/* harmony export */   "setMatrixArrayType": () => (/* binding */ setMatrixArrayType),
/* harmony export */   "toRadian": () => (/* binding */ toRadian),
/* harmony export */   "equals": () => (/* binding */ equals)
/* harmony export */ });
/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "transformQuat": () => (/* binding */ transformQuat),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "sqrDist": () => (/* binding */ sqrDist),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues(x, y, z, w) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} result the receiving vector
 * @param {ReadonlyVec4} U the first vector
 * @param {ReadonlyVec4} V the second vector
 * @param {ReadonlyVec4} W the third vector
 * @returns {vec4} result
 */

function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */

function random(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    v2 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    v4 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */

function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec4.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(10);
/* harmony import */ var _scene_Terrain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _geometry_Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _geometry_Background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _rendering_gl_ShaderProgram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _rendering_Texture2D__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
/* harmony import */ var _LevelGenerator_LevelGenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8);
/* harmony import */ var _assets_sprites_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(28);
/* harmony import */ var _assets_backgrounds_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(29);












class GameEngine {
    constructor(_tile, _background) {
        this.win = false;
        this.gameObjects = [];
        this.terrainObjects = [];
        this.collidableObjects = [];
        this.tile = _tile;
        this.background = _background;
        this.camera = new _Camera__WEBPACK_IMPORTED_MODULE_4__["default"](gl_matrix__WEBPACK_IMPORTED_MODULE_11__.fromValues(0, -3), 20);
        this.downkeys = new Set();
        this.ticks = 0;
        this.spriteShader = new _rendering_gl_ShaderProgram__WEBPACK_IMPORTED_MODULE_5__["default"]([
            new _rendering_gl_ShaderProgram__WEBPACK_IMPORTED_MODULE_5__.Shader(_globals__WEBPACK_IMPORTED_MODULE_3__.gl.VERTEX_SHADER, __webpack_require__(30)),
            new _rendering_gl_ShaderProgram__WEBPACK_IMPORTED_MODULE_5__.Shader(_globals__WEBPACK_IMPORTED_MODULE_3__.gl.FRAGMENT_SHADER, __webpack_require__(31)),
        ]);
        let spriteTex = new _rendering_Texture2D__WEBPACK_IMPORTED_MODULE_6__["default"](_assets_sprites_png__WEBPACK_IMPORTED_MODULE_9__, 0);
        this.spriteShader.setSpriteTex(spriteTex);
        this.backgroundShader = new _rendering_gl_ShaderProgram__WEBPACK_IMPORTED_MODULE_5__["default"]([
            new _rendering_gl_ShaderProgram__WEBPACK_IMPORTED_MODULE_5__.Shader(_globals__WEBPACK_IMPORTED_MODULE_3__.gl.VERTEX_SHADER, __webpack_require__(32)),
            new _rendering_gl_ShaderProgram__WEBPACK_IMPORTED_MODULE_5__.Shader(_globals__WEBPACK_IMPORTED_MODULE_3__.gl.FRAGMENT_SHADER, __webpack_require__(33)),
        ]);
        let backgroundTex = new _rendering_Texture2D__WEBPACK_IMPORTED_MODULE_6__["default"](_assets_backgrounds_png__WEBPACK_IMPORTED_MODULE_10__, 1);
        this.backgroundShader.setSpriteTex(backgroundTex);
        window.addEventListener("keydown", (keyEvent) => {
            if (!this.downkeys.has(keyEvent.key)) {
                this.gameObjects.forEach((go) => { go.onKeyDown(keyEvent.key); });
            }
            this.downkeys.add(keyEvent.key);
        });
        window.addEventListener("keyup", (keyEvent) => {
            this.downkeys.delete(keyEvent.key);
            this.gameObjects.forEach((go) => { go.onKeyUp(keyEvent.key); });
        });
    }
    static getEngine() {
        if (GameEngine.engine) {
            return GameEngine.engine;
        }
        else {
            let tile = new _geometry_Tile__WEBPACK_IMPORTED_MODULE_1__["default"]();
            let background = new _geometry_Background__WEBPACK_IMPORTED_MODULE_2__["default"]();
            tile.create();
            background.create();
            GameEngine.engine = new GameEngine(tile, background);
            return GameEngine.engine;
        }
    }
    generateLevel() {
        let terrain = new _scene_Terrain__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.setTerrain(terrain);
        let densities = [];
        if (_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_8__["default"].rhythmType === 3) {
            densities = [0.5, 0, 0.5];
        }
        else {
            for (let i = 0; i < 3; i++) {
                densities.push(_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_8__["default"].rhythmType === i ? 1 : 0);
            }
        }
        let levelGen = new _LevelGenerator_LevelGenerator__WEBPACK_IMPORTED_MODULE_7__["default"](_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_8__["default"].numberOfGroups, terrain, _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_8__["default"].rhythmGroupLength, _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_8__["default"].rhythmGroupLength, _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_8__["default"].levelDensity, 1.0, densities);
        levelGen.generateRhythms();
        let topTiles = levelGen.generateGeometry();
        levelGen.addCoins(topTiles);
    }
    setRenderer(renderer) {
        this.renderer = renderer;
    }
    setTerrain(terrain) {
        this.terrainObjects.push(terrain);
    }
    getCamera() {
        return this.camera;
    }
    onWin() {
        this.win = true;
    }
    drawGameObjects() {
        let tilePositions = [];
        let tileUvs = [];
        let tileMirrors = [];
        let tileScales = [];
        for (let i = 0; i < this.gameObjects.length; i++) {
            let go = this.gameObjects[this.gameObjects.length - i - 1];
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
                        verCamDist > this.camera.getHeight() / 2 + 1) {
                        continue;
                    }
                    tilePositions.push(gl_matrix__WEBPACK_IMPORTED_MODULE_11__.fromValues(x, y));
                    tileUvs.push(ter.getSpritePosition(x, y));
                    tileMirrors.push(false);
                    tileScales.push(1);
                }
            }
        }
        let totalPositions;
        this.tile.setInstanceVBOs(tilePositions, tileUvs, tileMirrors, tileScales);
        this.tile.setNumInstances(tilePositions.length);
        this.backgroundShader.setWin(this.win);
        this.spriteShader.setWin(this.win);
        this.renderer.render(this.camera, this.backgroundShader, [this.background]);
        this.renderer.render(this.camera, this.spriteShader, [this.tile]);
    }
    // Only call from GameObject class
    addGameObject(go) {
        if (this.gameObjects.indexOf(go) < 0) {
            this.gameObjects.push(go);
            if (go.isCollidable() && !go.isPassive()) {
                this.collidableObjects.push(go);
            }
        }
    }
    // Only call from the GameObject cass
    destroyGameObject(go) {
        let idx = this.gameObjects.indexOf(go);
        if (idx >= 0) {
            this.gameObjects.splice(idx, 1);
        }
        idx = this.collidableObjects.indexOf(go);
        if (idx >= 0) {
            this.collidableObjects.splice(idx, 1);
        }
    }
    getCollidableObjects() {
        return this.collidableObjects;
    }
    updateGameObjects(deltaTime) {
        for (let go of this.gameObjects) {
            if (!this.win) {
                go.physicsUpdate(deltaTime);
            }
            go.onUpdate(deltaTime);
            for (let key of this.downkeys) {
                go.onKeyPress(key);
            }
        }
        for (let go1 of this.gameObjects) {
            if (go1.isPassive() || !go1.isCollidable) {
                continue;
            }
            for (let go2 of this.gameObjects) {
                if (!go2.isCollidable || go1 === go2) {
                    continue;
                }
                go1.checkObjectCollisions(go2);
            }
        }
        this.camera.update();
    }
    startGame() {
        this.lastTick = Date.now();
    }
    tick() {
        this.ticks++;
        this.backgroundShader.setTime(this.ticks);
        this.spriteShader.setTime(this.ticks);
        let curTime = Date.now();
        let deltaTime = curTime - this.lastTick;
        this.lastTick = curTime;
        this.updateGameObjects(deltaTime / 1000.0);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameEngine);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



function random1(p, seed) {
    let fract = (n) => n - Math.floor(n);
    return fract(Math.sin(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.dot(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.add(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create(), p, seed), gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(127.1, 311.7))) * 41352.5245);
}
class Terrain {
    constructor() {
        this.tiles = new Map();
        this.randomOffset = Math.random();
    }
    static makeTestTerrain() {
        let terrain = new Terrain();
        for (let i = -2; i < 15; i++) {
            if (i < 4 || i > 7) {
                terrain.setTileAt([i, -3]);
                terrain.setTileAt([i, -4]);
            }
            if (i > 9) {
                terrain.setTileAt([i, -2]);
            }
            if (i > 11) {
                terrain.setTileAt([i, -1]);
                terrain.setTileAt([i, 0]);
            }
        }
        terrain.setTileAt([18, 0]);
        terrain.setTileAt([23, 2]);
        return terrain;
    }
    tileAt(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (this.tiles.has(x)) {
            return this.tiles.get(x).has(y);
        }
        return false;
    }
    setTileAt(pos) {
        let [x, y] = pos;
        x = Math.floor(x);
        y = Math.floor(y);
        if (this.tiles.has(x)) {
            this.tiles.get(x).add(y);
        }
        else {
            this.tiles.set(x, new Set([y]));
        }
    }
    setColumnAt(pos) {
        let [x, y] = pos;
        for (let i = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_0__["default"].deathHeight - 1; i <= y; i++) {
            this.setTileAt([x, i]);
        }
    }
    getSpritePosition(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        let tl = this.tileAt(x - 1, y + 1);
        let tc = this.tileAt(x + 0, y + 1);
        let tr = this.tileAt(x + 1, y + 1);
        let cl = this.tileAt(x - 1, y + 0);
        let cr = this.tileAt(x + 1, y + 0);
        let bl = this.tileAt(x - 1, y - 1);
        let bc = this.tileAt(x + 0, y - 1);
        let br = this.tileAt(x + 1, y - 1);
        if (!cr && !cl && !tc && !bc) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_SINGLE;
        }
        else if (tc && !cr && !cl) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_COLUMN;
        }
        else if (!cr && !cl) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_CAP;
        }
        else if (!tc && cl && cr) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_TOP;
        }
        else if (!bc && cl && cr) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_BOTTOM;
        }
        else if (!cr && tc && bc) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_RIGHT;
        }
        else if (!cl && tc && bc) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_LEFT;
        }
        else if (!tc && !cl) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_TOP_LEFT;
        }
        else if (!tc && !cr) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_TOP_RIGHT;
        }
        else if (!br && !bc && !cr) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_BOTTOM_RIGHT;
        }
        else if (!bl && !bc && !cl) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_BOTTOM_LEFT;
        }
        else if (!tl && tc && cl && bc && cr) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_LEFT_INNER_CORNER;
        }
        else if (!tr && tc && cl && bc && cr) {
            return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_RIGHT_INNER_CORNER;
        }
        else {
            let tileRng = random1(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(x, y), gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0.1324, 0.4234 + this.randomOffset));
            if (tileRng < 0.05) {
                return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_MIDDLE_ALT_1;
            }
            else if (tileRng < 0.10) {
                return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_MIDDLE_ALT_2;
            }
            else if (tileRng < 0.15) {
                return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_MIDDLE_ALT_3;
            }
            else if (tileRng < 0.20) {
                return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_MIDDLE_ALT_4;
            }
            else {
                return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_TERRAIN_MIDDLE;
            }
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Terrain);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let sceneAttributes = {
    rhythmType: 0,
    rhythmGroupLength: 20,
    levelDensity: 1,
    numberOfGroups: 3,
    gravity: 2.5,
    playerSpeed: 9.5,
    playerJump: 5.5,
    maxJumpHold: 0.4,
    maxObjectSpeed: 55,
    deathHeight: -25,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sceneAttributes);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "spriteCoordinates": () => (/* binding */ spriteCoordinates)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);

const spriteCoordinates = {
    // Terrain
    SPRITE_TERRAIN_TOP_LEFT: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 0),
    SPRITE_TERRAIN_TOP: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 0),
    SPRITE_TERRAIN_TOP_RIGHT: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(2, 0),
    SPRITE_TERRAIN_LEFT: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 1),
    SPRITE_TERRAIN_MIDDLE: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 1),
    SPRITE_TERRAIN_MIDDLE_ALT_1: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(5, 2),
    SPRITE_TERRAIN_MIDDLE_ALT_2: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(5, 3),
    SPRITE_TERRAIN_MIDDLE_ALT_3: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(6, 3),
    SPRITE_TERRAIN_MIDDLE_ALT_4: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(6, 1),
    SPRITE_TERRAIN_RIGHT: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(2, 1),
    SPRITE_TERRAIN_BOTTOM_LEFT: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 2),
    SPRITE_TERRAIN_BOTTOM: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 2),
    SPRITE_TERRAIN_BOTTOM_RIGHT: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(2, 2),
    SPRITE_TERRAIN_SINGLE: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(4, 0),
    SPRITE_TERRAIN_LEFT_INNER_CORNER: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(5, 1),
    SPRITE_TERRAIN_RIGHT_INNER_CORNER: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(6, 2),
    SPRITE_TERRAIN_COLUMN: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(7, 1),
    SPRITE_TERRAIN_CAP: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(7, 0),
    // Entities
    SPRITE_PICKUP: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 3),
    SPRITE_SPIKE: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(3, 2),
    SPRITE_PLATFORM_LEFT: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(5, 4),
    SPRITE_PLATFORM_RIGHT: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(6, 4),
    // Player
    SPRITE_PLAYER_STAND: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 7),
    SPRITE_PLAYER_JUMP: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 7),
    SPRITE_PLAYER_WALK_1: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(2, 7),
    SPRITE_PLAYER_WALK_2: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(3, 7),
    SPRITE_PLAYER_CROUCH: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(4, 7),
    SPRITE_PLAYER_IDLE1: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(5, 7),
    SPRITE_PLAYER_IDLE2: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(6, 7),
    SPRITE_PLAYER_DEATH: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(7, 7),
    // Coin
    SPRITE_COIN_1: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 3),
    SPRITE_COIN_2: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 3),
    SPRITE_COIN_3: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(2, 3),
    SPRITE_COIN_4: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 4),
    SPRITE_COIN_5: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 4),
    SPRITE_GEM: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(6, 5),
    // Particles
    SPRITE_Z: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(6, 6),
    SPRITE_POFF: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(7, 6),
    SPRITE_SPARKLE: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(5, 6),
    // Enemy
    SPRITE_BADDIE_1: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(0, 5),
    SPRITE_BADDIE_2: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(1, 5),
    // Checkpoint
    SPRITE_FLAG_1: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(2, 4),
    SPRITE_FLAG_2: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(3, 4),
    SPRITE_FLAG_3: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(4, 4),
    SPRITE_CHECK_1: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(2, 5),
    SPRITE_CHECK_2: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(3, 5),
    SPRITE_CHECK_3: gl_matrix__WEBPACK_IMPORTED_MODULE_0__.fromValues(4, 5),
};


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "transformMat2": () => (/* binding */ transformMat2),
/* harmony export */   "transformMat2d": () => (/* binding */ transformMat2d),
/* harmony export */   "transformMat3": () => (/* binding */ transformMat3),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "angle": () => (/* binding */ angle),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "sqrDist": () => (/* binding */ sqrDist),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(2);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {ReadonlyVec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */

function fromValues(x, y) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */

function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to ceil
 * @returns {vec2} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to floor
 * @returns {vec2} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to round
 * @returns {vec2} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0],
      y = a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to negate
 * @returns {vec2} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to invert
 * @returns {vec2} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */

function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {ReadonlyVec2} a The vec2 point to rotate
 * @param {ReadonlyVec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec2} out
 */

function rotate(out, a, b, rad) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(rad),
      cosC = Math.cos(rad); //perform rotation and translate to correct position

  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {ReadonlyVec2} a The first operand
 * @param {ReadonlyVec2} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1],
      // mag is the product of the magnitudes of a and b
  mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2),
      // mag &&.. short circuits if mag == 0
  cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rendering_gl_Drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


class Tile extends _rendering_gl_Drawable__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ELEMENT_ARRAY_BUFFER, this.indices, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.bufPos);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.positions, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
    }
    isInstanced() {
        return true;
    }
    setInstanceVBOs(posOffsets, uvOffsets, mirrors, scales) {
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
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.bufOff);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.offsets, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.bufUV);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.uvs, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.bufMir);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.mirrors, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.bufScale);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.scales, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tile);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

class Drawable {
    constructor() {
        this.count = 0;
        this.idxGenerated = false;
        this.posGenerated = false;
        this.uvGenerated = false;
        this.offGenerated = false;
        this.mirGenerated = false;
        this.scaleGenerated = false;
        this.numInstances = 0; // How many instances of this Drawable the shader program should draw
    }
    destroy() {
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this.bufIdx);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this.bufPos);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this.bufOff);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this.bufUV);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this.bufMir);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this.bufScale);
    }
    generateIdx() {
        this.idxGenerated = true;
        this.bufIdx = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
    }
    generatePos() {
        this.posGenerated = true;
        this.bufPos = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
    }
    generateUV() {
        this.uvGenerated = true;
        this.bufUV = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
    }
    generateOff() {
        this.offGenerated = true;
        this.bufOff = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
    }
    generateMir() {
        this.mirGenerated = true;
        this.bufMir = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
    }
    generateScale() {
        this.scaleGenerated = true;
        this.bufScale = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
    }
    bindIdx() {
        if (this.idxGenerated) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        }
        return this.idxGenerated;
    }
    bindPos() {
        if (this.posGenerated) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this.bufPos);
        }
        return this.posGenerated;
    }
    bindUV() {
        if (this.uvGenerated) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this.bufUV);
        }
        return this.uvGenerated;
    }
    bindOff() {
        if (this.offGenerated) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this.bufOff);
        }
        return this.offGenerated;
    }
    bindMir() {
        if (this.mirGenerated) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this.bufMir);
        }
        return this.mirGenerated;
    }
    bindScale() {
        if (this.scaleGenerated) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this.bufScale);
        }
        return this.scaleGenerated;
    }
    elemCount() {
        return this.count;
    }
    drawMode() {
        return _globals__WEBPACK_IMPORTED_MODULE_0__.gl.TRIANGLES;
    }
    setNumInstances(num) {
        this.numInstances = num;
    }
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawable);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rendering_gl_Drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


class Background extends _rendering_gl_Drawable__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this.numInstances = 1;
    }
    create() {
        this.indices = new Uint32Array([0, 1, 2, 0, 2, 3]);
        this.positions = new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            1.0, 1.0,
            -1.0, 1.0
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
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ELEMENT_ARRAY_BUFFER, this.indices, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.bufPos);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.positions, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bindBuffer(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.bufUV);
        _globals__WEBPACK_IMPORTED_MODULE_1__.gl.bufferData(_globals__WEBPACK_IMPORTED_MODULE_1__.gl.ARRAY_BUFFER, this.uvs, _globals__WEBPACK_IMPORTED_MODULE_1__.gl.STATIC_DRAW);
    }
    isInstanced() {
        return false;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Background);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


class Camera {
    constructor(position, height) {
        this.projectionMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create();
        this.viewMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create();
        this.aspectRatio = 1;
        this.position = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
        this.child = null;
        this.position = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(position[0], position[1]);
        this.height = height;
        this.width = height;
    }
    setAspectRatio(aspectRatio) {
        this.aspectRatio = aspectRatio;
        this.width = this.height * aspectRatio;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    updateProjectionMatrix() {
        let w = this.width / 2;
        let h = this.height / 2;
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__.ortho(this.projectionMatrix, -w, w, -h, h, -1, 1);
    }
    setPosition(newPos) {
        this.position = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(newPos[0], newPos[1]);
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__.translate(this.viewMatrix, gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create(), [newPos[0], newPos[1], 0]);
    }
    translate(amount) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_2__.add(this.position, this.position, gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(amount[0], amount[1]));
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__.translate(this.viewMatrix, gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create(), [this.position[0], this.position[1], 0]);
    }
    makeParent(child) {
        this.child = child;
    }
    update() {
        if (this.child) {
            let yPos = this.position[1];
            let offset = this.child.sPressed && this.child.isGrounded ? -3 : 2;
            let goalPos = -Math.max(this.child.getPosition()[1] + offset, _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_0__["default"].deathHeight + 10);
            if (this.child.isGrounded && Math.abs(yPos - goalPos) > 0.01) {
                yPos += (goalPos - yPos) * 0.06;
            }
            else {
                yPos += (goalPos - yPos) * 0.015;
            }
            this.setPosition([-this.child.getPosition()[0], yPos]);
        }
    }
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Camera);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shader": () => (/* binding */ Shader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


var activeProgram = null;
class Shader {
    constructor(type, source) {
        this.shader = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createShader(type);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.shaderSource(this.shader, source);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.compileShader(this.shader);
        if (!_globals__WEBPACK_IMPORTED_MODULE_0__.gl.getShaderParameter(this.shader, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.COMPILE_STATUS)) {
            throw _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getShaderInfoLog(this.shader);
        }
    }
}
;
class ShaderProgram {
    constructor(shaders) {
        this.prog = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createProgram();
        for (let shader of shaders) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.attachShader(this.prog, shader.shader);
        }
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.linkProgram(this.prog);
        if (!_globals__WEBPACK_IMPORTED_MODULE_0__.gl.getProgramParameter(this.prog, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.LINK_STATUS)) {
            throw _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getProgramInfoLog(this.prog);
        }
        this.attrPos = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getAttribLocation(this.prog, "vs_Pos");
        this.attrUV = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getAttribLocation(this.prog, "vs_UV");
        this.attrOff = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getAttribLocation(this.prog, "vs_Offset");
        this.attrMir = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getAttribLocation(this.prog, "vs_MirrorUv");
        this.attrScale = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getAttribLocation(this.prog, "vs_Scale");
        this.unifModel = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(this.prog, "u_Model");
        this.unifModelInvTr = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(this.prog, "u_ModelInvTr");
        this.unifViewProj = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(this.prog, "u_ViewProj");
        this.unifDimensions = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(this.prog, "u_Dimensions");
        this.unifTime = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(this.prog, "u_Time");
        this.unifCam = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(this.prog, "u_CameraPos");
        this.unifSpriteTex = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(this.prog, "u_SpriteTex");
        this.unifWin = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(this.prog, "u_Win");
    }
    use() {
        if (activeProgram !== this.prog) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.useProgram(this.prog);
            activeProgram = this.prog;
        }
    }
    setCameraPos(pos) {
        this.use();
        if (this.unifCam !== -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.uniform2f(this.unifCam, pos[0], pos[1]);
        }
    }
    setDimensions(width, height) {
        this.use();
        if (this.unifDimensions !== -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.uniform2f(this.unifDimensions, width, height);
        }
    }
    setWin(win) {
        this.use();
        if (this.unifWin !== -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.uniform1i(this.unifWin, win ? 1 : 0);
        }
    }
    setModelMatrix(model) {
        this.use();
        if (this.unifModel !== -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.uniformMatrix4fv(this.unifModel, false, model);
        }
        if (this.unifModelInvTr !== -1) {
            let modelinvtr = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__.transpose(modelinvtr, model);
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__.invert(modelinvtr, modelinvtr);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.uniformMatrix4fv(this.unifModelInvTr, false, modelinvtr);
        }
    }
    setViewProjMatrix(vp) {
        this.use();
        if (this.unifViewProj !== -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.uniformMatrix4fv(this.unifViewProj, false, vp);
        }
    }
    setTime(t) {
        this.use();
        if (this.unifTime !== -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.uniform1f(this.unifTime, t);
        }
    }
    setSpriteTex(tex) {
        this.use();
        if (this.unifSpriteTex !== -1) {
            tex.loadTexture();
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.uniform1i(this.unifSpriteTex, tex.slot);
        }
    }
    draw(d) {
        this.use();
        if (this.attrPos != -1 && d.bindPos()) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.enableVertexAttribArray(this.attrPos);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribPointer(this.attrPos, 2, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.FLOAT, false, 0, 0);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribDivisor(this.attrPos, 0); // Advance 1 index in pos VBO for each vertex
        }
        if (this.attrUV != -1 && d.bindUV()) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.enableVertexAttribArray(this.attrUV);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribPointer(this.attrUV, 2, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.FLOAT, false, 0, 0);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribDivisor(this.attrUV, d.isInstanced() ? 1 : 0);
        }
        if (this.attrOff != -1 && d.bindOff()) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.enableVertexAttribArray(this.attrOff);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribPointer(this.attrOff, 2, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.FLOAT, false, 0, 0);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribDivisor(this.attrOff, 1);
        }
        if (this.attrMir != -1 && d.bindMir()) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.enableVertexAttribArray(this.attrMir);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribIPointer(this.attrMir, 1, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.INT, 0, 0);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribDivisor(this.attrMir, 1);
        }
        if (this.attrScale != -1 && d.bindScale()) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.enableVertexAttribArray(this.attrScale);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribPointer(this.attrScale, 1, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.FLOAT, false, 0, 0);
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribDivisor(this.attrScale, 1);
        }
        d.bindIdx();
        if (d.isInstanced) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.drawElementsInstanced(d.drawMode(), d.elemCount(), _globals__WEBPACK_IMPORTED_MODULE_0__.gl.UNSIGNED_INT, 0, d.numInstances);
        }
        else {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.drawElements(d.drawMode(), d.elemCount(), _globals__WEBPACK_IMPORTED_MODULE_0__.gl.UNSIGNED_INT, 0);
        }
        if (this.attrPos != -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.disableVertexAttribArray(this.attrPos);
        }
        if (this.attrUV != -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.disableVertexAttribArray(this.attrUV);
        }
        if (this.attrOff != -1) {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.disableVertexAttribArray(this.attrOff);
        }
    }
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShaderProgram);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
class Texture2D {
    constructor(path, slot = 0) {
        this.loaded = false;
        this.image = new Image();
        this.image.onload = () => { this.loaded = true; };
        this.image.src = path;
        this.slot = slot;
    }
    loadTextureCallback(texture) {
        this.loaded = true;
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.activeTexture(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE0 + this.slot);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.bindTexture(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_2D, texture);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.texParameteri(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_2D, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_MAG_FILTER, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.NEAREST);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.texParameteri(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_2D, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_MIN_FILTER, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.NEAREST);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.texParameteri(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_2D, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_WRAP_S, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.REPEAT);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.texParameteri(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_2D, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_WRAP_T, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.CLAMP_TO_EDGE);
        _globals__WEBPACK_IMPORTED_MODULE_0__.gl.texImage2D(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_2D, 0, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.RGBA, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.RGBA, _globals__WEBPACK_IMPORTED_MODULE_0__.gl.UNSIGNED_BYTE, this.image);
    }
    loadTexture() {
        const texture = _globals__WEBPACK_IMPORTED_MODULE_0__.gl.createTexture();
        if (this.loaded) {
            this.loadTextureCallback(texture);
        }
        else {
            _globals__WEBPACK_IMPORTED_MODULE_0__.gl.bindTexture(_globals__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_2D, texture);
            this.image.onload = () => { this.loadTextureCallback(texture); };
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Texture2D);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LevelGenerator)
/* harmony export */ });
/* harmony import */ var _RhythmGroupGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _GeometryGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _scene_Coin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _scene_Baddie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27);




class LevelGenerator {
    constructor(_totalGroups, _terrain, minGroupDuration, maxGroupDuration, density, jumpFrequency, beatFrequencies) {
        this.totalGroups = _totalGroups;
        this.terrain = _terrain;
        this.rhythmGroups = [];
        // Create the rhythm generator
        this.groupGenerator = new _RhythmGroupGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](minGroupDuration, maxGroupDuration, density, jumpFrequency, beatFrequencies);
        // Create the geometry generator
        this.geometryGenerator = new _GeometryGenerator__WEBPACK_IMPORTED_MODULE_1__["default"](this.terrain);
    }
    generateRhythms() {
        for (let i = 0; i < this.totalGroups; i++) {
            this.rhythmGroups.push(this.groupGenerator.generateRhythmGroup());
        }
    }
    generateGeometry() {
        this.geometryGenerator.generateStartArea();
        for (let i = 0; i < this.rhythmGroups.length; i++) {
            let group = this.rhythmGroups[i];
            this.geometryGenerator.generateGroupGeometry(group);
            this.geometryGenerator.generateRestArea(14, i == this.rhythmGroups.length - 1);
        }
        return this.geometryGenerator.topTiles;
    }
    addCoins(topTiles) {
        let topTileCopy = new Map();
        for (let tt of topTiles) {
            let tile = [tt[0], tt[1]];
            topTileCopy.set(tile.toString(), tile);
        }
        let platforms = [];
        let leftmost = -1;
        let rightmost = -1;
        while (topTileCopy.size > 0) {
            let curPlatform = [];
            let curTile = topTileCopy.values().next().value;
            let curKey = curTile.toString();
            curPlatform.push(curTile);
            leftmost = curTile[0];
            rightmost = curTile[0];
            topTileCopy.delete(curKey);
            while (topTileCopy.has([leftmost - 1, curTile[1]].toString())) {
                let leftTile = [leftmost - 1, curTile[1]];
                curPlatform.push(leftTile);
                topTileCopy.delete(leftTile.toString());
                leftmost--;
            }
            while (topTileCopy.has([rightmost + 1, curTile[1]].toString())) {
                let rightTile = [rightmost + 1, curTile[1]];
                curPlatform.push(rightTile);
                topTileCopy.delete(rightTile.toString());
                rightmost++;
            }
            platforms.push(curPlatform);
        }
        let firstPlatform = true;
        for (let platform of platforms) {
            if (Math.random() < 0.25) {
                for (let tile of platform) {
                    new _scene_Coin__WEBPACK_IMPORTED_MODULE_2__["default"]([tile[0], tile[1] + 1]);
                }
            }
            else if (platform.length >= 3 &&
                Math.random() < 0.2 &&
                !firstPlatform &&
                !this.geometryGenerator.isRestTile(platform[0])) {
                let pos = platform[Math.floor(Math.random() * platform.length)];
                new _scene_Baddie__WEBPACK_IMPORTED_MODULE_3__["default"]([pos[0], pos[1] + 1], this.terrain);
            }
            firstPlatform = false;
        }
    }
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BeatPattern": () => (/* binding */ BeatPattern),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RhythmGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


var BeatPattern;
(function (BeatPattern) {
    BeatPattern[BeatPattern["REGULAR"] = 0] = "REGULAR";
    BeatPattern[BeatPattern["RANDOM"] = 1] = "RANDOM";
    BeatPattern[BeatPattern["SWING"] = 2] = "SWING";
})(BeatPattern || (BeatPattern = {}));
class RhythmGroupGenerator {
    constructor(minDuration, maxDuration, density, jumpFrequency, beatFrequencies) {
        this.minGroupDuration = minDuration;
        this.maxGroupDuration = maxDuration;
        this.patternFrequencies = new Map();
        this.jumpFrequency = jumpFrequency;
        let normalizer = beatFrequencies.reduce((prev, cur) => prev + cur);
        let patterns = [BeatPattern.REGULAR, BeatPattern.RANDOM, BeatPattern.SWING];
        for (let idx = 0; idx < patterns.length; idx++) {
            this.patternFrequencies.set(patterns[idx], beatFrequencies[idx] / normalizer);
        }
        this.density = density;
    }
    getBeatTimes(groupDuration, pattern) {
        let out = [];
        let amount = Math.floor(groupDuration * this.density);
        let shortBeat = groupDuration / (2 * amount - 1.0);
        let longBeat = 3 * shortBeat;
        for (let i = 0; i < amount; i++) {
            if (pattern === BeatPattern.REGULAR) {
                out.push(i * (groupDuration * 1.0 / amount));
            }
            else if (pattern === BeatPattern.RANDOM) {
                out.push(Math.random() * groupDuration);
            }
            else if (pattern === BeatPattern.SWING) {
                if (i % 2 == 0) {
                    out.push((i / 2) * (longBeat + shortBeat));
                }
                else {
                    out.push(((i - 1) / 2) * (longBeat + shortBeat) + longBeat);
                }
            }
        }
        return out;
    }
    generateRhythmGroup() {
        let groupDuration = this.minGroupDuration === this.maxGroupDuration ?
            this.maxGroupDuration :
            Math.abs(Math.random() * (this.maxGroupDuration - this.minGroupDuration) + this.minGroupDuration);
        // Decide the beat pattern randomly
        let rng = Math.random();
        let cumulative = 0;
        let chosenPattern;
        for (let frequency of this.patternFrequencies) {
            cumulative += frequency[1];
            if (cumulative > rng) {
                chosenPattern = frequency[0];
                break;
            }
        }
        let group = new _RhythmGroup__WEBPACK_IMPORTED_MODULE_0__["default"](groupDuration);
        let beatTimes = this.getBeatTimes(groupDuration, chosenPattern);
        let maxJumpHold = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].maxJumpHold;
        let jumpLengths = [_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.SHORT, _RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.MEDIUM, _RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.LONG];
        let lastJumpTime = -1;
        let lastJumpDuration = 0;
        group.addAction(_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.Verb.MOVE, 0, groupDuration);
        for (let time of beatTimes) {
            if (time > lastJumpTime + lastJumpDuration) {
                if (Math.random() < this.jumpFrequency) {
                    let jumpType = Math.floor(Math.random() * jumpLengths.length);
                    group.addAction(_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.Verb.JUMP, time, jumpLengths[jumpType]);
                }
            }
        }
        return group;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RhythmGroupGenerator);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Verb": () => (/* binding */ Verb),
/* harmony export */   "JumpType": () => (/* binding */ JumpType),
/* harmony export */   "Action": () => (/* binding */ Action),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

var Verb;
(function (Verb) {
    Verb[Verb["MOVE"] = 0] = "MOVE";
    Verb[Verb["JUMP"] = 1] = "JUMP";
})(Verb || (Verb = {}));
var JumpType;
(function (JumpType) {
    JumpType[JumpType["SHORT"] = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_0__["default"].maxJumpHold * 0.75] = "SHORT";
    JumpType[JumpType["MEDIUM"] = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_0__["default"].maxJumpHold * 0.875] = "MEDIUM";
    JumpType[JumpType["LONG"] = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_0__["default"].maxJumpHold] = "LONG";
})(JumpType || (JumpType = {}));
class Action {
    constructor(_type, _startTime, _duration) {
        this.type = _type;
        this.startTime = _startTime;
        this.duration = _duration;
    }
}
class RhythmGroup {
    constructor(_duration) {
        this.duration = _duration;
        this.actions = [];
    }
    addAction(type, startTime, actionDuration) {
        let groupDuration = this.duration;
        if (startTime > groupDuration) {
            return false;
        }
        if (startTime + actionDuration > groupDuration && type !== Verb.JUMP) {
            actionDuration = groupDuration - startTime;
        }
        let newAction = new Action(type, startTime, actionDuration);
        this.actions.push(newAction);
        return true;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RhythmGroup);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GeometryGenerator)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _RhythmGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _scene_Spike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _scene_Coin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _scene_Checkpoint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);
/* harmony import */ var _scene_Gem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);







class GeometryGenerator {
    constructor(_terrain) {
        this.terrain = _terrain;
        this.currentPos = gl_matrix__WEBPACK_IMPORTED_MODULE_6__.fromValues(-3, -1);
        this.jumpHeights = new Map();
        this.jumpHeights.set(_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.SHORT, this.getJumpHeight(_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.SHORT));
        this.jumpHeights.set(_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.MEDIUM, this.getJumpHeight(_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.MEDIUM));
        this.jumpHeights.set(_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.LONG, this.getJumpHeight(_RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.JumpType.LONG));
        this.topTiles = new Set();
        this.restTiles = new Map();
    }
    queuesFromRhythm(rhythm) {
        let movement = [];
        let jumps = [];
        let lastMoveStartTime = 0;
        let lastMoveDuration = 0;
        for (let action of rhythm.actions) {
            if (action.type === _RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.Verb.MOVE) {
                if (movement.length > 0) {
                    let curMoveStartTime = action.startTime;
                    let lastMove = movement[movement.length - 1];
                    movement.push({
                        state: "waiting",
                        duration: curMoveStartTime - (lastMoveStartTime + lastMoveDuration)
                    });
                }
                lastMoveDuration = action.duration;
                movement.push({
                    state: "moving",
                    duration: action.duration
                });
            }
            else if (action.type === _RhythmGroup__WEBPACK_IMPORTED_MODULE_0__.Verb.JUMP) {
                jumps.push({
                    startTime: action.startTime,
                    jumpHold: action.duration,
                });
            }
        }
        return { moveStates: movement, jumpStates: jumps };
    }
    // Calculate the height of a jump when the jump button is held for a specified amount of time
    // Also find the time it takes to get to that height
    getJumpHeight(jumpHold) {
        // This is, at its core, a ballistics problem. However, it's complicated by the fact
        // that the velocity is controlled by the player even after the jump begins. This means 
        // that to find the max height, we have to separate the jump into 2 parts: the part 
        // where the jump key is being held, and the part afterward. We have to find the height
        // and upward velocity acheived at the end of the first part, and then the second part
        // just becomes a simple physics problem. Getting those vectors will rely heavily on the
        // jumping implementation though.
        let gravity = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].gravity;
        let jumpVel = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerJump;
        // To simplify the math (and because it wouldn't be entirely accurate anyway)
        // I am just going to simulate jumping (assuming perfect framerate)
        let vel = 0;
        let inputvel = 0;
        let pos = 0;
        let jumpTime = jumpHold;
        let totalTime = 0;
        let flag = 0;
        while (true) {
            if (flag > 1) {
                if (vel - gravity < 0) {
                    break;
                }
                vel -= gravity;
            }
            flag++;
            vel += inputvel;
            pos += vel / 60.0;
            if (jumpTime > 0) {
                jumpTime -= 0.016;
                let t = Math.max(0, jumpTime / 0.4);
                inputvel = t * _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerJump;
            }
            else {
                inputvel = 0;
            }
            totalTime += 1.0 / 60;
        }
        return { height: pos, time: totalTime };
    }
    addTopTile(tile, rest = false) {
        this.topTiles.add([tile[0], tile[1]]);
        if (rest) {
            if (this.restTiles.has(tile[0])) {
                this.restTiles.get(tile[0]).add(tile[1]);
            }
            else {
                this.restTiles.set(tile[0], new Set([tile[1]]));
            }
        }
    }
    isRestTile(tile) {
        if (this.restTiles.has(tile[0])) {
            return this.restTiles.get(tile[0]).has(tile[1]);
        }
        return false;
    }
    generateSimpleJump(jumpType) {
        let height = this.jumpHeights.get(jumpType);
        let minHeight = Math.max(-4, _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].deathHeight + 5 - this.currentPos[1]);
        let endHeight = Math.floor(Math.random() * (height.height - minHeight) + minHeight);
        let totalFrames = height.time * 60 + Math.sqrt((height.height - endHeight) / (_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].gravity / 60));
        let totalDistance = Math.floor(_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed * totalFrames / 60);
        if (totalDistance === 2 && endHeight === 0) {
            endHeight = 1;
        }
        this.currentPos[0] += totalDistance;
        this.currentPos[1] += endHeight;
        this.terrain.setTileAt(this.currentPos);
        this.addTopTile(this.currentPos);
    }
    generateSpikeJump(jumpType) {
        let height = this.jumpHeights.get(jumpType);
        let peakDistance = Math.floor(_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed * height.time);
        let totalFrames = height.time * 60 + Math.sqrt(height.height / (_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].gravity / 60));
        let totalDistance = Math.floor(_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed * totalFrames / 60) + 2;
        for (let i = 0; i <= totalDistance; i++) {
            if (i === peakDistance) {
                this.terrain.setColumnAt([this.currentPos[0] + i, this.currentPos[1] - 1]);
            }
            else {
                this.terrain.setColumnAt([this.currentPos[0] + i, this.currentPos[1]]);
                this.addTopTile([this.currentPos[0] + i, this.currentPos[1]]);
            }
        }
        for (let i = 0; i < height.height; i++) {
            new _scene_Spike__WEBPACK_IMPORTED_MODULE_2__["default"]([this.currentPos[0] + peakDistance, this.currentPos[1] + i]);
        }
        for (let i = 0; i < 4; i++) {
            new _scene_Spike__WEBPACK_IMPORTED_MODULE_2__["default"]([
                this.currentPos[0] + peakDistance,
                height.height + this.currentPos[1] + 4 + i
            ]);
        }
        if (Math.random() < 0.25) {
            new _scene_Coin__WEBPACK_IMPORTED_MODULE_3__["default"]([this.currentPos[0] + peakDistance + 0, this.currentPos[1] + height.height + 1]);
        }
        for (let i = -1; i <= 1; i++) {
            for (let j = 0; j <= 1; j++) {
                this.terrain.setTileAt([
                    this.currentPos[0] + peakDistance + i,
                    height.height + this.currentPos[1] + 9 + j
                ]);
            }
        }
        this.currentPos[0] += totalDistance;
    }
    generateSpikeGap(jumpType) {
        let height = this.jumpHeights.get(jumpType);
        let totalFrames = height.time * 60 + Math.sqrt((height.height) / (_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].gravity / 60));
        let totalDistance = Math.floor(_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed * totalFrames / 60);
        let peakDistance = Math.floor(_scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed * height.time);
        for (let jump of this.jumpHeights.keys()) {
            if (jumpType != jump) {
                new _scene_Spike__WEBPACK_IMPORTED_MODULE_2__["default"]([
                    this.currentPos[0] + peakDistance,
                    this.currentPos[1] + this.jumpHeights.get(jump).height
                ]);
            }
            else {
                new _scene_Coin__WEBPACK_IMPORTED_MODULE_3__["default"]([
                    this.currentPos[0] + peakDistance,
                    this.currentPos[1] + this.jumpHeights.get(jump).height
                ]);
            }
        }
        this.currentPos[0] += totalDistance;
        this.terrain.setTileAt(this.currentPos);
        this.addTopTile(this.currentPos);
    }
    generateStraightPath(length) {
        for (let i = 0; i < Math.round(length); i++) {
            this.terrain.setColumnAt(this.currentPos);
            this.addTopTile(this.currentPos);
            this.currentPos[0] += 1;
        }
    }
    gentleDecline(length, decline) {
        let currentHeight = this.currentPos[1];
        for (let i = 0; i < Math.round(length); i++) {
            this.terrain.setColumnAt(this.currentPos);
            this.addTopTile(this.currentPos);
            currentHeight -= decline / length;
            this.currentPos[0] += 1;
            this.currentPos[1] = Math.round(currentHeight);
        }
    }
    generateGroupGeometry(rhythm) {
        let playerSpeed = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed;
        let queues = this.queuesFromRhythm(rhythm);
        let curTime = 0;
        for (let i = 0; i < queues.jumpStates.length; i++) {
            let jump = queues.jumpStates[i];
            let beatDuration = rhythm.duration - jump.startTime;
            if (i < queues.jumpStates.length - 1) {
                beatDuration = queues.jumpStates[i + 1].startTime - jump.startTime;
            }
            let prevX = this.currentPos[0];
            let obstacleType = Math.random();
            if (obstacleType < 0.2) {
                this.generateSpikeGap(jump.jumpHold);
            }
            else if (obstacleType < 0.4) {
                this.generateSpikeJump(jump.jumpHold);
            }
            else {
                this.generateSimpleJump(jump.jumpHold);
            }
            let jumpTime = (this.currentPos[0] - prevX) / playerSpeed;
            let remainingTime = beatDuration - jumpTime;
            if (remainingTime > 0) {
                let remainingLength = remainingTime * playerSpeed;
                if (Math.random() < 0.25) {
                    this.gentleDecline(remainingLength, Math.random() < 0.5 ? 1 : 2);
                }
                else {
                    this.generateStraightPath(remainingLength);
                }
            }
        }
    }
    generateRestArea(length, lastRest = false) {
        for (let i = 1; i <= length; i++) {
            this.addTopTile([this.currentPos[0] + i, this.currentPos[1] - 1], true);
            this.terrain.setTileAt([this.currentPos[0] + i, this.currentPos[1] - 1]);
            this.terrain.setTileAt([this.currentPos[0] + i, this.currentPos[1] - 2]);
        }
        this.terrain.setColumnAt([this.currentPos[0] + 1, this.currentPos[1] - 2]);
        this.terrain.setColumnAt([this.currentPos[0] + length, this.currentPos[1] - 2]);
        this.currentPos[0] += length;
        this.currentPos[1] -= 1;
        if (lastRest) {
            new _scene_Gem__WEBPACK_IMPORTED_MODULE_5__["default"]([
                Math.floor(this.currentPos[0] - length / 2),
                this.currentPos[1] + 2
            ]);
        }
        else {
            new _scene_Checkpoint__WEBPACK_IMPORTED_MODULE_4__["default"]([
                Math.floor(this.currentPos[0] - length / 2),
                this.currentPos[1] + 1
            ]);
        }
    }
    generateStartArea() {
        for (let i = -4; i <= 4; i++) {
            this.terrain.setTileAt([i, 0]);
            this.terrain.setTileAt([i, -1]);
            this.terrain.setTileAt([i, -3]);
            this.terrain.setTileAt([i, -4]);
            if (i !== -2 && i !== 2) {
                this.terrain.setTileAt([i, -2]);
            }
            this.currentPos[0] = 4;
            this.currentPos[1] = 0;
        }
        for (let i = _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].deathHeight; i < -4; i++) {
            this.terrain.setTileAt([-4, i]);
            this.terrain.setTileAt([4, i]);
        }
        let m = (time) => {
            return gl_matrix__WEBPACK_IMPORTED_MODULE_6__.fromValues(0, 1 - Math.cos(time));
        };
    }
}


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);


class Spike extends _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos) {
        super(false, true, true);
        this.setPosition(pos);
    }
    getSpriteUv() {
        return _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_SPIKE;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spike);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _GameEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



class GameObject {
    constructor(isDynamic, isPassive, isCollidable) {
        this.dynamic = isDynamic;
        this.passive = isPassive;
        this.collidable = isCollidable;
        this.position = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 0);
        this.velocity = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 0);
        this.inputVelocity = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 0);
        this.prevInputVelocty = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 0);
        this.direction = 1;
        this.size = 1;
        _GameEngine__WEBPACK_IMPORTED_MODULE_0__["default"].getEngine().addGameObject(this);
    }
    get isGrounded() {
        return this.grounded;
    }
    destroy() {
        _GameEngine__WEBPACK_IMPORTED_MODULE_0__["default"].getEngine().destroyGameObject(this);
        this.drawable = null;
    }
    isPassive() {
        return this.passive;
    }
    isCollidable() {
        return this.collidable;
    }
    facingLeft() {
        return this.direction === -1;
    }
    getPosition() {
        return gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(this.position[0], this.position[1]);
    }
    setPosition(newPosition) {
        this.position[0] = newPosition[0];
        this.position[1] = newPosition[1];
    }
    scale(amount) {
        this.size *= amount;
    }
    setSize(size) {
        this.size = size;
    }
    translate(amount) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_2__.add(this.position, this.position, gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(amount[0], amount[1]));
    }
    getVelocity() {
        return gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(this.velocity[0], this.velocity[1]);
    }
    physicsUpdate(delta) {
        if (!this.dynamic) {
            return;
        }
        let prevVelocity = this.velocity;
        //this.velocity = vec2.fromValues(0, 0);
        // Apply gravity
        if (this.grounded) {
            this.velocity[1] = 0;
        }
        else {
            this.velocity[1] -= _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].gravity;
        }
        // Apply non-physical motion
        if (Math.abs(this.inputVelocity[0]) > 0.001) {
            let influence = this.grounded ? 0.2 : 0.11;
            this.velocity[0] = (1 - influence) * this.velocity[0] + influence * this.inputVelocity[0];
        }
        else if (this.grounded) {
            this.velocity[0] *= 0.7;
        }
        else {
            this.velocity[0] *= 0.95;
        }
        this.velocity[1] += this.inputVelocity[1];
        // Scale back velocity if it's too high
        let speed = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.length(this.velocity);
        if (speed > _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].maxObjectSpeed) {
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__.scale(this.velocity, this.velocity, _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].maxObjectSpeed / speed);
        }
        // Update the object position, accounting for collisions
        // We assume that before applying any motion this frame, the object is not intersecting anything
        // We will use the following technique to do this:
        //   - Apply the velocity vector to our position in the x axis only
        //   - Check if, in this new position, the object intersects with the terrain (in all axes)
        //   - If the object is now intersecting with a tile, we respond by pushing back the object by
        //     the amount of the overlap
        //     - Note that this pushback will only have to be in the x axis
        //   - Repeat with the y-axis
        let deltaPos = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.scale(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create(), this.velocity, 1.0 / 60);
        this.goCollide = false;
        for (let axis = 0; axis < 2; axis++) {
            if (Math.abs(deltaPos[axis]) > 10e-6) {
                this.position[axis] += deltaPos[axis];
                let adjacentTiles = this.getAdjacentTiles();
                for (let tile of adjacentTiles) {
                    for (let terrain of _GameEngine__WEBPACK_IMPORTED_MODULE_0__["default"].getEngine().terrainObjects) {
                        let response = this.testTerrainCollision(terrain, tile, axis);
                        gl_matrix__WEBPACK_IMPORTED_MODULE_2__.add(this.position, this.position, response);
                    }
                }
                for (let go of _GameEngine__WEBPACK_IMPORTED_MODULE_0__["default"].getEngine().getCollidableObjects()) {
                    if (go.constructor.name === "Platform") {
                        let response = this.goCollisionResponse(go, axis);
                        if (response[1] > 0.0001) {
                            this.goCollide = true;
                        }
                        gl_matrix__WEBPACK_IMPORTED_MODULE_2__.add(this.position, this.position, response);
                    }
                }
            }
        }
        let groundedCheck = this.checkIfGrounded();
        if (!this.grounded && groundedCheck) {
            this.onGrounded(this.velocity[1]);
        }
        this.grounded = groundedCheck;
        gl_matrix__WEBPACK_IMPORTED_MODULE_2__.copy(this.prevInputVelocty, this.inputVelocity);
        this.inputVelocity = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 0);
    }
    checkObjectCollisions(other) {
        if (this.testGameObjectCollision(other)) {
            this.onCollision(other);
        }
    }
    getAdjacentTiles() {
        let x = Math.floor(this.position[0]);
        let y = Math.floor(this.position[1]);
        return [
            [x - 1, y + 1], [x + 0, y + 1], [x + 1, y + 1],
            [x - 1, y + 0], [x + 0, y + 0], [x + 1, y + 0],
            [x - 1, y - 1], [x + 0, y - 1], [x + 1, y - 1]
        ];
    }
    testTerrainCollision(terrain, tile, axis) {
        let tX = tile[0];
        let tY = tile[1];
        let pX = this.position[0];
        let pY = this.position[1];
        if (!terrain.tileAt(tX, tY)) {
            return gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
        }
        let xIntersect = pX < (tX + 1) && tX < (pX + 1);
        let yIntersect = pY < (tY + 1) && tY < (pY + 1);
        let isIntersecting = xIntersect && yIntersect;
        let axisVelocity = this.velocity[axis];
        if (isIntersecting) {
            let pushback = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
            if (axisVelocity > 0) {
                let isY = (axis == 1) ? 0 : 0;
                pushback[axis] = tile[axis] - (this.position[axis] + 1 + isY);
            }
            else {
                pushback[axis] = (tile[axis] + 1) - this.position[axis];
            }
            return pushback;
        }
        else {
            return gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
        }
    }
    testGameObjectCollision(other) {
        let tX = other.getPosition()[0];
        let tY = other.getPosition()[1];
        let pX = this.position[0];
        let pY = this.position[1];
        // Anti-frustration feature
        if (other.constructor.name === "Spike" || other.constructor.name === "Baddie") {
            tX += 0.5;
            tY += 0.5;
            let xIntersect = tX > pX && tX < pX + 1;
            let yIntersect = tY > pY && tY < pY + 1;
            return xIntersect && yIntersect;
            ;
        }
        let xIntersect = pX < (tX + 0.99) && tX < (pX + 0.99);
        let yIntersect = pY < (tY + 0.99) && tY < (pY + 0.99);
        let isIntersecting = xIntersect && yIntersect;
        return isIntersecting;
    }
    goCollisionResponse(other, axis) {
        let tX = other.position[0];
        let tY = other.position[1];
        let pX = this.position[0];
        let pY = this.position[1];
        if (other.passive || !other.collidable) {
            return gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
        }
        let xIntersect = pX < (tX + 1) && tX < (pX + 1);
        let yIntersect = pY < (tY + 1) && tY < (pY + 1);
        let isIntersecting = xIntersect && yIntersect;
        let axisVelocity = this.velocity[axis];
        if (isIntersecting) {
            let pushback = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
            if (axisVelocity > 0) {
                let isY = (axis == 1) ? 0 : 0;
                pushback[axis] = other.position[axis] - (this.position[axis] + 1 + isY);
            }
            else {
                pushback[axis] = (other.position[axis] + 1) - this.position[axis];
            }
            return pushback;
        }
        else {
            return gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create();
        }
    }
    checkIfGrounded() {
        // Check if we would be colliding with a block if we were just a teensy bit lower
        let newPos = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.subtract(gl_matrix__WEBPACK_IMPORTED_MODULE_2__.create(), this.position, gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(0, 0.05));
        let gridPosition = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.fromValues(Math.floor(newPos[0]), Math.floor(newPos[1]));
        for (let x = 0; x < 2; x++) {
            let tX = gridPosition[0] + x;
            let tY = gridPosition[1];
            let existsTile = false;
            for (let terrain of _GameEngine__WEBPACK_IMPORTED_MODULE_0__["default"].getEngine().terrainObjects) {
                if (terrain.tileAt(tX, tY)) {
                    existsTile = true;
                    break;
                }
            }
            if (!existsTile) {
                continue;
            }
            if (newPos[0] < (tX + 1) && tX < (newPos[0] + 1) &&
                newPos[1] < (tY + 1) && tY < (newPos[1] + 1)) {
                return true;
            }
        }
        let oldPos = [this.position[0], this.position[1]];
        this.setPosition(newPos);
        for (let go of _GameEngine__WEBPACK_IMPORTED_MODULE_0__["default"].getEngine().getCollidableObjects()) {
            if (go.constructor.name === "Platform" && this.testGameObjectCollision(go)) {
                this.setPosition(oldPos);
                return true;
            }
        }
        this.setPosition(oldPos);
        return false;
    }
    onUpdate(delta) { }
    ;
    onKeyPress(key) { }
    ;
    onKeyDown(key) { }
    ;
    onKeyUp(key) { }
    onGrounded(verticalVelocity) { }
    onCollision(other) { }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameObject);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




const ANIMATION_FRAME_LENGTH = 5;
class Coin extends _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos) {
        super(false, true, true);
        this.animationFrame = 0;
        this.setPosition(pos);
        this.direction = 1;
    }
    onUpdate(delta) {
        this.animationFrame = (this.animationFrame + 1) % (ANIMATION_FRAME_LENGTH * 8);
        if (Math.random() < 0.01) {
            let sparkle = new _Particle__WEBPACK_IMPORTED_MODULE_1__["default"](_constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_SPARKLE, gl_matrix__WEBPACK_IMPORTED_MODULE_3__.fromValues(this.getPosition()[0] + Math.random() - 0.5, this.getPosition()[1] + Math.random() - 0.5), 0.5);
            sparkle.setMovement((time) => {
                sparkle.setSize(time * (0.5 - time) * 8);
                return gl_matrix__WEBPACK_IMPORTED_MODULE_3__.create();
            });
        }
    }
    getSpriteUv() {
        if (this.animationFrame < ANIMATION_FRAME_LENGTH * 1) {
            return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_COIN_1;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 2) {
            return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_COIN_2;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 3) {
            return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_COIN_3;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 4) {
            return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_COIN_4;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 5) {
            //this.direction = this.direction = -1;
            return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_COIN_5;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 6) {
            return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_COIN_4;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 7) {
            return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_COIN_3;
        }
        else if (this.animationFrame < ANIMATION_FRAME_LENGTH * 8) {
            return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_COIN_2;
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Coin);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Particle)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);


class Particle extends _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(_spriteUv, _startingPos, _lifetime = Infinity) {
        super(false, true, false);
        this.spriteUv = _spriteUv;
        this.lifetime = _lifetime;
        this.time = 0;
        this.startingPos = _startingPos;
        this.movement = () => gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create();
        ;
    }
    setMovement(move) {
        this.movement = move;
    }
    onUpdate(delta) {
        this.time += delta;
        if (this.time > this.lifetime) {
            this.destroy();
        }
        this.setPosition(gl_matrix__WEBPACK_IMPORTED_MODULE_1__.add(gl_matrix__WEBPACK_IMPORTED_MODULE_1__.create(), this.movement(this.time), this.startingPos));
    }
    getSpriteUv() {
        return this.spriteUv;
    }
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




const ANIMATION_FRAME_LENGTH = 10;
function random1(p, seed) {
    let fract = (n) => n - Math.floor(n);
    return fract(Math.sin(gl_matrix__WEBPACK_IMPORTED_MODULE_3__.dot(gl_matrix__WEBPACK_IMPORTED_MODULE_3__.add(gl_matrix__WEBPACK_IMPORTED_MODULE_3__.create(), p, seed), gl_matrix__WEBPACK_IMPORTED_MODULE_3__.fromValues(127.1, 311.7))) * 41352.5245);
}
class Checkpoint extends _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos) {
        super(false, false, true);
        this.animationFrame = 0;
        this.setPosition(pos);
        this.claimed = false;
    }
    onUpdate(delta) {
        this.animationFrame = (this.animationFrame + 1) % (ANIMATION_FRAME_LENGTH * 3);
    }
    onCollision(other) {
        if (other.constructor.name === "Player" && !this.claimed) {
            this.claimed = true;
            let numParticles = 30;
            for (let i = 0; i < numParticles; i++) {
                let p = new _Particle__WEBPACK_IMPORTED_MODULE_1__["default"](_constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_SPARKLE, this.getPosition(), 1);
                p.setMovement((time) => {
                    let angle = 2 * Math.floor(i / 2) * Math.PI / numParticles;
                    let offset = random1(gl_matrix__WEBPACK_IMPORTED_MODULE_3__.fromValues(i, 0), gl_matrix__WEBPACK_IMPORTED_MODULE_3__.fromValues(0.231, 0.5436)) * 0.5;
                    p.setSize(1 - time);
                    return gl_matrix__WEBPACK_IMPORTED_MODULE_3__.fromValues(Math.cos(angle) * time * 8 + offset, Math.sin(angle) * time * 8 + offset - time * time * 10);
                });
            }
        }
    }
    getSpriteUv() {
        if (this.claimed) {
            if (this.animationFrame < 1 * ANIMATION_FRAME_LENGTH) {
                return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_CHECK_1;
            }
            else if (this.animationFrame < 2 * ANIMATION_FRAME_LENGTH) {
                return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_CHECK_2;
            }
            else {
                return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_CHECK_3;
            }
        }
        else {
            if (this.animationFrame < 1 * ANIMATION_FRAME_LENGTH) {
                return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_FLAG_1;
            }
            else if (this.animationFrame < 2 * ANIMATION_FRAME_LENGTH) {
                return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_FLAG_2;
            }
            else {
                return _constants__WEBPACK_IMPORTED_MODULE_2__.spriteCoordinates.SPRITE_FLAG_3;
            }
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Checkpoint);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gem)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _engine_GameEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);





class Gem extends _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos) {
        super(false, false, true);
        this.setPosition(pos);
    }
    getSpriteUv() {
        return _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_GEM;
    }
    onUpdate(delta) {
        if (Math.random() < 0.02) {
            let sparkle = new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](_constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_SPARKLE, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(this.getPosition()[0] + Math.random() - 0.5, this.getPosition()[1] + Math.random() - 0.5), 0.5);
            sparkle.setMovement((time) => {
                sparkle.setSize(time * (0.5 - time) * 8);
                return gl_matrix__WEBPACK_IMPORTED_MODULE_4__.create();
            });
        }
    }
    onCollision(other) {
        if (other.constructor.name === "Player") {
            _engine_GameEngine__WEBPACK_IMPORTED_MODULE_1__["default"].getEngine().onWin();
            this.destroy();
        }
    }
}


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);


const ANIMATION_FRAME_LENGTH = 12;
const ENEMY_SPEED = 4;
class Baddie extends _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos, terrain) {
        super(false, false, true);
        this.animationFrame = 0;
        this.setPosition(pos);
        this.direction = 1;
        this.terrain = terrain;
    }
    onUpdate(delta) {
        this.animationFrame = (this.animationFrame + 1) % ANIMATION_FRAME_LENGTH;
        let tileBelow = [this.getPosition()[0] + 0.01 * this.direction, this.getPosition()[1] - 0.01];
        let tileInFront = [this.getPosition()[0] + 0.01 * this.direction, this.getPosition()[1]];
        if (this.direction === 1) {
            tileInFront[0] += 1;
            tileBelow[0] += 1;
        }
        if (this.terrain.tileAt(tileInFront[0], tileInFront[1]) ||
            !this.terrain.tileAt(tileBelow[0], tileBelow[1])) {
            this.direction *= -1;
        }
        this.translate([ENEMY_SPEED * 1.0 / 60 * this.direction, 0]);
    }
    getSpriteUv() {
        return this.animationFrame > ANIMATION_FRAME_LENGTH / 2 ?
            _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_BADDIE_1 :
            _constants__WEBPACK_IMPORTED_MODULE_1__.spriteCoordinates.SPRITE_BADDIE_2;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Baddie);


/***/ }),
/* 28 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "fd09b754b45d93b17a64.png";

/***/ }),
/* 29 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "17659974d50b779914d9.png";

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = "#version 300 es\nprecision highp float;\n\nuniform mat4 u_ViewProj;\nuniform mat4 u_Model;\n\nin vec2 vs_Pos;\nin vec2 vs_Offset;\nin vec2 vs_UV;\nin float vs_Scale;\nin int vs_MirrorUv;\nout vec2 fs_Pos;\nout vec2 fs_UV;\n\nvoid main() {\n    fs_Pos = vs_Pos;\n    bool mirrorUv = vs_MirrorUv == 1;\n    fs_UV = vs_UV + vec2(mirrorUv ? 1.0 - vs_Pos.x : vs_Pos.x, 1.0 - vs_Pos.y);\n\n    vec2 actualPos = (vs_Pos - vec2(0.5, 0.5)) * vs_Scale + vs_Offset + vec2(0.0, 0.0);\n    gl_Position = u_ViewProj * u_Model * vec4(actualPos, 0.5, 1);\n}\n"

/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = "#version 300 es\nprecision highp float;\n\nuniform sampler2D u_SpriteTex;\nuniform int u_Win;\nuniform float u_Time;\n\nin vec2 fs_Pos;\nin vec2 fs_UV;\n\nout vec4 out_Col;\n\n\nvoid main() {\n    vec4 color = texture(u_SpriteTex, fs_UV / 8.0);\n    if (color.a < 0.5) {\n        discard;\n    }\n    if (u_Win == 1) {\n        color = vec4(0, 0, 0, 1);\n    }\n    out_Col = color;\n}\n"

/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = "#version 300 es\nprecision highp float;\n\nuniform vec2 u_CameraPos;\n\nin vec2 vs_Pos;\nin vec2 vs_UV;\nout vec2 fs_Pos;\nout vec2 fs_UV1;\nout vec2 fs_UV2;\n\nvoid main() {\n    fs_Pos = vs_Pos;\n    const float squish1 = 1.8;\n    fs_UV1 = vec2(\n        vs_UV[0] / 1.5 - u_CameraPos[0] / 150.0,\n        (vs_UV[1] / 4.0) * squish1 - (squish1 / 4.0 - 0.25) + (u_CameraPos[1] + 2.0) / 100.0\n    );\n\n    const float squish2 = 1.0;\n    fs_UV2 = vec2(\n        vs_UV[0] / 2.0 - u_CameraPos[0] / 300.0,\n        (vs_UV[1] / 4.0 + 0.25) * squish2 - (squish2 / 4.0 - 0.25) + (u_CameraPos[1] + 2.0) / 200.0\n    );\n\n    gl_Position = vec4(vs_Pos, 0, 1);\n}\n"

/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = "#version 300 es\nprecision highp float;\n\nuniform sampler2D u_SpriteTex;\nuniform vec2 u_CameraPos;\nuniform float u_Time;\nuniform int u_Win;\n\nin vec2 fs_Pos;\nin vec2 fs_UV1;\nin vec2 fs_UV2;\n\nout vec4 out_Col;\n\nconst vec2 SEED2 = vec2(0.31415, 0.6456);\n\nvec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d){\n    return a + b*cos( 6.28318*(c*t+d) );\n}\n\nfloat random1(vec2 p) {\n    return fract(sin(dot(p + SEED2, vec2(127.1, 311.7))) * 43758.5453);\n}\n\nvec2 random2( vec2 p , vec2 seed) {\n    return fract(sin(vec2(dot(p + seed, vec2(311.7, 127.1)), dot(p + seed, vec2(269.5, 183.3)))) * 85734.3545);\n}\n\nfloat worley(vec2 noisePos, float frequency) {\n    vec2 point = noisePos * frequency;\n    vec2 cell = floor(point);\n\n    // Check the neighboring cells for the closest cell point\n    float closestDistance = 2.0;\n    for (int i = 0; i < 9; i++) {\n        vec2 curCell = cell + vec2(i % 3 - 1, floor(float(i / 3) - 1.0));\n        vec2 cellPoint = vec2(curCell) + random2(vec2(curCell), SEED2);\n        closestDistance = min(closestDistance, distance(cellPoint, point));\n    }\n    return clamp(0.0, 1.0, closestDistance);\n}\n\nfloat brownianNoise(vec2 noisePos, vec2 seed) {\n    vec2 boxPos = vec2(floor(noisePos.x), floor(noisePos.y));\n\n    // Get the noise at the corners of the cells\n    float corner0 = random1(boxPos + vec2(0.0, 0.0));\n    float corner1 = random1(boxPos + vec2(1.0, 0.0));\n    float corner2 = random1(boxPos + vec2(0.0, 1.0));\n    float corner3 = random1(boxPos + vec2(1.0, 1.0));\n\n    // Get cubic interpolation factors\n    float tx = smoothstep(0.0, 1.0, fract(noisePos.x));\n    float ty = smoothstep(0.0, 1.0, fract(noisePos.y));\n\n    // Perform bicubic interpolation\n    return mix(mix(corner0, corner1, tx), mix(corner2, corner3, tx), ty);\n}\n\nfloat fbm(vec2 noisePos, int numOctaves, float startFrequency) {\n    float totalNoise = 0.0;\n    float normalizer = 0.0;\n    const float PERSISTENCE = 0.5;\n\n    float frequency = startFrequency;\n    float amplitude = PERSISTENCE;\n\n    for (int i = 0; i < numOctaves; i++) {\n        normalizer += amplitude;\n        totalNoise += brownianNoise(noisePos * frequency, SEED2) * amplitude;\n        frequency *= 2.0;\n        amplitude *= PERSISTENCE;\n    }\n    return totalNoise / normalizer;\n}\n\nvoid main() {\n    vec2 uv1 = vec2(fs_UV1.x, clamp(fs_UV1.y, 0.000, 0.249));\n    vec2 uv2 = vec2(fs_UV2.x, clamp(fs_UV2.y, 0.251, 0.499));\n    float starRadius = 0.01 + abs(sin(u_Time * 0.01 + random1(fs_Pos) * 100.0)) * 0.01;\n    vec3 stars = worley(fs_Pos, 10.0) < starRadius ? vec3(1) : vec3(0);\n    vec4 sky = mix(vec4(0.3, 0.3, 0.25, 1.0), vec4(stars, 1), pow((fs_Pos[1] + 1.0) / 2.0, 0.5));\n\n    vec4 layer1 = texture(u_SpriteTex, uv1);\n    vec4 layer2 = texture(u_SpriteTex, uv2);\n\n    if (u_Win == 1) {\n        float t1 = cos(fs_Pos[0] + fs_Pos[1] + u_Time * 0.01);\n        float t2 = (sin(-2.0 * fs_Pos[1] + u_Time * 0.01) * cos(2.0 * fs_Pos[0] + u_Time * 0.01));\n\n        float t3 = pow(fbm(fs_Pos - vec2(u_Time * 0.005) + vec2(\n            fbm(fs_Pos + vec2(u_Time * 0.001), 2, 2.5),\n            worley(fs_Pos, 10.0)\n        ), \n        3, 5.0), 2.0);\n\n        layer1.rgb = palette(t1, vec3(0.5), vec3(0.5), vec3(1), vec3(0, 0.33, 0.67)) * 0.2;\n        layer2.rgb = palette(t2, vec3(0.5), vec3(0.5), vec3(1), vec3(0, 0.33, 0.67)) * 0.4;\n        vec3 skyColor = palette(t3, vec3(0.5), vec3(0.5), vec3(1), vec3(0, 0.33, 0.67)) * 0.8;\n        sky.rgb = worley(fs_Pos, 10.0) < starRadius ? vec3(1) - skyColor : skyColor;\n    }\n\n    vec4 color = \n        layer1.a > 0.5 ? layer1 :\n        layer2.a > 0.5 ? layer2 :\n        sky;\n\n    out_Col = vec4(color.rgb, 1);\n}\n"

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _SceneAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);





const WALK_CYCLE_LENGTH = 10;
class Player extends _engine_GameObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(_startPos) {
        super(true, false, true);
        this.jumping = false;
        this.groundedImmunity = false;
        this.direction = 1;
        this.walkFrame = 0;
        this.moving = false;
        this.aPressed = false;
        this.dPressed = false;
        this.sPressed = false;
        this.startPos = gl_matrix__WEBPACK_IMPORTED_MODULE_4__.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__.copy(this.startPos, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(_startPos[0], _startPos[1]));
        this.setPosition(this.startPos);
        this.idleTime = 0;
        this.zTime = 0;
        this.dead = false;
        this.deathTimer = 0;
        this.win = false;
    }
    onUpdate(delta) {
        if (this.win) {
            return;
        }
        if (this.dead) {
            this.dynamic = false;
            this.grounded = true;
            this.deathTimer++;
            this.direction = this.deathTimer % 20 < 10 ? 1 : -1;
            if (this.deathTimer > 40 && this.deathTimer < 70) {
                this.translate([0, (70 - this.deathTimer) * 0.025 - 15.0 / 60]);
            }
            if (this.deathTimer > 70) {
                this.translate([0, -15.0 / 60]);
            }
        }
        if (this.jumping) {
            // I have decided to perform this operation in units of frames instead of seconds to ensure
            // that the jump height is consistent. It makes geometry generator calculations easier too
            this.jumpTime -= 0.016;
            let t = Math.max(0, this.jumpTime / 0.4);
            this.inputVelocity[1] = t * _SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerJump;
        }
        if (this.jumpTime <= 0 || (this.isGrounded && !this.groundedImmunity)) {
            this.jumping = false;
        }
        this.groundedImmunity = false;
        if (!this.aPressed && !this.dPressed || (this.aPressed && this.dPressed)) {
            this.moving = false;
        }
        if (this.moving) {
            this.walkFrame++;
            let skidThresh = _SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed / 4;
            if (this.isGrounded && ((this.aPressed && this.getVelocity()[0] > skidThresh) ||
                (this.dPressed && this.getVelocity()[0] < -skidThresh))) {
                let poff1 = new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](_constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_POFF, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(this.getPosition()[0], this.getPosition()[1] - 0.5), 0.25);
                poff1.scale(0.5);
                poff1.setMovement((time) => {
                    poff1.scale(1.03);
                    return gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(0, time * time * 10);
                });
                let poff2 = new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](_constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_POFF, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(this.getPosition()[0], this.getPosition()[1] - 0.5), 0.25);
                poff2.scale(0.5);
                poff2.setMovement((time) => {
                    poff2.scale(1.03);
                    return gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(0, time * time * 5);
                });
            }
        }
        else {
            this.walkFrame = 0;
        }
        ;
        if (this.getPosition()[1] < _SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].deathHeight) {
            this.onDeath();
        }
        if (!this.isGrounded || this.sPressed || this.moving) {
            this.idleTime = 0;
        }
        else {
            this.idleTime += delta;
        }
        if (this.idleTime > 20) {
            if (this.zTime > 2) {
                let z = new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](_constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_Z, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(this.getPosition()[0], this.getPosition()[1]), 3.5);
                z.setMovement((time) => {
                    if (time > 1) {
                        z.scale(0.99);
                    }
                    return gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(time, Math.sin(time * 3) * 0.3 + time);
                });
                this.zTime = 0;
            }
            this.zTime += delta;
        }
        else {
            this.zTime = 0;
        }
    }
    onGrounded(verticalVelocity) {
        if (verticalVelocity < -40) {
            let thisPos = this.getPosition();
            let poff1 = new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](_constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_POFF, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(thisPos[0], thisPos[1] - 0.5), 3);
            poff1.setMovement((time) => {
                poff1.scale(1 - time / 3);
                return gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(4 * time, 5 * time * time);
            });
            let poff2 = new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](_constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_POFF, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(thisPos[0], thisPos[1] - 0.5), 3);
            poff2.setMovement((time) => {
                poff2.scale(1 - time / 3);
                return gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(-4 * time, 5 * time * time);
            });
        }
    }
    onKeyPress(key) {
        if (this.dead || this.win) {
            return;
        }
        let playerMovement = this.isGrounded ? _SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed : _SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].playerSpeed;
        if (key === "a" || key === "ArrowLeft") {
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__.add(this.inputVelocity, this.inputVelocity, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(-playerMovement, 0));
            this.direction = -1;
            this.moving = true;
        }
        else if (key === "d" || key === "ArrowRight") {
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__.add(this.inputVelocity, this.inputVelocity, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(playerMovement, 0));
            this.direction = 1;
            this.moving = true;
        }
    }
    onKeyDown(key) {
        if (this.dead || this.win) {
            return;
        }
        if ((key === 'w' || key === " " || key === "ArrowUp") && this.isGrounded) {
            this.jumping = true;
            this.jumpTime = _SceneAttributes__WEBPACK_IMPORTED_MODULE_1__["default"].maxJumpHold;
            this.groundedImmunity = true;
        }
        else if (key === 'a' || key === "ArrowLeft") {
            this.aPressed = true;
        }
        else if (key === 'd' || key === "ArrowRight") {
            this.dPressed = true;
        }
        else if (key === 's' || key === "ArrowDown") {
            this.sPressed = true;
        }
    }
    onKeyUp(key) {
        if (key === 'w' || key === " " || key === "ArrowUp") {
            this.jumping = false;
            this.jumpTime = 0;
        }
        else if (key === 'a' || key === "ArrowLeft") {
            this.aPressed = false;
        }
        else if (key === 'd' || key === "ArrowRight") {
            this.dPressed = false;
        }
        else if (key === 's' || key === "ArrowDown") {
            this.sPressed = false;
        }
    }
    onCollision(other) {
        if (other.constructor.name === "Coin") {
            for (let i = 0; i < 8; i++) {
                let angle = i * Math.PI * 2 / 8;
                let direction = gl_matrix__WEBPACK_IMPORTED_MODULE_4__.fromValues(Math.cos(angle), Math.sin(angle));
                let sparkle = new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](_constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_SPARKLE, gl_matrix__WEBPACK_IMPORTED_MODULE_4__.add(gl_matrix__WEBPACK_IMPORTED_MODULE_4__.create(), other.getPosition(), gl_matrix__WEBPACK_IMPORTED_MODULE_4__.scale(gl_matrix__WEBPACK_IMPORTED_MODULE_4__.create(), direction, 0.3)), 0.2);
                sparkle.setSize(0.5);
                sparkle.setMovement((time) => {
                    return gl_matrix__WEBPACK_IMPORTED_MODULE_4__.scale(gl_matrix__WEBPACK_IMPORTED_MODULE_4__.create(), direction, time * 2);
                });
            }
            other.destroy();
        }
        else if (other.constructor.name === "Spike" || other.constructor.name === "Baddie") {
            this.dead = true;
        }
        else if (other.constructor.name === "Checkpoint") {
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__.copy(this.startPos, other.getPosition());
        }
        else if (other.constructor.name === "Gem") {
            this.win = true;
        }
    }
    onDeath() {
        this.setPosition(this.startPos);
        this.dead = false;
        this.dynamic = true;
        this.deathTimer = 0;
    }
    getSpriteUv() {
        if (this.dead) {
            return _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_PLAYER_DEATH;
        }
        if (!this.isGrounded) {
            return _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_PLAYER_JUMP;
        }
        else if (this.moving) {
            return this.walkFrame % WALK_CYCLE_LENGTH < WALK_CYCLE_LENGTH / 2 ?
                _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_PLAYER_WALK_1 :
                _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_PLAYER_WALK_2;
        }
        else if (this.sPressed) {
            return _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_PLAYER_CROUCH;
        }
        else if (this.idleTime >= 20) {
            return _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_PLAYER_IDLE2;
        }
        else if (this.idleTime >= 10) {
            return _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_PLAYER_IDLE1;
        }
        return _constants__WEBPACK_IMPORTED_MODULE_3__.spriteCoordinates.SPRITE_PLAYER_STAND;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),
/* 35 */
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,function(){"use strict";var c=function(){var n=0,l=document.createElement("div");function e(e){return l.appendChild(e.dom),e}function t(e){for(var t=0;t<l.children.length;t++)l.children[t].style.display=t===e?"block":"none";n=e}l.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",l.addEventListener("click",function(e){e.preventDefault(),t(++n%l.children.length)},!1);var i=(performance||Date).now(),a=i,o=0,f=e(new c.Panel("FPS","#0ff","#002")),r=e(new c.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=e(new c.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:l,addPanel:e,showPanel:t,begin:function(){i=(performance||Date).now()},end:function(){o++;var e=(performance||Date).now();if(r.update(e-i,200),a+1e3<=e&&(f.update(1e3*o/(e-a),100),a=e,o=0,d)){var t=performance.memory;d.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){i=this.end()},domElement:l,setMode:t}};return c.Panel=function(n,l,i){var a=1/0,o=0,f=Math.round,r=f(window.devicePixelRatio||1),d=80*r,e=48*r,c=3*r,p=2*r,u=3*r,s=15*r,m=74*r,h=30*r,y=document.createElement("canvas");y.width=d,y.height=e,y.style.cssText="width:80px;height:48px";var v=y.getContext("2d");return v.font="bold "+9*r+"px Helvetica,Arial,sans-serif",v.textBaseline="top",v.fillStyle=i,v.fillRect(0,0,d,e),v.fillStyle=l,v.fillText(n,c,p),v.fillRect(u,s,m,h),v.fillStyle=i,v.globalAlpha=.9,v.fillRect(u,s,m,h),{dom:y,update:function(e,t){a=Math.min(a,e),o=Math.max(o,e),v.fillStyle=i,v.globalAlpha=1,v.fillRect(0,0,d,s),v.fillStyle=l,v.fillText(f(e)+" "+n+" ("+f(a)+"-"+f(o)+")",c,p),v.drawImage(y,u+r,s,m-r,h,u,s,m-r,h),v.fillRect(u+m-r,s,r,h),v.fillStyle=i,v.globalAlpha=.9,v.fillRect(u+m-r,s,r,f((1-e/t)*h))}}},c});


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "dist/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _rendering_gl_OpenGLRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _engine_GameEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _scene_Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);





let Stats = __webpack_require__(35);
let time = 0.0;
let gameStart = false;
function main() {
    // Rhythm Type
    let rhythmTypeSelect = document.getElementById("rhythmSelect");
    rhythmTypeSelect.onchange = () => {
        _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_4__["default"].rhythmType = parseInt(rhythmTypeSelect.value);
    };
    // Rhythm Group Length
    let groupLengthSlider = document.getElementById("timeSelect");
    let groupLengthOutput = document.getElementById("timeSelectDisplay");
    groupLengthOutput.innerHTML = groupLengthSlider.value + " sec";
    groupLengthSlider.oninput = () => {
        groupLengthOutput.innerHTML = groupLengthSlider.value + " sec";
        _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_4__["default"].rhythmGroupLength = parseInt(groupLengthSlider.value);
    };
    // Rhythm Group Number
    let groupNumberSelect = document.getElementById("numberSelect");
    let groupNumberOutput = document.getElementById("numberDisplay");
    groupNumberOutput.innerHTML = groupNumberSelect.value;
    groupNumberSelect.oninput = () => {
        groupNumberOutput.innerHTML = groupNumberSelect.value;
        _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_4__["default"].numberOfGroups = parseInt(groupNumberSelect.value);
    };
    // Gravity
    let gravitySelect = document.getElementById("gravitySelect");
    gravitySelect.onchange = function () {
        _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_4__["default"].gravity = parseFloat(gravitySelect.value);
    };
    // Jump
    let jumpSelect = document.getElementById("jumpSelect");
    jumpSelect.onchange = () => {
        _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_4__["default"].playerJump = parseFloat(jumpSelect.value);
    };
    // Speed
    let speedSelect = document.getElementById("speedSelect");
    speedSelect.onchange = () => {
        _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_4__["default"].playerSpeed = parseFloat(speedSelect.value);
    };
    // Density
    let densitySelect = document.getElementById("densitySelect");
    densitySelect.onchange = () => {
        _scene_SceneAttributes__WEBPACK_IMPORTED_MODULE_4__["default"].levelDensity = parseFloat(densitySelect.value);
    };
    // Generate Level
    let startButton = document.getElementById("generateLevelButton");
    startButton.onclick = () => {
        document.body.innerHTML = "";
        BeginGame();
    };
    //BeginGame();
}
function BeginGame() {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    document.body.appendChild(canvas);
    // get canvas and webgl context
    //const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        alert('WebGL 2 not supported!');
    }
    (0,_globals__WEBPACK_IMPORTED_MODULE_0__.setGL)(gl);
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
    let engine = _engine_GameEngine__WEBPACK_IMPORTED_MODULE_2__["default"].getEngine();
    const camera = engine.getCamera();
    const renderer = new _rendering_gl_OpenGLRenderer__WEBPACK_IMPORTED_MODULE_1__["default"](canvas);
    renderer.setClearColor(0.9, 0.9, 0.9, 1);
    engine.setRenderer(renderer);
    engine.generateLevel();
    let player = new _scene_Player__WEBPACK_IMPORTED_MODULE_3__["default"]([0, 1]);
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
        _engine_GameEngine__WEBPACK_IMPORTED_MODULE_2__["default"].getEngine().drawGameObjects();
        // Tell the browser to call `tick` again whenever it renders a new frame
        if (displayStats) {
            stats.end();
        }
        requestAnimationFrame(tick);
    }
    window.addEventListener('resize', function () {
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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map