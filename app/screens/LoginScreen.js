'use strict'
import { Container, Text, View } from 'native-base'
import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import Carousel from 'react-native-looped-carousel'
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
                    <Carousel
                        style={styles.carousel}
                        autoplay={false}
                        bullets>
                        <Image 
                            style={styles.carouselImage}
                            source={require("app/resources/sample1.jpg")} />
                        <Image 
                            style={styles.carouselImage}
                            source={require("app/resources/sample2.jpg")} />
                        <Image 
                            style={styles.carouselImage}
                            source={require("app/resources/sample3.jpg")} />
                    </Carousel>
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

    carousel: {
        flex: 1,
        marginBottom: 20
    },

    carouselImage: {
        flex:1,
        height: null,
        width: null,
        resizeMode:'stretch'
    }

})