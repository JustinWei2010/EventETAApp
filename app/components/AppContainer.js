'use strict'
import { Container } from 'native-base'
import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SideBarContainer from 'app/components/SideBarContainer'
import EventDetailsScreen from 'app/screens/EventDetailsScreen'
import EventUpdateETAScreen from 'app/screens/EventUpdateETAScreen'
import HomeScreen from 'app/screens/HomeScreen'
import LoginScreen from 'app/screens/LoginScreen'
import * as constants from 'app/constants'
import * as navigation from 'app/actions/navigation'

class AppContainer extends Component {

    componentDidMount() {
        //Mount Callback for popping history when back button is pressed on android
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }

    componentWillUnmount() {
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
        history: state.navigation.history
    }),
    (dispatch) => ({
        actions: bindActionCreators(navigation, dispatch)
    })
)(AppContainer)