'use strict'
import { Button, Badge, List, ListItem, Spinner, Thumbnail, Text, View } from 'native-base/backward'
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

    render() {
        const { attendees, etas } = this.props.eventETAList
        return (
            <View>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderTitle}>ATTENDING</Text>
                    <Badge
                      style={{ backgroundColor: 'green', marginLeft: 10 }}
                      textStyle={{ color: 'white', fontSize: 13}}>
                        <Text>{this.props.attendingCount}</Text>
                    </Badge>
                </View>
                {this._renderETAList()}
            </View>
        )
    }

    _renderETAList = () => {
        if (this.props.eventETAList.fetching) {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner />
                </View>
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
                    <Thumbnail size={50} source={ attendee.picture ? {uri: attendee.picture.data.url} :
                        require("app/resources/profile.png") } />
                    <View style={styles.detailsContent}>
                        <Text style={styles.userName}>{attendee.name}</Text>
                        <Text style={styles.etaTime}>{etaTime}</Text>
                    </View>
                    {this.renderButton(attendee)}

                </View>
            </ListItem>
        )
    }

    renderButton(attendee) {
        if (attendee.id == firebase.getFacebookUserId()) {
            return <Button style={styles.updateETAButton}
                onPress={(this)._onUpdateETA.bind(this)}>Update ETA</Button>
        } else {
            return <Button>Request ETA</Button>
        }
    }

    _onUpdateETA() {
        this.props.actions.navigateTo(constants.SCREEN.EVENT_UPDATE_ETA, this.props.event)
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

    spinnerContainer: {
        alignItems: 'center'
    },

    userName: {
        fontSize: 16
    },

    etaTime: {
        fontSize: 12
    },

    updateETAButton: {
        backgroundColor: '#00CC52'
    }

}