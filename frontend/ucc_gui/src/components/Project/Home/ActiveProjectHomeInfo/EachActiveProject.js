import React from "react";
import axiosConfig from '../../../../axiosConfig'
import "./ActiveProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../../General/Text/TextBlackHeading";
import TextBlack from "../../../General/Text/TextBlack";
import ProgressStepper from "../../ProgressStepper";


class EachActiveProject extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {      
        Project_id : this.props.projectId,
        ProjectName : '',
        ProjectJoinDate : '03/04/2020',     
    }
 }

    componentDidMount () {         
        const Project_id = this.state.Project_id;                  
        axiosConfig.get(`charityproject/${Project_id}`)
      .then(res => {
              this.setState({                  
                  ProjectName : res.data["project_name"],
                  ProjectBanner : res.data["project_banner"]                 
              });
      }).catch(error => console.log(error))

    }


    render() {
      return(
        <div>      
            {/* {console.log(this.state.ProjectName)}                   */}
            <div className="ActiveProjectInfo_Badge" style={{width: "117px", height : "117px"}}>                        
                <Image src={this.state.ProjectBanner}  style={{width: "100%", height: "100%"}} roundedCircle/>
            </div>
            <div className="ActiveProjectInfo_Text" >
                <table >
                    <tbody>
                    <tr>
                        <td className="firstCell" colSpan={2}>
                            <a className = "projectName" href = {'/Projects/'+ this.props.ProjectId +'/ActiveProjectChallenge1'}>
                                <TextBlackHeading message={this.state.ProjectName}/>
                            </a>
                            <br /> <br/>
                            <TextBlack message={"Date Joined On : "+ this.state.ProjectJoinDate}/>                                   
                            
                        </td>                                  
                        <td className = "stepperspace">
                            <div className = "stepperWidth">
                                <ProgressStepper currentStep="1"/>
                            </div>
                        </td>                            
                    </tr>                                                                                                    
                    </tbody>                    
                </table>
            </div>                        
        </div>
    )
    }
}

export default EachActiveProject;  