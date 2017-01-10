'use strict'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export const login = async(readPermissions) => {
    const response = await LoginManager.logInWithReadPermissions(readPermissions)
    if (response.isCancelled) {
        throw new Error('Login cancelled');
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

export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        const responseCallback = (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        }

        const userProfileRequest = new GraphRequest(
            '/me', {
                parameters: {
                    fields: {
                        string: 'id,name,picture.width(100).height(100)',
                    },
                },
            },
            responseCallback
        )

        new GraphRequestManager().addRequest(userProfileRequest).start();
    })
}

export const getUserEvents = () => {
    return new Promise((resolve, reject) => {
        const responseCallback = (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        }

        const userEventsRequest = new GraphRequest(
            '/me/events', {
                parameters: {
                    fields: {
                        string: 'id,name,start_time,place',
                    },
                    access_token: {
                        string: getFbToken().toString()
                    },
                },
            },
            responseCallback
        )

        new GraphRequestManager().addRequest(userEventsRequest).start();
    })
}