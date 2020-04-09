
import React from "react";
import AxiosConfig from '../../../../axiosConfig'
import "./ActiveProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../../General/Text/TextBlackHeading";
import TextBlack from "../../../General/Text/TextBlack";
import ProgressStepper from "../../ProgressStepper";
import Button from 'react-bootstrap/Button';


class EachActiveProject extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {      
        projectId : this.props.projectId,        
        projectName : '',
        projectJoinDate : '03/04/2020',          
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

    renderdate (date, type) {
        let msg;
        if(date !== null && type === "Planning") {
            // if date is for Planning
            msg = "Started On: ";
            return (
                <TextBlack message={msg + date}/> 
            );
        }else if (date !== null && type === "Active") {
            // if date is for Active
            msg = "Joined On: ";
            return (
                <TextBlack message={msg + date}/> 
            );
        }else if (date !== null && type === "Invitation") {
            // if date is for Invitation
            msg = "By "+ this.props.inviterName + " on : ";
            date = this.reverseDate(date);
            return (
                <TextBlack message={msg + date}/> 
            );
        }else{
            // if date is null 
            msg = "Date not available";
            return (
                <TextBlack message={msg}/> 
            );
        }
    }

    renderProgressStepper (status, type) {
        if(type === "Planning") {
            if("PlanningPhase1" === status) {
                return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={0}/>
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
                  // if the status is planningStatus
                  return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={0}/>
                    </div>
                );
              }          
          }else {
              // type === "Active"              
              if("Challenge1Complete" === status) {
                return (
                    <div className = "stepperWidth">
                        <ProgressStepper currentStep={0}/>
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
                  // if the status is startChallenge
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
            if("PlanningPhase1" === status) {
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/StartNewProject'}>
                        <TextBlackHeading message={this.state.projectName}/>
                    </a>
                );
              } else if ("PlanningPhase2" === status){
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/StartProjectStepTwo'}>
                        <TextBlackHeading message={this.state.projectName}/>
                    </a>
                );
              }else if ("PlanningPhase3" === status){
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/InviteFriends'}>
                        <TextBlackHeading message={this.state.projectName}/>
                    </a>
                );
              }else{
                  // if the status is planningStart                             
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId}>
                        <TextBlackHeading message={this.state.projectName}/>
                    </a>
                );
              }          
          }else if (type === "Active"){                     
            if("Challenge1Complete" === status) {
              return (
                <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/ActiveProjectChallenge2'}>
                    <TextBlackHeading message={this.state.projectName}/>
                </a>
              );
            } else if ("Challenge2Complete" === status){
              return (                  
                <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/SpreadTheWord'}>
                    <TextBlackHeading message={this.state.projectName}/>
                </a>
              );
            }else if ("Challenge3Complete" === status){
              return (
                <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/LearnNewSkill'}>
                    <TextBlackHeading message={this.state.projectName}/>
                </a>
              );
            }else{
                // if the status is startChallenge             
                // as challenge1 is not completed yet
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.projectId +'/ActiveProjectChallenge1'}>
                        <TextBlackHeading message={this.state.projectName}/>
                    </a>
                  );
            } 
        }else{
            // if Invitation
            return (
                <a className = "projectName" href = {`/Projects/${this.props.projectId}/ProjectInvitation/${this.props.inviterEmail}`}>
                    <TextBlackHeading message={this.state.projectName}/>
                </a>
              );
        }

    }

    buttonHandler() {
        // on button click action
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
            <div className="ActiveProjectInfo_Badge" style={{width: "117px", height : "117px"}}>                        
                <Image src={this.state.ProjectBanner}  style={{width: "100%", height: "100%"}} roundedCircle/>
            </div>
            <div className="ActiveProjectInfo_Text" >
                <table >
                    <tbody>
                    <tr className = "row">
                    <td className="firstCell" colSpan={2}>
                        {this.renderOnClick(this.props.projectStatus, this.props.type)}                                                                            
                        <br /> <br/>
                        {this.renderdate(this.props.projectDate, this.props.type)}                                                 
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

