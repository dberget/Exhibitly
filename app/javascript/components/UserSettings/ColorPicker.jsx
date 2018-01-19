import React, { Component } from 'react';
import withTheme from '../WithTheme'

class ColorPicker extends Component {
    render() {
        const { primary, secondary } = this.props.theme
        const { theme } = this.props
        return (
            <div style={{ backgroundColor: secondary }}>
                <h1 style={{ color: primary }}> TEST </h1>
            </div >
        );
    }
}

const colorTest = withTheme(ColorPicker)

export default colorTest;