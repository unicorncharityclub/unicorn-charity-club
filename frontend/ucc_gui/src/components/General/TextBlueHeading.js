import React from "react";

class TextBlueHeading extends React.Component {
    render() {
        return (
            <div style={{color:"#2BB9B7", fontSize: "2em"}}>
                <b>{this.props.message}</b>
            </div>
        );
    }
}

export default TextBlueHeading;