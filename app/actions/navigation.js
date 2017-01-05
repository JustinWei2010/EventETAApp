'use strict'
import * as types from 'app/actions/types'

export const navigateTo = (scene) => {
    return {
        type: types.NAVIGATE_TO,
        scene: scene
    }
}

export const navigateBack = () => {
    return {
        type: types.NAVIGATE_BACK
    }
}

export const clearHistory = () => {
    return {
        type: types.CLEAR_HISTORY
    }
}