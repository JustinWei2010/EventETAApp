'use strict'
import * as types from 'app/actions/types'

const _initialState = {
    name: 'Not Logged in',
    src: require("app/resources/profile.png") 
}

const fbProfile = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.FB_REFRESH_PROFILE:
            return {
                name: action.name,
                src: {
                    uri: action.src
                }
            }

        default:
            return state;
    }
}

export default fbProfile