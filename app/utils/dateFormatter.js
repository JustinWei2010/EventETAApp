'use strict'
import moment from 'moment'

//Set default date format logic
moment.updateLocale('en', {
    calendar : {
        lastDay : '[Yesterday -] h:mm A',
        sameDay : '[Today -] h:mm A',
        nextDay : '[Tomorrow -] h:mm A',
        lastWeek : '[Last] ddd [-] h:mm A',
        nextWeek : '[Next] ddd [-] h:mm A',
        sameElse : 'MMM Do [-] h:mm A'
    }
})

export const formatDate = (dateTime) => {
    return dateTime ? moment(dateTime).calendar() : ''
}