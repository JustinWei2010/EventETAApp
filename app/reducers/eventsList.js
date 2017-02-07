'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    events: []
}

const eventsList = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FB_REFRESH_EVENTS:
            return {
                events: action.events
            }

        default:
            return state;
    }
}

export default eventsList