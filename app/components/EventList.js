'use strict'
import { Card, CardItem, Text, Thumbnail, List, ListItem } from 'native-base/backward'
import { StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatDate } from 'app/utils/dateFormatter'
import * as constants from 'app/constants'
import * as navigation from 'app/actions/navigation'

class EventList extends Component {
	render() {
		return (
			<Card>
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
                <Thumbnail square size={100} source={{uri: event.source.uri}} />
                <Text>{event.name}</Text>
                <Text note>{formatDate(event.startTime)}</Text>
                <Text note>{event.place}</Text>
            </ListItem>
        )
	}

    _onClickEvent = (event) => {
        const data = {
            event: event
        }
        this.props.actions.navigateTo(constants.SCREEN.EVENT_DETAILS, data)
    }

}

const styles = {
    label: {
        fontWeight: "600",
        fontStyle: "italic",
    }
}

export default connect(state => ({
	}),
	(dispatch) => ({
    	actions: bindActionCreators(navigation, dispatch)
	})
)(EventList)