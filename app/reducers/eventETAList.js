'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    attendees: [],
    etas: [],
    fetching: false
}

const eventETAList = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FETCH_USERS_ATTENDING_FB_EVENT:
            return {...state, fetching: true}

        case types.REFRESH_USERS_ATTENDING_FB_EVENT:
            return {...state, attendees: action.attendees, fetching: false}

        case types.REFRESH_EVENT_ETAS:
            return {...state, etas: action.etas }

        default:
            return state;
    }
}

export default eventETAList