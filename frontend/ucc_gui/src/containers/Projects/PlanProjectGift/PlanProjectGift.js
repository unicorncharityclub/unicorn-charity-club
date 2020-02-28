import React from "react";
import "./PlanProjectGift.css";
import { Container } from "@material-ui/core";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import Button from "react-bootstrap/Button";
import GiftGrid from "../../../components/Project/PlanProjectGift/GiftGrid";
import axios from "axios";
import ProjectGrid from "../../../components/Project/Home/ProjectGrid";
import ProgressStepper from "../../../components/Project/ProgressStepper";
import ProjectBanner from "../../../components/Project/ProjectBanner";


class PlanProjectGift extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {                        
            ProjectBanner : '',    
            imageList : []
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
        let imageList = response.data["image_list"];
        this.setState(prevState => ({
        imageList: imageList
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

    render() {
      return(
            <div>  
                <br/>                
                <Container>

                    {/*just checking to see if image is returned*/}
                    {/* <div> */}
                        {/* <img src={this.state.imageList}/> */}
                    {/* </div> */}


                    {/*TODO:
                    PLACE IMAGES IN GRID FORMAT
                    CURRENTLY DATABASE HAS ONLY 1 IMAGE, ADD 5-9 MORE FROM BACKEND TO TEST FOR UI
                    */}
                    { console.log(this.props)}
                    <div className="headerStepBanner">
                        <div className="stepper" >
                            <ProgressStepper currentStep="1" />
                        </div>
                        <div className="banner">
                            <ProjectBanner image={this.state.ProjectBanner} />
                        </div>
                    </div>

                    {/* Here need the component for showing 1-2-3 */}
                    <div>
                        <ProjectInfo id={this.props.match.params.id} />
                    </div>
                    
                    <br/>
                    <div>
                        <h2 className="textHeader">PLAN YOUR PROJECT GIFT</h2>
                        <p className = "insideContent">Reward your Project Team with a secret gift when they complete the Project.</p>
                    </div>
                    <div>
                        {/* Here the Project Gifts.. */}
                        <GiftGrid prizeData = {this.state.imageList} />
                    </div>
                    <br/>
                    <div className="buttons">
                        <Button className = "backButton" variant="light" size="lg"> BACK </Button>
                        <Button className = "nextButton" variant="success" size="lg"> NEXT </Button>
                    </div>


                </Container>
            </div>
        )
    }
  }

export default PlanProjectGift;