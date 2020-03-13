import React from "react";
import "./ActiveProjectInfo.css";
import EachActiveProject from "./EachActiveProject";


class ActiveProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      ProjectName : '',
      ProjectJoinDate : '03/04/2020',     
    }
 }

    render() {
      return(
        <div>
            <div className="ProjectInfo_MainDiv"  >
              <div className="ProjectInfo_Container">
                {console.log(this.props.projectId)}
                  <EachActiveProject projectId={this.props.projectId}/>
              </div>
            </div>
        </div>
    )
    }
}

export default ActiveProjectInfo;  