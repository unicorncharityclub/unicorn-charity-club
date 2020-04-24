import React from "react";
import AxiosConfig from "../../../axiosConfig";
import "./ProjectInfo.css";
import Image from "react-bootstrap/Image";
import TextTheme from "../../General/Text/TextTheme";

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.id,
      projectName: "",
      projectCategory: "",
      projectTags: "",
      projectBadge: "",
    };
  }

  componentDidMount() {
    AxiosConfig
      .get(`charityproject/${this.state.projectId}/`)
      .then((res) => {
        this.setState({
          projectName: res.data.name,
          projectCategory: res.data.category,
          projectTags: res.data.tags,
          projectBadge: res.data.badge,
          projectMission: res.data.mission,
        });
      })
      .catch((error) => console.log(error));
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
                              roundedCircle
                            />
                        </td>
                      </tr>
                    <tr>
                      <td>
                        <br/>
                      </td>
                    </tr>
                    <tr className="dottedLine">
                        <td valign="top">
                          <br/>
                        </td>
                    </tr>


                      <tr>
                        <td>
                          <TextTheme message={this.state.projectName} className="text_large text_black" />
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">
                          <b>
                            <TextTheme message="Category" className="text_small text_black" />
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextTheme message={this.state.projectCategory} className="text_small text_black" />
                        </td>
                      </tr>

                      <tr>
                          <td><br/></td>
                      </tr>

                      <tr>
                        <td valign="top">
                          <b><TextTheme message="Tags" className="text_small text_black" /></b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextTheme message={this.state.projectTags} className="text_small text_black" />
                        </td>
                      </tr>
                      <tr>
                          <td><br/></td>
                      </tr>

                      <tr>
                        <td valign="top">
                            <b><TextTheme message="Mission" className="text_small text_black" /></b>
                        </td>
                      </tr>

                    <tr>
                        <td>
                          <TextTheme
                            message={this.state.projectMission} className="text_small text_black"
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
                          <TextTheme message={this.state.projectName} className="text_large text_black" />
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">
                          <TextTheme message="Category" className="text_small text_black" />
                        </td>
                        <td>
                          <TextTheme
                            message={" : " + this.state.projectCategory} className="text_small text_black"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">
                          <TextTheme message="Tags" className="text_small text_black" />
                        </td>
                        <td>
                          <TextTheme message={" : " + this.state.projectTags} className="text_small text_black" />
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">
                          <TextTheme message="Mission" className="text_small text_black" />
                        </td>
                        <td>
                          <TextTheme
                            message={" : " + this.state.projectMission} className="text_small text_black"
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

export default ProjectInfo;
