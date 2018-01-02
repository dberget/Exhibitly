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

const sortTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
}

const cardSource = {
    beginDrag(props) {
        return {
            title: props.title,
            id: props.id,
            index: props.index,
        }
    },
}

@DropTarget(ItemTypes.SORT, sortTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(props => props.type, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class Card extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        handleRemove: PropTypes.func
    }

    handleCardAdd = (sample) => {
        this.props.addSample(sample)
    }
    handleclick = (id) => {
        this.props.handleRemove(id)
    }

    render() {
        const {
            title,
            id,
            index,
            isDragging,
            canAdd,
            connectDragSource,
            connectDropTarget
        } = this.props
        const opacity = isDragging ? 0 : 1

        return connectDragSource(
            connectDropTarget(<div onDoubleClick={canAdd ? this.handleCardAdd.bind(this, { title, id }) : this.handleclick.bind(this, id)} style={{ ...style, opacity }}>{title}</div>)
        )
    }
}
