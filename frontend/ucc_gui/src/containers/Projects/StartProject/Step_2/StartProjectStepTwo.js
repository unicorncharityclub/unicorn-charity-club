import React from "react";
import "./StartProjectStepTwo.css";
import { Container } from "@material-ui/core";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import GiftGrid from "../../../../components/Project/StartProject/Step_2/GiftGrid";
import AxiosConfig from '../../../../axiosConfig'
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import "../../../ProjectCommon.css"
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import cookie from 'react-cookies';
import TwoButtonLayout from "../../../../components/General/TwoButtonLayout";
import { withAlert } from 'react-alert'


class StartProjectStepTwo extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {                        
            projectBanner : '',
            photoSelectedId : "",
            imageList : [
                {
                    "prize_id" : "",
                    "prize_url" : ""
                }
            ]
        }
     }  

    componentDidMount () {
        this.fetchPrizeDetails(this);
        this.fetchProjectBanner();
    }

    fetchProjectBanner(){
        const project_id = this.props.match.params.id;
        AxiosConfig.get(`charityproject/${project_id}`)
        .then(res => {
              this.setState({                  
                  projectBanner : res.data["project_banner"]
              });
        //   console.log(res.data)
        }).catch(error => console.log(error))
    }

    setPrizeDetails(response) {            
        this.setState(prevState => ({
        imageList: response.data["image_list"]
      }));

    }

    fetchPrizeDetails(obj) {
        AxiosConfig.get(`prize/prizeList`)
            .then(function(response) {
                obj.setPrizeDetails(response);
            })
            .catch(function(error) {console.log(error);});
    }

    giftPlanSelectedHandler(value) {
        this.setState(prevState => ({
            photoSelectedId : value
        }))
    }

    moveToStepThreeHandler() {
        
        // if the prize is selected
        if (this.state.photoSelectedId){
            AxiosConfig.put(`charityproject/projectPrize`, {
                "project_id" : this.props.match.params.id,
                "user_email" : cookie.load('user_email'),
                "prize_id" : this.state.photoSelectedId

            })
            .then(this.props.history.push(`/Projects/${this.props.match.params.id}/InviteFriends`))
            .catch(error => console.log(error))
        }else{
            // show message that need to select one prize to proceed.
            const alert = this.props.alert;
            alert.show('Please select one prize to proceed!',{position:'top right'});
        }
    }

    render() {
      return(
            <div>
            <br/>
                <Container>

                    { console.log(this.props)}
                    <div className="headerStepBanner">
                        <div className="stepper" >
                            <ProgressStepper currentStep="1" />
                        </div>
                        <div className="banner">
                            <ProjectBanner image={this.state.projectBanner} />
                        </div>
                    </div>
                    <div className="content_project_info_vertical">
                    <ProjectInfo vertical={true} id={this.props.match.params.id} />
                    </div>
                    
                    <br/>
                    <div className="content_section">
                    <div className="content_project_info">
                    <ProjectInfo id={this.props.match.params.id} />
                    </div>
                    <div>
                        <h2 className="textHeader">PLAN YOUR PROJECT GIFT</h2>
                        <p className = "insideContent">Reward your Project Team with a secret gift when they complete the Project.</p>
                    </div>
                    <div>
                        {this.state.imageList[0].prize_url?
                        (<GiftGrid prizeData = {this.state.imageList} onClick={this.giftPlanSelectedHandler.bind(this)} />):(<div/>)}
                        
                    </div>                    
                    <br/>
                    <div>
                    <TwoButtonLayout button1Text="BACK" button2Text="NEXT" button2Click={this.moveToStepThreeHandler.bind(this)}/>
                    </div>
                    </div>


                </Container>
            </div>
        )
    }
  }

export default withAlert()(StartProjectStepTwo);