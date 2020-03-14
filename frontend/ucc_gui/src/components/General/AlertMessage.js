import React from "react";

class AlertMessage extends React.Component {
    render() {
        return (
            <div style={{color:"red", fontSize: "1em"}}>
                {this.props.alertMessage}
            </div>
        );
    }
}

export default AlertMessage;