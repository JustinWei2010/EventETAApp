'use strict'
import React, { Component } from 'react'
import LoginScreen from 'app/screens/LoginScreen'

export default class AppContainer extends Component {

    render() {
        return (
            this._renderScene()
        )
    }

    _renderScene = () => {
        return (
            <LoginScreen />
        )
    }

}    