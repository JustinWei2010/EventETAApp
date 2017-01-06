'use strict'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export const login = async(readPermissions) => {
    const response = await LoginManager.logInWithReadPermissions(readPermissions)
    if (response.isCancelled) {
        throw new Error('Login cancelled');
    } else if (await response.deniedPermissions) {
        console.log("Missing permissions: " + response.deniedPermissions)
        throw new Error('We need the requested permissions')
    } else {
        return await AccessToken.getCurrentAccessToken()
    }
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
                        string: 'id,name',
                    },
                },
            },
            responseCallback
        )

        new GraphRequestManager().addRequest(userProfileRequest).start();
    })

}