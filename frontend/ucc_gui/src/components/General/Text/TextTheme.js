import React from "react";
import "./Text.css";

class TextTheme extends React.Component {
    render() {
        return (
            <div
                className={this.props.className}
                 style={{ top: this.props.top,
                position: this.props.position,
                transform: this.props.transform,
                right: this.props.right,
                textAlign:this.props.textAlign,
            }}>
                {/*the 'message' property is the only compulsory property to be declared while using this component*/}
                {this.props.message}
            </div>
        );
    }
}

export default TextTheme;