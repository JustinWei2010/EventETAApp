'use strict'
import * as types from 'app/actions/types'

var _drawer

//This needs to be called first before other functions
export const initDrawer = (drawer) => {
    _drawer = drawer
    return {
        type: 'dummy'
    }
}

export const clearDrawer = () => {
    _drawer = null
    return {
        type: 'dummy'
    }
}

export const openDrawer = () => {
    _drawer.open()
    return {
        type: 'dummy'
    }
}

export const closeDrawer = () => {
    _drawer.close()
    return {
        type: 'dummy'
    }
}