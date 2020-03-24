import React from "react";
import "./ActiveProjectChallenge2.css";
import Challenge2Details from "../../../../components/Project/ActiveProject/Step_2/Challenge2Details";
import TextWhite from "../../../../components/General/Text/TextWhite";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import axiosConfig from "../../../../axiosConfig";
import TextBlack from "../../../../components/General/Text/TextBlack";
import DatePicker from "react-datepicker";
import Button from 'react-bootstrap/Button';

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
        axiosConfig.put('charityproject/update/Challenge2',
            {"user_email": this.state.UserEmailId,
                    "project_id":project_id,
                "goal_date":this.state.goalDate,
                "adv_id":this.state.optionValue
            },
                )
                .then(res => console.log(res))
                .catch(error => console.log(error))

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

    handleDateChange= date =>{
    this.setState({
        goalDate: date
    });
    };

    constructor(props) {
        super(props);
        this.state = {
            UserEmailId: cookie.load('user_emailid'),
            goalDate: new Date(),

        }
     }
    render() {
      return(
                  <div>
                    <Container>
                        <Challenge2Details id={this.props.match.params.id}
                        handleChecked={this.handleChecked.bind(this)}/>
                        <br/>
                        <TextBlack message = "2. Set a target date to complete your goal:"/>
                        <div className="DatePick">
                        <DatePicker selected = {this.state.goalDate} onChange={this.handleDateChange}/>
                        </div>
                        <br/>
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