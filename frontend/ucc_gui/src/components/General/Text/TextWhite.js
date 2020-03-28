import React from "react";

class TextWhite extends React.Component {
    render() {
        return (
            <div className="text_white">
                {this.props.message}
            </div>
        );
    }
}

export default TextWhite;