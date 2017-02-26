// Firebase Cloud messaging API
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { Platform } from 'react-native'

var notificationListener;
var refreshTokenListener;

export const setupFCM = (handleNotification) => {
    FCM.requestPermissions() // for iOS
    FCM.getFCMToken().then(token => {
        console.log(token)
        // store fcm token in your server
    });

    notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        handleNotification(notif)

        if(Platform.OS === 'ios'){
            //optional
            //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //notif._notificationType is available for iOS platfrom
            switch(notif._notificationType){
            case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
            case NotificationType.NotificationResponse:
                notif.finish();
                break;
            case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
            }
        }
    })

    refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
        console.log(token)
        // fcm token may not be available on first load, catch it here
    })

    console.log('Completed FCM setup')
}

export const cleanupFCM = () => {
    notificationListener.remove()
    refreshTokenListener.remove()
}