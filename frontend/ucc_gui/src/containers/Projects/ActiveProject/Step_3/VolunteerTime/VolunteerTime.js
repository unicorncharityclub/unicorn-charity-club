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
     let form_data = new FormData();
        try {
            form_data.append('user_email', this.state.userEmailId);
            form_data.append('project_id', this.state.project_id);
            form_data.append(' organisation_name', this.state.name);
            form_data.append(' organisation_address', this.state.address);
            form_data.append(' organisation_city', this.state.city);
            form_data.append('website', this.state.website)
            form_data.append(' organisation_state', this.state.state_name);
            form_data.append('hours', this.state.hours);
            form_data.append('description', this.state.description);
            if (this.state.final_video) {
                form_data.append('exp_video', this.state.final_video);
            }
        } catch (err) {
            console.log(err)
        }
     axiosConfig.defaults.withCredentials = true;
        axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        axiosConfig.post('charityproject/volunteerTime', form_data,
            {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
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