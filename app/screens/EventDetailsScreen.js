'use strict'
import { Button, Container, Content, Footer, Header, Icon, Title } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventDetails from 'app/components/EventDetails'
import EventETAList from 'app/components/EventETAList'
import * as events from 'app/actions/events'
import * as navigation from 'app/actions/navigation'
import {watchForEventETAs, stopWatchForEventETAs} from 'app/api/firebase'

class EventDetailsScreen extends Component {

    constructor(props) {
        super(props)
        this.props.actions.fetchUsersAttendingFBEvent(props.data.event.id)
    }

    handleUpdateEventETAs(etas) {
        this.props.actions.refreshEventETAs(etas)
    }

    componentWillMount() {
        // register watching for event etas from firebase
        watchForEventETAs(
            this.getEvent(),
            this.handleUpdateEventETAs.bind(this))
    }

    componentWillUnmount() {
        // deregister watching for event etas from firebase
        stopWatchForEventETAs(this.getEvent())
    }

    getEvent() {
        // Note: This is hard-coded with facebookEventId for now, later we will want to make generic.
        return { facebookEventId: this.props.data.event.id };
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
                    <EventETAList attendingCount={event.attendingCount}/>
                    <Button onPress={this._onUpdateETAPress.bind(this)}>Update ETA</Button>
                </Content>
                <Footer>
                    <Button block onPress={this._onClickCheckInButton()} style={styles.footerButton}>
                        Check In
                    </Button>
                </Footer>
            </Container>
        )
    }

    _onUpdateETAPress() {
        this.props.actions.updateEventETA(
            this.getEvent(),
            new Date(new Date().getTime() + (30 * 60 * 1000)) // right now hard code to 30 mins from now.
         )
    }

    _onClickBackButton = () => {
        this.props.actions.navigateBack()
    }

    _onClickCheckInButton = () => {
        this.props.actions.checkInEvent(
            {facebookEventId: this.props.data.event.id}
        )
    }

}

export default connect(state => ({
    }),
    (dispatch) => ({
        actions: bindActionCreators({ ...events, ...navigation }, dispatch)
    })
)(EventDetailsScreen)

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
    },

    title: {
        marginHorizontal: 50,
        textAlign: 'center'
    },

    footerButton: {
        marginHorizontal: 10,
        backgroundColor: '#00CC52'
    }

})