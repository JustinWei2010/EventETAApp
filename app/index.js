'use strict'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from 'app/components/AppContainer'
import * as reducers from 'app/reducers'

//Setup redux
const _store = createStore(
    combineReducers(reducers)
)

export default class App extends Component {

    render() {
        return (
            <Provider store={_store}>
                <AppContainer />
            </Provider>
        )
    }

}