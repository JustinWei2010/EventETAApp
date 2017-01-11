'use strict'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import * as constants from 'app/constants'

export const login = async(readPermissions) => {
    const response = await LoginManager.logInWithReadPermissions(readPermissions)
    if (response.isCancelled) {
        console.log("Login cancelled")
    } else if (await response.deniedPermissions) {
        console.log("Missing permissions: " + response.deniedPermissions)
        throw new Error('We need the requested permissions')
    } 
}

export const logout = async() => {
    await LoginManager.logOut()
}

export const getFbToken = () => {
    return AccessToken.getCurrentAccessToken()
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

export const getUserProfile = () => {
    const path = constants.FACEBOOK_GRAPH.MY_PROFILE
    const parameters = 'id,name,picture.width(100).height(100)'
    return _makeGraphRequest(path, parameters)
}

export const getUserEvents = () => {
    const path = constants.FACEBOOK_GRAPH.MY_EVENTS
    const parameters = 'id,name,start_time,place'
    return _makeGraphRequest(path, parameters)
}
