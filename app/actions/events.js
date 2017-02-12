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

export const fetchUsersAttendingFBEvent = (eventId) => {
    return {
        type: types.FETCH_USERS_ATTENDING_FB_EVENT,
        eventId: eventId
    }
}

export const refreshUsersAttendingFBEvent = (attendees) => {
    return {
        type: types.REFRESH_USERS_ATTENDING_FB_EVENT,
        attendees: attendees
    }
}

export const refreshEventETAs = (etas) => {
    return {
        type: types.REFRESH_EVENT_ETAS,
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

export const checkInEvent = (event) => {
    return {
        type: types.CHECK_IN_EVENT,
        details: {
            event: event
        }
    }
}