import React from "react";

class TextBlueSubHeading extends React.Component {
    render() {
        return (
            <div  className="text_blue_subheading">
                {this.props.message}
            </div>
        );
    }
}

export default TextBlueSubHeading;