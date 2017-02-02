'use strict'
import { Button, Card, CardItem, Container, Content, Header, Icon, Title, Text, Thumbnail, List, ListItem } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dateformat from 'dateformat'
import homeTheme from 'app/themes/homeTheme'
import * as constants from 'app/constants'
import * as drawer from 'app/actions/drawer'
import * as facebook from 'app/actions/facebook'
import * as navigation from 'app/actions/navigation'
import EventList from 'app/components/EventList'

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        //Fetch fb user events if they don't exist
        if(!props.events || props.events.length === 0) {
            props.actions.fbFetchEvents()
        }
        //this.todayEnvets = fuction();
    }

    render() {
        console.log(this.props.events);
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent>
                        <Icon name='ios-arrow-back' style={{color: 'transparent'}}/>
                    </Button>

                    <Title>ETA</Title>

                    <Button transparent onPress={this._onClickMenuButton}>
                        <Icon name='ios-menu' />
                    </Button>       
                </Header>
                <Content>
                    <EventList title="Current events"
                            events={this.getCurrentEvents(this.props.events)} />

                    <EventList title="Current events"
                            events={this.getUpcomingEvents(this.props.events)} />
                </Content>
            </Container>
        )
    }

    getCurrentEvents = function(events) {
        var todayEvents = [];
        var todayDate = new Date();
        var tomorrowDate = new Date();
        tomorrowDate.setHours(0);
        tomorrowDate.setMinutes(0);
        tomorrowDate.setSeconds(0);
        tomorrowDate.setDate(todayDate.getDate() + 1);

        events.forEach(function(event) {
            var eventTime = new Date(event.start_time);
            if (eventTime > todayDate && eventTime < tomorrowDate) {
                todayEvents.push(event);
            }
        })

        return todayEvents;
    }

    getUpcomingEvents = function(events) {
        var otherEvents = [];
        var tomorrowDate = new Date();
        tomorrowDate.setHours(0);
        tomorrowDate.setMinutes(0);
        tomorrowDate.setSeconds(0);
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        var nextMonthDate = new Date();
        nextMonthDate.setHours(0);
        nextMonthDate.setMinutes(0);
        nextMonthDate.setSeconds(0);
        nextMonthDate.setMonth(nextMonthDate.setMonth() + 1);

        events.forEach(function(event) {
            var eventTime = new Date(event.start_time);
            if (eventTime > tomorrowDate) {
                otherEvents.push(event);
            }
        })

        return otherEvents;
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
    },

    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }

})