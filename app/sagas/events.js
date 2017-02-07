'use strict'
import { takeLatest } from 'redux-saga'
import { call } from 'redux-saga/effects'

import * as types from 'app/actions/types'
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

export function* watchForUpdateEventETA() {
    yield takeLatest(types.UPDATE_EVENT_ETA, _updateEventETA)
}