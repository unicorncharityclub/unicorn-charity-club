import React from "react";
import Button from "react-bootstrap/Button";
import "./ActiveProjectChallenge2.css";
import Challenge2Details from "../../../components/Project/ActiveChallenge2/Challenge2Details";
import TextWhite from "../../../components/General/TextWhite";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import axiosConfig from "../../../axiosConfig";

class ActiveProjectChallenge2 extends React.Component {

    onSubmit()
    {
        const project_id = this.props.match.params.id;
        console.log(project_id);
        console.log(this.state.UserEmailId)
        console.log(this.state.optionValue)
        console.log(this.state.goalDate)
        axiosConfig.defaults.withCredentials = true;
        axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";

    }

    handleClick(e) {
        this.setState({
        selectedOption: e.target.value
  });
    };

    handleChecked(e){
        this.setState({
            checked: e.target.checked,
            optionValue: e.target.value
        })

    }


    handleDateChange(date){
    this.setState({
      goalDate: date
    });
  };


    constructor(props) {
        super(props);
        this.state = {
            UserEmailId: cookie.load('user_emailid'),

        }
     }
    render() {
      return(
                  <div>
                    <Container>
                        <Challenge2Details id={this.props.match.params.id}
                        handleChecked={this.handleChecked.bind(this)}
                        handleDateChange={this.handleDateChange.bind(this)}/>
                        <div  className="ButtonDetail">
                            <Button onClick={this.onSubmit.bind(this)} style={{ borderRadius : "50px 50px 50px 50px", border:"2px solid black"}} className = "nextButton"
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