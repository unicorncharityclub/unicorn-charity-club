import React from "react";
import "./ActiveProjectChallengeInfo.css";
import Image from "react-bootstrap/Image";
import TextBlackHeading from "../../General/TextBlackHeading";
import TextBlack from "../../General/TextBlack";

class ActiveProjectChallengeInfo extends React.Component {
  constructor(props) {
    super(props);    
 }

    componentDidMount () {
    // get axios function here 

    }


    render() {
      return(
        <div>
            <div className="ProjectInfo_MainDiv"  >
                <div className="ProjectInfo_Container">
                    <div className="ProjectInfo_Badge" >
                        <Image src="#" style={{width: "100%", maxHeight: "100%"}} roundedCircle/>
                    </div>
                    <div className="ProjectInfo_Text" >
                        <table>
                          <tbody>
                            <tr>
                              <td colSpan={2}>
                                  <TextBlackHeading message="Project Name"/>
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