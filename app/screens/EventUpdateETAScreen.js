'use strict'
import { Button, Container, Content, Text, Card, CardItem, List, ListItem, Header, Icon, Title } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import homeTheme from 'app/themes/homeTheme'
import * as events from 'app/actions/events'
import * as navigation from 'app/actions/navigation'

const etaSuggestions = [
    {
        text: '5 mins',
        value: 5
    },
    {
        text: '10 mins',
        value: 10
    },
    {
        text: '15 mins',
        value: 15
    },
    {
        text: '30 mins',
        value: 30
    },
    {
        text: '45 mins',
        value: 45
    },
    {
        text: '1 hour',
        value: 60
    }
]

class EventUpdateETAScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={this._onClickBackButton}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title>Update ETA</Title>
                </Header>
                <Content>
                    <List dataArray={etaSuggestions}
                        renderRow={(etaSuggestion) => this._renderETASuggestion(etaSuggestion)}>
                    </List>
                </Content>

                <Card theme={homeTheme}>
                    <CardItem header>
                        <Text>ETA Suggestions</Text>
                    </CardItem>

                </Card>
            </Container>
        )
    }

    _renderETASuggestion = (etaSuggestion) => {
        return (
            <ListItem onPress={() => this._onSelectETA(etaSuggestion)}>
                <Text>{etaSuggestion.text}</Text>
            </ListItem>
        )
    }

    _onSelectETA = (suggestion) => {
        this.props.actions.updateEventETA(
            { facebookEventId : this.props.data.id },
            new Date(new Date().getTime() + (suggestion.value * 60 * 1000))
        )

        this.props.actions.navigateBack()
    }

    _onClickBackButton = () => {
        this.props.actions.navigateBack()
    }
}

export default connect(state => ({
    }),
    (dispatch) => ({
        actions: bindActionCreators({ ...navigation, ...events }, dispatch)
    })
)(EventUpdateETAScreen)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    }
})