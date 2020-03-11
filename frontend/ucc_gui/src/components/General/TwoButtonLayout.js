import React from "react";
import Button from "react-bootstrap/Button";
import TextBlue from "./TextBlue";
import TextWhite from "./TextWhite";

class TwoButtonLayout extends React.Component {
    render() {
        return (
            <div style={{width:"60%", marginLeft:"25%", alignText:"center", marginBottom:"10px", justifyContent:"center"}}>
                <Button style={{ borderRadius : "50px 0px 0px 50px", backgroundColor:"white", border:"2px solid"}} className = "backButton" variant="light" size="lg" onClick={this.props.button1Click}>
                    <TextBlue message={this.props.button1Text+ " "}/>
                </Button>
                <Button style={{ borderRadius : "0px 50px 50px 0px", border:"2px solid black"}} className = "nextButton" variant="success" size="lg" onClick={this.props.button2Click}>
                    <TextWhite message={this.props.button2Text+ " "}/>
                </Button>
            </div>
        );
    }
}

export default TwoButtonLayout;