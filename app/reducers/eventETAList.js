'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    attendees: []
}

const eventETAList = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FB_FETCH_USERS_ATTENDING_EVENT:
            return _initialState

        case types.FB_REFRESH_USERS_ATTENDING_EVENT:
            return {
                attendees: action.attendees
            }

        default:
            return state;
    }
}

export default eventETAList