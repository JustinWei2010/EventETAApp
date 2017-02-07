'use strict'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { formatDate } from 'app/utils/dateFormatter'

export default class EventDetails extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View>
                <View style={styles.coverImageContainer}>
                    <Image style={styles.coverImage} source={this.props.event.source} />
                </View>
                
                <View style={styles.detailsCollapsible}>
                    <View style={styles.details}>
                        <Text style={styles.title}>{this.props.event.name}</Text>
                        <Text style={styles.date}>{formatDate(this.props.event.startTime)}</Text>
                        {this._renderEventAttendingCount()}
                        {this._renderEventDescription()}   
                    </View>
                    <TouchableOpacity onPress={this._onToggleShowDetails}>
                        <Text style={styles.descriptionSeeMore}>See More</Text>
                    </TouchableOpacity>    
                </View> 
            </View>
        )
    }

    _renderEventAttendingCount = () => {
        if (this.props.event.attendingCount) {
            return (
                <Text style={styles.attending}>{this.props.event.attendingCount} attendees</Text>
            )
        } else {
            return null
        }
    }

    _renderEventDescription = () => {
        if (this.props.event.description) {
            return (
                <View style={styles.description}>
                    <Text style={styles.descriptionTitle}>Event Details</Text>
                    <Text style={styles.descriptionContent}>{this.props.event.description}</Text>                        
                </View>
            )
        } else {
            return null
        }
    }

}

const styles = StyleSheet.create({

    attending: {
        fontSize: 15,
        color: '#3D88EE',
        paddingTop: 5
    },

    coverImageContainer: {
        height: 200
    },

    coverImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    date: {
        fontSize: 15,
        color: '#7A7A7A',
        paddingTop: 5
    },

    description: {
        marginTop: 20
    },

    descriptionContent: {
        paddingTop: 10
    },

    descriptionSeeMore: {
        fontSize: 15,
        color: '#3D88EE',
        paddingTop: 5
    },

    descriptionTitle: {
        fontSize: 16
    },

    details: {
        overflow: 'hidden',
        height: 200
    },

    detailsCollapsible: {
        padding: 20,
        paddingTop: 10
    },

    title: {
        fontSize: 17
    }

})