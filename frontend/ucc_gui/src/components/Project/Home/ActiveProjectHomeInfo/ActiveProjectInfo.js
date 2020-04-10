import React from "react";
import "./ActiveProjectInfo.css";
import EachActiveProject from "./EachActiveProject";


class ActiveProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      projectId : this.props.projectId,     
      projectName : '',
      projectJoinDate : '' 
    }
 }

renderList (type) {
    if("Planning" === type) {
      return (
          <div>                    
              {this.props.projectList              
                .map((elem, index) => (
                  <div className="ProjectInfo_MainDiv" key={index} >
                    <div className="ProjectInfo_Container">    
                      <EachActiveProject 
                        key={index} projectId={elem.project_id} 
                        projectStatus = {elem.planning_status}
                        type = {type}
                        projectDate = {elem.project_start_date}
                      /> 
                    </div>
                  </div>            
              ))}                                             
        </div>
      );
    }else if ("Active" === type){
      return (
        <div>                    
            {this.props.projectList              
              .map((elem, index) => (
                <div className="ProjectInfo_MainDiv" key={index} >
                  <div className="ProjectInfo_Container">    
                    <EachActiveProject 
                      key={index} projectId={elem.project_id} 
                      projectStatus = {elem.challenge_status}
                      type = {type} 
                      projectDate = {elem.project_join_date}
                    /> 
                  </div>
                </div>                
            ))} 
        </div>
      );
    }else if ("Invitation" === type){
      return (
        <div>                    
            {this.props.projectList              
              .map((elem, index) => (
                <div className="ProjectInfo_MainDiv" key={index} >
                  <div className="ProjectInfo_Container">    
                    <EachActiveProject 
                      key={index} projectId={elem.project_id}                        
                      type = {type}                       
                      projectDate = {elem.invitation_date}
                      inviterName = {elem.inviter_user_name}
                      inviterEmail = {elem.inviter_user_email}
                    /> 
                  </div>
                </div>
            ))}                            
        </div>
      );
    }

}

    render() {
      return (
        <div>
          {console.log(this.props)}
          {this.renderList(this.props.listType)}              
        </div>        
      )        
    }
}

export default ActiveProjectInfo;  