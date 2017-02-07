'use strict'
import * as facebook from 'app/sagas/facebook'
import * as events from 'app/sagas/events'

export default function* rootSaga() {
    yield [
        facebook.watchForFetchEvents(),
        facebook.watchForFetchProfile(),
        facebook.watchForLogin(),
        facebook.watchForLogout(),
        events.watchForUpdateEventETA()
    ]
}