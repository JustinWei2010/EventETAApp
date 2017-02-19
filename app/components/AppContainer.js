'use strict'
import { Container } from 'native-base'
import React, { Component } from 'react'
import { BackAndroid, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import SideBarContainer from 'app/components/SideBarContainer'
import EventDetailsScreen from 'app/screens/EventDetailsScreen'
import EventUpdateETAScreen from 'app/screens/EventUpdateETAScreen'
import HomeScreen from 'app/screens/HomeScreen'
import LoginScreen from 'app/screens/LoginScreen'
import * as constants from 'app/constants'
import * as navigation from 'app/actions/navigation'

class AppContainer extends Component {

    setupFCM() {
        FCM.requestPermissions() // for iOS
        FCM.getFCMToken().then(token => {
            console.log(token)
            // store fcm token in your server
        });
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if(notif.local_notification){
              //this is a local notification
              console.log("Local notification")
            }
            if(notif.opened_from_tray){
              //app is open/resumed because user clicked banner
              console.log("Opened from tray")

              console.log(notif)
                console.log(`Should navigate to event ${notif.eventId}`)
                if (notif.eventId) {
                    const event = _.find(this.props.eventList, e => e.id == notif.eventId);
                    if (event) {
                        // TODO: Populate this correctly
                        const data = { event }
                    // TODO: If already on the page, should refresh it!
                    this.props.actions.navigateTo(constants.SCREEN.EVENT_DETAILS, data)
                    }

                }
            } else {
                // show a toast or some other message that a user has arrived?

            }



            //await someAsyncCall()

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

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log(token)
            // fcm token may not be available on first load, catch it here
        })

        console.log('Completed FCM setup')
    }

    cleanupFCM() {
        // stop listening for events
        this.notificationListener.remove()
        this.refreshTokenListener.remove()
    }

    componentDidMount() {
        this.setupFCM()
        //Mount Callback for popping history when back button is pressed on android
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }

    componentWillUnmount() {
        this.cleanupFCM()
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
    }

    render() {
        return (
            <SideBarContainer>
                { this._renderScreen() }
            </SideBarContainer>
        )
    }

    _renderScreen = () => {
        switch(this.props.currentScreen.name) {
            case constants.SCREEN.EVENT_DETAILS:
                return (
                    <EventDetailsScreen
                        data={this.props.currentScreen.data}/>
                )

            case constants.SCREEN.EVENT_UPDATE_ETA:
                return (
                    <EventUpdateETAScreen data={this.props.currentScreen.data}/>
                )

            case constants.SCREEN.HOME:
                return (
                    <HomeScreen />
                )

            case constants.SCREEN.LOGIN:
                return (
                    <LoginScreen />
                )

            default:
                return (
                    <Container style={{ backgroundColor: 'white' }} />
                )
        }
    }

    _handleBackAction = () => {
        // If on first screen and back is pressed then exit app
        if (this.props.history.length <= 1) {
            return false
        }

        this.props.actions.navigateBack()
        return true
    }

}

export default connect(state => ({
        currentScreen: state.navigation.currentScreen,
        history: state.navigation.history,
        eventList: state.eventList
    }),
    (dispatch) => ({
        actions: bindActionCreators(navigation, dispatch)
    })
)(AppContainer)