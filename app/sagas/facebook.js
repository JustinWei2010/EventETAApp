'use strict'
import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as constants from 'app/constants'
import * as facebook from 'app/actions/facebook'
import * as fbAPI from 'app/api/facebook'
import * as navigation from 'app/actions/navigation'
import * as types from 'app/actions/types'

const _readPermissions = [
    constants.FACEBOOK_PERMISSIONS.USER_EVENTS
]

function* _login(action) {
    try {
        yield call(fbAPI.login, _readPermissions)
    } catch (error) {
        console.log("Error during login process")
        console.log(error)
    }

    const token = yield call(fbAPI.getFbToken)
    //Treat defined token as login success
    if (token) {
        try {
            yield call(fetchFBProfile)
            //Only navigate to home if profile fetch is successful
            yield put(navigation.navigateTo(constants.SCREEN.HOME))
        } catch(error) {
            console.log("Error while fetching facebook profile")
            console.log(error)
        }
    }
}

function* _logout(action) {
    //Clear history since user is not authenticated anymore
    yield put(navigation.clearHistory())
    yield [
        call(fbAPI.logout),
        put(navigation.navigateTo(constants.SCREEN.LOGIN))
    ]
}

export function* fetchFBProfile() {
    try {
        const profile = yield call(fbAPI.getUserProfile)
        yield put(facebook.fbRefreshProfile(profile.name, profile.picture.data.url))
    } catch (error) {
        //Let callee know there was an error
        throw new Error(error)
    }
}

export function* fetchFBEvents() {
     try {
        const events = yield call(fbAPI.getUserEvents)
        yield put(facebook.fbRefreshEvents(events.data))
    } catch (error) {
        //Let callee know there was an error
        throw new Error(error)
    }   
}

export function* watchForFetchProfile() {
    yield takeLatest(types.FB_FETCH_PROFILE, fetchFBProfile)
}

export function* watchForFetchEvents() {
    yield takeLatest(types.FB_FETCH_EVENTS, fetchFBEvents)
}

export function* watchForLogin() {
    yield takeLatest(types.FB_LOGIN, _login)
}

export function* watchForLogout() {
    yield takeLatest(types.FB_LOGOUT, _logout)
}
