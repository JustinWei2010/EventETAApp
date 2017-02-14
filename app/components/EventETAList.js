'use strict'
import { Badge, List, ListItem, Spinner, Thumbnail, Text, View } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet } from 'react-native'

import { formatDate } from 'app/utils/dateFormatter'

class EventETAList extends Component {

    render() {
        const { attendees, etas } = this.props.eventETAList
        return (
            <View>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderTitle}>ATTENDING</Text>
                    <Badge
                      style={{ backgroundColor: 'black', marginLeft: 10 }}
                      textStyle={{ color: 'white', fontSize: 13}}>
                        {this.props.attendingCount}
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
        var foundETA = null
        for (var etaKey in etas) {
            const eta = etas[etaKey]
            if (eta.facebookUserId == attendee.id) {
                foundETA = eta
                break
            }
        }

        var etaTime = foundETA ? formatDate(new Date(foundETA.eta)) : 'unknown'

        return (
            <ListItem>
                <View style={styles.detailsContainer}>
                    <Thumbnail size={50} source={ attendee.picture ? {uri: attendee.picture.data.url} :
                        require("app/resources/profile.png") } />
                    <View style={styles.detailsContent}>
                        <Text style={styles.userName}>{attendee.name}</Text>
                        <Text style={styles.etaTime}>{etaTime}</Text>
                    </View>
                    <Text>1.3 mi</Text>
                </View>
            </ListItem>
        )
    }

}

export default connect(state => ({
    eventETAList: state.eventETAList
    }),
    (dispatch) => ({})
)(EventETAList)

const styles = StyleSheet.create({

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
    }

})