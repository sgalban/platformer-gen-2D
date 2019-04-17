#version 300 es
precision highp float;

uniform sampler2D u_SpriteTex;

in vec2 fs_Pos;
in vec2 fs_UV;

out vec4 out_Col;

void main() {
    vec4 color = texture(u_SpriteTex, fs_UV / 8.0);
    if (color.a < 0.5) {
        discard;
    }
    out_Col = color;
}
