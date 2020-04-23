import React from "react";
import "./TextAlertLarge.css"

class TextAlertLarge extends React.Component {
    render() {
        return (
            <div className="alert_message">
                {this.props.alertMessage}
            </div>
        );
    }
}

export default TextAlertLarge;