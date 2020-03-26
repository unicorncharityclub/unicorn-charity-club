
import React from "react";
import axiosConfig from '../../../../axiosConfig'
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
        Project_id : this.props.projectId,        
        ProjectName : '',
        ProjectJoinDate : '03/04/2020',          
    }
 }

    componentDidMount () {               
        const Project_id = this.props.projectId;                    
        axiosConfig.get(`charityproject/${Project_id}`)
      .then(res => {
              this.setState({                  
                  ProjectName : res.data["project_name"],
                  ProjectBanner : res.data["project_banner"]                 
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
            msg = "By "+ this.props.inviter_name + " on : ";
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
                  // if the status is ""
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
                  // if the status is ""
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
                    <a className = "projectName" href = {'/Projects/'+ this.state.Project_id +'/StartNewProject'}>
                        <TextBlackHeading message={this.state.ProjectName}/>
                    </a>
                );
              } else if ("PlanningPhase2" === status){
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.Project_id +'/StartProjectStepTwo'}>
                        <TextBlackHeading message={this.state.ProjectName}/>
                    </a>
                );
              }else if ("PlanningPhase3" === status){
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.Project_id +'/InviteFriends'}>
                        <TextBlackHeading message={this.state.ProjectName}/>
                    </a>
                );
              }else{
                  // if the status is ""              
                // the project needs to be started to come to planning so this is not possible
              }          
          }else {
            // type === "Active"              
            if("Challenge1Complete" === status) {
              return (
                <a className = "projectName" href = {'/Projects/'+ this.state.Project_id +'/ActiveProjectChallenge2'}>
                    <TextBlackHeading message={this.state.ProjectName}/>
                </a>
              );
            } else if ("Challenge2Complete" === status){
              return (                  
                <a className = "projectName" href = {'/Projects/'+ this.state.Project_id +'/SpreadTheWord'}>
                    <TextBlackHeading message={this.state.ProjectName}/>
                </a>
              );
            }else if ("Challenge3Complete" === status){
              return (
                <a className = "projectName" href = {'/Projects/'+ this.state.Project_id +'/LearnNewSkill'}>
                    <TextBlackHeading message={this.state.ProjectName}/>
                </a>
              );
            }else{
                // if the status is ""              
                // as challenge1 is not completed yet
                return (
                    <a className = "projectName" href = {'/Projects/'+ this.state.Project_id +'/ActiveProjectChallenge1'}>
                        <TextBlackHeading message={this.state.ProjectName}/>
                    </a>
                  );
            } 
        }   
    }

    renderProgressStepperOrButton(type) {
        if (type === "Invitation"){
            return (
                    <Button className="viewButton" variant="success" size="lg">
                        VIEW INVITATION
                    </Button>
              );          
        }else{
            return (
                // this is for planning or Active
                <div>
                    {this.renderProgressStepper(this.props.project_status, this.props.type)}    
                </div>            
          ); 
            
        }
        
    }


    render() {
      return(
        <div>     
            {console.log(this.props.project_status)}          
            <div className="ActiveProjectInfo_Badge" style={{width: "117px", height : "117px"}}>                        
                <Image src={this.state.ProjectBanner}  style={{width: "100%", height: "100%"}} roundedCircle/>
            </div>
            <div className="ActiveProjectInfo_Text" >
                <table >
                    <tbody>
                    <tr>
                    <td className="firstCell" colSpan={2}>
                        {this.renderOnClick(this.props.project_status, this.props.type)}                                                                            
                        <br /> <br/>
                        {this.renderdate(this.props.project_date, this.props.type)}                                                 
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

