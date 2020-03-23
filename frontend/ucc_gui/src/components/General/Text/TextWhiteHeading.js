import React from "react";

class TextWhiteHeading extends React.Component {
    render() {
        return (
            <div style={{color:"white", fontSize: "2em", fontFamily: "monospace"}}>
                <b>{this.props.message}</b>
            </div>
        );
    }
}

export default TextWhiteHeading;