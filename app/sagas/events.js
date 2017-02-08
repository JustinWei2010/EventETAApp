'use strict'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { refreshFBEvents, refreshUsersAttendingFBEvent } from 'app/actions/events'
import * as facebook from 'app/api/facebook'
import * as firebase from 'app/api/firebase'
import * as types from 'app/actions/types'

function* _updateEventETA(action) {
    console.log("Update Event ETA saga: ")
    try {
        yield call(firebase.updateEventEta, action.details.event, action.details.eta)
    } catch (error) {
        console.log("Error when updating event eta.")
        console.log(error)
    }
}

function* _fetchUsersAttendingFBEvent(action) {
      try {
        const attendees = yield call(facebook.getUsersAttendingEvent, action.eventId)
        yield put(refreshUsersAttendingFBEvent(attendees.data))
    } catch (error) {
        //Fix bug here when error during takeEvery
        throw new Error(error)
    }  
}

export function* fetchFBEvents(action) {
     try {
        const events = yield call(facebook.getMyEvents)
        yield put(refreshFBEvents(events.data))
    } catch (error) {
        //Fix bug here when error during takeLatest
        throw new Error(error)
    }   
}

export function* watchForFetchFBEvents() {
    yield takeLatest(types.FETCH_FB_EVENTS, fetchFBEvents)
}

export function* watchForUpdateEventETA() {
    yield takeLatest(types.UPDATE_EVENT_ETA, _updateEventETA)
}

export function* watchForFetchUsersAttendingFBEvent() {
    yield takeEvery(types.FETCH_USERS_ATTENDING_FB_EVENT, _fetchUsersAttendingFBEvent)
}