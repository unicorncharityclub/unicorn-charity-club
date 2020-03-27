import React from "react";
import "./ActiveProjectChallengeInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../../General/Text/TextBlackHeading";
import TextBlack from "../../../General/Text/TextBlack";
import axiosConfig from '../../../../axiosConfig'

class ActiveProjectChallengeInfo extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      ProjectID : this.props.id,
      ProjectName : '',
        ProjectBadge : '',
      ProjectStatus : '',
      ProjectDateJoined : '',
      ProjectBanner : '',
      ProjectMission : ''
    }  
    
 }

    componentDidMount () {
    // get axios function here 
        axiosConfig.get(`charityproject/${this.state.ProjectID}`)
        .then(res => {
                this.setState({                  
                  ProjectName : res.data.project_name,
                  ProjectBadge : res.data.project_badge,
                  ProjectMission : res.data.project_mission,
                  ProjectCategory :res.data.project_category 
                });
        }).catch(error => console.log(error))

    }

    render() {      
        return (
          <div>
            {this.props.vertical ? (
              <div>
                <div className="start_project_info_main_div">
                  <div className="start_project_info_container">
                    <br />
                    <div style={{width:"100%"}}>
                      <table>
                        <tbody>
                        <tr>
                            <td>
                              <Image
                        src={this.state.ProjectBadge}
                        className="start_project_info_badge_image"
                        roundedCircle/>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <TextBlackHeading message={this.state.ProjectName} />
                            </td>
                          </tr>
                          <tr>
                            <td valign="top">
                              <b>
                                <TextBlack className = "title" message={this.state.ProjectCategory} />
                              </b>
                            </td>
                          </tr>                          
                         
                          <tr>
                            <td valign="top">
                                <b><TextBlack className = "title" message="Mission"/></b>
                            </td>
                          </tr>
    
                          <tr>
                            <td>
                              <TextBlack
                                message={this.state.ProjectMission}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="start_project_info_main_div">
                  <div className="start_project_info_container">
                    <div className="start_project_info_badge">
                      <Image
                        src={this.state.ProjectBadge}
                        className="start_project_info_badge_image"
                        roundedCircle
                      />
                    </div>
                    <div className="start_project_info_text">
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan={2}>
                              <TextBlackHeading message={this.state.ProjectName} />
                            </td>
                          </tr>
                          <tr>
                            <td valign="top">
                              <TextBlack message="Category" />
                            </td>
                            <td>
                              <TextBlack
                                message={" : " + this.state.ProjectCategory}
                              />
                            </td>
                          </tr>                                                    
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
}

export default ActiveProjectChallengeInfo;  
