import React from "react";

class TextRedSubHeading extends React.Component {
    render() {
        return (
            <div className="text_red_heading">
                {this.props.message}
            </div>
        );
    }
}

export default TextRedSubHeading;