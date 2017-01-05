'use strict'
import { Button, Container, Header, Icon, Title } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
            </Container>
        )
    }

    _onClickBackButton = () => {
        this.props.actions.navigateBack()
    }

}

export default connect(state => ({
    }),
    (dispatch) => ({
        actions: bindActionCreators(navigation, dispatch)
    })
)(HomeScreen)