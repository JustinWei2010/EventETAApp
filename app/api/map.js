'use strict'
import _ from 'lodash'
import { Linking, Platform } from 'react-native'

var _baseURL = ''

const _buildBaseURL = () => {
    if (_.isEmpty(_baseURL)) {
        if (Platform.OS === 'ios') {
            // Native apple maps app
            _baseURL = 'http://maps.apple.com/?q='
        } else if (Platform.OS === 'android') {
            // Native google maps app
            _baseURL = 'geo:0,0?q='
        } else {
            console.error("Can't build map url since device OS is not recognized. OS: " + Platform.OS)
        }           
    }    
}

const _buildMapURL = (place) => {
    _buildBaseURL()

    var url = _baseURL + place.name
    if (place.location) {
        const latitude = place.location.latitude
        const longitude = place.location.longitude
        if (latitude && longitude) {
            url = `${_baseURL}${latitude},${longitude}`
        }
    }
    console.log(`Opening map app with url: ${url}`)
    return url;
}

export const showDirections = (place) => {
    const url = _buildMapURL(place)
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
        console.log('Not supported on device Url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err))
}