'use strict'
import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { clearDrawer, initDrawer } from 'app/actions/drawer'
import SideBar from 'app/components/SideBar'

export default class SideBarContainer extends Component {

    componentDidMount() {
        //Init global drawer to be used by drawer actions
        initDrawer(this._drawer)
    }

    componentWillUnmount() {
        //Clear global drawer reference
        clearDrawer(this._drawer)
    }

    render() {
        return (
            <Drawer
                ref={(ref) => {this._drawer=ref}}
                type="static"
                content={
                    <SideBar />
                }
                tapToClose={true}
                openDrawerOffset={100}>
                { this.props.children }
            </Drawer>
        )
    }

}