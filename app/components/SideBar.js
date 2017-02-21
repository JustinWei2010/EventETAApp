'use strict'
import { Content, Text, List, ListItem, Thumbnail, View } from 'native-base/backward'
import { Icon } from 'native-base'
import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeDrawer } from 'app/actions/drawer'
import * as login from 'app/actions/login'

class SideBar extends Component {

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
                            <View>
                                <Icon name="md-power" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>  Logout</Text>
                        </View>
                    </ListItem>
                </List>
            </Content>
        )
    }

    _onClickLogoutButton = () => {
        closeDrawer()
        this.props.actions.fbLogout()
    }

}

export default connect(state => ({
    profile: state.profile,
    }),
    (dispatch) => ({
        actions: bindActionCreators(login, dispatch)
    })
)(SideBar)

const styles = {

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
        color: 'red',
        lineHeight: (Platform.OS === 'android') ? 21 : 25,
        backgroundColor: 'transparent'
    },

    text: {
        fontWeight: '500',
        fontSize: 16
    }
}