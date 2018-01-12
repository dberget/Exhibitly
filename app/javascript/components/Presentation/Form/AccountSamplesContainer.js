import React, { Component } from 'react'
import update from 'immutability-helper'
import ItemTypes from './ItemTypes'

import CardContainer from './CardContainer'

const style = {
    minHeight: 600,
    boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)"
}

export default class AccountSamplesContainer extends Component {
    constructor() {
        super()
        this.state = { cardFormat: false }
    }
    render() {
        const { accountSamples, addSample, moveCard, canAddSample } = this.props

        return (
            <div className="col-4 offset-1 top-border-green bg-white bottom-border" style={style}>
                <div className="row mb-1 p-3">
                    <h4> Account Samples </h4>
                    <button onClick={() => this.setState({ cardFormat: !this.state.cardFormat })} className="btn btn-sm btn-light ml-auto"> Card View </button>
                </div>
                {
                    accountSamples.map((card, i) => (
                        <CardContainer
                            key={card.id}
                            data={card}
                            addSample={addSample}
                            canMove={canAddSample(card.id)}
                            format={this.state.cardFormat}
                            type={ItemTypes.NEW}
                            index={i}
                            moveCard={moveCard}
                            id={card.id}
                            title={card.title}
                        />
                    ))
                }
            </div>
        )
    }
}