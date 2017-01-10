'use strict'
import * as constants from 'app/constants'
import * as types from 'app/actions/types'

const _initialState = {
    currentScreen: null,
    history: []
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
                //Account for edge case if press back when history is empty.
                return state
            }

        case types.CLEAR_HISTORY:
            return _initialState

        default:
            return state
    }
}

export default navigation