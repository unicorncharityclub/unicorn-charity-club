import React from "react";
import axiosConfig from '../../../axiosConfig'
import "./ActiveProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../General/TextBlackHeading";
import TextBlack from "../../General/TextBlack";
import ProgressStepper from "../ProgressStepper";


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
                    <div className="ActiveProjectInfo_Badge" style={{width: "117px", height : "117px"}}>                        
                        <Image src={this.state.ProjectBanner}  style={{width: "100%", height: "100%"}} roundedCircle/>
                    </div>
                    <div className="ActiveProjectInfo_Text" >
                        <table >
                          <tbody>
                            <tr>
                                <td className="firstCell" colSpan={2}>
                                    <a className = "projectName" href = "/Projects/1/ActiveProjectChallenge1">
                                        <TextBlackHeading message={this.state.ProjectName}/>
                                    </a>
                                    <br /> <br/>
                                    <TextBlack message={"Date Joined On : "+ this.state.ProjectJoinDate}/>                                   
                                    
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