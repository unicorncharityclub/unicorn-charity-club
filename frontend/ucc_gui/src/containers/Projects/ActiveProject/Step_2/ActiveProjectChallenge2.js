import React from "react";
import "./ActiveProjectChallenge2.css";
import Challenge2Details from "../../../../components/Project/ActiveProject/Step_2/Challenge2Details";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import AxiosConfig from "../../../../axiosConfig";

class ActiveProjectChallenge2 extends React.Component {

    onSubmit()
    {
        const projectId = this.props.match.params.id;
        let formData = new FormData();
        try {
            formData.append('user_email', this.state.userEmailId);
            formData.append('project_id', projectId);
            formData.append('goal_date', this.state.goalDate);
            formData.append('adv_id', this.state.optionValue);
        } catch (err) {
            console.log(err)
        }
        AxiosConfig.defaults.withCredentials = true;
        AxiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        AxiosConfig.put('charityproject/update/Challenge2', formData,
                {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
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
            userEmailId: cookie.load('user_email'),
            goalDate: new Date(),
        }
     }
    render() {
      return(
                  <div>
                    <Container>
                        <Challenge2Details id={this.props.match.params.id}
                        handleChecked={this.handleChecked.bind(this)}
                        goalDate = {this.state.goalDate}
                        handleDateChange = {this.handleDateChange.bind(this)}
                        onSubmit = {this.onSubmit.bind(this)}/>
                    </Container>
                  </div>
        )
    }
}

export default ActiveProjectChallenge2;