import React from "react";
import axiosConfig from '../../../axiosConfig'
import "./ProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../General/Text/TextBlackHeading";
import TextBlack from "../../General/Text/TextBlack";

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Project_id: this.props.id, 
      ProjectName : '',
      ProjectCategory : '',
      ProjectTags : '',
      ProjectBadge : ''
    }
 }

    componentDidMount () {
        axiosConfig.get(`charityproject/${this.state.Project_id}`)
      .then(res => {
              this.setState({                  
                  ProjectName : res.data.project_name,
                  ProjectCategory : res.data.project_category,
                  ProjectTags : res.data.project_tags,
                  ProjectBadge : res.data.project_badge,
                  ProjectMission : res.data.project_mission
              });
      }).catch(error => console.log(error))

    }
    render() {
      return(
        <div>
            <div className="start_project_info_main_div"  >
                <div className="start_project_info_container">
                    <div className="start_project_info_badge" >
                        <Image src={this.state.ProjectBadge} className="start_project_info_badge_image" roundedCircle/>
                    </div>
                    <div className="start_project_info_text" >
                        <table >
                          <tbody>
                            <tr>
                              <td colSpan={2}>
                                  <TextBlackHeading message={this.state.ProjectName}/>
                              </td>
                            </tr>
                          <tr>
                              <td valign="top">
                                  <TextBlack message="Category"/>
                              </td>
                              <td>
                                  <TextBlack message={" : "+this.state.ProjectCategory}/>
                              </td>
                            </tr>
                          <tr>
                              <td valign="top">
                                  <TextBlack message="Tags"/>
                              </td>
                              <td>
                                  <TextBlack message={" : "+this.state.ProjectTags}/>
                              </td>
                            </tr>
                          <tr>
                              <td valign="top">
                                  <TextBlack message="Mission"/>
                              </td>
                              <td>
                                  <TextBlack message={" : "+this.state.ProjectMission}/>
                              </td>
                            </tr>
                          </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default ProjectInfo;  