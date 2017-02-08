'use strict'
import * as types from 'app/actions/types'

export const fetchFBProfile = () => {
    return {
        type: types.FETCH_FB_PROFILE
    }
}

export const refreshFBProfile = (name, src) => {
    return {
        type: types.REFRESH_FB_PROFILE,
        name: name,
        src: src
    }
}