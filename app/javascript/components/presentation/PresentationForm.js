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

    canAddSample = (id) => {
        const { presentation } = this.state
        const index = presentation.map(x => x.id).indexOf(id)

        return index === -1
    }

    moveCard = (id, atIndex) => {
        const { sample, index } = this.findCard(id)
        this.setState(
            update(this.state, {
                presentation: {
                    $splice: [[index, 1], [atIndex, 0, sample]],
                },
            }),
        )
    }

    findCard = (id) => {
        const { presentation } = this.state
        const sample = presentation.filter(c => c.id === id)[0]

        return {
            sample,
            index: presentation.indexOf(sample),
        }
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
                    <AccountSamplesContainer
                        moveCard={this.moveCard}
                        addSample={this.handleSampleAdd}
                        canAddSample={this.canAddSample}
                        accountSamples={this.props.accountSamples} />
                    <PresentationSamplesContainer
                        findCard={this.findCard}
                        moveCard={this.moveCard}
                        canAddSample={this.canAddSample}
                        addSample={this.handleSampleAdd}
                        handleRemove={this.handleRemove}
                        presentationSamples={this.state.presentation} />
                    {this.state.presentation.map(tag =>
                        <input name="presentation[presentation_samples_attributes][sample_id][]" key={tag.id} type="hidden" value={tag.id} />
                    )}
                </div>
            </span>
        )
    }
}
