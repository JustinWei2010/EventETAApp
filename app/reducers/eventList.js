'use strict'
import * as types from 'app/actions/types'
import * as firebase from 'app/api/firebase'
import _ from 'lodash'
import { mapFacebookEventInfo } from 'app/model/eventMapper'
import { EVENT_TYPE } from 'app/constants'

const _initialState = []

const eventList = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.REFRESH_FB_EVENTS:
            const events = _.map(action.events, (fbEvent) => mapFacebookEventInfo(fbEvent))

            events.forEach((event) => {
                firebase.subscribeToArrived(event)
            })
            return events

        default:
            return state;
    }
}

export default eventList