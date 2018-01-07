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
            presentation: {},
            samples: []
        }
    }

    // Future auto-save feature
    // componentDidUpdate(prevProps, prevState) {
    //     const { samples } = this.state
    //     const ids = samples.map(x => x.id)

    //     if (samples !== prevState.samples) {
    //         fetch(`http://localhost:3000/api/${this.props.presentation_id}.json`, {
    //             method: "PATCH",
    //             body: JSON.stringify({
    //                 samples: ids
    //             }),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }).then(this.setState({ saved: true }))
    //     }
    // }

    componentDidMount() {
        this.setState({ samples: this.props.presentationSamples, presentation: this.props.presentation })
    }

    handleSampleAdd = (item) => {
        const { samples } = this.state
        const index = samples.map(x => x.id).indexOf(item.id)

        if (index === -1) {
            this.setState(prevState => ({
                samples: prevState.samples.concat(item)
            }))
        }
    }

    canAddSample = (id) => {
        const { samples } = this.state
        const index = samples.map(x => x.id).indexOf(id)

        return index === -1
    }

    moveCard = (id, atIndex) => {
        const { sample, index } = this.findCard(id)
        this.setState(
            update(this.state, {
                samples: {
                    $splice: [[index, 1], [atIndex, 0, sample]],
                },
            }),
        )
    }

    handleSaveClick = (e) => {
        this.handleSave()
    }

    handleSave = () => {
        const { samples } = this.state
        const { id } = this.props.presentation
        const method = id ? "PUT" : "POST"
        const ids = samples.map(x => x.id)
        const url = `/presentations${id ? "/" + id : ""}.json`
        const body = JSON.stringify({ presentation: { samples: ids, name: this.state.presentation.name } })

        fetch(url, {
            method: method,
            body: body,
            credentials: 'same-origin',
            headers: {
                "X-Requested-With": 'XMLHttpRequest',
                'X-CSRF-Token': this.props.authenticity_token,
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    presentation: {
                        ...this.state.presentation,
                        id: json.id
                    }
                })
            })
    }

    findCard = (id) => {
        const { samples } = this.state
        const sample = samples.filter(c => c.id === id)[0]

        return {
            sample,
            index: samples.indexOf(sample),
        }
    }

    handleNameChange = (e) => {
        this.setState({
            presentation: {
                ...this.state.presentation,
                name: e.target.value
            }
        })
    }

    handleRemove = (sample) => {
        const { samples } = this.state

        const index = samples.map(x => x.id).indexOf(sample)
        samples.splice(index, 1)

        this.setState({ samples: samples })
    }

    static propTypes = {
        accountSamples: PropTypes.array.isRequired,
        presentationSamples: PropTypes.array.isRequired
    }

    static defaultProps = {
        accountSamples: [],
        presentation: {},
        presentationSamples: []
    }

    render() {
        const { id, name } = this.state.presentation
        return (
            <span>
                <input className="form-control w-25" onChange={this.handleNameChange} placeholder="presentation name" value={name ? name : ""} />
                <a onClick={this.handleSaveClick} href={`/presentations/${id}`} className={`btn btn-primary float-right ${id ? "" : "disabled"}`}> View  </a>
                <button onClick={this.handleSaveClick} type="button" className="btn btn-primary mb-2 mr-1 float-right"> Save </button>
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
                        presentationSamples={this.state.samples} />
                </div>
            </span >
        )
    }
}
