import React from "react";

class TextWhiteHeading extends React.Component {
    render() {
        return (
            <div  className="text_white_heading">
                <b>{this.props.message}</b>
            </div>
        );
    }
}

export default TextWhiteHeading;