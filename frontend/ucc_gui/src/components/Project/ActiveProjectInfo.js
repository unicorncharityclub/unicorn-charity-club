import React from "react";
import axiosConfig from '../../axiosConfig'
import "./ProjectDetails/ProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../General/TextBlackHeading";
import TextBlack from "../General/TextBlack";
import ProgressStepper from "./ProgressStepper";


class ActiveProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Project_id: 1, 
      ProjectName : '',
      ProjectJoinDate : '03/04/2020',     
    }
 }

    componentDidMount () {
        // hard coding for now..     
        axiosConfig.get(`http://127.0.0.1:8000/charityproject/${this.state.Project_id}`)
      .then(res => {
              this.setState({                  
                  ProjectName : res.data.project_name,
                  ProjectBanner : res.data.project_banner                 
              });
      }).catch(error => console.log(error))

    }
    render() {
      return(
        <div>
            <div className="ProjectInfo_MainDiv"  >
                <div className="ProjectInfo_Container">
                    <div className="ProjectInfo_Badge" >                        
                        <Image src={this.state.ProjectBanner} style={{width: "60%", maxHeight: "60%"}} roundedCircle/>
                    </div>
                    <div className="ProjectInfo_Text" >
                        <table >
                          <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <a href = "/Projects/1/ActiveProjectChallenge1">
                                        <TextBlackHeading message={this.state.ProjectName}/>
                                    </a>
                                    <TextBlack message="Date Joined On"/>                                   
                                    <TextBlack message={" : "+this.state.ProjectJoinDate}/>
                                </td>                                  
                                <td className = "stepperspace">
                                    <ProgressStepper currentStep="1"/>
                                </td>                            
                            </tr>                                                                                                    
                          </tbody>
                          
                                                     
                      </table>
                     
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default ActiveProjectInfo;  