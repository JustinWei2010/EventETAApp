'use strict'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as types from 'app/actions/types'
import * as facebook from 'app/actions/facebook'
import * as fbAPI from 'app/api/facebook'
import * as firebaseApi from 'app/api/firebase'

function* _updateEventETA(action) {
    console.log("Update Event ETA saga: ")
    try {
        yield call(firebaseApi.updateEventEta, action.details.event, action.details.eta)
    } catch (error) {
        console.log("Error when updating event eta.")
        console.log(error)
    }
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

export function* fetchFBEvents(action) {
     try {
        const events = yield call(fbAPI.getMyEvents)
        yield put(facebook.fbRefreshEvents(events.data))
    } catch (error) {
        //Fix bug here when error during takeLatest
        throw new Error(error)
    }   
}

export function* watchForFetchFBEvents() {
    yield takeLatest(types.FB_FETCH_EVENTS, fetchFBEvents)
}

export function* watchForUpdateEventETA() {
    yield takeLatest(types.UPDATE_EVENT_ETA, _updateEventETA)
}

export function* watchForFetchUsersAttendingFBEvent() {
    yield takeEvery(types.FB_FETCH_USERS_ATTENDING_EVENT, _fetchFBUsersAttendingEvent)
}