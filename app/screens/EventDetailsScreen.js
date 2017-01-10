'use strict'
import { Text } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

export default class EventDetailsScreen extends Component {

    render() {
        return (
            <Text style={{flex:1}}>{this.props.data.eventId}</Text>
        )
    }

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white'
    }

})