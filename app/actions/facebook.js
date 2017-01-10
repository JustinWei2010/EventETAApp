'use strict'
import * as types from 'app/actions/types'

export const fbLogin = () => {
    return {
        type: types.FB_LOGIN
    }
}

export const fbLogout = () => {
    return {
        type: types.FB_LOGOUT
    }
}

export const fbFetchProfile = () => {
    return {
        type: types.FB_FETCH_PROFILE
    }
}

export const fbRefreshProfile = (name, src) => {
    return {
        type: types.FB_REFRESH_PROFILE,
        name: name,
        src: src
    }
}

export const fbFetchEvents = () => {
    return {
        type: types.FB_FETCH_EVENTS
    }
}

export const fbRefreshEvents = (events) => {
    return {
        type: types.FB_REFRESH_EVENTS,
        events: events
    }
}