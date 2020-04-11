import React from "react";
import "./ActiveProjectChallengeInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../../General/Text/TextBlackHeading";
import TextBlack from "../../../General/Text/TextBlack";
import AxiosConfig from '../../../../axiosConfig'

class ActiveProjectChallengeInfo extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      projectId : this.props.id,
      projectName : '', 
      projectBadge : '',
      projectStatus : '',
      projectDateJoined : '',
      projectBanner : '',
      projectMission : ''
    }
 }

    componentDidMount () {
    // get axios function here 
        AxiosConfig.get(`charityproject/${this.state.projectId}/`)
        .then(res => {
                this.setState({                  
                  projectName : res.data.name,
                  projectBadge : res.data.badge,
                  projectMission : res.data.mission,
                  projectCategory :res.data.category
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
                        src={this.state.projectBadge}
                        className="start_project_info_badge_image"
                        roundedCircle/>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <TextBlackHeading message={this.state.projectName} />
                            </td>
                          </tr>
                          <tr>
                            <td valign="top">
                              <b>
                                <TextBlack className = "title" message={this.state.projectCategory} />
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
                                message={this.state.projectMission}
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
                        src={this.state.projectBadge}
                        className="start_project_info_badge_image"
                        roundedCircle
                      />
                    </div>
                    <div className="start_project_info_text">
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan={2}>
                              <TextBlackHeading message={this.state.projectName} />
                            </td>
                          </tr>
                          <tr>
                            <td valign="top">
                              <TextBlack message="Category" />
                            </td>
                            <td>
                              <TextBlack
                                message={" : " + this.state.projectCategory}
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
