import React from "react";
import FundraiserDetails from "../../../../../components/Project/ActiveProject/Step_3/Fundraiser/FundraiserDetails";
import {Container} from "@material-ui/core";
import cookie from "react-cookies";
import AxiosConfig from "../../../../../axiosConfig";

class Fundraiser extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        projectId: this.props.match.params.id,
        userEmail: cookie.load('user_email'),
        dollars : '',
        description :'',
        video :'',
        finalVideo :'',
        name :'',
        address :'',
        city :'',
        stateName : '',
        website :''
    }
 }

 onSubmit(event, action_type) {
     let formData = new FormData();
        try {
            formData.append('project_id', this.state.projectId);
            formData.append('organisation_name', this.state.name);
            formData.append('organisation_address', this.state.address);
            formData.append('organisation_city', this.state.city);
            formData.append('website', this.state.website);
            formData.append('organisation_state', this.state.stateName);
            formData.append('amount', this.state.dollars);
            formData.append('details', this.state.description);
            formData.append('action_type', action_type );
            formData.append('exp_video', this.state.finalVideo);
        } catch (err) {
            console.log(err)
        }

                AxiosConfig.put('charityproject/fundraiser/', formData,
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
        AxiosConfig.get(`charityproject/fundraiser/`,{params: {project_id: this.state.projectId, user_email:this.state.userEmail}})
      .then(res => {
              this.setState({
                  name : res.data.organisation_name,
                  address : res.data.organisation_address,
                  city : res.data.organisation_city,
                  website : res.data.website,
                  stateName : res.data.organisation_state,
                  dollars : res.data.amount,
                  description : res.data.details,
                  finalVideo :res.data.exp_video
              });
      }).catch(error => console.log(error))
    }

    render() {
      return(
                  <div>
                    <Container>
                        <FundraiserDetails id={this.props.match.params.id}
                        name = {this.state.name}
                        address = {this.state.address}
                        city = {this.state.city}
                        stateName = {this.state.stateName}
                        website = {this.state.website}
                        changeHandler = {this.changeHandler.bind(this)}
                        description = {this.state.description}
                        defaultIfEmpty = {this.defaultIfEmpty.bind(this)}
                        onSubmit = {this.onSubmit.bind(this)}
                        videoHandler={this.videoHandler.bind(this)}
                        video = {this.state.video}
                        dollars = {this.state.dollars}
                        handleNumbers = {this.handleNumbers.bind(this)}/>
                    </Container>
                  </div>
        )
    }
}

export default Fundraiser;