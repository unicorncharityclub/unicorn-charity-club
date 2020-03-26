import ProgressStepper from "../../ProgressStepper";
import ProjectBanner from "../../ProjectBanner";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../../General/Text/TextBlackHeading";
import TextBlack from "../../../General/Text/TextBlack";
import React from "react";
import TextBlueHeading from "../../../General/Text/TextBlueHeading";
class Project_Data extends React.Component {

render() {
        return (
            <div>
                <div className="headerStepBanner">
                    <div className="stepper" >
                        <ProgressStepper currentStep="1" />
                    </div>
                    <div className="banner">
                        <ProjectBanner image={this.props.ProjectBanner}  />
                    </div>
                </div>

                <div className="ProjectInfo_MainDiv"  >
                <div className="ProjectInfo_Container">
                      <div className="ProjectInfo_Badge" >
                        <Image src={this.props.ProjectBadge} style={{width: "100%", maxHeight: "100%"}} roundedCircle/>
                      </div>

                      <div className="ProjectInfo_Text" >
                        <table>
                          <tbody>
                            <tr>
                              <td colSpan={2}>
                                  <TextBlackHeading message={this.props.ProjectName}/>
                              </td>
                            </tr>

                          <tr>
                              <td>
                                  <TextBlack message="Date joined:"/>
                                  <TextBlackHeading message={this.props.ProjectJoinDate}/>
                              </td>
                            </tr>
                          <tr>
                              <td>
                                  <TextBlack message="Status:"/>
                                  <TextBlackHeading message={this.props.ProjectChallengeStatus}/>
                              </td>
                            </tr>
                          </tbody>
                      </table>
                    </div>

                </div>
                </div>
                  </div>
        );
    }
}


export default Project_Data;




