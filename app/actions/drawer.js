'use strict'
import * as types from 'app/actions/types'

var _drawer

//This needs to be called first before other functions
export const initDrawer = (drawer) => {
    _drawer = drawer
}

export const clearDrawer = () => {
    _drawer = null
}

export const openDrawer = () => {
    if (_drawer) {
        _drawer.open()
    }
}

export const closeDrawer = () => {
    if (_drawer) {
        _drawer.close()
    }
}