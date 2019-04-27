#version 300 es
precision highp float;

uniform vec2 u_CameraPos;

in vec2 vs_Pos;
in vec2 vs_UV;
out vec2 fs_Pos;
out vec2 fs_UV1;
out vec2 fs_UV2;

void main() {
    fs_Pos = vs_Pos;
    const float squish1 = 1.8;
    fs_UV1 = vec2(
        vs_UV[0] / 1.5 - u_CameraPos[0] / 150.0,
        (vs_UV[1] / 4.0) * squish1 - (squish1 / 4.0 - 0.25) + (u_CameraPos[1] + 2.0) / 100.0
    );

    const float squish2 = 1.0;
    fs_UV2 = vec2(
        vs_UV[0] / 2.0 - u_CameraPos[0] / 300.0,
        (vs_UV[1] / 4.0 + 0.25) * squish2 - (squish2 / 4.0 - 0.25) + (u_CameraPos[1] + 2.0) / 200.0
    );

    gl_Position = vec4(vs_Pos, 0, 1);
}
