import {vec2} from 'gl-matrix';

export const spriteCoordinates = {

    // Terrain
    SPRITE_TERRAIN_TOP_LEFT:           vec2.fromValues(0, 0),
    SPRITE_TERRAIN_TOP:                vec2.fromValues(1, 0),
    SPRITE_TERRAIN_TOP_RIGHT:          vec2.fromValues(2, 0),
    SPRITE_TERRAIN_LEFT:               vec2.fromValues(0, 1),
    SPRITE_TERRAIN_MIDDLE:             vec2.fromValues(1, 1),
    SPRITE_TERRAIN_MIDDLE_ALT_1:       vec2.fromValues(5, 2),
    SPRITE_TERRAIN_MIDDLE_ALT_2:       vec2.fromValues(5, 3),
    SPRITE_TERRAIN_MIDDLE_ALT_3:       vec2.fromValues(6, 3),
    SPRITE_TERRAIN_MIDDLE_ALT_4:       vec2.fromValues(6, 1),
    SPRITE_TERRAIN_RIGHT:              vec2.fromValues(2, 1),
    SPRITE_TERRAIN_BOTTOM_LEFT:        vec2.fromValues(0, 2),
    SPRITE_TERRAIN_BOTTOM:             vec2.fromValues(1, 2),
    SPRITE_TERRAIN_BOTTOM_RIGHT:       vec2.fromValues(2, 2),
    SPRITE_TERRAIN_SINGLE:             vec2.fromValues(4, 0),
    SPRITE_TERRAIN_LEFT_INNER_CORNER:  vec2.fromValues(5, 1),
    SPRITE_TERRAIN_RIGHT_INNER_CORNER: vec2.fromValues(6, 2),
    SPRITE_TERRAIN_COLUMN:             vec2.fromValues(7, 1),
    SPRITE_TERRAIN_CAP:                vec2.fromValues(7, 0),

    // Entities
    SPRITE_PICKUP:         vec2.fromValues(0, 3),
    SPRITE_SPIKE:          vec2.fromValues(3, 2),
    SPRITE_PLATFORM_LEFT:  vec2.fromValues(5, 4),
    SPRITE_PLATFORM_RIGHT: vec2.fromValues(6, 4),

    // Player
    SPRITE_PLAYER_STAND:  vec2.fromValues(0, 7),
    SPRITE_PLAYER_JUMP:   vec2.fromValues(1, 7),
    SPRITE_PLAYER_WALK_1: vec2.fromValues(2, 7),
    SPRITE_PLAYER_WALK_2: vec2.fromValues(3, 7),
    SPRITE_PLAYER_CROUCH: vec2.fromValues(4, 7),
    SPRITE_PLAYER_IDLE1:  vec2.fromValues(5, 7),
    SPRITE_PLAYER_IDLE2:  vec2.fromValues(6, 7),
    SPRITE_PLAYER_DEATH:  vec2.fromValues(7, 7),

    // Coin
    SPRITE_COIN_1: vec2.fromValues(0, 3),
    SPRITE_COIN_2: vec2.fromValues(1, 3),
    SPRITE_COIN_3: vec2.fromValues(2, 3),
    SPRITE_COIN_4: vec2.fromValues(0, 4),
    SPRITE_COIN_5: vec2.fromValues(1, 4),
    SPRITE_GEM:    vec2.fromValues(6, 5),

    // Particles
    SPRITE_Z:       vec2.fromValues(6, 6),
    SPRITE_POFF:    vec2.fromValues(7, 6),
    SPRITE_SPARKLE: vec2.fromValues(5, 6),

    // Enemy
    SPRITE_BADDIE_1: vec2.fromValues(0, 5),
    SPRITE_BADDIE_2: vec2.fromValues(1, 5),

    // Checkpoint
    SPRITE_FLAG_1: vec2.fromValues(2, 4),
    SPRITE_FLAG_2: vec2.fromValues(3, 4),
    SPRITE_FLAG_3: vec2.fromValues(4, 4),
    SPRITE_CHECK_1: vec2.fromValues(2, 5),
    SPRITE_CHECK_2: vec2.fromValues(3, 5),
    SPRITE_CHECK_3: vec2.fromValues(4, 5),
}