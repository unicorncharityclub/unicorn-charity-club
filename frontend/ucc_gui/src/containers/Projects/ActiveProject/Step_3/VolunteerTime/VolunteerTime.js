import React from "react";
import VolunteerTimeDetails from "../../../../../components/Project/ActiveProject/Step_3/VolunteerTime/VolunteerTimeDetails";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import axiosConfig from "../../../../../axiosConfig";

class VolunteerTime extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        project_id: this.props.match.params.id,
        userEmailId: cookie.load('user_emailid'),
        hours : '',
        description :'',
        video :'',
        final_video :'',
        name :'',
        address :'',
        city :'',
        state_name : '',
        website :''
    }
 }

 onSubmit() {
     console.log(this.state.project_id)
     console.log(this.state.userEmailId)
     console.log(this.state.name)
     console.log(this.state.address)
     console.log(this.state.city)
     console.log(this.state.state_name)
     console.log(this.state.website)
     console.log(this.state.hours)
     console.log(this.state.description)
     axiosConfig.defaults.withCredentials = true;
        axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        axiosConfig.post('charityproject/volunteerTime',
            {"user_email": this.state.userEmailId,
                    "project_id":this.state.project_id,
                " organisation_name": this.state.name,
                " organisation_address": this.state.address,
                " organisation_city": this.state.city,
                " organisation_state": this.state.state_name,
                "hours": this.state.hours,
                "description": this.state.description,
                "exp_video": this.state.final_video
            },
                )
                .then(res => console.log(res))
                .catch(error => console.log(error))
 }

defaultIfEmpty(value){
        return value === "" ? "":value;
    }

 changeHandler = (event) =>{
        this.setState({
           [event.target.name]:event.target.value
        })
    };

    videoHandler = (event) =>{
        this.setState({
            video: URL.createObjectURL(event.target.files[0]),
            final_video: event.target.files[0]
        });
    };

    render() {
      return(
                  <div>
                    <Container>
                        <VolunteerTimeDetails id={this.props.match.params.id}
                        name = {this.state.name}
                            address = {this.state.address}
                            city = {this.state.city}
                            state_name = {this.state.state_name}
                            website = {this.state.website}
                        changeHandler = {this.changeHandler.bind(this)}
                        hours = {this.state.hours}
                        description = {this.state.description}
                        defaultIfEmpty = {this.defaultIfEmpty.bind(this)}
                        onSubmit = {this.onSubmit.bind(this)}
                        videoHandler={this.videoHandler.bind(this)}
                        video = {this.state.video}/>
                    </Container>
                  </div>
        )
    }
}

export default VolunteerTime;