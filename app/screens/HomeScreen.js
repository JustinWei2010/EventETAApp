'use strict'
import { Button, Container, Content, Header, Icon, Text, Title } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as facebook from 'app/actions/facebook'
import * as navigation from 'app/actions/navigation'

class HomeScreen extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={this._onClickBackButton}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title>ETA</Title>
                </Header>
                <Content>                  
                    <Text>Hi, {this.props.name}</Text>
                    <Button onPress={this._onClickLogoutButton}>
                        Logout!
                    </Button>
                </Content>
            </Container>
        )
    }

    _onClickBackButton = () => {
        this.props.actions.navigateBack()
    }

    _onClickLogoutButton = () => {
        this.props.actions.fbLogout()
    }

}

export default connect(state => ({
        name: state.fbProfile.name 
    }),
    (dispatch) => ({
        actions: bindActionCreators({ ...facebook, ...navigation }, dispatch)
    })
)(HomeScreen)