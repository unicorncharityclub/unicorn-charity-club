import React from "react";
import LearnNewSkillComponent from "../../../../../components/Project/ActiveProject/Step_3/LearnNewSkill/LearnNewSkillComponent";
import {Container} from "@material-ui/core";

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