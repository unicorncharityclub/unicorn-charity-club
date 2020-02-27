import React from "react";
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
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
        axios.get(`http://127.0.0.1:8000/charityproject/${this.state.Project_id}`)
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
            <div style={{borderRadius: "10px", borderStyle:"solid", margin:"10px", marginLeft:"10px"}}>
                <div style={{display:"flex",margin:"10px"}}>
                    <div style={{width:"15%", height:"100%",  margin:"5px", float:"left"}}>
                        <Image src={this.state.ProjectBanner} style={{width:"130px", height:"130px", }} roundedCircle/>
                    </div>
                    <div style={{width:"80%", height:"100%", float:"left"}}>
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