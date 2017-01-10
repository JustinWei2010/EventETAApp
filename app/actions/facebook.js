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

export const fbRefreshProfile = (name, src) => {
    return {
        type: types.FB_REFRESH_PROFILE,
        name: name,
        src: src
    }
}