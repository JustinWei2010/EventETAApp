'use strict'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import AppContainer from 'app/components/AppContainer'
import rootSaga from 'app/sagas'
import * as reducers from 'app/reducers'

//Setup redux
const sagaMiddleware = createSagaMiddleware()
const _store = createStore(
    combineReducers(reducers),
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default class App extends Component {

    render() {
        return (
            <Provider store={_store}>
                <AppContainer />
            </Provider>
        )
    }

}