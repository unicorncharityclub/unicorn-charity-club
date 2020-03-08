import React from "react";
import Button from "react-bootstrap/Button";
import "./ActiveProjectChallenge2.css";
import Challenge2Details from "../../../components/Project/ActiveChallenge2/Challenge2Details";
import TextBlue from "../../../components/General/TextBlue";
import TextWhite from "../../../components/General/TextWhite";
import {Container} from "@material-ui/core";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";

class ActiveProjectChallenge2 extends React.Component {

    render() {
      return(

                  <div>
                    <Container>
                        <Challenge2Details id={this.props.match.params.id} />
                    </Container>
                  </div>



        )
    }
}

export default ActiveProjectChallenge2;