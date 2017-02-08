'use strict'
import * as constants from 'app/constants'
import * as types from 'app/actions/types'

const _initialState = {
    name: 'Not Logged in',
    src: require('app/resources/profile.png') 
}

const profile = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.REFRESH_FB_PROFILE:
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

export default profile