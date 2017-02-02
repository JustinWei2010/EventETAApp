'use strict'
import { Button, Card, CardItem, Container, Content, Header, Icon, Title, Text, Thumbnail, List, ListItem } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dateformat from 'dateformat'
import homeTheme from 'app/themes/homeTheme'
import * as constants from 'app/constants'
import * as drawer from 'app/actions/drawer'
import * as facebook from 'app/actions/facebook'
import * as navigation from 'app/actions/navigation'


class EventList extends Component {
	
	render() { 
		console.log("HERE");
		return (
			<Card theme={homeTheme}>
                <CardItem header>                        
                    <Text>{this.props.title}</Text>
                </CardItem>
                <List dataArray={this.props.events}
                		renderRow={(event) => this._renderEvent(event)}>
                </List>
            </Card>
		)
	}

	_renderEvent = (event) => {
        return (
            <ListItem style={{flex:1}} button onPress={() => this._onClickEvent(event.id)}>
                <Thumbnail square size={100} source={{uri: this.getCoverPhotoSource(event)}} />
                <Text>{event.name}</Text>
                <Text note>When: {this.formatDateString(event.start_time)}</Text>
                <Text note>Where: {this.getLocationName(event)}</Text>
            </ListItem>
        );
	}

    getCoverPhotoSource = function(event) {
        if (event && event.cover && event.cover.source) {
            return event.cover.source;
        }
        return "https://facebook.github.io/react/img/logo_og.png";
    }

	getLocationName = (event) => {
        if (event && event.place && event.place.name) {
            return event.place.name;
        }

        return "Unknown Location";
    }

    formatDateString = (eventStartTime) => {
        return dateformat(new Date(eventStartTime), "ddd, mmm dS @ h:MM TT");
    }

    _onClickEvent = (eventId) => {
        const data = {
            eventId: eventId
        }
        this.props.actions.navigateTo(constants.SCREEN.EVENT_DETAILS, data)
    }

}

export default connect(state => ({
	}),
	(dispatch) => ({
    	actions: bindActionCreators(navigation, dispatch)
	})
)(EventList)
