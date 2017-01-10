'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    list: []
}

const events = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FB_REFRESH_EVENTS:
            return {
                list: action.events
            }

        default:
            return state;
    }
}

export default events