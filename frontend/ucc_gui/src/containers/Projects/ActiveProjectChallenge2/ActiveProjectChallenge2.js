import React from "react";
import "./ActiveProjectChallenge2.css";
import Challenge2Details from "../../../components/Project/ActiveChallenge2/Challenge2Details";
import {Container} from "@material-ui/core";

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