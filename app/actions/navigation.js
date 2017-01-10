'use strict'
import * as types from 'app/actions/types'

export const navigateTo = (name, data) => {
    return {
        type: types.NAVIGATE_TO,
        screen: {
            name: name,
            data: data
        }
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