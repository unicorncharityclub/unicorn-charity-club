import React from "react";
import axiosConfig from '../../../axiosConfig'
import "./ProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../General/TextBlackHeading";
import TextBlack from "../../General/TextBlack";

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Project_id: this.props.id, 
      ProjectName : '',
      ProjectCategory : '',
      ProjectTags : '',
      ProjectBanner : ''
    }
 }

    componentDidMount () {
        axiosConfig.get(`http://127.0.0.1:8000/charityproject/${this.state.Project_id}`)
      .then(res => {
              this.setState({                  
                  ProjectName : res.data.project_name,
                  ProjectCategory : res.data.project_category,
                  ProjectTags : res.data.project_tags,
                  ProjectBanner : res.data.project_banner,
                  ProjectMission : res.data.project_mission
              });
      }).catch(error => console.log(error))

    }
    render() {
      return(
        <div>
            <div className="ProjectInfo_MainDiv"  >
                <div className="ProjectInfo_Container">
                    <div className="ProjectInfo_Badge" >
                        <Image src={this.state.ProjectBanner} style={{width: "100%", maxHeight: "100%"}} roundedCircle/>
                    </div>
                    <div className="ProjectInfo_Text" >
                        <table>
                          <tbody>
                            <tr>
                              <td colSpan={2}>
                                  <TextBlackHeading message={this.state.ProjectName}/>
                              </td>
                            </tr>
                          <tr>
                              <td>
                                  <TextBlack message="Category"/>
                              </td>
                              <td>
                                  <TextBlack message={" : "+this.state.ProjectCategory}/>
                              </td>
                            </tr>
                          <tr>
                              <td>
                                  <TextBlack message="Tags"/>
                              </td>
                              <td>
                                  <TextBlack message={" : "+this.state.ProjectTags}/>
                              </td>
                            </tr>
                          <tr>
                              <td>
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