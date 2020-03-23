import React from "react";

class TextBlack extends React.Component {
    render() {
        return (
            <div style={{ color:"black", fontSize: "1.2em", fontFamily: "monospace",
                top: this.props.top,
                position: this.props.position,
                transform: this.props.transform,
                right: this.props.right,
            }}>
                {/*the 'message' property is the only compulsory property to be declared while using this component*/}
                {this.props.message}
            </div>
        );
    }
}

export default TextBlack;