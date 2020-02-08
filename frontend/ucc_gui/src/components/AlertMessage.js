import React from "react";

class AlertMessage extends React.Component {
    render() {
        return (
            <div>
                {this.props.alertMessage}
            </div>
        );
    }
}

export default AlertMessage;