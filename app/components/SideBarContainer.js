'use strict'
import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import SideBar from 'app/components/SideBar'
import * as drawer from 'app/actions/drawer'

export default class SideBarContainer extends Component {

    componentDidMount() {
        //Init global drawer to be used by drawer actions
        drawer.initDrawer(this._drawer)
    }

    componentWillUnmount() {
        //Clear global drawer reference
        drawer.clearDrawer(this._drawer)
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