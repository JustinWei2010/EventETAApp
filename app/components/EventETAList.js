'use strict'
import { List, ListItem, Thumbnail, Text, View } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet } from 'react-native'

class EventETAList extends Component {

    render() {
        if (this.props.eventETAList.attendees && this.props.eventETAList.attendees.length > 0) {
            return (
                <View>
                    <View style={styles.listHeader}>
                        <Text style={styles.listHeaderTitle}>ATTENDING</Text>
                    </View> 
                    <List dataArray={this.props.eventETAList.attendees}
                        renderRow={(eta) => this._renderETAListItem(eta)}>
                    </List>  
                </View>
            )            
        } else {
            return null
        }
    }

    _renderETAListItem = (eta) => {
        return (
            <ListItem>
                <View style={styles.detailsContainer}>
                    <Thumbnail size={50} source={ eta.picture ? {uri: eta.picture.data.url} : 
                        require("app/resources/profile.png") } />
                    <View style={styles.detailsContent}>
                        <Text style={styles.userName}>{eta.name}</Text>
                        <Text style={styles.etaTime}>Arrived</Text>
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