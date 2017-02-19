import { EVENT_TYPE } from 'app/constants'

function getLocationName(place) {
    return place ? place.name : ''
}
 _getCoverSource = (cover) => {
        if (cover && cover.source) {
            return cover.source
        }
        // Need to make default picture consistent with details page, should not be on external site in case of no internet
        return 'https://facebook.github.io/react/img/logo_og.png'
    }

export const mapFacebookEventInfo = (event) => {
    return {
        id: event.id,
        type: EVENT_TYPE.FACEBOOK,
        name: event.name,
        place: getLocationName(event.place),
        startTime: event.start_time,
        description: event.description,
        attendingCount: event.attending_count,
        // Need to make default picture consistent with event list
        source: event.cover && event.cover.source ? { uri: event.cover.source }
            : require('app/resources/eventCover.jpg')
    }
}