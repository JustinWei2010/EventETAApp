'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    attendees: [],
    etas: [],
    fetching: false
}

const eventETAList = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.REFRESH_EVENT_ATTENDEES_AND_ETAS:
            return {...state, fetching: true}

        case types.RECEIVED_EVENT_ETAS:
            return {...state, etas: action.etas }

        case types.RECEIVED_EVENT_ATTENDEES_AND_ETAS:
            return {...state, attendees: action.attendees, etas: action.etas, fetching: false }

        case types.CLEAR_EVENT_ATTENDEES_AND_ETAS:
            return {...state, attendees: action.attendees, etas: action.etas, fetching: false }

        default:
            return state;
    }
}

export default eventETAList