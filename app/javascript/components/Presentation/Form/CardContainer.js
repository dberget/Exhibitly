import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import FormCard from './FormCard'

const style = {
    marginBottom: '.3rem',
    cursor: 'move',
    backgroundColor: 'white',
}

const sortTarget = {
    canDrop() {
        return false
    },

    hover(props, monitor, component) {
        if (props.type != 'new') {
            const { id: draggedId } = monitor.getItem()
            const { id: overId } = props

            if (draggedId !== overId) {
                const { index: overIndex } = props.findCard(overId)
                props.moveCard(draggedId, overIndex)
            }
        }
    }
}

const cardSource = {
    canDrag(props, monitor) {
        return props.canMove
    },

    beginDrag(props) {
        return {
            title: props.title,
            id: props.id,
            originalIndex: props.index,
        }
    },

    endDrag(props, monitor, component) {
        if (props.type !== 'new') {
            const { id: droppedId, originalIndex } = monitor.getItem()
            const didDrop = monitor.didDrop()

            if (!didDrop) {
                props.moveCard(droppedId, originalIndex)
            }
        }
    }
}

@DropTarget([ItemTypes.CARD, ItemTypes.SORT], sortTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    dropType: monitor.getItemType(),
    draggedItem: monitor.getItem()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class CardContainer extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        handleCanDrag: PropTypes.func,
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
            id,
            index,
            isDragging,
            draggedItem,
            dropType,
            draggedType,
            canMove,
            format,
            sort,
            data,
            connectDragSource,
            connectDropTarget
        } = this.props
        const color = canMove ? 'black' : 'darkgrey'

        const opacity = isDragging ? 0 : 1

        return connectDragSource(
            connectDropTarget(
                <div>
                    <FormCard
                        handleDoubleClick={sort ? this.handleclick.bind(this, id) : this.handleCardAdd.bind(this, { id, index })}
                        style={{ ...style, color, opacity }}
                        format={format}
                        card={data}
                    />
                </div>
            )
        )
    }
}
