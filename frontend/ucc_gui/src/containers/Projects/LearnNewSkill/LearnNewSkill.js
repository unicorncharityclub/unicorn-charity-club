import React from "react";
import Button from "react-bootstrap/Button";
import LearnNewSkillComponent from "../../../components/Project/ProjectChallenge3/LearnNewSkillComponent";
import {Container} from "@material-ui/core";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";

class LearnNewSkill extends React.Component {

    render() {
      return(

                  <div>
                    <Container>
                        <LearnNewSkillComponent id={this.props.match.params.id} />
                    </Container>
                  </div>
        )
    }
}

export default LearnNewSkill;