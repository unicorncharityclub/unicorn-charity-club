import React from "react";

class TextBlackHeading extends React.Component {
    render() {
        return (
            <div style={{color:"black", fontSize: "2em", paddingLeft: "20px"}}>
                <b>{this.props.message}</b>
            </div>
        );
    }
}

export default TextBlackHeading;