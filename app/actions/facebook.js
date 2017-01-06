'use strict'
import * as types from 'app/actions/types'

export const fbLogin = (fbLogin) => {
    return {
        type: types.FB_LOGIN
    }
}

export const fbLoginSuccess = (fbToken) => {
    return {
        type: types.FB_LOGIN_SUCCESS,
        fbToken
    }
}

export const fbLoginFailed = (error) => {
    return {
        type: types.FB_LOGIN_FAILED,
        error
    }
}

export const fbRefreshProfile = (name) => {
    return {
        type: types.FB_REFRESH_PROFILE,
        name: name
    }
}