'use strict'
import _ from 'lodash'
import { EVENT_TYPE } from 'app/constants'
import * as firebase from 'app/api/firebase'
import * as types from 'app/actions/types'

const _initialState = []

const eventList = (state = _initialState, action = {}) => {
    switch (action.type) {
        case types.REFRESH_FB_EVENTS:
            const events = _.map(action.events, (fbEvent) => _formatFacebookEvent(fbEvent))

            events.forEach((event) => {
                firebase.subscribeToArrived(event)
            })
            return events

        default:
            return state;
    }
}

const _formatFacebookEventThumbnail = (cover) => {
    // Need to make default picture consistent with details page, should not be on external site in case of no internet
    var source = {
        uri: 'https://facebook.github.io/react/img/logo_og.png'
    }

    if (cover && cover.source) {
        source.uri = cover.source
    }
    return source
}

const _formatFacebookEventCover = (cover) => {
    if (cover && cover.source) {
        return { uri: cover.source }
    }

    // Default event cover
    return require('app/resources/eventCover.jpg')
}

const _formatFacebookEvent = (event) => {
    return {
        id: event.id,
        type: EVENT_TYPE.FACEBOOK,
        name: event.name,
        place: event.place ? event.place : {},
        startTime: event.start_time,
        description: event.description,
        attendingCount: event.attending_count,
        thumbnail: _formatFacebookEventThumbnail(event.cover),
        source: _formatFacebookEventCover(event.cover)
    }
}

export default eventList