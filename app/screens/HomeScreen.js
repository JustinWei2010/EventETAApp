'use strict'
import { Button, Container, Header, Icon, Title } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class HomeScreen extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={this._onClickMenuButton}>
                        <Icon name='ios-menu' />
                    </Button>
                    <Title>ETA</Title>
                </Header>
            </Container>
        )
    }

    _onClickMenuButton = () => {
        this.props.openDrawer()
    }

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white'
    }

})