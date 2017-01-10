'use strict'
import { Content, Text, List, ListItem, Icon, Thumbnail, View } from 'native-base'
import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as constants from 'app/constants'
import * as drawer from 'app/actions/drawer'
import * as facebook from 'app/actions/facebook'

class SideBar extends Component {

    constructor(props) {
        super(props)
        //Fetch fb profile if its fields don't exist
        if(!props.profile) {
            props.actions.fbFetchProfile()
        }
    }

    render() {
        return (
            <Content style={styles.sidebar}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileIcon}>
                        <Thumbnail size={60} source={this.props.profile.src} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{this.props.profile.name}</Text>
                        <Text style={styles.profileViewEvents}>View info</Text>
                    </View>
                </View>
                <List>   
                    <ListItem button iconLeft onPress={this._onClickLogoutButton}>
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { backgroundColor: '#4DCAE0', paddingLeft: 14 }]}>
                                <Icon name="md-power" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Logout</Text>
                        </View>
                    </ListItem>
                </List>
            </Content>
        )
    }

    _onClickLogoutButton = () => {
        drawer.closeDrawer()
        this.props.actions.fbLogout()
    }

}

export default connect(state => ({
    profile: state.fbProfile,
    }),
    (dispatch) => ({
        actions: bindActionCreators(facebook, dispatch)
    })
)(SideBar)

const styles = StyleSheet.create({

    sidebar: {
        flex: 1,
        backgroundColor: '#fff'
    },

    profileContainer: {
        flexDirection: 'row',
        paddingVertical: 30
    },

    profileIcon: {
        paddingHorizontal: 10,
    },

    profileInfo: {
        paddingTop: 10,
        paddingLeft: 10,
        flexDirection: 'column'
    },

    profileName: {
        fontSize: 18
    },

    profileViewEvents: {
        fontSize: 14,
        color: 'grey'
    },

    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
 
    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingLeft: 11,
        paddingTop: (Platform.OS === 'android') ? 7 : 5
    },

    sidebarIcon: {
        fontSize: 21,
        color: '#fff',
        lineHeight: (Platform.OS === 'android') ? 21 : 25,
        backgroundColor: 'transparent'
    },

    text: {
        fontWeight: '500',
        fontSize: 16
    }

})