'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HomeScreen from 'app/screens/HomeScreen'
import LoginScreen from 'app/screens/LoginScreen'
import * as constants from 'app/constants'
import * as navigation from 'app/actions/navigation'

class AppContainer extends Component {

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

}

export default connect(state => ({
        currentScreen: state.navigation.currentScreen
    }),
    (dispatch) => ({
        actions: bindActionCreators(navigation, dispatch)
    })
)(AppContainer)