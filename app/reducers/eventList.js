'use strict'
import * as types from 'app/actions/types'

const _initialState = []

const eventList = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FB_REFRESH_EVENTS:
            return action.events

        default:
            return state;
    }
}

export default eventList