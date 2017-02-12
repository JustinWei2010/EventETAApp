'use strict'
import { List, ListItem, Thumbnail, Text, View } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet } from 'react-native'

import { formatDate } from 'app/utils/dateFormatter'

class EventETAList extends Component {

    render() {
        const { attendees, etas } = this.props.eventETAList
        console.log("EventETAList:")
        console.log(etas)
        if (attendees && attendees.length > 0) {
            return (
                <View>
                    <View style={styles.listHeader}>
                        <Text style={styles.listHeaderTitle}>ATTENDING</Text>
                    </View>
                    <List dataArray={this.props.eventETAList.attendees}
                        renderRow={(attendee) => this._renderETAListItem(attendee, etas)}>
                    </List>
                </View>
            )
        } else {
            return null
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
        backgroundColor: '#EFEDEF'
    },

    listHeaderTitle: {
        fontSize: 14,
        color: '#9C9A9C',
        marginLeft: 20,
        marginVertical: 5
    },

    userName: {
        fontSize: 16
    },

    etaTime: {
        fontSize: 12
    }

})