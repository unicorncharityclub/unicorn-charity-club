import React from "react";

class TextBlackHeading extends React.Component {
    render() {
        return (
            <div className="text_black_heading">
                <b>{this.props.message}</b>
            </div>
        );
    }
}

export default TextBlackHeading;