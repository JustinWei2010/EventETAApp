'use strict'
import { call, put, takeLatest } from 'redux-saga/effects'
import { clearHistory, navigateTo } from 'app/actions/navigation'
import { fetchFBEvents } from 'app/sagas/events'
import { fetchFBProfile } from 'app/sagas/profile'
import * as constants from 'app/constants'
import * as facebook from 'app/api/facebook'
import * as firebase from 'app/api/firebase'
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

    yield call(postLoginProcess)
}

function* _logout(action) {
    //Clear history since user is not authenticated anymore
    yield put(clearHistory())
    yield [
        call(facebook.logout),
        put(navigateTo(constants.SCREEN.LOGIN))
    ]
}

//Load facebook login token and determine which screen to send user
export function* postLoginProcess() {
    const fbToken = yield call(facebook.getFbToken)
    if (fbToken) {
        try {
            yield call(firebase.loginWithFacebookUser, fbToken)
            yield [
                call(fetchFBProfile),
                call(fetchFBEvents)
            ]
            yield put(navigateTo(constants.SCREEN.HOME))
            return
        } catch (error) {
            console.log("Error while fetching facebook user profile or events")
            console.log(error)
        }
    } else {
        console.log("Facebook token is null")
    }

    //Navigate to login screen if not logged in or failure fetching needed fb data
    yield put(clearHistory())
    yield put(navigateTo(constants.SCREEN.LOGIN))
}

export function* watchForLogin() {
    yield takeLatest(types.FB_LOGIN, _login)
}

export function* watchForLogout() {
    yield takeLatest(types.FB_LOGOUT, _logout)
}