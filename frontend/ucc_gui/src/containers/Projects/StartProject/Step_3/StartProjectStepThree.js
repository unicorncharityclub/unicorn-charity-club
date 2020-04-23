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
      searchPage: 1,
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
    AxiosConfig.get(`charityproject/${project_id}/`)
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
  fetchFriendsData(obj, searchType, searchValue, page, searchMoreFlag) {
    FriendsSearchHelper.fetchFriendsDataHelper(
      obj,
      searchType,
      searchValue,
      page,
      searchMoreFlag
    );
  }

  saveButtonClick() {}

  sendInviteButtonClick() {
    this.setState({ sendInvitationIssue: "" });
    if (
      this.checkUnregisteredUsersErr() === false &&
      this.checkInvitationMessageErr() === false
    ) {
      this.sendInvitationToUsers(this);
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

  sendInvitationToUsers(obj){
    let form_data = new FormData();

    for (const friends of this.state.selectedFriends.values()) {
      form_data.append('registered_user', friends["user_email"])
    }
    for (let i = 0; i < this.state.unregisteredUser.length; i++) {
      form_data.append('unregistered_user', this.state.unregisteredUser[i]["email_address"].trim());
    }
    form_data.append("project_id", this.state.projectId);
    form_data.append("invitation_message", this.state.inviteMessage);

    AxiosConfig.post(`charityproject/invite_user/`, form_data)
      .then(function (response) {
        console.log()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="header_main">
        {this.state.popupSearch ? (
          <div id="popup" className="friends-popup-window">
            <FriendsSearchGrid
              friendsSearchData={this.state.friendsSearchData}
              searchStringType={this.state.searchType}
              searchStringValue={this.state.searchValue}
              searchMore={this.state.searchMoreAvailable}
              searchResultCancelClick={FriendsSearchHelper.searchResultCancelClick.bind(this)}
              searchResultMoreClick={FriendsSearchHelper.searchResultMoreClick.bind(this)}
              searchResultImageClick={FriendsSearchHelper.searchResultImageClick.bind(this)}
            />
          </div>
        ) : (
          <div />
        )}

        <div className="header_step_banner_main">
          <div className="stepper_main">
            <div className="stepper_main_content">
              <ProgressStepper currentStep="2" />
            </div>
          </div>

          <div className="banner_main">
            <div className="banner_main_content">
              <ProjectBanner image={this.state.projectBanner} />
            </div>
          </div>
        </div>

        <div className="page_info_hr_content_main">
          <ProjectInfo id={this.props.match.params.id} />
        </div>

        <div className="page_main">
          <div className="page_info_vr_content_main">
            <ProjectInfo vertical={true} id={this.state.projectId} />
          </div>

          <div className="page_details_main">
            <div className="page_details_content_main">
              <InviteFriends
                showHeaderMessage={true}
                message="1. Build your team by inviting family and friends to your project."
                searchResultHandler={FriendsSearchHelper.searchResultHandler.bind(this)}
                disabled={this.state.popupSearch}
              />
              <br />
              <div>
                <FriendsInvitedGrid
                  friendsInvitedData={[...this.state.selectedFriends.values()]}
                  removeInviteClick={FriendsSearchHelper.removeInviteClick.bind(this)}
                />
              </div>

              <br />
              <div>
                <UnregisteredFriendsInvite
                  message="2. Send invites to unregistered users."
                  unregisteredUser={this.state.unregisteredUser}
                  unregisteredUserIssue={this.state.unregisteredUserIssue}
                  unregisteredUserAddMoreClick={FriendsSearchHelper.unregisteredUserAddMore.bind(this)}
                  unregisteredUserEmailChange={FriendsSearchHelper.unregisteredUserEmailChange.bind(this)}
                  unregisteredUserDeleteClick={FriendsSearchHelper.unregisteredUserDeleteClick.bind(this)}
                  unregisteredUserEmailValidate={FriendsSearchHelper.unregisteredUserEmailValidate.bind(this)}
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
                  handleChange={FriendsSearchHelper.inviteMessageChange.bind(this)}
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
      </div>
    );
  }
}

export default StartProjectStepThree;
