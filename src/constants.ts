import {vec2} from 'gl-matrix';

export const spriteCoordinates = {

    // Terrain
    SPRITE_TERRAIN_TOP_LEFT:           vec2.fromValues(0, 0),
    SPRITE_TERRAIN_TOP:                vec2.fromValues(1, 0),
    SPRITE_TERRAIN_TOP_RIGHT:          vec2.fromValues(2, 0),
    SPRITE_TERRAIN_LEFT:               vec2.fromValues(0, 1),
    SPRITE_TERRAIN_MIDDLE:             vec2.fromValues(1, 1),
    SPRITE_TERRAIN_RIGHT:              vec2.fromValues(2, 1),
    SPRITE_TERRAIN_BOTTOM_LEFT:        vec2.fromValues(0, 2),
    SPRITE_TERRAIN_BOTTOM:             vec2.fromValues(1, 2),
    SPRITE_TERRAIN_BOTTOM_RIGHT:       vec2.fromValues(2, 2),
    SPRITE_TERRAIN_SINGLE:             vec2.fromValues(4, 0),
    SPRITE_TERRAIN_LEFT_INNER_CORNER:  vec2.fromValues(5, 1),
    SPRITE_TERRAIN_RIGHT_INNER_CORNER: vec2.fromValues(6, 2),

    // Entities
    SPRITE_PICKUP: vec2.fromValues(0, 3),
    SPRITE_SPIKE:  vec2.fromValues(3, 2),

    // Player
    SPRITE_PLAYER_STAND:  vec2.fromValues(0, 7),
    SPRITE_PLAYER_JUMP:   vec2.fromValues(1, 7),
    SPRITE_PLAYER_WALK_1: vec2.fromValues(2, 7),
    SPRITE_PLAYER_WALK_2: vec2.fromValues(3, 7),
    SPRITE_PLAYER_CROUCH: vec2.fromValues(4, 7),
}