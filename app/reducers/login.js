'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    fbToken: null,
    error: null
}

const login = (state = _initialState, action = {}) => {
    switch (action.type) {

        case types.FB_LOGIN_SUCCESS:
            return {
                ...state,
                fbToken: action.fbToken
            }

        case types.FB_LOGIN_FAILED:
            return {
                ...state,
                error: action.error
            }

        default:
            return state;
    }
}

export default login