'use strict'
import { Text, Button, View } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as events from 'app/actions/event'

class EventDetailsScreen extends Component {
    _onUpdateETAPress() {
        this.props.actions.updateEventETA(
            // Note: This is hard-coded with facebookEventId for now, later we will want to make generic.
            {facebookEventId: this.props.data.eventId},
            new Date(new Date().getTime() + (30 * 60 * 1000)) // right now hard code to 30 mins from now.
         )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.data.eventId}</Text>
                <Button onPress={this._onUpdateETAPress.bind(this)}>Update ETA</Button>
            </View>
        )
    }

}

export default connect(null,
    (dispatch) => ({
        actions: bindActionCreators({ ...events }, dispatch)
    })
)(EventDetailsScreen)

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        padding: 40,
        flex: 1
    }

})
