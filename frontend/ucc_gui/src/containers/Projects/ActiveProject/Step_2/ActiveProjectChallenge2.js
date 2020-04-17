import React from "react";
import "./ActiveProjectChallenge2.css";
import Challenge2Details from "../../../../components/Project/ActiveProject/Step_2/Challenge2Details";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import AxiosConfig from "../../../../axiosConfig";

class ActiveProjectChallenge2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmailId: cookie.load('user_email'),
            goalDate: new Date(),
        }
     }

    onSubmit()
    {
  
        AxiosConfig.put(`charityproject/update/Challenge/`, {
            "project_id" : this.props.match.params.id ,
            "goal_date" :  this.formatDate(this.state.goalDate),
            "adventure_id" :   this.state.optionValue       
        })
        .then(this.props.history.push(`/Projects/${this.props.match.params.id}/SpreadTheWord`))
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
        var goalDate_Str  = this.formatDate(date)
        
        this.setState({
            goalDate: new Date(goalDate_Str)
        });        
    };


    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
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