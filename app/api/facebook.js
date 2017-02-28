'use strict'
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, MessageDialog } from 'react-native-fbsdk'

export const login = async (readPermissions) => {
    const response = await LoginManager.logInWithReadPermissions(readPermissions)
    if (response.isCancelled) {
        console.log("Login cancelled")
    } else if (await response.deniedPermissions) {
        console.log("Missing permissions: " + response.deniedPermissions)
        throw new Error('We need the requested permissions')
    }
}

export const logout = async () => {
    await LoginManager.logOut()
}

export const getFbToken = () => {
    return AccessToken.getCurrentAccessToken()
}

// Request ETA using Facebook Message Dialog
export const requestETAMessage = async (event) => {
    const requestETAContent = {
        contentType: 'link',
        contentUrl: 'https://www.google.com/#q=' + event.name,
        contentDescription: 'Whats your ETA'
    }
    const canShow = await MessageDialog.canShow(requestETAContent)
    if (canShow) {
        // Maybe want to return the promise from show, for error status
        MessageDialog.show(requestETAContent)
    } else {
        console.log("Can't send request ETA message")
    }
}

const _makeGraphRequest = (path, parameters) => {
    return new Promise((resolve, reject) => {
        const responseCallback = (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        }

        const request = new GraphRequest(
            path, {
                parameters: {
                    fields: {
                        string: parameters,
                    },
                },
            },
            responseCallback
        )

        new GraphRequestManager().addRequest(request).start();
    })
}

export const getMyProfile = () => {
    const path = '/me'
    const parameters = 'id,name,picture.width(100).height(100)'
    return _makeGraphRequest(path, parameters)
}

export const getMyEvents = () => {
    const path = '/me/events'
    const parameters = 'id,name,cover,description,start_time,attending_count,place,source'
    return _makeGraphRequest(path, parameters)
}

//TODO: Need to add offset for pagination/infinite scrolling
export const getUsersAttendingEvent = (eventId) => {
    const path = '/' + eventId + '/attending'
    const parameters = 'id,name,picture.width(100).height(100)'
    return _makeGraphRequest(path, parameters)
}
