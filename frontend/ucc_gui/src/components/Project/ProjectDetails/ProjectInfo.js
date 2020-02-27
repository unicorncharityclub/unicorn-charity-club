import React from "react";
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
import "./ProjectInfo.css";

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
        // backend get call
        axios.get(`http://127.0.0.1:8000/charityproject/${this.state.Project_id}`)
      .then(res => {
              this.setState({                  
                  ProjectName : res.data.project_name,
                  ProjectCategory : res.data.project_category,
                  ProjectTags : res.data.project_tags,
                  ProjectBanner : res.data.project_banner
              });
      }).catch(error => console.log(error))

    }
    render() {
      return(
            <div>
              <table>
                  <tbody>
                    <tr>
                      <td>
                        <Avatar className = "profilepic" src={this.state.ProjectBanner}/>
                      </td>
                      <td>
                          <h2 className="projectTitle">{this.state.ProjectName}</h2>
                          <p className="insideInfo">
                            {/* Project id :{this.state.Project_id} <br/> */}
                            Category: {this.state.ProjectCategory} <br />
                            Tags: {this.state.ProjectTags} <br/>
                          </p>
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>
        )
    }

  }

export default ProjectInfo;  