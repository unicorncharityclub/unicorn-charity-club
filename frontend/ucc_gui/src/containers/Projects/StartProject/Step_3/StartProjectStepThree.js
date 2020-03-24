import React from "react";
import "./StartProjectStepThree.css";
import axiosConfig from "../../../../axiosConfig";
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
      ProjectId: this.props.match.params.id,
      ProjectBanner: "",
      ProjectName: "",
      ProjectDateStarted: "Date Started",
      UserEmailId: cookie.load("user_emailid"),
      PopupSearch: false,
      SearchType: "",
      SearchValue: "",
      SearchMoreAvailable: true,
      SearchOffset: 0,
      SelectedFriends: new Map(),
      InviteMessage: "Hello Friends",
      UnregisteredUser: [
        { email_address: "", issue: "" },
        { email_address: "", issue: "" },
        { email_address: "", issue: "" },
        { email_address: "", issue: "" },
        { email_address: "", issue: "" }
      ],
      UnregisteredUserIssue: "",
      SendInvitationIssue: "",
      FriendsSearchData: []
    };
  }
  componentDidMount() {
    const project_id = this.props.match.params.id;
    axiosConfig
      .get(`charityproject/${project_id}`)
      .then(res => {
        this.setState({
          ProjectName: res.data["project_name"],
          ProjectBanner: res.data["project_banner"]
        });
      })
      .catch(error => console.log(error));
  }

  /*
  This method will actually call the backend API and fetch the friends result based on the search query
   */
  fetchFriendsData(obj, searchType, searchValue, offset, searchMoreFlag) {
    if (searchType === "emailid") {
      axiosConfig.defaults.withCredentials = true;
      axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
      axiosConfig
        .post(`charityproject/friendByEmail`, {
          friend_email: searchValue
        })
        .then(function(response) {
          console.log(response.data);
          obj.setState({ PopupSearch: true });
          obj.setState({ FriendsSearchData: response.data["friend_list"] });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axiosConfig.defaults.withCredentials = true;
      axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
      axiosConfig
        .post(`charityproject/search`, {
          text: searchValue,
          offset_value: offset
        })
        .then(function(response) {
          console.log(response.data);
          obj.setState({ PopupSearch: true });
          obj.setState({ FriendsSearchData: response.data["friend_list"] });
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    //Set this accordingly
    this.setState({ SearchMoreAvailable: true });
  }

  saveButtonClick() {}

  sendInviteButtonClick() {
    this.setState({ SendInvitationIssue: "" });
    if (
      this.checkUnregisteredUsersErr() === false &&
      this.checkInvitationMessageErr() === false
    ) {
      this.sendInvitationToRegisteredUsers(this);
    }
  }

  checkInvitationMessageErr() {
    if (this.state.InviteMessage.length === 0) {
      this.setState({
        SendInvitationIssue:
          "Enter an Invitation message to be sent to your invitee's."
      });
      return true;
    }
    return false;
  }

  checkUnregisteredUsersErr() {
    let errorFlag = false;
    for (let i = 0; i < this.state.UnregisteredUser.length; i++) {
      if (this.state.UnregisteredUser[i]["issue"].trim().length !== 0) {
        errorFlag = true;
        this.setState({ UnregisteredUser: this.state.UnregisteredUser });
        this.setState({
          SendInvitationIssue: "Invalid Email of Unregistered User."
        });

        break;
      }
    }
    return errorFlag;
  }

  sendInvitationToUnregisteredUsers() {
    var unregisterEmailId = [];
    for (let i = 0; i < this.state.UnregisteredUser.length; i++) {
      unregisterEmailId.push(
        this.state.UnregisteredUser[i]["email_address"].trim()
      );
    }
    axiosConfig.defaults.withCredentials = true;
    axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
    axiosConfig
      .post(`charityproject/unregisteredInvitation`, {
        user_email: this.state.UserEmailId,
        project_id: this.state.ProjectId,
        invitation_message: this.state.InviteMessage,
        friend_list: unregisterEmailId
      })
      .then(function(response) {
        // go to next page
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  sendInvitationToRegisteredUsers(obj) {
    var friendsEmailId = [];
    for (const friends of this.state.SelectedFriends.values()) {
      friendsEmailId.push(friends["user_email"]);
    }
    axiosConfig.defaults.withCredentials = true;
    axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
    axiosConfig
      .post(`charityproject/userInvitation`, {
        user_email: this.state.UserEmailId,
        project_id: this.state.ProjectId,
        invitation_message: this.state.InviteMessage,
        friend_list: friendsEmailId
      })
      .then(function(response) {
        obj.sendInvitationToUnregisteredUsers();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
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
          <div className="stepper">
            <ProgressStepper currentStep="2" />
          </div>
          <div className="banner">
            <ProjectBanner image={this.state.ProjectBanner} />
          </div>
        </div>
        <ProjectInfo id={this.state.ProjectId} />
        <InviteFriends
            showHeaderMessage={true}
          message="1. Build your team by inviting family and friends to your project."
          searchResultHandler={FriendsSearchHelper.searchResultHandler.bind(this)}
          disabled={this.state.PopupSearch}
        />
        <br />
          <div>
            <FriendsInvitedGrid
              friendsInvitedData={[...this.state.SelectedFriends.values()]}
              removeInviteClick={FriendsSearchHelper.removeInviteClick.bind(this)}
            />
          </div>

        <br />
        <div>
          <UnregisteredFriendsInvite
            message="2. Send invites to unregistered users."
            unregisteredUser={this.state.UnregisteredUser}
            unregisteredUserIssue={this.state.UnregisteredUserIssue}
            unregisteredUserAddMoreClick={FriendsSearchHelper.unregisteredUserAddMore.bind(this)}
            unregisteredUserEmailChange={FriendsSearchHelper.unregisteredUserEmailChange.bind(this)}
            unregisteredUserDeleteClick={FriendsSearchHelper.unregisteredUserDeleteClick.bind(this)}
            unregisteredUserEmailValidate={FriendsSearchHelper.unregisteredUserEmailValidate.bind(this)}
            disabled={this.state.PopupSearch}
          />
        </div>

        <br />
        <hr/>
        <div style={{marginTop : "20px"}}>
            <div style={{textAlign:"center"}}>
              <TextBlackSubHeading message="3. Invitation message to friends." />
            </div>
          <TextArea
            value={this.state.InviteMessage}
            rows = {5}
            handleChange={FriendsSearchHelper.inviteMessageChange.bind(this)}
          />
        </div>
        <br />
        <TwoButtonLayout
          button1Text="SAVE"
          button2Text="SEND INVITATIONS"
          button1Click={this.saveButtonClick.bind(this)}
          button2Click={this.sendInviteButtonClick.bind(this)}
          disabled={this.state.PopupSearch}
        />
        <AlertMessage alertMessage={this.state.SendInvitationIssue} />
      </div>
    );
  }
}

export default StartProjectStepThree;
