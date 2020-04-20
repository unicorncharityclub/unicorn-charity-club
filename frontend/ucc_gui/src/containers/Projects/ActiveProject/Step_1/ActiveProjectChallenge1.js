import React from "react";
import Button from "react-bootstrap/Button";
import "./ActiveProjectChallenge1.css"
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import AxiosConfig from '../../../../axiosConfig'
import { Player } from 'video-react';
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import TextWhite from "../../../../components/General/Text/TextWhite";
import TextBlueHeading from "../../../../components/General/Text/TextBlueHeading";
import TextBlackSubHeading from "../../../../components/General/Text/TextBlackSubHeading";
import TextBlack from "../../../../components/General/Text/TextBlack";

class ActiveProjectChallenge1 extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            projectID : this.props.match.params.id,
            projectName : '',
            projectBanner : '',
            projectVideoName : '',
            projectVideo : '',
            projectMission : ''
        }
     }

     componentDidMount () {        
        AxiosConfig.get(`charityproject/${this.state.projectID}/`)
      .then(res => {
              this.setState({
                  projectName : res.data["name"],
                  projectBanner : res.data["banner"],
                  projectVideo: res.data["video"],
                  projectVideoName: res.data["project_video_name"],
                  projectMission : res.data["mission"]
              });
          console.log(res.data)
      }).catch(error => console.log(error))
    }

    buttonHandler() {
        AxiosConfig.put(`charityproject/update/Challenge/`, {
            "project_id" : this.props.match.params.id           
        })
        .then(this.props.history.push(`/Projects/${this.props.match.params.id}/ActiveProjectChallenge2`))
        .catch(error => console.log(error))

    }

    render() {
      return(

        <div className="header_main">
                <div className="header_step_banner_main">
                    <div className="banner_main">
                        <div className="banner_main_content">
                            <ProjectBanner image={this.state.projectBanner}  />
                        </div>
                    </div>

                    <div className="stepper_main">
                        <div className="stepper_main_content">
                            <ProgressStepper currentStep="0" />
                        </div>
                    </div>
                </div>

                <div className="page_info_hr_content_main">
                    <ProjectInfo  id = {this.state.projectID}/>
                </div>

                <div className="page_main">
                    <div className="page_info_vr_content_main">
                        <ProjectInfo vertical={true} id = {this.state.projectID}/>
                    </div>

                    <div className="page_details_main">
                        <div className="page_details_content_main">                     
                     <h2 className="textHeader">CHALLENGE 1: Exploration</h2>
                         <p>
                         <br/>
                         PRESENTATION
                         <br/>
                         Prep for Success Exploration Presentation
                         </p> 
                                               
                        <Player
                            playsInline                      
                            src={this.state.projectVideo}
                            />

                            <br/>
                            <div>                    
                                {this.state.projectMission}
                            </div>    
                                                
                            </div>
                            <br/>
                            <div className="page_details_content_main">                                
                                <a href="https://www.pinterest.com/" target="_blank">
                                <h5 className="textHeader">
                                    <span>Explore More</span>
                                </h5>     
                                </a>                                
                            </div> 

                            <div className="buttonDiv"> 
                                <Button className = "doneButton" variant="light" size="lg" onClick = {this.buttonHandler.bind(this)}>NEXT</Button>                                           
                            </div>
                    </div>
                </div>
            </div>


// -----------------------------------------------------------




            // <div style={{margin:"15px"}}> 
            //     <div className="header_step_banner_common">
            //         <div className="stepper_common" >
            //             <ProgressStepper currentStep="0" />
            //         </div>
            //         <div className="banner_common">
            //             <ProjectBanner image={this.state.projectBanner}  />
            //         </div>
            //     </div>

            //     <div className="content_project_info_vertical">
            //         <ProjectInfo vertical={true} id = {this.state.projectID}/>
            //     </div>
                        
                
            //     <div className="content_section">
            //         <div className="content_project_info">
            //             <ProjectInfo vertical={false} id = {this.state.projectID}/>
            //         </div>
                    
            //         <br/>
            //         <h2 className="textHeader">CHALLENGE 1: Exploration</h2>
            //             <p className="insideContent">
            //             <br/>
            //             PRESENTATION
            //             <br/>
            //             Prep for Success Exploration Presentation
            //             </p> 
            //             <div>                            
            //                 <Player
            //                 playsInline                      
            //                 src={this.state.projectVideo}
            //                 />
            //             </div>

            //             <br/>
            //             <div className="insideContent">                    
            //                 {this.state.projectMission}
            //             </div>    
                                       
            //     </div>
                
            //     <div className="insideContent1">                    
            //         {this.state.projectMission}
            //     </div>
                                
                
            //     {/* <hr style={{height: "1px", background:"#333"}}/> */}
                
            //     <div className="exploreLink content_section">
            //         <div className = "inside-content">
            //         <a href="https://www.pinterest.com/" target="_blank">
            //         <h5 className="textHeader">
            //             <span>Explore More</span>
            //         </h5>     
            //         </a>
            //         </div>
            //     </div>


            //     <div className="buttonDiv">                    
            //         <Button className = "doneButton" variant="light" size="lg" onClick = {this.buttonHandler.bind(this)}>Done</Button>                    
            //     </div>               
            // </div>
        )
    }
}

export default ActiveProjectChallenge1;  