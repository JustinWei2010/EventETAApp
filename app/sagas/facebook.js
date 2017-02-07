'use strict'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as constants from 'app/constants'
import * as facebook from 'app/actions/facebook'
import * as fbAPI from 'app/api/facebook'
import * as navigation from 'app/actions/navigation'
import * as types from 'app/actions/types'
import * as firebase from 'app/api/firebase'

const _readPermissions = [
    constants.FACEBOOK_PERMISSIONS.USER_EVENTS,
    constants.FACEBOOK_PERMISSIONS.USER_EMAIL
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
            yield call(firebase.loginWithFacebookUser, token)
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

function* _fetchFBUsersAttendingEvent(action) {
      try {
        const attendees = yield call(fbAPI.getUsersAttendingEvent, action.eventId)
        yield put(facebook.fbRefreshUsersAttendingEvent(attendees.data))
    } catch (error) {
        //Fix bug here when error during takeEvery
        throw new Error(error)
    }  
}

export function* fetchFBProfile(action) {
    try {
        const profile = yield call(fbAPI.getMyProfile)
        yield put(facebook.fbRefreshProfile(
            profile.name, 
            profile.picture.data.url
        ))
    } catch (error) {
        //Fix bug here when error during takeLatest
        throw new Error(error)
    }
}

export function* fetchFBEvents(action) {
     try {
        const events = yield call(fbAPI.getMyEvents)
        yield put(facebook.fbRefreshEvents(events.data))
    } catch (error) {
        //Fix bug here when error during takeLatest
        throw new Error(error)
    }   
}

export function* watchForFetchUsersAttendingEvent() {
    yield takeEvery(types.FB_FETCH_USERS_ATTENDING_EVENT, _fetchFBUsersAttendingEvent)
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
