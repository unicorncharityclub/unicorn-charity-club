import React from "react";
import "./ActiveProjectInfo.css";
import EachActiveProject from "./EachActiveProject";


class ActiveProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ProjectId : this.props.projectId,     
      ProjectName : '',
      ProjectJoinDate : '03/04/2020',     
    }
 }

    render() {
      return(
        <div>        
            
                  {this.props.projectList              
                    .map(elem => (
                      <div className="ProjectInfo_MainDiv"  >
                        <div className="ProjectInfo_Container">
                        <EachActiveProject key={this.props.projectList.indexOf(elem)} projectId={elem.project_id}/> 
                        </div>
                      </div>
                  ))}                
              
        </div>
    )
    }
}

export default ActiveProjectInfo;  