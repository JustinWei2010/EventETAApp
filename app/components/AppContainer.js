'use strict'
import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HomeScreen from 'app/screens/HomeScreen'
import LoginScreen from 'app/screens/LoginScreen'
import * as constants from 'app/constants'
import * as navigation from 'app/actions/navigation'

class AppContainer extends Component {

    componentDidMount() {
        //Mount Callback for popping back stack when back button is pressed on android
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)    
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
    }

    render() {
        return (
            this._renderScreen()
        )
    }

    _renderScreen = () => {
        switch(this.props.currentScreen) {
            case constants.SCREEN.LOGIN:
                return (
                    <LoginScreen />
                )
                
            case constants.SCREEN.HOME:
                return (
                    <HomeScreen />
                )

            default:
                console.log('No screen found for: ' + this.props.currentScreen)
                return (
                    <LoginScreen />
                )
        }
    }

    _handleBackAction = () => {
        // If on first screen and back is pressed then exit app
        if (this.props.history.length === 1) {
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