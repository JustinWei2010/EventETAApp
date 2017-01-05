'use strict'
import * as types from 'app/actions/types'

export const navigateTo = (scene) => {
    return {
        type: types.NAVIGATE_TO,
        scene: scene
    }
}