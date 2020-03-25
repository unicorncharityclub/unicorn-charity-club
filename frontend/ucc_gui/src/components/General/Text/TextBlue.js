import React from "react";

class TextBlue extends React.Component {
    render() {
        return (
            <div className="text_blue">
                {this.props.message}
            </div>
        );
    }
}

export default TextBlue;