'use strict'
import { Button, Card, CardItem, Container, Content, Header, Icon, Title, Text } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as constants from 'app/constants'
import * as drawer from 'app/actions/drawer'
import * as facebook from 'app/actions/facebook'
import * as navigation from 'app/actions/navigation'

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        //Fetch fb user events if they don't exist
        if(!props.events || props.events.length === 0) {
            props.actions.fbFetchEvents()
        }
    }

    render() {
        console.log(this.props.events)
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={this._onClickMenuButton}>
                        <Icon name='ios-menu' />
                    </Button>
                    <Title>ETA</Title>
                </Header>
                <Content>
                    <CardItem header>                        
                        <Text>Events</Text>
                    </CardItem>
                    <Card dataArray={this.props.events}
                          renderRow={(event) =>
                            <CardItem style={{flex:1}} button onPress={() => this._onClickEvent(event.id)}>
                                <Text>{event.name}</Text>
                                <Text>{event.start_time}</Text>
                            </CardItem>}>
                    </Card>
                </Content>
            </Container>
        )
    }

    _onClickEvent = (eventId) => {
        const data = {
            eventId: eventId
        }
        this.props.actions.navigateTo(constants.SCREEN.EVENT_DETAILS, data)
    }

    _onClickMenuButton = () => {
        drawer.openDrawer()
    }

}

export default connect(state => ({
    events: state.events.list
    }),
    (dispatch) => ({
        actions: bindActionCreators({ ...facebook, ...navigation }, dispatch)
    })
)(HomeScreen)

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white'
    }

})