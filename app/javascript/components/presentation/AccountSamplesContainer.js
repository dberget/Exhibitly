import React, { Component } from 'react'
import update from 'immutability-helper'
import ItemTypes from './ItemTypes'
import Card from './Card'

const style = {
    width: 400,
    marginLeft: 80,
    border: 'solid',
    padding: 10
}

export default class AccountSamplesContainer extends Component {
    render() {
        const { accountSamples, addSample, moveCard, canAddSample } = this.props

        return (
            <div style={style}>
                <h3> Avaliable Samples </h3>
                {accountSamples.map((card, i) => (
                    <Card
                        key={card.id}
                        addSample={addSample}
                        canMove={canAddSample(card.id)}
                        type={ItemTypes.NEW}
                        index={i}
                        moveCard={moveCard}
                        id={card.id}
                        title={card.title}
                    />
                ))}
            </div>
        )
    }
}