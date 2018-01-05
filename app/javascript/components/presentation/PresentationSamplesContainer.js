import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import update from 'immutability-helper'
import ItemTypes from './ItemTypes'
import Card from './Card'

const style = {
    width: 400,
    minHeight: 600,
    border: 'solid',
    padding: 10,
    marginRight: 80,
    marginLeft: 'auto'
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
    render() {
        const {
            presentationSamples,
            handleRemove,
            listTarget,
            connectDropTarget,
            findCard,
            canAddSample,
            moveCard } = this.props

        return (
            connectDropTarget(
                <div style={style}>
                    <h3> Presentation Samples </h3>
                    {presentationSamples.map((card, i) => (
                        <Card
                            key={card.id}
                            index={i}
                            findCard={findCard}
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