import React from "react";
import VolunteerTimeDetails from "../../../../../components/Project/ActiveProject/Step_3/VolunteerTime/VolunteerTimeDetails";
import {Container} from "@material-ui/core";

class VolunteerTime extends React.Component {

    render() {
      return(

                  <div>
                    <Container>
                        <VolunteerTimeDetails id={this.props.match.params.id} />
                    </Container>
                  </div>
        )
    }
}

export default VolunteerTime;