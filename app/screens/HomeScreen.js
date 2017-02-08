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
                    <EventList title="Current events"
                            events={filteredEvents.current} />

                    <EventList title="Upcoming events"
                            events={filteredEvents.upcoming} />

                    <EventList title="Test All Events"
                            events={filteredEvents.all} />
                </Content>
            </Container>
        )
    }

    _filterEventsByDay = (events) => {
        var filteredEvents = {
            current: [],
            upcoming: [],
            all: events
        }

        //Currently limits set as today and tomorrow local time respectively
        const currentStart = moment().startOf('d')
        const currentEnd = moment(currentStart).add(1, 'd').subtract(1, 's')
        const upcomingStart = moment(currentStart).add(1, 'd')
        const upcomingEnd = moment(upcomingStart).add(1, 'd').subtract(1, 's')

        events.forEach((event) => {
            const eventTime = moment(event.start_time)
            if (eventTime >= currentStart && eventTime <= currentEnd) {
                filteredEvents.current.push(event)
            } else if (eventTime >= upcomingStart && eventTime <= upcomingEnd) {
                filteredEvents.upcoming.push(event)
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