import React from "react";

class TextBlackSubHeading extends React.Component {
    render() {
        return (
            <div className="text_black_subheading">
                {this.props.message}
            </div>
        );
    }
}

export default TextBlackSubHeading;