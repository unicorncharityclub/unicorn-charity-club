import React from "react";

class TextBlack extends React.Component {
    render() {
        return (
            <div style={{color:"black", fontSize: "1.1em", fontFamily: "monospace"}}>
                {this.props.message}
            </div>
        );
    }
}

export default TextBlack;