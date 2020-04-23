import React from "react";
import "./TextAlert.css"

class TextAlertLarge extends React.Component {
    render() {
        return (
            <div className="alert_message_large">
                {this.props.alertMessage}
            </div>
        );
    }
}

export default TextAlertLarge;