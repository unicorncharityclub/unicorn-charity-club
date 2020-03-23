import React from "react";

class TextBlackSubHeading extends React.Component {
    render() {
        return (
            <div style={{color:"black", fontSize: "1.5em", fontFamily: "monospace"}}>
                {this.props.message}
            </div>
        );
    }
}

export default TextBlackSubHeading;