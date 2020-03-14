import React from "react";

class TextWhite extends React.Component {
    render() {
        return (
            <div style={{color:"white", fontSize: "1.1em"}}>
                {this.props.message}
            </div>
        );
    }
}

export default TextWhite;