'use strict'
import * as constants from 'app/constants'
import * as types from 'app/actions/types'

const _initialState = {
    currentScreen: constants.SCREEN.LOGIN
}

const navigation = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.NAVIGATE_TO:
            return {
                currentScreen: action.scene
            }

        default:
            return state
    }
}

export default navigation