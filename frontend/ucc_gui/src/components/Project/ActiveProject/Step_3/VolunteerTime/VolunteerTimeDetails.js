import React from 'react';
import TextBlueHeading from "../../../../General/Text/TextBlueHeading";
import TextBlack from "../../../../General/Text/TextBlack";
import Image from "react-bootstrap/Image";
import axiosConfig from "../../../../../axiosConfig";
import TextBlackHeading from "../../../../General/Text/TextBlackHeading";
import ProgressStepper from "../../../ProgressStepper";
import ProjectBanner from "../../../ProjectBanner";
class VolunteerTimeDetails extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        Project_id: this.props.id,
        ProjectName : '',
        ProjectBanner : '',
        ProjectBadge : '',
        Name :'',
        Address :'',
        City :'',
        State : '',
        Website :'',
        Hours : '',
        Description :'',
        Video :''
    }
 }


    componentDidMount () {
        axiosConfig.get(`charityproject/${this.state.Project_id}`)
      .then(res => {
              this.setState({
                  ProjectName : res.data.project_name,
                  ProjectBanner : res.data.project_banner,
                  ProjectBadge: res.data.project_badge
              });
      }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <div className="headerStepBanner">
                    <div className="stepper" >
                        <ProgressStepper currentStep="2" />
                    </div>
                    <div className="banner">
                        <ProjectBanner image={this.state.ProjectBanner}  />
                    </div>
                </div>

                <div className="ProjectInfo_MainDiv"  >
                <div className="ProjectInfo_Container">
                      <div className="ProjectInfo_Badge" >
                        <Image src={this.state.ProjectBadge} style={{width: "100%", maxHeight: "100%"}} roundedCircle/>
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
                                  <TextBlack message="Date joined:"/>
                              </td>
                            </tr>
                          <tr>
                              <td>
                                  <TextBlack message="Status:"/>
                              </td>
                            </tr>
                          </tbody>
                      </table>
                    </div>

                </div>
                </div>

                <form onSubmit={this.handleFormSubmit}>
                <div>
                <TextBlueHeading message="Challenge 3: Adventure"/>
                      <br/>
                        <TextBlack message = "VOLUNTEER TIME"/>
                        <br/>
                        <TextBlack message = "Volunteer time at a local organization that supports the mission of the project."/>

                  </div>
                </form>
            </div>
        );
    }
}


export default VolunteerTimeDetails;