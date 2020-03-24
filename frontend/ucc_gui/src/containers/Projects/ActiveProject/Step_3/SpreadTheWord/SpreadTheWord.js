import React from "react";
import axiosConfig from "../../../../../axiosConfig";
import ProgressStepper from "../../../../../components/Project/ProgressStepper";
import ProjectBanner from "../../../../../components/Project/ProjectBanner";
import TextBlueHeading from "../../../../../components/General/Text/TextBlueHeading";
import TextBlack from "../../../../../components/General/Text/TextBlack";
import cookie from "react-cookies";
import InviteFriends from "../../../../../components/Project/StartProject/Step_3/ImageFriends";
import FriendsInvitedGrid from "../../../../../components/Project/StartProject/Step_3/FriendsInvitedGrid";
import UnregisteredFriendsInvite from "../../../../../components/Project/StartProject/Step_3/UnregisteredFriendsInvite";
import TextArea from "../../../../../components/General/Form/TextArea";
import FriendsSearchGrid from "../../../../../components/Project/StartProject/Step_3/FriendsSearchGrid";
import TwoButtonLayout from "../../../../../components/General/TwoButtonLayout";
import AlertMessage from "../../../../../components/General/AlertMessage";
import * as FriendsSearchHelper from '../../../../../components/Project/FriendsSearcHelper/FriendsSearchHelper';
import TextBlackSubHeading from "../../../../../components/General/Text/TextBlackSubHeading";
import TextBlackHeading from "../../../../../components/General/Text/TextBlackHeading";
import Video from "../../../../../components/General/Video/Video";

class SpreadTheWord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Project_id: this.props.match.params.id,
            ProjectName: '',
            ProjectBanner: '',
            ProjectBadge: '',
            Video: '',
            UserEmailId: cookie.load("user_emailid"),
              PopupSearch: false,
              SearchType: "",
              SearchValue: "",
              SearchMoreAvailable: true,
              SearchOffset: 0,
              SelectedFriends : new Map(),
              InviteMessage : "Hello Friends",
              UnregisteredUser : [{email_address:"", issue:""},{email_address:"", issue:""},{email_address:"", issue:""},{email_address:"", issue:""},{email_address:"", issue:""}],
              UnregisteredUserIssue : "",
              SendInvitationIssue : "",
              FriendsSearchData: [

              ],
            video : "",
            final_video : ""
        }
    }

    componentDidMount () {
        console.log(this.props.id)
        axiosConfig.get(`charityproject/${this.state.Project_id}`)
      .then(res => {
            console.log(res.data)
              this.setState({
                  ProjectName : res.data.project_name,
                  ProjectBanner : res.data.project_banner,
                  ProjectBadge: res.data.project_badge
              });
      }).catch(error => console.log(error))
    }

    videoHandler = (event) =>{
        this.setState({
            video: URL.createObjectURL(event.target.files[0]),
            final_video: event.target.files[0]
        });
    };

  sendInviteButtonClick()
  {
    this.setState({SendInvitationIssue: ""});
    if(this.checkUnregisteredUsersErr()===false && this.checkInvitationMessageErr()===false) {
      this.sendInvitationToRegisteredUsers(this);

    }
  }

    sendInvitationToRegisteredUsers(obj)
  {

  }

  sendInvitationToUnregisteredUsers() {

  }

  checkInvitationMessageErr()
  {
    if(this.state.InviteMessage.length===0)
    {
      this.setState({SendInvitationIssue: "Enter an Invitation message to be sent to your invitee's."});
      return true;
    }
    return false;
  }

  checkUnregisteredUsersErr()
  {
    let errorFlag = false;
    for(let i=0;i<this.state.UnregisteredUser.length;i++)
    {
      if(this.state.UnregisteredUser[i]["issue"].trim().length!==0)
      {
        errorFlag = true;
        this.setState({UnregisteredUser: this.state.UnregisteredUser});
        this.setState({SendInvitationIssue: "Invalid Email Id of Unregistered User."});

        break;
      }
    }
    return errorFlag
  }

  /*
  This method will actually call the backend API and fetch the friends result based on the search query
   */
  fetchFriendsData(obj, searchType, searchValue, offset, searchMoreFlag) {
    if(searchType==='emailid')
    {
      axiosConfig.defaults.withCredentials = true;
      axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
      axiosConfig
        .post(`charityproject/friendByEmail`,
            {
              "friend_email" : searchValue
            })
        .then(function(response) {
          console.log(response.data)
          obj.setState({ PopupSearch: true });
          obj.setState({FriendsSearchData: response.data["friend_list"]})
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    else {
      axiosConfig.defaults.withCredentials = true;
      axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
      axiosConfig
        .post(`charityproject/search`,
            {
              "text" : searchValue,
              "offset_value" : offset
            })
        .then(function(response) {
          console.log(response.data)
          obj.setState({ PopupSearch: true });
          obj.setState({FriendsSearchData: response.data["friend_list"]})
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    //Set this accordingly
    this.setState({ SearchMoreAvailable: true });
  }

  saveButtonClick()
  {

  }

    render() {
      return(

          <div style={{ margin: "10px", marginBottom: "150px" }}>
              {this.state.PopupSearch ? (
          <div
            id="popup"
            style={{
              position: "fixed",
              width: "40%",
              height: "75%",
              overflowY: "auto",
              overflowX: "hidden",
              top: "20%",
              bottom: "10px",
              background: "#2BB9B7",
              left: "50%",
              marginLeft: "-20%",
              border: "3px solid",
              boxShadow: "5px 10px #888888",
              zIndex: "100",
              marginTop: "-40px"
            }}
          >
            <FriendsSearchGrid
              friendsSearchData={this.state.FriendsSearchData}
              searchStringType={this.state.SearchType}
              searchStringValue={this.state.SearchValue}
              searchMore={this.state.SearchMoreAvailable}
              searchResultCancelClick={FriendsSearchHelper.searchResultCancelClick.bind(this)}
              searchResultMoreClick={FriendsSearchHelper.searchResultMoreClick.bind(this)}
              searchResultImageClick={FriendsSearchHelper.searchResultImageClick.bind(this)}
            />
          </div>
        ) : (
          <div />
        )}
            <div className="headerStepBanner">
                <div className="stepper" >
                    <ProgressStepper currentStep="2" />
                </div>
                <div className="banner">
                    <ProjectBanner image={this.state.ProjectBanner}  />
                </div>
            </div>

            <div>
                <TextBlueHeading message="CHALLENGE 3: Adventure"/>
                <br/>
                <TextBlackHeading message="SPREAD THE WORD"/>
                <TextBlack message="Spread the word by inviting your family and friends to join you on your project."/>
                <br/>
            </div>
<hr/>
              <div >
                    <TextBlackSubHeading message="1. Create a Personal Video to :"/>
                    <table style={{marginTop: "10px"}}>
                    <tbody>
                    <tr>
                            <td>
                        <ul>
                            <li><TextBlack message="Explain why you choose this project."/></li>
                            <li><TextBlack message="Explain why people should support the project."/></li>
                            <li><TextBlack message="Ask your family and friends to join your project."/></li>
                        </ul>
                            </td>
                    </tr>
                    </tbody>
                    </table>

                  <Video src={this.state.video}
                        id="file" style={{display: 'none'}}
                           type="file"
                           name="video"
                           accept="video/*"
                         width="100%"
                           onChange={this.videoHandler.bind(this)}/>
                </div>

              <InviteFriends
                  message="2. Invite family and friends to join the project."
              searchResultHandler={FriendsSearchHelper.searchResultHandler.bind(this)}
              disabled={this.state.PopupSearch}
            />
            <br/>
            <FriendsInvitedGrid friendsInvitedData={[...this.state.SelectedFriends.values()]} removeInviteClick={FriendsSearchHelper.removeInviteClick.bind(this)}/>
                      <br/>
        <div>
          <UnregisteredFriendsInvite
              message="3. Send invites to unregistered users."
              unregisteredUser={this.state.UnregisteredUser}
                                     unregisteredUserIssue={this.state.UnregisteredUserIssue}
                                     unregisteredUserAddMoreClick={FriendsSearchHelper.unregisteredUserAddMore.bind(this)}
                                     unregisteredUserEmailChange={FriendsSearchHelper.unregisteredUserEmailChange.bind(this)}
                                     unregisteredUserDeleteClick={FriendsSearchHelper.unregisteredUserDeleteClick.bind(this)}
                                     unregisteredUserEmailValidate={FriendsSearchHelper.unregisteredUserEmailValidate.bind(this)}/>
        </div>

              <br/>
        <div>
            <hr/>
            <div >
                <TextBlackSubHeading message="4. Invitation message to friends."/>
            </div>
            <TextArea
                value={this.state.InviteMessage}
                rows = {5}
                handleChange={FriendsSearchHelper.inviteMessageChange.bind(this)}/>
        </div>
              <TwoButtonLayout button1Text="SAVE" button2Text="SEND INVITATIONS"
                           button1Click={this.saveButtonClick.bind(this)} button2Click={this.sendInviteButtonClick.bind(this)}/>
                           <AlertMessage alertMessage={this.state.SendInvitationIssue} />
          </div>


        )
    }
}



export default SpreadTheWord;