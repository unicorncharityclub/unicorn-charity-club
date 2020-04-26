
import React from "react";
import AxiosConfig from '../../../../axiosConfig'
import "./ActiveProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextTheme from "../../../General/Text/TextTheme";
import ProgressStepper from "../../ProgressStepper";
import Button from 'react-bootstrap/Button';


class EachActiveProject extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {      
        projectId : this.props.projectId,
        projectBadge : this.props.badge,
        projectName : '',
        projectJoinDate : ''
    }
 }

    componentDidMount () {               
        const projectId = this.props.projectId;                    
        AxiosConfig.get(`charityproject/${projectId}/`)
      .then(res => {
              this.setState({
                  projectName : res.data["name"],
                  projectBanner : res.data["banner"]
              });
      }).catch(error => console.log(error))

    }
    
    reverseDate(date) { 
        var splitString = date.split("-");   
        var reverseArray = splitString.reverse();
        var joinString = reverseArray.join("-");
        return joinString; 
    }

    renderDate (date, type) {
        let msg;
        if(date !== null && type === "Planning") {            
            msg = "Started On: ";
            return (
                <p className="dateShown">{msg + date}</p> 
            );
        }else if (date !== null && type === "Active") {            
            msg = "Joined On: ";
            return (
                <p className="dateShown">{msg + date}</p> 
            );
        }else if (date !== null && type === "Invitation") {            
            msg = "By "+ this.props.inviterName + " on : ";
            date = this.reverseDate(date);
            return (
                <p className="dateShown">{msg + date}</p> 
            );
        }else{            
            msg = "Date not available";
            return (
                <p className="dateShown">{msg}</p> 
            );
        }
    }

    renderProgressStepper (status, type) {
        if(type === "Planning") {
            if("PlanningPhase1" === status) {
                return (
                    <div className = "stepperWidth">
                        <ProgressStepper  currentStep={0}/>
                    </div>
                );
              } else if ("PlanningPhase2" === status){
                return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={1}/>
                    </div>
                );
              }else if ("PlanningPhase3" === status){
                return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={2}/>
                    </div>
                );
              }else{                  
                  return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={0}/>
                    </div>
                );
              }          
          }else {                 
              if("Challenge1Complete" === status) {
                return (
                    <div className = "stepperWidth">
                        <ProgressStepper className = "stepperWidth" currentStep={0}/>
                    </div>
                );
              } else if ("Challenge2Complete" === status){
                return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={1}/>
                    </div>
                );
              }else if ("Challenge3Complete" === status){
                return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={2}/>
                    </div>
                );
              }else{                  
                  return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={0}/>
                    </div>
                );
              } 
          }   
    }

    renderOnClick(status, type) {
        if(type === "Planning") {
            if("PlanningStarted" === status) {
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/StartNewProject'}>
                        <TextTheme message={this.state.projectName} className="text_large text_black" />
                    </a>
                );
              } else if ("PlanningPhase1" === status){
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/StartProjectStepTwo'}>
                        <TextTheme message={this.state.projectName} className="text_large text_black" />
                    </a>
                );
              }else if ("PlanningPhase2" === status){
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/InviteFriends'}>
                        <TextTheme message={this.state.projectName} className="text_large text_black" />
                    </a>
                );
              }else{
                  // if the status is planningStart                             
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId}>
                        <TextTheme message={this.state.projectName} className="text_large text_black" />
                    </a>
                );
              }          
          }else if (type === "Active"){                     
            if("Challenge1Complete" === status) {
              return (
                <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/ActiveProjectChallenge2'}>
                    <TextTheme message={this.state.projectName} className="text_large text_black" />
                </a>
              );
            } else if ("Challenge2Complete" === status){
              return (                  
                <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/SpreadTheWord'}>
                    <TextTheme message={this.state.projectName} className="text_large text_black" />
                </a>
              );
            }else if ("Challenge3Complete" === status){
              return (
                <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/LearnNewSkill'}>
                    <TextTheme message={this.state.projectName} className="text_large text_black" />
                </a>
              );
            }else{
                // if the status is startChallenge             
                // as challenge1 is not completed yet
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/ActiveProjectChallenge1'}>
                        <TextTheme message={this.state.projectName} className="text_large text_black" />
                    </a>
                  );
            } 
        }else{
            // if Invitation
            return (
                <a className = "projectName" href = {`/Projects/${this.props.projectId}/ProjectInvitation/${this.props.inviterEmail}`}>
                    <TextTheme message={this.state.projectName} className="text_large text_black" />
                </a>
              );
        }

    }

    buttonHandler() {        
        var projectID = this.props.projectId;
        var email = this.props.inviterEmail;        
        window.open(`/Projects/${projectID}/ProjectInvitation/${email}`,"_self");
    }

    renderProgressStepperOrButton(type) {
        if (type === "Invitation"){
            return (
                    <Button className="viewButton" onClick = {this.buttonHandler.bind(this)} variant="success" size="lg">
                        VIEW INVITATION
                    </Button>
              );          
        }else{
            return (
                // this is for planning or Active
                <div>
                    {this.renderProgressStepper(this.props.projectStatus, this.props.type)}    
                </div>            
          ); 
            
        }
        
    }

    render() {
      return(
        <div>                          
            <div className="ActiveProjectInfo_Badge">                  
                <Image src={this.state.projectBadge}  style={{width: "80%", height: "80%"}} roundedCircle/>
            </div>
            <div className="ActiveProjectInfo_Text" >             
                <table >
                    <tbody>
                    <tr className = "row1">
                    <td className="firstCell" colSpan={2}>
                        {this.renderOnClick(this.props.projectStatus, this.props.type)}                                                                            
                        <br /> <br/>
                        {this.renderDate(this.props.projectDate, this.props.type)}
                    </td>                                  
                    <td className = "stepperspace">
                        {this.renderProgressStepperOrButton(this.props.type)}                 
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

