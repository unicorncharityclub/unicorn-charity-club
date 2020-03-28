import React from "react";

class TextBlueHeading extends React.Component {
    render() {
        return (
            <div className="text_blue_heading">
                <b>{this.props.message}</b>
            </div>
        );
    }
}

export default TextBlueHeading;