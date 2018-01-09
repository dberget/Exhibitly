import React, { Component } from 'react'
import update from 'immutability-helper'
import ItemTypes from './ItemTypes'

import CardContainer from './CardContainer'

const style = {
    width: 500,
    marginLeft: 60,
    padding: 10,
}

export default class AccountSamplesContainer extends Component {
    render() {
        const { accountSamples, addSample, moveCard, canAddSample, cardFormat } = this.props

        return (
            <div className="border" style={style}>
                <h4> Available Samples </h4>
                {accountSamples.map((card, i) => (
                    <CardContainer
                        key={card.id}
                        data={card}
                        addSample={addSample}
                        canMove={canAddSample(card.id)}
                        format={cardFormat}
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