import React from "react";

class AlertMessage extends React.Component {
    render() {
        return (
            <div style={{color:"red", fontSize: "1.2em", fontFamily: "monospace"}}>
                {this.props.alertMessage}
            </div>
        );
    }
}

export default AlertMessage;