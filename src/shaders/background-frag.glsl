#version 300 es
precision highp float;

uniform sampler2D u_SpriteTex;
uniform vec2 u_CameraPos;
uniform float u_Time;
uniform int u_Win;

in vec2 fs_Pos;
in vec2 fs_UV1;
in vec2 fs_UV2;

out vec4 out_Col;

const vec2 SEED2 = vec2(0.31415, 0.6456);

vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d){
    return a + b*cos( 6.28318*(c*t+d) );
}

float random1(vec2 p) {
    return fract(sin(dot(p + SEED2, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 random2( vec2 p , vec2 seed) {
    return fract(sin(vec2(dot(p + seed, vec2(311.7, 127.1)), dot(p + seed, vec2(269.5, 183.3)))) * 85734.3545);
}

float worley(vec2 noisePos, float frequency) {
    vec2 point = noisePos * frequency;
    vec2 cell = floor(point);

    // Check the neighboring cells for the closest cell point
    float closestDistance = 2.0;
    for (int i = 0; i < 9; i++) {
        vec2 curCell = cell + vec2(i % 3 - 1, floor(float(i / 3) - 1.0));
        vec2 cellPoint = vec2(curCell) + random2(vec2(curCell), SEED2);
        closestDistance = min(closestDistance, distance(cellPoint, point));
    }
    return clamp(0.0, 1.0, closestDistance);
}

float brownianNoise(vec2 noisePos, vec2 seed) {
    vec2 boxPos = vec2(floor(noisePos.x), floor(noisePos.y));

    // Get the noise at the corners of the cells
    float corner0 = random1(boxPos + vec2(0.0, 0.0));
    float corner1 = random1(boxPos + vec2(1.0, 0.0));
    float corner2 = random1(boxPos + vec2(0.0, 1.0));
    float corner3 = random1(boxPos + vec2(1.0, 1.0));

    // Get cubic interpolation factors
    float tx = smoothstep(0.0, 1.0, fract(noisePos.x));
    float ty = smoothstep(0.0, 1.0, fract(noisePos.y));

    // Perform bicubic interpolation
    return mix(mix(corner0, corner1, tx), mix(corner2, corner3, tx), ty);
}

float fbm(vec2 noisePos, int numOctaves, float startFrequency) {
    float totalNoise = 0.0;
    float normalizer = 0.0;
    const float PERSISTENCE = 0.5;

    float frequency = startFrequency;
    float amplitude = PERSISTENCE;

    for (int i = 0; i < numOctaves; i++) {
        normalizer += amplitude;
        totalNoise += brownianNoise(noisePos * frequency, SEED2) * amplitude;
        frequency *= 2.0;
        amplitude *= PERSISTENCE;
    }
    return totalNoise / normalizer;
}

void main() {
    vec2 uv1 = vec2(fs_UV1.x, clamp(fs_UV1.y, 0.000, 0.249));
    vec2 uv2 = vec2(fs_UV2.x, clamp(fs_UV2.y, 0.251, 0.499));
    float starRadius = 0.01 + abs(sin(u_Time * 0.01 + random1(fs_Pos) * 100.0)) * 0.01;
    vec3 stars = worley(fs_Pos, 10.0) < starRadius ? vec3(1) : vec3(0);
    vec4 sky = mix(vec4(0.3, 0.3, 0.25, 1.0), vec4(stars, 1), pow((fs_Pos[1] + 1.0) / 2.0, 0.5));

    vec4 layer1 = texture(u_SpriteTex, uv1);
    vec4 layer2 = texture(u_SpriteTex, uv2);

    if (u_Win == 1) {
        float t1 = cos(fs_Pos[0] + fs_Pos[1] + u_Time * 0.01);
        float t2 = (sin(-2.0 * fs_Pos[1] + u_Time * 0.01) * cos(2.0 * fs_Pos[0] + u_Time * 0.01));

        float t3 = pow(fbm(fs_Pos - vec2(u_Time * 0.005) + vec2(
            fbm(fs_Pos + vec2(u_Time * 0.001), 2, 2.5),
            worley(fs_Pos, 10.0)
        ), 
        3, 5.0), 2.0);

        layer1.rgb = palette(t1, vec3(0.5), vec3(0.5), vec3(1), vec3(0, 0.33, 0.67)) * 0.2;
        layer2.rgb = palette(t2, vec3(0.5), vec3(0.5), vec3(1), vec3(0, 0.33, 0.67)) * 0.4;
        vec3 skyColor = palette(t3, vec3(0.5), vec3(0.5), vec3(1), vec3(0, 0.33, 0.67)) * 0.8;
        sky.rgb = worley(fs_Pos, 10.0) < starRadius ? vec3(1) - skyColor : skyColor;
    }

    vec4 color = 
        layer1.a > 0.5 ? layer1 :
        layer2.a > 0.5 ? layer2 :
        sky;

    out_Col = vec4(color.rgb, 1);
}
