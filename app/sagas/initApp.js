'use strict'
import { call, put } from 'redux-saga/effects'
import * as constants from 'app/constants'
import * as facebook from 'app/sagas/facebook'
import * as fbAPI from 'app/api/facebook'
import * as navigation from 'app/actions/navigation'
import * as firebase from 'app/api/firebase'

//Load facebook login token and determine which screen to send user
function* _initFBLogin() {
    const fbToken = yield call(fbAPI.getFbToken)
    if (fbToken) {
        try {
            yield call(firebase.loginWithFacebookUser, fbToken)
            yield [
                call(facebook.fetchFBProfile),
                call(facebook.fetchFBEvents)
            ]
            yield put(navigation.navigateTo(constants.SCREEN.HOME))
            return
        } catch (error) {
            console.log("Error while fetching facebook user profile or events")
            console.log(error)
        }
    }
    
    //Navigate to login screen if not logged in our failure getting fbProfile
    yield put(navigation.navigateTo(constants.SCREEN.LOGIN))
}

//Load firebase
function* _initFirebase() {
    firebase.init();
}

//Initialize app with data stored in local storage
export function* initialize() {
    yield [
        call(_initFirebase),
        call(_initFBLogin)
    ]
}