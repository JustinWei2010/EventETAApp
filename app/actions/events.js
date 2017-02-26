'use strict'
import * as types from 'app/actions/types'

export const fetchFBEvents = () => {
    return {
        type: types.FETCH_FB_EVENTS
    }
}

export const refreshFBEvents = (events) => {
    return {
        type: types.REFRESH_FB_EVENTS,
        events: events
    }
}

export const refreshEventAttendeesAndETAs = (event) => {
    return {
        type: types.REFRESH_EVENT_ATTENDEES_AND_ETAS,
        event: event
    }
}

export const receivedEventAttendeesAndETAs = (attendees, etas) => {
    return {
        type: types.RECEIVED_EVENT_ATTENDEES_AND_ETAS,
        attendees: attendees,
        etas: etas
    }
}

export const receivedEventETAs = (etas) => {
    return {
        type: types.RECEIVED_EVENT_ETAS,
        etas: etas
    }
}

export const updateEventETA = (event, eta) => {
    return {
        type: types.UPDATE_EVENT_ETA,
        details: {
            event: event,
            eta: eta
        }
    }
}

export const checkInEvent = (event, attendee) => {
    return {
        type: types.CHECK_IN_EVENT,
        details: {
            event: event,
            attendee: attendee
        }
    }
}

export const clearEventAttendeesAndETAs = () => {
    return {
        type: types.CLEAR_EVENT_ATTENDEES_AND_ETAS
    }
}

export const requestETA = (event, attendee, requestedByName) => {
    console.log('Request ETA', event, attendee, requestedByName)
    return {
        type: types.REQUEST_ETA,
        details: {
            event: event,
            attendee: attendee,
            requestedByName: requestedByName
        }
    }
}