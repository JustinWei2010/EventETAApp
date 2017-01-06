'use strict'
import * as types from 'app/actions/types'
import * as constants from 'app/constants'

const _initialState = {
    currentScreen: constants.SCREEN.LOGIN,
    history: [constants.SCREEN.LOGIN]
}

const navigation = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.NAVIGATE_TO:
            return {
                currentScreen: action.scene,
                history: [...state.history, action.scene]
            }

        case types.NAVIGATE_BACK:
            if (state.history.length > 1) {
                const updatedHistory = state.history.slice(0, state.history.length-1)
                return {
                    currentScreen: updatedHistory[updatedHistory.length-1],
                    history: updatedHistory
                }
            } else {
                return _initialState
            }

        case types.CLEAR_HISTORY:
            return _initialState

        default:
            return state
    }
}

export default navigation