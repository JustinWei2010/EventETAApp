'use strict'
import { Button, Container, Content, Footer, Header, Icon, Title } from 'native-base/backward'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventDetails from 'app/components/EventDetails'
import EventETAList from 'app/components/EventETAList'
import * as firebase from 'app/api/firebase'
import * as events from 'app/actions/events'
import * as navigation from 'app/actions/navigation'
import {watchForEventETAs, stopWatchForEventETAs} from 'app/api/firebase'

class EventDetailsScreen extends Component {

    constructor(props) {
        super(props)
    }

    handleReceivedEventETAs(etas) {
        this.props.actions.receivedEventETAs(etas)
    }

    componentWillMount() {
        // register watching for event etas from firebase
        this.props.actions.refreshEventAttendeesAndETAs(this.props.data.event)

        watchForEventETAs(
            this.props.data.event,
            this.handleReceivedEventETAs.bind(this))
    }

    componentWillUnmount() {
        // deregister watching for event etas from firebase
        stopWatchForEventETAs(this.props.data.event)
    }

    render() {
        const event = this.props.data.event
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={this._onClickBackButton}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
                            {event.name}
                    </Title>
                </Header>
                <Content>
                    <EventDetails event={event} />
                    <EventETAList attendingCount={event.attendingCount} event={event}/>
                </Content>
                <Footer>
                    <Button block onPress={this._onClickCheckInButton.bind(this)} style={styles.footerButton}>
                        Check In
                    </Button>
                </Footer>
            </Container>
        )
    }

    _onClickBackButton = () => {
        this.props.actions.navigateBack()
    }

    _onClickCheckInButton = () => {
        const facebookUserId = firebase.getFacebookUserId()
        const attendee = this.props.attendees.find(x => x.id == facebookUserId)
        if (attendee) {
            this.props.actions.checkInEvent(
                this.props.data.event,
                attendee
            )
        } else {
            console.error('User not an attendee of event -- cannot checkIn.')
        }
    }

}

export default connect(state => ({
        attendees: state.eventETAList.attendees
    }),
    (dispatch) => ({
        actions: bindActionCreators({ ...events, ...navigation }, dispatch)
    })
)(EventDetailsScreen)

const styles = {

    container: {
        backgroundColor: 'white',
    },

    title: {
        marginHorizontal: 50,
        textAlign: 'center'
    },

    footerButton: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#00CC52'
    }

}