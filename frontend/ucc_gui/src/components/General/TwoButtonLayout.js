import React from "react";
import Button from "react-bootstrap/Button";
import TextTheme from "./Text/TextTheme";
import "./TwoButtonLayout.css"

class TwoButtonLayout extends React.Component {
    render() {
        return (
            <div className="two_button_div">
                <Button className="two_button_left_button" variant="light" size="lg"
                        disabled={this.props.disabled}
                        onClick={this.props.button1Click}>
                    <b>
                        <TextTheme message={this.props.button1Text+ " "} className="text_small text_blue" />
                    </b>
                </Button>
                <Button className="two_button_right_button"
                        disabled={this.props.disabled}
                        variant="success"
                        size="lg" onClick={this.props.button2Click}>
                    <b>
                        <TextTheme message={this.props.button2Text+ " "} className="text_small text_white" />
                    </b>
                </Button>
            </div>
        );
    }
}

export default TwoButtonLayout;