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
      ProjectStatus : '',
      ProjectDateJoined : '',
      ProjectBanner : ''
    }  
    
 }

    componentDidMount () {
    // get axios function here 
        axiosConfig.get(`charityproject/${this.state.ProjectID}`)
        .then(res => {
                this.setState({                  
                  ProjectName : res.data["project_name"],
                  ProjectBanner : res.data["project_banner"],                     
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
                                  <TextBlack message="Date Joined"/>
                              </td>
                              <td>
                                  <TextBlack message= " : 02/06/2020"/>
                              </td>
                            </tr>
                          <tr>
                              <td>
                                  <TextBlack message="Status"/>
                              </td>
                              <td>
                                  <TextBlack message=" : Active"/>
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

export default ActiveProjectChallengeInfo;  