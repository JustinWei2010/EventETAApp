'use strict'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { refreshFBEvents, receivedEventAttendeesAndETAs } from 'app/actions/events'
import * as facebook from 'app/api/facebook'
import * as firebase from 'app/api/firebase'
import * as types from 'app/actions/types'

function* _updateEventETA(action) {
    try {
        switch(action.type) {
            case types.UPDATE_EVENT_ETA:
                yield call(firebase.updateEventEta, action.details.event, action.details.eta);
                break;
            case types.CHECK_IN_EVENT:
                yield call(firebase.checkInEvent, action.details.event, action.details.attendee);
                break;
        }
    } catch (error) {
        console.log("Error when updating event eta.")
        console.log(error)
    }
}

function* _requestETA(action) {
    try {
        yield call(firebase.requestETA, action.details.event, action.details.attendee, action.details.requestedByName)
    } catch(error) {
        console.log("Error when requesting event eta.")
        console.log(error)
    }
}

function* _refreshEventAttendeesAndETAs(action) {
    try {
        const attendees = yield call(facebook.getUsersAttendingEvent, action.event.id)
        const etas = yield call(firebase.getEventETAs, action.event)
        yield put(receivedEventAttendeesAndETAs(attendees.data, etas))
    } catch (error) {
        console.log(error)
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

export function* watchForRefreshEventAttendeesAndETAs() {
    yield takeLatest(types.REFRESH_EVENT_ATTENDEES_AND_ETAS, _refreshEventAttendeesAndETAs)
}

export function* watchForRequestETA() {
    yield takeLatest(types.REQUEST_ETA, _requestETA)
}