'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    attendees: [],
    etas: []
}

const eventETAList = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FETCH_USERS_ATTENDING_FB_EVENT:
            return _initialState

        case types.REFRESH_USERS_ATTENDING_FB_EVENT:
            return {...state, attendees: action.attendees}

        case types.REFRESH_EVENT_ETAS:
            return {...state, etas: action.etas }

        default:
            return state;
    }
}

export default eventETAList