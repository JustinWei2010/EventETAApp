'use strict'
import { Card, CardItem, Text, Thumbnail, List, ListItem } from 'native-base'
import { StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import homeTheme from 'app/themes/homeTheme'
import { formatDate } from 'app/utils/dateFormatter'
import * as constants from 'app/constants'
import * as navigation from 'app/actions/navigation'

class EventList extends Component {
	render() {
		return (
			<Card theme={homeTheme}>
                <CardItem header>
                    <Text style={styles.label}>{this.props.title}</Text>
                </CardItem>
                <List dataArray={this.props.events}
                		renderRow={(event) => this._renderEvent(event)}>
                </List>
            </Card>
		)
	}

	_renderEvent = (event) => {
        return (
            <ListItem style={{flex:1}} button onPress={() => this._onClickEvent(event)}>
                <Thumbnail square size={100} source={{uri: this._getCoverSource(event.cover)}} />
                <Text>{event.name}</Text>
                <Text note>{formatDate(event.start_time)}</Text>
                <Text note>{this._getLocationName(event.place)}</Text>
            </ListItem>
        )
	}

    _getCoverSource = (cover) => {
        if (cover && cover.source) {
            return cover.source
        }
        // Need to make default picture consistent with details page, should not be on external site in case of no internet
        return 'https://facebook.github.io/react/img/logo_og.png'
    }

	_getLocationName = (place) => {
        return place ? place.name : ''
    }

    _onClickEvent = (event) => {
        const data = {
            event: {
                id: event.id,
                name: event.name,
                place: this._getLocationName(event.place),
                startTime: event.start_time,
                description: event.description,
                attendingCount: event.attending_count,
                // Need to make default picture consistent with event list
                source: event.cover && event.cover.source ? { uri: event.cover.source } : require('app/resources/eventCover.jpg')
            }
        }
        this.props.actions.navigateTo(constants.SCREEN.EVENT_DETAILS, data)
    }

}

const styles = StyleSheet.create({
    label: {
        fontWeight: "600",
        fontStyle: "italic",
    }

})

export default connect(state => ({
	}),
	(dispatch) => ({
    	actions: bindActionCreators(navigation, dispatch)
	})
)(EventList)