import React from "react";
import "./ActiveProjectChallenge2.css";
import Challenge2Details from "../../../../components/Project/ActiveProject/Step_2/Challenge2Details";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import AxiosConfig from "../../../../axiosConfig";

/**
 * @summary: Stores the information from the challenge 2 selection of task page
 * @description: Contains the methods to store the information with a put call to update the challenge
 * @class: ActiveProjectChallenge2
 * @extends: React.component
 * @see: {Challenge2Details}
 * @params: goal_date, adventure_id
 * @fires: put charityproject/update/Challenge/
 * @returns: {ActiveProjectChallenge2}
 */

class ActiveProjectChallenge2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmailId: cookie.load('user_email'),
            goalDate: new Date(),
        }
    }

    onSubmit() {
        let form_data = new FormData();
        form_data.append("project_id", this.props.match.params.id);
        form_data.append("goal_date", this.formatDate(this.state.goalDate));
        form_data.append("adventure_id", this.state.optionValue);
        const obj = this;

        function reRoute() {
            console.log("in");
            console.log(obj);
            if (obj.state.optionValue === "1") {
                obj.props.history.push(`/Projects/${obj.props.match.params.id}/SpreadTheWord`)
            }
            if (obj.state.optionValue === "2") {
                obj.props.history.push(`/Projects/${obj.props.match.params.id}/LearnNewSkill`)
            }
            if (obj.state.optionValue === "3") {
                obj.props.history.push(`/Projects/${obj.props.match.params.id}/DevelopNewHabit`)
            }
            if (obj.state.optionValue === "4") {
                obj.props.history.push(`/Projects/${obj.props.match.params.id}/VolunteerTime`)
            }
            if (obj.state.optionValue === "5") {
                obj.props.history.push(`/Projects/${obj.props.match.params.id}/GiveADonation`)
            }
            if (obj.state.optionValue === "6") {
                obj.props.history.push(`/Projects/${obj.props.match.params.id}/Fundraise`)
            }
        }
        AxiosConfig.put(`charityproject/update/Challenge/`, form_data)
            .then(function(){
                reRoute(this)
            })
            .catch(error => console.log(error))
    }
    handleClick(e) {
        this.setState({
            selectedOption: e.target.value
        });
    };

    handleChecked(e) {
        this.setState({
            checked: e.target.checked,
            optionValue: e.target.value
        })

    }

    handleDateChange = date => {
        var goalDate_Str = this.formatDate(date);

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
        return (
            <div>
                <Challenge2Details id={this.props.match.params.id}
                                   handleChecked={this.handleChecked.bind(this)}
                                   goalDate={this.state.goalDate}
                                   handleDateChange={this.handleDateChange.bind(this)}
                                   onSubmit={this.onSubmit.bind(this)}/>
            </div>
        )
    }
}

export default ActiveProjectChallenge2;