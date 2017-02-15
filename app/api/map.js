'use strict'
import { Linking, Platform } from 'react-native'

const _getBaseMapURL = () => {
    var url = ''
    if (Platform.OS === 'ios') {
        // Native apple maps app
        url = 'http://maps.apple.com/?address='
    } else if (Platform.OS === 'android') {
        // Native google maps app
        url = 'geo:0,0?q='
    }    
    return url
}

export const showAddressDirections = (address) => {
    const url = _getBaseMapURL() + address
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
        console.log('Not supported on device Url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err))
}