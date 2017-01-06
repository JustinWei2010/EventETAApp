'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    name: 'Not Logged in'
}

const fbProfile = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FB_REFRESH_PROFILE:
            return {
                name: action.name,
            }

        default:
            return state;
    }
}

export default fbProfile