import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import update from 'immutability-helper'
import ItemTypes from './ItemTypes'
import CardContainer from './CardContainer'

const style = {
    minHeight: 600,
}

const listTarget = {
    drop() { },

    hover(props, monitor) {
        const item = monitor.getItem()

        if (props.canAddSample(item.id) && !undefined) {
            props.addSample(item)
        }
    }
}

@DropTarget(ItemTypes.CARD, listTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class PresentationSamplesContainer extends Component {
    constructor() {
        super()

        this.state = { cardFormat: false }
    }

    render() {
        const {
            presentationSamples,
            handleRemove,
            listTarget,
            connectDropTarget,
            findCard,
            canAddSample,
            cardFormat,
            moveCard } = this.props

        return (
            connectDropTarget(
                <div className="col-4 offset-2 top-border-green bg-white bottom-border" style={style}>
                    <div className="row mb-1 p-3">
                        <h4> Presentation Samples </h4>
                        <button onClick={() => this.setState({ cardFormat: !this.state.cardFormat })} className="btn btn-sm btn-light ml-auto"> Card View </button>
                    </div>
                    {presentationSamples.map((card, i) => (
                        <CardContainer
                            key={card.id}
                            data={card}
                            index={i}
                            findCard={findCard}
                            format={this.state.cardFormat}
                            sort
                            canAddSample={canAddSample}
                            id={card.id}
                            canMove
                            title={card.title}
                            moveCard={moveCard}
                            handleRemove={handleRemove}
                        />
                    ))}
                </div>
            )
        )
    }
}