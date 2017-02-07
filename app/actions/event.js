'use strict'
import * as types from 'app/actions/types'

export const updateEventETA = (event, eta) => {
    return {
        type: types.UPDATE_EVENT_ETA,
        details: {
            event: event,
            eta: eta
        }
    }
}
