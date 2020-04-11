import React from "react";
import "../../../ProjectCommon.css";
import "./StartProjectStepThree.css";
import AxiosConfig from "../../../../axiosConfig";
import ProjectBanner from "../../../../components/Project/ProjectBanner";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import cookie from "react-cookies";
import ProgressStepper from "../../../../components/Project/ProgressStepper";
import InviteFriends from "../../../../components/Project/StartProject/Step_3/ImageFriends";
import FriendsSearchGrid from "../../../../components/Project/StartProject/Step_3/FriendsSearchGrid";
import FriendsInvitedGrid from "../../../../components/Project/StartProject/Step_3/FriendsInvitedGrid";
import UnregisteredFriendsInvite from "../../../../components/Project/StartProject/Step_3/UnregisteredFriendsInvite";
import TextArea from "../../../../components/General/Form/TextArea";
import TwoButtonLayout from "../../../../components/General/TwoButtonLayout";
import AlertMessage from "../../../../components/General/AlertMessage";
import * as FriendsSearchHelper from "../../../../components/Project/FriendsSearcHelper/FriendsSearchHelper";
import TextBlackSubHeading from "../../../../components/General/Text/TextBlackSubHeading";
class StartProjectStepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.id,
      projectBanner: "",
      projectName: "",
      projectDateStarted: "Date Started",
      userEmail: cookie.load("user_email"),
      popupSearch: false,
      searchType: "",
      searchValue: "",
      searchMoreAvailable: true,
      searchOffset: 0,
      selectedFriends: new Map(),
      inviteMessage: "Hello Friends",
      unregisteredUser: [
        { email_address: "", issue: "" },
        { email_address: "", issue: "" },
        { email_address: "", issue: "" },
        { email_address: "", issue: "" },
        { email_address: "", issue: "" },
      ],
      unregisteredUserIssue: "",
      sendInvitationIssue: "",
      friendsSearchData: [],
    };
  }
  componentDidMount() {
    const project_id = this.props.match.params.id;
    AxiosConfig
      .get(`charityproject/${project_id}/`)
      .then((res) => {
        this.setState({
          projectName: res.data["name"],
          projectBanner: res.data["banner"],
        });
      })
      .catch((error) => console.log(error));
  }

  /*
  This method will actually call the backend API and fetch the friends result based on the search query
   */
  fetchFriendsData(obj, searchType, searchValue, offset, searchMoreFlag) {
      FriendsSearchHelper.fetchFriendsDataHelper( obj, searchType, searchValue, offset, searchMoreFlag);
  }

  saveButtonClick() {}

  sendInviteButtonClick() {
    this.setState({ sendInvitationIssue: "" });
    if (
      this.checkUnregisteredUsersErr() === false &&
      this.checkInvitationMessageErr() === false
    ) {
      this.sendInvitationToRegisteredUsers(this);
    }
  }

  checkInvitationMessageErr() {
    if (this.state.inviteMessage.length === 0) {
      this.setState({
        sendInvitationIssue:
          "Enter an Invitation message to be sent to your invitee's.",
      });
      return true;
    }
    return false;
  }

  checkUnregisteredUsersErr() {
    let errorFlag = false;
    for (let i = 0; i < this.state.unregisteredUser.length; i++) {
      if (this.state.unregisteredUser[i]["issue"].trim().length !== 0) {
        errorFlag = true;
        this.setState({ unregisteredUser: this.state.unregisteredUser });
        this.setState({
          sendInvitationIssue: "Invalid Email of Unregistered User.",
        });
        break;
      }
    }
    return errorFlag;
  }

  sendInvitationToUnregisteredUsers() {
    var unregisterEmail = [];
    for (let i = 0; i < this.state.unregisteredUser.length; i++) {
      unregisterEmail.push(
        this.state.unregisteredUser[i]["email_address"].trim()
      );
    }
    AxiosConfig
      .post(`charityproject/unregisteredInvitation`, {
        user_email: this.state.userEmail,
        project_id: this.state.projectId,
        invitation_message: this.state.inviteMessage,
        friend_list: unregisterEmail,
      })
      .then(function (response) {
        // go to next page
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sendInvitationToRegisteredUsers(obj) {
    var friendsEmail = [];
    for (const friends of this.state.selectedFriends.values()) {
      friendsEmail.push(friends["user_email"]);
    }
    AxiosConfig
      .post(`charityproject/userInvitation`, {
        user_email: this.state.userEmail,
        project_id: this.state.projectId,
        invitation_message: this.state.inviteMessage,
        friend_list: friendsEmail,
      })
      .then(function (response) {
        obj.sendInvitationToUnregisteredUsers();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ margin: "10px" }}>
        <div style={{ marginBottom: "150px" }}>
          {this.state.popupSearch ? (
            <div id="popup" className="friends-popup-window">
              <FriendsSearchGrid
                friendsSearchData={this.state.friendsSearchData}
                searchStringType={this.state.searchType}
                searchStringValue={this.state.searchValue}
                searchMore={this.state.searchMoreAvailable}
                searchResultCancelClick={FriendsSearchHelper.searchResultCancelClick.bind(
                  this
                )}
                searchResultMoreClick={FriendsSearchHelper.searchResultMoreClick.bind(
                  this
                )}
                searchResultImageClick={FriendsSearchHelper.searchResultImageClick.bind(
                  this
                )}
              />
            </div>
          ) : (
            <div />
          )}

          <div className="header_step_banner_common">
            <div className="stepper_common">
              <ProgressStepper currentStep="2" />
            </div>
            <div className="banner_common">
              <ProjectBanner image={this.state.projectBanner} />
            </div>
          </div>

          <div className="content_project_info_vertical">
            <ProjectInfo vertical={true} id={this.state.projectId} />
          </div>
          <div className="content_section">
            <div className="content_project_info">
              <ProjectInfo id={this.state.projectId} />
            </div>
            <InviteFriends
              showHeaderMessage={true}
              message="1. Build your team by inviting family and friends to your project."
              searchResultHandler={FriendsSearchHelper.searchResultHandler.bind(
                this
              )}
              disabled={this.state.popupSearch}
            />
            <br />
            <div>
              <FriendsInvitedGrid
                friendsInvitedData={[...this.state.selectedFriends.values()]}
                removeInviteClick={FriendsSearchHelper.removeInviteClick.bind(
                  this
                )}
              />
            </div>

            <br />
            <div>
              <UnregisteredFriendsInvite
                message="2. Send invites to unregistered users."
                unregisteredUser={this.state.unregisteredUser}
                unregisteredUserIssue={this.state.unregisteredUserIssue}
                unregisteredUserAddMoreClick={FriendsSearchHelper.unregisteredUserAddMore.bind(
                  this
                )}
                unregisteredUserEmailChange={FriendsSearchHelper.unregisteredUserEmailChange.bind(
                  this
                )}
                unregisteredUserDeleteClick={FriendsSearchHelper.unregisteredUserDeleteClick.bind(
                  this
                )}
                unregisteredUserEmailValidate={FriendsSearchHelper.unregisteredUserEmailValidate.bind(
                  this
                )}
                disabled={this.state.popupSearch}
              />
            </div>

            <br />
            <hr />
            <div style={{ marginTop: "20px" }}>
              <div>
                <TextBlackSubHeading message="3. Invitation message to friends." />
              </div>
              <TextArea
                value={this.state.inviteMessage}
                rows={5}
                handleChange={FriendsSearchHelper.inviteMessageChange.bind(
                  this
                )}
              />
            </div>

            <br />
          <TwoButtonLayout
            button1Text="SAVE"
            button2Text="SEND INVITATIONS"
            button1Click={this.saveButtonClick.bind(this)}
            button2Click={this.sendInviteButtonClick.bind(this)}
            disabled={this.state.popupSearch}
          />
          <AlertMessage alertMessage={this.state.sendInvitationIssue} />
          </div>
        </div>
      </div>
    );
  }
}

export default StartProjectStepThree;
