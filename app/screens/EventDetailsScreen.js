'use strict'
import { Body, Button, Container, Content, Footer, Header, Icon, Left, Right, Text, Title, View, Spinner } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventDetails from 'app/components/EventDetails'
import EventETAList from 'app/components/EventETAList'
import * as events from 'app/actions/events'
import * as firebase from 'app/api/firebase'
import * as navigation from 'app/actions/navigation'

class EventDetailsScreen extends Component {

    handleReceivedEventETAs(etas) {
        this.props.actions.receivedEventETAs(etas)
    }

    componentWillMount() {
        // register watching for event etas from firebase
        this.props.actions.refreshEventAttendeesAndETAs(this.props.data.event)

        firebase.watchForEventETAs(
            this.props.data.event,
            this.handleReceivedEventETAs.bind(this))
    }

    componentWillUnmount() {
        // deregister watching for event etas from firebase
        firebase.stopWatchForEventETAs(this.props.data.event)
    }

    render() {
        const event = this.props.data.event;
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={this._onClickBackButton}>
                            <View>
                                <Icon style={styles.backIcon} name='ios-arrow-back' />
                            </View>
                        </Button>
                    </Left>
                    <Body>
                        <Title ellipsizeMode='tail' numberOfLines={1} >
                            {event.name}
                        </Title>
                    </Body>
                    <Right />
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
        const curUserId = firebase.getFacebookUserId()
        if (this.props.attendees && this.props.attendees.length > 0) {
            const curUser = _.find(this.props.attendees, attendee => curUserId && attendee.id === curUserId)
            const curUserETA = _.find(this.props.etas, eta => curUser && eta.facebookUserId === curUser.id)
            if (curUserETA && curUserETA.hasArrived) {
                return (
                    <Footer>
                        <Button block onPress={this._onClickCheckInButton} style={styles.checkedInButton}>
                            <View style={styles.footer}>
                                <Icon style={styles.checkedInIcon} name='md-checkmark' />
                                <Text style={styles.checkedInText}>Arrived</Text>
                            </View>
                        </Button>
                    </Footer>
                )
            } else {
                return (
                    <Footer>
                        <Button block onPress={this._onClickCheckInButton} style={styles.notCheckedInButton}>
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
        // Keep in mind that this won't work if there are a lot of people attending event and you aren't returned in attendee list
        const curUserId = firebase.getFacebookUserId()
        const curUser = _.find(this.props.attendees, attendee => curUserId && attendee.id === curUserId)
        if (curUser) {
            this.props.actions.checkInEvent(
                this.props.data.event,
                curUser
            )
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