'use strict'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as constants from 'app/constants'
import * as events from 'app/sagas/events'
import * as facebook from 'app/api/facebook'
import * as firebase from 'app/api/firebase'
import * as navigation from 'app/actions/navigation'
import * as profile from 'app/sagas/profile'
import * as types from 'app/actions/types'

const _readPermissions = [
    constants.FACEBOOK_PERMISSIONS.USER_EVENTS,
    constants.FACEBOOK_PERMISSIONS.USER_EMAIL
]

function* _login(action) {
    try {
        yield call(facebook.login, _readPermissions)
    } catch (error) {
        console.log("Error during login process")
        console.log(error)
    }

    const token = yield call(facebook.getFbToken)
    //Treat defined token as login success
    if (token) {
        try {
            yield call(firebase.loginWithFacebookUser, token)
            yield [
                call(profile.fetchFBProfile), 
                call(events.fetchFBEvents)
            ]
            //Only navigate to home if initial fetch is successful
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
        call(facebook.logout),
        put(navigation.navigateTo(constants.SCREEN.LOGIN))
    ]
}

export function* watchForLogin() {
    yield takeLatest(types.FB_LOGIN, _login)
}

export function* watchForLogout() {
    yield takeLatest(types.FB_LOGOUT, _logout)
}