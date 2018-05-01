import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import update from "immutability-helper"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

import FormNav from "./TopNav"
import AccountSamplesContainer from "./AccountSamplesContainer"
import PresentationSamplesContainer from "./PresentationSamplesContainer"

@DragDropContext(HTML5Backend)
export default class PresentationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      presentation: {},
      samples: []
    }
  }

  componentDidMount() {
    this.setState({
      samples: this.props.presentationSamples,
      presentation: this.props.presentation
    })
  }

  handleSampleAdd = item => {
    const { accountSamples } = this.props
    const { samples } = this.state
    const index = samples.map(x => x.id).indexOf(item.id)
    const newItem =
      item.originalIndex > -1
        ? accountSamples[item.originalIndex]
        : accountSamples[item.index]

    if (index === -1) {
      this.setState(prevState => ({
        samples: prevState.samples.concat(newItem)
      }))
    }
  }

  canAddSample = id => {
    const { samples } = this.state
    const index = samples.map(x => x.id).indexOf(id)

    return index === -1
  }

  moveCard = (id, atIndex) => {
    const { sample, index } = this.findCard(id)
    this.setState(
      update(this.state, {
        samples: {
          $splice: [[index, 1], [atIndex, 0, sample]]
        }
      })
    )
  }

  handleSave = () => {
    const { samples } = this.state
    const { id } = this.state.presentation
    const method = id ? "PUT" : "POST"
    const ids = samples.map(x => x.id)
    const url = `/presentations${id ? "/" + id : ""}.json`
    const body = JSON.stringify({
      presentation: { samples: ids, name: this.state.presentation.name }
    })

    fetch(url, {
      method: method,
      body: body,
      credentials: "same-origin",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-Token": this.props.authenticity_token,
        "Content-Type": "application/json"
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

  findCard = id => {
    const { samples } = this.state
    const sample = samples.filter(c => c.id === id)[0]

    return {
      sample,
      index: samples.indexOf(sample)
    }
  }

  handleNameChange = e => {
    this.setState({
      presentation: {
        ...this.state.presentation,
        name: e.target.value
      }
    })
  }

  handleCardFormat = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  handleRemove = sample => {
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
      <Fragment>
        <FormNav
          handleSaveClick={this.handleSave}
          cardFormat={this.state.expanded}
          handleCardFormat={this.handleCardFormat}
          handleNameChange={this.handleNameChange}
          id={id}
          newName={this.state.name}
          presentationName={name}
        />
        <div className="container-fluid main-bg py-5">
          <div className="row">
            <AccountSamplesContainer
              moveCard={this.moveCard}
              cardFormat={this.state.expanded}
              addSample={this.handleSampleAdd}
              canAddSample={this.canAddSample}
              accountSamples={this.props.accountSamples}
            />
            <PresentationSamplesContainer
              findCard={this.findCard}
              cardFormat={this.state.expanded}
              moveCard={this.moveCard}
              canAddSample={this.canAddSample}
              addSample={this.handleSampleAdd}
              handleRemove={this.handleRemove}
              presentationSamples={this.state.samples}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}
