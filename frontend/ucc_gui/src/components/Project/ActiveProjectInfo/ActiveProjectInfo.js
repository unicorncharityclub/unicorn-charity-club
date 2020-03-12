import React from "react";
import axiosConfig from '../../../axiosConfig'
import "./ActiveProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../General/TextBlackHeading";
import TextBlack from "../../General/TextBlack";
import ProgressStepper from "../ProgressStepper";
import EachActiveProject from "./EachActiveProject";


class ActiveProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Project_id: 1, 
      ProjectName : '',
      ProjectJoinDate : '03/04/2020',     
    }
 }

    render() {
      return(
        <div>
            <div className="ProjectInfo_MainDiv"  >
              <div className="ProjectInfo_Container">
                  <EachActiveProject />
              </div>
            </div>
        </div>
    )
    }
}

export default ActiveProjectInfo;  