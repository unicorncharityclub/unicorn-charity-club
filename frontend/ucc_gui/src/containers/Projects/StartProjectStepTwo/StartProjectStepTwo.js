import React from "react";
import "./StartProjectStepTwo.css";
import { Container } from "@material-ui/core";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import Button from "react-bootstrap/Button";
import GiftGrid from "../../../components/Project/PlanProjectGift/GiftGrid";
import axios from "axios";
import ProgressStepper from "../../../components/Project/ProgressStepper";
import ProjectBanner from "../../../components/Project/ProjectBanner";
import cookie from 'react-cookies';
import { withAlert } from 'react-alert'


class StartProjectStepTwo extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {                        
            ProjectBanner : '', 
            PhotoSelectedId : "",   
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
        axios.get(`http://127.0.0.1:8000/charityproject/${project_id}`)
        .then(res => {
              this.setState({                  
                  ProjectBanner : res.data["project_banner"]                                
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
        axios.get(`http://127.0.0.1:8000/prize/prizeList`)
            .then(function(response) {
                obj.setPrizeDetails(response);
                console.log(response);
            })
            .catch(function(error) {console.log(error);});
    }

    fetchPrizeDetails(obj) {
        axios.get(`http://127.0.0.1:8000/prize/prizeList`)
            .then(function(response) {
                obj.setPrizeDetails(response);
                console.log(response);
            })
            .catch(function(error) {console.log(error);});
    }

    giftPlanSelectedHandler(value) {
        console.log(value);
        this.setState(prevState => ({
            PhotoSelectedId : value
        }))
    }

    
    moveToStepThreeHandler() {
        
        // if the prize is selected
        if (this.state.PhotoSelectedId){            
            axios.defaults.withCredentials = true;
            axios.defaults.xsrfHeaderName = "X-CSRFToken";
            axios.put(`http://127.0.0.1:8000/charityproject/projectPrize`, {
                "project_id" : this.props.match.params.id,
                "user_email" : cookie.load('user_emailid'),
                "prize_id" : this.state.PhotoSelectedId

            })
            .then(this.props.history.push(`/Projects/${this.state.ProjectId}/StartProjectStepThree`))            
            .catch(error => console.log(error))
        }else{
            // show message that need to select one prize to proceed.
            const alert = this.props.alert;
            alert.show('Please select one prize to proceed!');

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
                            <ProjectBanner image={this.state.ProjectBanner} />
                        </div>
                    </div>
              
                    <div>
                        <ProjectInfo id={this.props.match.params.id} />
                    </div>
                    
                    <br/>
                    <div>
                        <h2 className="textHeader">PLAN YOUR PROJECT GIFT</h2>
                        <p className = "insideContent">Reward your Project Team with a secret gift when they complete the Project.</p>
                    </div>
                    <div>
                        {this.state.imageList[0].prize_url?
                        (<GiftGrid prizeData = {this.state.imageList} onClick={this.giftPlanSelectedHandler.bind(this)} />):(<div/>)}
                        
                    </div>                    
                    <br/>
                    <div className="buttons">
                        <Button className = "backButton" variant="light" size="lg"> BACK </Button>
                        <Button className = "nextButton" variant="success" size="lg" onClick={this.moveToStepThreeHandler.bind(this)}> NEXT </Button>
                    </div>


                </Container>
            </div>
        )
    }
  }

export default withAlert()(StartProjectStepTwo);