'use strict'
import _ from 'lodash'
import { Container } from 'native-base'
import React, { Component } from 'react'
import { BackAndroid, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import EventDetailsScreen from 'app/screens/EventDetailsScreen'
import EventUpdateETAScreen from 'app/screens/EventUpdateETAScreen'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import HomeScreen from 'app/screens/HomeScreen'
import LoginScreen from 'app/screens/LoginScreen'
import SideBarContainer from 'app/components/SideBarContainer'
import * as fcm from 'app/api/fcm'
import * as constants from 'app/constants'
import * as navigation from 'app/actions/navigation'

class AppContainer extends Component {
    componentDidMount() {
        fcm.setupFCM(this._handleNotification)
        //Mount Callback for popping history when back button is pressed on android
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }

    componentWillUnmount() {
        fcm.cleanupFCM()
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

    _handleNotification = (notif) => {
        // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
        if(notif.local_notification){
            //this is a local notification
            console.log("Local notification")
        }
        if(notif.opened_from_tray){
            //app is open/resumed because user clicked banner
            console.log("Opened from tray")

            console.log(`Should navigate to event ${notif.eventId}`)
            const event = _.find(this.props.eventList, e => e.id == notif.eventId
                        && e.type == notif.eventType);
            switch(notif.notificationType) {
                case constants.NOTIFICATION_TYPE.ARRIVED:
                    if (event) {
                        // TODO: Populate this correctly
                        const data = { event }
                        // TODO: If already on the page, should refresh it!
                        this.props.actions.navigateTo(constants.SCREEN.EVENT_DETAILS, data)
                    }
                    break;
                case constants.NOTIFICATION_TYPE.REQUEST_ETA:
                    if (event) {
                        this.props.actions.navigateTo(constants.SCREEN.EVENT_UPDATE_ETA, event)
                    }
            }
        }

        // TODO: Else show a toast or some other message that a user has arrived?
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