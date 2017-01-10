'use strict'
import * as facebook from 'app/sagas/facebook'

export default function* rootSaga() {
    yield [
        facebook.watchForFetchEvents(),
        facebook.watchForFetchProfile(),
        facebook.watchForLogin(),
        facebook.watchForLogout()
    ]
}