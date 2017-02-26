'use strict'
import { Button, Badge, List, ListItem, Spinner, Thumbnail, Text, View } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet } from 'react-native'
import _ from 'lodash'

import { formatDate } from 'app/utils/dateFormatter'
import * as constants from 'app/constants'
import * as navigation from 'app/actions/navigation'
import * as firebase from 'app/api/firebase'

class EventETAList extends Component {

//color: 'white', fontSize: 13
    render() {
        const { attendees, etas } = this.props.eventETAList
        return (
            <View>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderTitle}>ATTENDING</Text>
                    <Badge style={styles.attendingCountBadge}>
                        <Text>{this.props.attendingCount}</Text>
                    </Badge>
                </View>
                {this._renderETAList()}
            </View>
        )
    }

    _onClickRequestETAButton = () => {

    }

    _onClickUpdateETAButton = () => {
        this.props.actions.navigateTo(constants.SCREEN.EVENT_UPDATE_ETA, this.props.event)
    }

    _renderETAButton = (attendee) => {
        if (attendee.id === firebase.getFacebookUserId()) {
            return (
                <Button style={styles.updateETAButton} onPress={this._onClickUpdateETAButton}>
                    <Text>Update ETA</Text>
                </Button>
            )
        } else {
            return (
                <Button onPress={this._onClickRequestETAButton}>
                    <Text>Request ETA</Text>
                </Button>
            )
        }
    }

    _renderETAList = () => {
        if (this.props.eventETAList.fetching) {
            return (
                <Spinner style={styles.etaSpinner} />
            )
        } else {
            return (
                <List dataArray={this.props.eventETAList.attendees}
                    renderRow={(attendee) => this._renderETAListItem(attendee, this.props.eventETAList.etas)}>
                </List>
            )
        }
    }

    _renderETAListItem = (attendee, etas) => {
        // probably a better way to do this in javascript?
        var foundETA = _.find(etas, eta => eta.facebookUserId == attendee.id)
        var etaTime = ''
        if (foundETA) {
            if (foundETA.hasArrived) {
                etaTime = 'Arrived'
            } else {
                etaTime = formatDate(new Date(foundETA.eta))
            }
        }

        return (
            <ListItem>
                <View style={styles.detailsContainer}>
                    <Thumbnail style={styles.thumbnail} source={ attendee.picture ? {uri: attendee.picture.data.url} :
                        require("app/resources/profile.png") } />
                    <View style={styles.detailsContent}>
                        <Text style={styles.userName}>{attendee.name}</Text>
                        <Text style={styles.etaTime}>{etaTime}</Text>
                    </View>
                    {this._renderETAButton(attendee)}
                </View>
            </ListItem>
        )
    }
}

export default connect(state => ({
    eventETAList: state.eventETAList
    }),
    (dispatch) => ({
        actions: bindActionCreators(navigation, dispatch)
    })
)(EventETAList)

const styles = {

    attendingCountBadge: {
        backgroundColor: 'green', 
        marginLeft: 10
    },

    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    detailsContent: {
        flexDirection: 'column',
        marginLeft: 20,
        flex: 1
    },

    etaTime: {
        fontSize: 12
    },

    listHeader: {
        backgroundColor: '#EFEDEF',
        flexDirection: 'row',
    },

    listHeaderTitle: {
        fontSize: 16,
        color: '#9C9A9C',
        marginLeft: 20,
        marginVertical: 5
    },

    etaSpinner: {
        alignItems: 'center'
    },

    thumbnail: {
        width: 50,
        height: 50
    },

    updateETAButton: {
        backgroundColor: '#00CC52'
    },

    userName: {
        fontSize: 16
    }

}