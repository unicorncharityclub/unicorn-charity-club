import React from "react";
import VolunteerTimeDetails from "../../../../../components/Project/ActiveProject/Step_3/VolunteerTime/VolunteerTimeDetails";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import AxiosConfig from "../../../../../axiosConfig";
import TextAlertLarge from "../../../../../components/General/Text/TextAlertLarge";

/**
 * @summary: Stores and retrieves the information from the challenge 3 - volunteer time page
 * @description: Contains the methods to store the information with a put and get call for the data entry
 * @class: VolunteerTime
 * @extends: React.component
 * @see: {VolunteerTimeDetails}
 * @params: hours, description, video, finalVideo, name, address, city, stateName, website
 * @fires: get charityproject/volunteer_time/ and put charityproject/volunteer_time/
 * @returns: {VolunteerTime}
 */

class VolunteerTime extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        projectId: this.props.match.params.id,
        userEmail: cookie.load('user_email'),
        hours: '',
        description: '',
        video: '',
        finalVideo: '',
        name: '',
        address: '',
        city: '',
        stateName: '',
        website: '',
        errors: ''
    }
 }

 onSubmit(event, action_type) {
     let formData = new FormData();
     console.log(this.state.name)
     console.log(this.state.finalVideo)
     console.log(this.state.hours)
         try {
             formData.append('project_id', this.state.projectId);
             formData.append('organisation_name', this.state.name);
             formData.append('organisation_address', this.state.address);
             formData.append('organisation_city', this.state.city);
             formData.append('website', this.state.website);
             formData.append('organisation_state', this.state.stateName);
             formData.append('hours', this.state.hours);
             formData.append('description', this.state.description);
             formData.append('action_type', action_type);
             formData.append('exp_video', this.state.finalVideo);

         } catch (err) {
             console.log(err)
         }
         AxiosConfig.put('charityproject/volunteer_time/', formData,
             {
                 headers: {
                     'content-type': 'multipart/form-data'
                 }
             })
             .then(
                 this.props.history.push(`/Projects/${this.state.projectId}/Congratulations`)
             )
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

    handleNumbers = (event) =>{
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
       this.setState({
           [event.target.name]:event.target.value
        })
    }

    };

    videoHandler = (event) =>{
        this.setState({
            video: URL.createObjectURL(event.target.files[0]),
            finalVideo: event.target.files[0]
        });
    };

    componentDidMount () {
        AxiosConfig.get(`charityproject/volunteer_time/`,{params: {project_id: this.state.projectId, user_email:this.state.userEmail}})
      .then(res => {
              this.setState({
                  name : res.data.organisation_name,
                  address : res.data.organisation_address,
                  city : res.data.organisation_city,
                  website : res.data.website,
                  stateName : res.data.organisation_state,
                  hours : res.data.hours,
                  description : res.data.description,
                  finalVideo :res.data.exp_video
              });
      }).catch(error => console.log(error))
    }

    render() {
      return(
                  <div>
                    <Container>
                        <VolunteerTimeDetails id={this.props.match.params.id}
                        name = {this.state.name}
                        address = {this.state.address}
                        city = {this.state.city}
                        stateName = {this.state.stateName}
                        website = {this.state.website}
                        changeHandler = {this.changeHandler.bind(this)}
                        hours = {this.state.hours}
                        description = {this.state.description}
                        defaultIfEmpty = {this.defaultIfEmpty.bind(this)}
                        onSubmit = {this.onSubmit.bind(this)}
                        videoHandler = {this.videoHandler.bind(this)}
                        video = {this.state.video}
                        handleNumbers = {this.handleNumbers.bind(this)}/>
                    </Container>
                  </div>
        )
    }
}

export default VolunteerTime;