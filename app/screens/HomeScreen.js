'use strict'
import moment from 'moment'
import { Button, Container, Content, Header, Icon, Title } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { openDrawer } from 'app/actions/drawer'
import EventList from 'app/components/EventList'

class HomeScreen extends Component {

    constructor(props) {
        super(props)
    }

    //Adding all events for easy testing
    render() {
        const filteredEvents = this._filterEventsByDay(this.props.events)
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={this._onClickMenuButton}>
                        <Icon name='ios-menu' />
                    </Button>
                    <Title>ETA</Title>
                </Header>
                <Content>
                    <EventList title="Current Events"
                            events={filteredEvents.current} />

                    <EventList title="Upcoming Events"
                            events={filteredEvents.upcoming} />

                    <EventList title="Past Events"
                            events={filteredEvents.past} />
                </Content>
            </Container>
        )
    }

    _filterEventsByDay = (events) => {
        var filteredEvents = {
            current: [],
            upcoming: [],
            past: []
        }

        // current: beginning of today to 11:59:59 today
        // upcoming: beginning of tomorrow to 1 month later
        // past: 2 weeks ago to 23:59:59 yesterday
        const currentStart = moment().startOf('d')
        const currentEnd = moment(currentStart).add(1, 'd').subtract(1, 's')
        const upcomingStart = moment(currentStart).add(1, 'd')
        const upcomingEnd = moment(upcomingStart).add(2, 'M').subtract(1, 's')
        const pastStart = moment(currentStart).subtract(2, 'w')
        const pastEnd = moment(currentStart).subtract(1, 's')

        events.forEach((event) => {
            const eventTime = moment(event.startTime)
            if (eventTime >= currentStart && eventTime <= currentEnd) {
                filteredEvents.current.push(event)
            } else if (eventTime >= upcomingStart && eventTime <= upcomingEnd) {
                filteredEvents.upcoming.push(event)
            } else if (eventTime >= pastStart && eventTime <= pastEnd) {
                filteredEvents.past.push(event)
            }
        })

        return filteredEvents
    }

    _onClickMenuButton = () => {
        openDrawer()
    }

}

export default connect(state => ({
    events: state.eventList
    }),
    (dispatch) => ({
    })
)(HomeScreen)

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white'
    }

})