import React from "react";
import Button from "react-bootstrap/Button";
import "./ActiveProjectChallenge2.css";
import Challenge2Details from "../../../components/Project/ActiveChallenge2/Challenge2Details";
import TextWhite from "../../../components/General/TextWhite";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import axiosConfig from "../../../axiosConfig";

class ActiveProjectChallenge2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserEmailId: cookie.load('user_emailid')
        }
     }
    render() {
      return(
                  <div>
                    <Container>
                        <Challenge2Details id={this.props.match.params.id} />
                        <div className="ButtonDetail">
                            <Button style={{ borderRadius : "50px 50px 50px 50px", border:"2px solid black"}} className = "nextButton"
                                    variant="success" size="lg">
                        <TextWhite message="DONE "/>
                    </Button>
                        </div>
                    </Container>
                  </div>


        )
    }
}

export default ActiveProjectChallenge2;