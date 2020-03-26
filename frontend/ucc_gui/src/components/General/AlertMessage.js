import React from "react";
import "./AlertMessage.css"

class AlertMessage extends React.Component {
    render() {
        return (
            <div className="alert_message">
                {this.props.alertMessage}
            </div>
        );
    }
}

export default AlertMessage;