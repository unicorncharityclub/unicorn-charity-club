import React from "react";

class TextRedSubHeading extends React.Component {
    render() {
        return (
            <div style={{color:"red", fontSize: "1.5em", fontFamily: "monospace"}}>
                {this.props.message}
            </div>
        );
    }
}

export default TextRedSubHeading;