import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import update from 'immutability-helper'
import ItemTypes from './ItemTypes'
import CardContainer from './CardContainer'

const style = {
    width: 500,
    minHeight: 400,
    marginRight: 60,
    padding: 10,
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
            cardFormat,
            moveCard } = this.props

        return (
            connectDropTarget(
                <div className="border" style={style}>
                    <h4> Presentation Samples </h4>
                    {presentationSamples.map((card, i) => (
                        <CardContainer
                            key={card.id}
                            data={card}
                            index={i}
                            findCard={findCard}
                            format={cardFormat}
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