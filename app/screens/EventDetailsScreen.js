'use strict'
import { Content, Title, Header, Button, Icon } from 'native-base/backward'
import { Container, Footer, Text, View, Spinner } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleProvider,getTheme } from 'native-base';
import material from 'app/native-base-theme/variables/material';
import EventDetails from 'app/components/EventDetails'
import EventETAList from 'app/components/EventETAList'
import * as firebase from 'app/api/firebase'
import * as events from 'app/actions/events'
import * as navigation from 'app/actions/navigation'
import {watchForEventETAs, stopWatchForEventETAs} from 'app/api/firebase'

class EventDetailsScreen extends Component {

    constructor(props) {
        super(props);
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
        const event = this.props.data.event;
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={this._onClickBackButton}>
                        <View>
                            <Icon style={styles.backIcon} name='ios-arrow-back' />
                        </View>
                    </Button>
                    <Title ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
                            {event.name}
                    </Title>
                </Header>
                <Content>
                    <EventDetails event={event} />
                    <EventETAList attendingCount={event.attendingCount} event={event}/>
                </Content>
                {this._renderFooter()}
            </Container>
        )
    }

    _renderFooter = () => {
        const myFacebookUserId = firebase.getFacebookUserId()

        if (this.props.attendees.length > 0) {
            const attendee = this.props.attendees.find(x => x.id == myFacebookUserId)
            var foundETA = _.find(this.props.etas, eta => eta.facebookUserId == attendee.id)
            if (foundETA && foundETA.hasArrived) {
                return (
                    <Footer>
                        <Button block onPress={this._onClickCheckInButton.bind(this)} style={styles.checkedInButton}>
                            <View style={styles.footer}>
                                <Icon style={styles.checkedInIcon} name="md-checkmark" />
                                <Text style={styles.checkedInText}>Arrived</Text>
                            </View>
                        </Button>
                    </Footer>
                )
            } else {
                return (
                    <Footer>
                        <Button block onPress={this._onClickCheckInButton.bind(this)} style={styles.notCheckedInButton}>
                            <View style={styles.footer}>
                                <Text style={styles.notCheckedInText}>Check In</Text>
                            </View>
                        </Button>
                    </Footer>
                )
            }
        }
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
        attendees: state.eventETAList.attendees,
        etas: state.eventETAList.etas
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

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    notCheckedInButton: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#00CC52'
    },

    checkedInButton: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#ffffff'
    },

    notCheckedInText: {
        color: 'white'
    },

    checkedInText: {
        color: 'green'
    },

    checkedInIcon: {
        paddingRight: 10,
        color: 'green',
        fontSize: 28
    },

    //TODO: Remove when fully migrate to Nativebasev2.0
    backIcon: {
        paddingLeft: 5,
        color: '#007AFF',
        fontSize: 24
    }

}