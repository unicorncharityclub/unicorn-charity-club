import React from "react";
import "./StartProjectStepThree.css";
import axiosConfig from "../../../axiosConfig";
import ProjectBanner from "../../../components/Project/ProjectBanner";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import cookie from "react-cookies";
import ProgressStepper from "../../../components/Project/ProgressStepper";
import InviteFriends from "../../../components/InviteFriends/ImageFriends";
import FriendsSearchGrid from "../../../components/Project/ProjectStepThree/FriendsSearchGrid";
import FriendsInvitedGrid from "../../../components/Project/ProjectStepThree/FriendsInvitedGrid";
import UnregisteredFriendsInvite from "../../../components/Project/ProjectStepThree/UnregisteredFriendsInvite";
import TextArea from "../../../components/Form/TextArea";
import TwoButtonLayout from "../../../components/General/TwoButtonLayout";
import AlertMessage from "../../../components/AlertMessage";

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
      SelectedFriends : new Map(),
      InviteMessage : "Hello Friends",
      UnregisteredUser : [{email_address:"", issue:""},{email_address:"", issue:""},{email_address:"", issue:""},{email_address:"", issue:""},{email_address:"", issue:""}],
      UnregisteredUserIssue : "",
      SendInvitationIssue : "",
      FriendsSearchData: [

      ]
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
  this method is called when some value is entered in the search option and the search button is pressed
  value[0] - is the search type (Name | Emailid)
  value[1] - is the search value string
  PopupSearch is set to true to show the popup screen
  SearchMoreAvailable is set to true so the 'More' option on the popup screen is enabled
  */
  searchResultHandler(value) {
    console.log(value)
    this.setState({ SearchType: value[0] });
    this.setState({ SearchValue: value[1] });
    this.setState({ SearchOffset: 0 });
    this.setState({ SearchMoreAvailable: true });
    this.fetchFriendsData(this, value[0], value[1], 0, true);
  }

  /*
  This method os called when from the popup friends screen the cancel button is pressed
  PopupSearch is set to false to close the popup screen
   */
  searchResultCancelClick()
  {
    this.setState({ PopupSearch: false });
    this.setState({ SearchOffset: 0 });
    this.setState({ SearchMoreAvailable: true });
  }

  /*
  This method is called when from the popup friends screen the more button is pressed
  SearchOffset - is increased by 1 to fetch the next batch of result from the API
   */
  searchResultMoreClick()
  {
    this.setState({ SearchOffset: this.state.SearchOffset + 1 });
    this.fetchFriendsData(this, this.state.SearchType, this.state.SearchValue, this.state.SearchOffset + 1 , true );
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

  /*
  When an image is clicked
   1. First check if the email id is existing in the map or not
   2. If the email id is not existing in the map then add the user details in the 'SelectedFriends' list
   3. Close the popup div
   */
  searchResultImageClick(value)
  {
      const newFriend = {};
      newFriend["user_photo"] = value[0];
      newFriend["user_email"] = value[1];
      newFriend["user_name"] = value[2];

      if(!this.state.SelectedFriends.has(newFriend["user_email"]))
      {
        this.state.SelectedFriends.set(newFriend["user_email"], newFriend);
      }
      this.setState({ PopupSearch: false });
  }

  /*
  The method is used to remove an already selected friend whom we were going to send an invite.
  The value is the email id
   */
  removeInviteClick(value)
  {
    this.state.SelectedFriends.delete(value);
    // This is just a useless state change just to notify changes in the state
    this.setState({ SearchOffset: 0 });
  }

  // Update the state when the invite message changes
  inviteMessageChange(e)
  {
    this.setState({ InviteMessage: e.target.value});
  }

  //Method to dynamically add more input text fields on button click
  unregisteredUserAddMore()
  {
    let errorFlag = false;
    for(let i=0;i<this.state.UnregisteredUser.length;i++)
    {
      if(this.state.UnregisteredUser[i]["email_address"].trim().length===0)
      {
        errorFlag = true;
        break;
      }
    }
    console.log(errorFlag);
    if(errorFlag)
    {
      this.setState({UnregisteredUserIssue:"Empty Spaces Available"})
    }
    else
    {
      this.setState({UnregisteredUserIssue:""});
      this.setState({UnregisteredUser:[...this.state.UnregisteredUser, {email_address:"", issue:""}]})
    }
    console.log(this.state.UnregisteredUser);
  }

  //When the email id on the unregistered user is updated
  unregisteredUserEmailChange(e, index)
  {
    this.state.UnregisteredUser[index] = {email_address:e.target.value, issue:""};
    this.setState({UnregisteredUser: this.state.UnregisteredUser});
    this.setState({UnregisteredUserIssue:""});
  }

  //When an invite to an unregistered user is deleted
  unregisteredUserDeleteClick(e, index)
  {
    this.setState({UnregisteredUserIssue:""});
    this.state.UnregisteredUser.splice(index,1);
    this.setState({UnregisteredUser: this.state.UnregisteredUser});
  }

  unregisteredUserEmailValidate(index)
  {
    const emailaddress = this.state.UnregisteredUser[index]["email_address"];
    if(emailaddress.length>0 && emailaddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)===null)
    {
      this.state.UnregisteredUser[index] = {email_address:emailaddress, issue:"Invalid Email Id"};
    }
  }

  saveButtonClick()
  {

  }

  sendInviteButtonClick()
  {
    this.setState({SendInvitationIssue: ""});
    if(this.checkUnregisteredUsersErr()===false && this.checkInvitationMessageErr()===false) {
      this.sendInvitationToRegisteredUsers();
      //this.sendInvitationToUnregisteredUsers();
    }
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


  sendInvitationToUnregisteredUsers() {

  }

  sendInvitationToRegisteredUsers()
  {
    var friendsEmailId = [];
    for (const friends of this.state.SelectedFriends.values()) {
      friendsEmailId.push(friends["user_email"])
    }
    axiosConfig.defaults.withCredentials = true;
    axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
    axiosConfig
      .post(`charityproject/userInvitation`,
          {
            "user_email" : this.state.UserEmailId,
            "project_id" : this.state.ProjectId,
            "invitation_message" : this.state.InviteMessage,
            "friend_list" : friendsEmailId
          })
      .then(function(response) {
        // go to next page
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
              searchResultCancelClick={this.searchResultCancelClick.bind(this)}
              searchResultMoreClick={this.searchResultMoreClick.bind(this)}
              searchResultImageClick={this.searchResultImageClick.bind(this)}
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
          searchResultHandler={this.searchResultHandler.bind(this)}
          disabled={this.state.PopupSearch}
        />
        <br/>
        <div style={{width:"100%", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
        <FriendsInvitedGrid friendsInvitedData={[...this.state.SelectedFriends.values()]} removeInviteClick={this.removeInviteClick.bind(this)}/>
        </div>

        <br/>
        <div style={{width:"100%", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
          <UnregisteredFriendsInvite unregisteredUser={this.state.UnregisteredUser}
                                     unregisteredUserIssue={this.state.UnregisteredUserIssue}
                                     unregisteredUserAddMoreClick={this.unregisteredUserAddMore.bind(this)}
                                     unregisteredUserEmailChange={this.unregisteredUserEmailChange.bind(this)}
                                     unregisteredUserDeleteClick={this.unregisteredUserDeleteClick.bind(this)}
                                     unregisteredUserEmailValidate={this.unregisteredUserEmailValidate.bind(this)}/>
        </div>

        <br/>
        <div style={{width:"100%", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
        <TextArea title = "Invitation Message to Friends" value={this.state.InviteMessage} handleChange={this.inviteMessageChange.bind(this)}/>
        </div>
        <br/>
          <TwoButtonLayout button1Text="SAVE" button2Text="SEND INVITATIONS"
                           button1Click={this.saveButtonClick.bind(this)} button2Click={this.sendInviteButtonClick.bind(this)}/>
                           <AlertMessage alertMessage={this.state.SendInvitationIssue} />
      </div>
    );
  }
}

export default StartProjectStepThree;
