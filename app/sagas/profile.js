'use strict'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as facebook from 'app/actions/facebook'
import * as fbAPI from 'app/api/facebook'
import * as types from 'app/actions/types'

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

export function* watchForFetchFBProfile() {
    yield takeLatest(types.FB_FETCH_PROFILE, fetchFBProfile)
}