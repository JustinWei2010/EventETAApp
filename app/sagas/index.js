'use strict'
import * as events from 'app/sagas/events'
import * as login from 'app/sagas/login'
import * as profile from 'app/sagas/profile'

export default function* rootSaga() {
    yield [
        events.watchForUpdateEventETA(),
        events.watchForCheckInEvent(),
        events.watchForFetchFBEvents(),
        events.watchForFetchUsersAttendingFBEvent(),
        login.watchForLogin(),
        login.watchForLogout(),
        profile.watchForFetchFBProfile()
    ]
}