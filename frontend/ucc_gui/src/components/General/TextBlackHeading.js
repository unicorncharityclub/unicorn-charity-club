import React from "react";

class TextBlackHeading extends React.Component {
    render() {
        return (
            <div style={{color:"black", fontSize: "2em"}}>
                <b>{this.props.message}</b>
            </div>
        );
    }
}

export default TextBlackHeading;