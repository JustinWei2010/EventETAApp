'use strict'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { formatDate } from 'app/utils/dateFormatter'

const COLLAPSED_DETAILS_HEIGHT = 200

export default class EventDetails extends Component {

    componentWillMount() {
        this.state = { 
            initialRender: true,
            detailsHeight: 0,
            collapseDetails: false
        }       
    }

    render() {
        return (
            <View>
                <View style={styles.coverImageContainer}>
                    <Image style={styles.coverImage} source={this.props.event.source} />
                </View>
                
                <View style={styles.detailsCollapsible}>
                    <View onLayout={this._setDetailsHeight} style={this.state.collapseDetails ? styles.details : ''}>
                        <Text style={styles.title}>{this.props.event.name}</Text>
                        <Text style={styles.date}>{formatDate(this.props.event.startTime)}</Text>

                        <TouchableOpacity onPress={this._onClickLocation()}>
                            <Text style={styles.descriptionSeeMore}>{this.props.event.place}</Text>
                        </TouchableOpacity> 

                        {this._renderEventDescription()}   
                    </View>
                        {this._renderShowMoreButton()}
                </View> 
            </View>
        )
    }

    _onClickLocation = () => {

    }

    _onToggleCollapseDetails = () => {
        this.setState({
            collapseDetails: !this.state.collapseDetails 
        })
    }

    _setDetailsHeight = (event) => {
        const detailsHeight = event.nativeEvent.layout.height

        if (this.state.initialRender) {
            this.setState({
                initialRender: false,
                detailsHeight: detailsHeight,
                collapseDetails: detailsHeight > COLLAPSED_DETAILS_HEIGHT
            })
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

    _renderShowMoreButton = () => {
        if (this.state.detailsHeight > COLLAPSED_DETAILS_HEIGHT) {
            const showDetailsText = this.state.collapseDetails ? "Show More" : "Show Less"
            return (
                <TouchableOpacity onPress={this._onToggleCollapseDetails}>
                    <Text style={styles.descriptionSeeMore}>{showDetailsText}</Text>
                </TouchableOpacity>   
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