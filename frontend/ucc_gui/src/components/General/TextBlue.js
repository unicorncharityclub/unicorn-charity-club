import React from "react";

class TextBlue extends React.Component {
    render() {
        return (
            <div style={{color:"#2BB9B7", fontSize: "1.1em"}}>
                {this.props.message}
            </div>
        );
    }
}

export default TextBlue;