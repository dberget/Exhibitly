import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
}

const cardSource = {
    beginDrag(props) {
        console.log(props)
        return {
            title: props.title,
            id: props.id
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()
    }
}

@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class Card extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        handleRemove: PropTypes.func
    }

    handleclick = (id) => {
        this.props.handleRemove(id)
    }

    render() {
        const {
            title,
            id,
            isDragging,
            connectDragSource,
		} = this.props

        return connectDragSource(<div onDoubleClick={this.handleclick.bind(this, id)} style={{ ...style }}>{title}</div>)
    }
}
