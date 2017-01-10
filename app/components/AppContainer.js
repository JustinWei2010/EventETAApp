'use strict'
import { Container } from 'native-base'
import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Drawer from 'react-native-drawer'
import EventDetailsScreen from 'app/screens/EventDetailsScreen'
import HomeScreen from 'app/screens/HomeScreen'
import LoginScreen from 'app/screens/LoginScreen'
import SideBar from 'app/components/SideBar'
import * as constants from 'app/constants'
import * as drawer from 'app/actions/drawer'
import * as navigation from 'app/actions/navigation'

class AppContainer extends Component {

    componentDidMount() {
        //Mount Callback for popping history when back button is pressed on android
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)   

        //Init global drawer to be used by drawer actions
        drawer.initDrawer(this._drawer)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
        drawer.clearDrawer(this._drawer)
    }

    render() {
        return (
            <Drawer
                ref={(ref) => {this._drawer=ref}}
                type="static"
                content={
                    <SideBar />
                }
                tapToClose={true}
                openDrawerOffset={100}>
                { this._renderScreen() }
            </Drawer>
        )
    }

    _renderScreen = () => {
        switch(this.props.currentScreen.name) {
            case constants.SCREEN.EVENT_DETAILS:
                return (
                    <EventDetailsScreen 
                        data={this.props.currentScreen.data}/>
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