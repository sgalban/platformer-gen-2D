#version 300 es
precision highp float;

uniform sampler2D u_SpriteTex;
uniform int u_Win;
uniform float u_Time;

in vec2 fs_Pos;
in vec2 fs_UV;

out vec4 out_Col;


void main() {
    vec4 color = texture(u_SpriteTex, fs_UV / 8.0);
    if (color.a < 0.5) {
        discard;
    }
    if (u_Win == 1) {
        color = vec4(0, 0, 0, 1);
    }
    out_Col = color;
}
