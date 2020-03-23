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

              ]
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
              height: "70%",
              overflowY : "auto",
              overflowX : "hidden",
              top: "20%",
              bottom: "10px",
              background: "#6b6a63",
              left: "50%",
              marginLeft: "-20%",
              zIndex: "100",
              marginTop: "-40px"
            }}
          >
            <FriendsSearchGrid
              friendsSearchData={this.state.FriendsSearchData}
              searchString={
                this.state.SearchType + " : " + this.state.SearchValue
              }
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
                <TextBlack message="SPREAD THE WORD."/>
                <br/>
            </div>

              <div>
                <TextBlack message="1. Create a Personal Video to :"/>
              </div>

              <InviteFriends
                  message="2. Build your team by inviting family and friends to your project."
              searchResultHandler={FriendsSearchHelper.searchResultHandler.bind(this)}
              disabled={this.state.PopupSearch}
            />
            <br/>
            {this.state.SelectedFriends.size > 0 ? (
        <div style={{width:"100%", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
        <FriendsInvitedGrid friendsInvitedData={[...this.state.SelectedFriends.values()]} removeInviteClick={FriendsSearchHelper.removeInviteClick.bind(this)}/>
        </div>):('')}

                      <br/>
        <div style={{width:"100%", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
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
        <div style={{width:"100%", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
            <TextBlackSubHeading message="4. Invitation message to friends."/>
        <TextArea value={this.state.InviteMessage} handleChange={FriendsSearchHelper.inviteMessageChange.bind(this)}/>
        </div>
              <TwoButtonLayout button1Text="SAVE" button2Text="SEND INVITATIONS"
                           button1Click={this.saveButtonClick.bind(this)} button2Click={this.sendInviteButtonClick.bind(this)}/>
                           <AlertMessage alertMessage={this.state.SendInvitationIssue} />
          </div>


        )
    }
}



export default SpreadTheWord;