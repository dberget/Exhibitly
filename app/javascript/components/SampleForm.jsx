import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SampleForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.sample.title,
            body: this.props.sample.body,
            url: this.props.sample.url,
            tag: '',
            tags: this.props.sample.tags
        };
    }

    // handleTagChange = (tag) => (e) => {
    //     const newTags = this.state.tags.map((tags) => {
    //         if (tag !== tags) return tag;
    //         return [...tags, e.target.value];
    //     });

    //     this.setState({ tags: newTags });
    // }

    handleTagsUpdate = (tag) => {
        this.setState({ tags: this.state.tags.concat(tag), tag: '' });
    }

    handleRemove = (tag) => {
        const { tags } = this.state

        const index = tags.map(x => x).indexOf(tag)
        tags.splice(index, 1)

        this.setState({ tags: tags })
    }

    handleTagChange = (e) => {
        this.setState({ tag: e.target.value });
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    handleBodyChange = (e) => {
        this.setState({ body: e.target.value });
    }

    handleURLChange = (e) => {
        this.setState({ url: e.target.value });
    }

    render() {
        const { tags, tag } = this.state

        return (
            <div className="container border p-4 w-50">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="sample[title]"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Launch Url</label>
                        <input
                            type="text"
                            className="form-control"
                            name="sample[url]"
                            value={this.state.url}
                            onChange={this.handleURLChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Body</label>
                    <textarea
                        rows="6"
                        type="text"
                        className="form-control"
                        name="sample[body]"
                        value={this.state.body}
                        onChange={this.handleBodyChange}
                    />
                </div>
                <div className="form-group">
                    <label className="mr-2">Tags:</label>
                    {tags.map((tag) => (
                        <span onClick={this.handleRemove.bind(this, tag)} className="border mr-2 p-1">
                            {tag}
                        </span>
                    ))}
                    <div></div>
                    <input
                        type="text"
                        value={this.state.tag}
                        onChange={this.handleTagChange}
                    />
                    <button type="button" onClick={this.handleTagsUpdate.bind(this, tag)} className="btn-small btn-primary"> + </button>
                </div>
                {tags.map(tag =>
                    <input name="sample[tags][]" type="hidden" value={tag} />
                )}
                <input name="sample[account_id]" type="hidden" value={this.props.account_id} />
                <input className="btn btn-primary ml-auto" type="submit" value="Save" />
            </div>
        );
    }
}

SampleForm.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    url: PropTypes.string,
    tags: PropTypes.array,
    account_id: PropTypes.number
};

SampleForm.defaultProps = {
    tags: []
}

export default SampleForm;

