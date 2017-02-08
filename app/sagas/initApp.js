'use strict'
import { call, put } from 'redux-saga/effects'
import { postLoginProcess } from 'app/sagas/login'
import * as firebase from 'app/api/firebase'

function* _initFacebook() {
    yield call(postLoginProcess)
}

//Load firebase
function* _initFirebase() {
    firebase.init();
}

//Initialize app with data stored in local storage
export function* initialize() {
    yield [
        call(_initFacebook),
        call(_initFirebase)
    ]
}