import React from "react";
import "./StartProjectStepThree.css";
import axiosConfig from '../../../axiosConfig'
import ProjectBanner from "../../../components/Project/ProjectBanner";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import cookie from "react-cookies";
import ProgressStepper from "../../../components/Project/ProgressStepper";
import InviteFriends from "../../../components/InviteFriends/ImageFriends";
import FriendsSearchGrid from "../../../components/Project/ProjectStepThree/FriendsSearchGrid";


class StartProjectStepThree extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            ProjectId: this.props.match.params.id,
            ProjectBanner : '',
            ProjectName : '',
            ProjectDateStarted: 'Date Started',
            UserEmailId: cookie.load('user_emailid'),
            PopupSearch : false,
            FriendsSearchData : [
                {emailId:"vt@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/1.jpg", name:"name1"},
                {emailId:"abc@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/green.jpg", name:"name2"},
                {emailId:"vt@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/1.jpg", name:"name3"},
                {emailId:"abc@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/green.jpg", name:"name4"},
                {emailId:"vt@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/1.jpg", name:"name5"},
                {emailId:"abc@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/green.jpg", name:"name6"},
                {emailId:"vt@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/1.jpg", name:"name1"},
                {emailId:"abc@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/green.jpg", name:"name2"},
                {emailId:"vt@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/1.jpg", name:"name3"},
                {emailId:"abc@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/green.jpg", name:"name4"},
                {emailId:"vt@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/1.jpg", name:"name5"},
                {emailId:"abc@gmail.com", image:"http://127.0.0.1:8000/media/profilePictures/green.jpg", name:"name6"}
            ]
        }
     }  

    componentDidMount () {
        const project_id = this.props.match.params.id;
        axiosConfig.get(`charityproject/${project_id}`)
      .then(res => {
              this.setState({
                  ProjectName : res.data["project_name"],
                  ProjectBanner : res.data["project_banner"],
              });
          console.log(res.data)
      }).catch(error => console.log(error))
    }

    searchResultHandler(value) {
        console.log(value)
        this.setState({ PopupSearch : true});
    }

    render() {
      return(


            <div style={{margin:"10px", marginBottom:"150px"}}>

                {this.state.PopupSearch?(
              <div id="popup" style={{position:"fixed",width:"40%",height:"70%",top:"20%",bottom: "10px",
                  background:"#6b6a63", left: "50%",marginLeft: "-20%", zIndex: "100",marginTop: "-40px"}}>
                  <FriendsSearchGrid friendsSearchData={this.state.FriendsSearchData} />
              </div>
                    ):(<div/>)}

                <div className="headerStepBanner">
                    <div className="stepper" >
                        <ProgressStepper currentStep="2" />
                    </div>
                    <div className="banner">
                        <ProjectBanner image={this.state.ProjectBanner}  />
                    </div>
                </div>
                <ProjectInfo id={this.state.ProjectId} />
                <InviteFriends onClick={this.searchResultHandler.bind(this)}
                               disabled={this.state.PopupSearch}/>

            </div>
        )
    }
  }

export default StartProjectStepThree;