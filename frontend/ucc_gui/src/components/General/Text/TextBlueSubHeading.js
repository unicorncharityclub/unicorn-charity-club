import React from "react";

class TextBlueSubHeading extends React.Component {
    render() {
        return (
            <div style={{color:"#2BB9B7", fontSize: "1.5em", fontFamily: "monospace"}}>
                {this.props.message}
            </div>
        );
    }
}

export default TextBlueSubHeading;