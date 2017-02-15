'use strict'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { refreshFBEvents, refreshUsersAttendingFBEvent, refreshEventETAs } from 'app/actions/events'
import * as facebook from 'app/api/facebook'
import * as firebase from 'app/api/firebase'
import * as types from 'app/actions/types'

function* _updateEventETA(action) {
    try {
        switch(action.type) {
            case types.UPDATE_EVENT_ETA:
                yield call(firebase.updateEventEta, action.details.event, action.details.eta, false);
                break;
            case types.CHECK_IN_EVENT:
                yield call(firebase.updateEventEta, action.details.event, new Date(), true);
                break;
        }
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

export function* watchForCheckInEvent() {
    yield takeLatest(types.CHECK_IN_EVENT, _updateEventETA)
}

export function* watchForWaitForEventETAs() {
    yield takeLatest(types.WAIT_FOR_EVENT_ETAS, _waitForEventETAs)
}

export function* watchForFetchUsersAttendingFBEvent() {
    yield takeEvery(types.FETCH_USERS_ATTENDING_FB_EVENT, _fetchUsersAttendingFBEvent)
}