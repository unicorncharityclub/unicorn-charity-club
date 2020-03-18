import React from "react";
import DevelopNewHabitComponent from "../../../../../components/Project/ActiveProject/Step_3/DevelopNewHabit/DevelopNewHabitComponent";
import {Container} from "@material-ui/core";

class LearnNewSkill extends React.Component {

    render() {
      return(

                  <div>
                    <Container>
                        <DevelopNewHabitComponent id={this.props.match.params.id} />
                    </Container>
                  </div>
        )
    }
}

export default LearnNewSkill;