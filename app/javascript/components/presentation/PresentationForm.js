import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import AccountSamplesContainer from './AccountSamplesContainer'
import PresentationSamplesContainer from './PresentationSamplesContainer'

@DragDropContext(HTML5Backend)
export default class PresentationForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            presentation: []
        }
    }

    componentDidMount() {
        this.setState({ presentation: this.props.presentationSamples })
    }

    handleSampleAdd = (item) => {
        const { presentation } = this.state
        const index = presentation.map(x => x.id).indexOf(item.id)

        if (index === -1) {
            this.setState(prevState => ({
                presentation: prevState.presentation.concat(item)
            }))
        }
    }

    moveCard = (dragIndex, hoverIndex) => {
        const { presentation } = this.state
        const dragCard = presentation[dragIndex]

        this.setState(
            update(this.state, {
                presentation: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    }

    handleRemove = (sample) => {
        const { presentation } = this.state

        const index = presentation.map(x => x.id).indexOf(sample)
        presentation.splice(index, 1)

        this.setState({ presentation: presentation })
    }

    static propTypes = {
        accountSamples: PropTypes.array.isRequired,
        presentationSamples: PropTypes.array.isRequired
    }

    static defaultProps = {
        accountSamples: [],
        presentationSamples: []
    }

    render() {
        return (
            <span>
                <div className="container-fluid row mt-5">
                    <AccountSamplesContainer addSample={this.handleSampleAdd} accountSamples={this.props.accountSamples} />
                    <PresentationSamplesContainer moveCard={this.moveCard} addSample={this.handleSampleAdd} handleRemove={this.handleRemove} presentationSamples={this.state.presentation} />
                    {this.state.presentation.map(tag =>
                        <input name="presentation[presentation_samples_attributes][sample_id][]" key={tag.id} type="hidden" value={tag.id} />
                    )}
                </div>
            </span>
        )
    }
}
