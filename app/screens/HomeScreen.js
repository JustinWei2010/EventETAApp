'use strict'
import moment from 'moment'
import { Body, Button, Container, Content, getTheme, Header, Icon, Left, Right, StyleProvider, Title, View } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openDrawer } from 'app/actions/drawer'
import EventList from 'app/components/EventList'
import material from 'app/native-base-theme/variables/material'

class HomeScreen extends Component {

    render() {
        const filteredEvents = this._filterEventsByDay(this.props.events)
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={this._onClickMenuButton}>
                            <Icon name='ios-menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>ETA</Title>
                    </Body>
                    <Right />
                </Header>
                <StyleProvider style={getTheme(material)}>
                    <Content>
                        <EventList title='Current Events'
                                events={filteredEvents.current} />

                        <EventList title='Upcoming Events'
                                events={filteredEvents.upcoming} />

                        <EventList title='Past Events'
                                events={filteredEvents.past} />
                    </Content>
                </StyleProvider>
            </Container>
        )
    }

    _filterEventsByDay = (events) => {
        var filteredEvents = {
            current: [],
            upcoming: [],
            past: []
        }

        // Current Events: beginning of today to 11:59:59 today
        // Upcoming Events: beginning of tomorrow to 2 months later
        // Past Events: 2 weeks ago to 23:59:59 yesterday
        const currentStart = moment().startOf('d')
        const currentEnd = moment(currentStart).add(1, 'd').subtract(1, 's')
        const upcomingStart = moment(currentStart).add(1, 'd')
        const upcomingEnd = moment(upcomingStart).add(2, 'M').subtract(1, 's')
        const pastStart = moment(currentStart).subtract(2, 'w')
        const pastEnd = moment(currentStart).subtract(1, 's')

        // Use this for past start if you need to test more events
        //const pastStart = moment(currentStart).subtract(12, 'M')   

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

const styles = {

    container: {
        backgroundColor: 'white'
    }

}