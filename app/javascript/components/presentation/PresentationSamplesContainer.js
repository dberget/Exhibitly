import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
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
    drop(props, monitor, component) {
        const item = monitor.getItem();

        props.addSample(item)
    }
}

@DropTarget(ItemTypes.CARD, listTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class PresentationSamplesContainer extends Component {
    render() {
        const { presentationSamples, handleRemove, listTarget, connectDropTarget } = this.props

        return (
            connectDropTarget(
                <div style={style}>
                    <h3> Presentation Samples </h3>
                    {presentationSamples.map((card, i) => (
                        <Card
                            key={card.id}
                            index={i}
                            id={card.id}
                            title={card.title}
                            handleRemove={handleRemove}
                        />
                    ))}
                </div>
            )
        )
    }
}