'use strict'
import { Container, Text, View } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as constants from 'app/constants'
import * as facebook from 'app/actions/facebook'

class LoginScreen extends Component {

    render() {
        return (
            <Container style={styles.mainContainer}>
                <View scrollEnabled={false} style={styles.content}>
                    <View style={styles.logo}>
                        <Text>
                            App Logo
                        </Text>
                    </View>
                    <Icon.Button 
                        name='facebook'
                        backgroundColor='#3b5998'
                        onPress={this._onPressFacebookButton}>
                        Login with Facebook
                    </Icon.Button>
                </View>
            </Container>
        )
    }

    _onPressFacebookButton = () => {
        this.props.actions.fbLogin()
    }

}

export default connect(state => ({
    }),
    (dispatch) => ({
        actions: bindActionCreators(facebook, dispatch)
    })
)(LoginScreen)

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: 'white'
    },

    content: {
        flex: 1,
        margin: 30
    },

    logo: {
        flex: 1,
        backgroundColor: '#F6F7F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }

})