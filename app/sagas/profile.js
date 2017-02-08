'use strict'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as profile from 'app/actions/profile'
import * as facebook from 'app/api/facebook'
import * as types from 'app/actions/types'

export function* fetchFBProfile(action) {
    try {
        const fbProfile = yield call(facebook.getMyProfile)
        yield put(profile.refreshFBProfile(
            fbProfile.name, 
            fbProfile.picture.data.url
        ))
    } catch (error) {
        //Fix bug here when error during takeLatest
        throw new Error(error)
    }
}

export function* watchForFetchFBProfile() {
    yield takeLatest(types.FETCH_FB_PROFILE, fetchFBProfile)
}