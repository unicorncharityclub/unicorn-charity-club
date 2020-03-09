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
import TextArea from "../../../components/Form/TextArea";

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
      SearchType: "Name",
      SearchValue: "abc",
      SearchMoreAvailable: true,
      SearchOffset: 0,
      SelectedEmailIdMap: new Map(),
      SelectedFriends : new Map(),
      InviteMessage : "Hello Friends",
      FriendsSearchData: [
        {
          emailId: "vt@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/1.jpg",
          name: "name1name1 name1name1"
        },
        {
          emailId: "abc@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/green.jpg",
          name: "name2name2 name2name2"
        },
        {
          emailId: "vt1@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/1.jpg",
          name: "name3name3 name3name3"
        },
        {
          emailId: "abc1@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/green.jpg",
          name: "name4name4 name4name4"
        },
        {
          emailId: "vt2@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/1.jpg",
          name: "name5name5 name5name5"
        },
        {
          emailId: "abc2@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/green.jpg",
          name: "name6name6 name6name6"
        },
        {
          emailId: "vt3@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/1.jpg",
          name: "name1name1 name1name1"
        },
        {
          emailId: "abc3@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/green.jpg",
          name: "name2name2 name2name2"
        },
        {
          emailId: "vt4@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/1.jpg",
          name: "name3name3 name3name3"
        },
        {
          emailId: "abc4@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/green.jpg",
          name: "name4name4 name4name4"
        },
        {
          emailId: "vt5@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/1.jpg",
          name: "name5name5 name5name5"
        },
        {
          emailId: "abc5@gmail.com",
          image: "http://127.0.0.1:8000/media/profilePictures/green.jpg",
          name: "name6name6 name6name6"
        }
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
  SearchMoreAvailable is set to tru so the 'More' option on the popup screen is enabled
  */
  searchResultHandler(value) {
    this.setState({ SearchType: value[0] });
    this.setState({ SearchValue: value[1] });
    this.setState({ PopupSearch: true });
    this.setState({ SearchOffset: 0 });
    this.setState({ SearchMoreAvailable: true });
    this.fetchFriendsData();
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
  This method os called when from the popup friends screen the more button is pressed
  SearchOffset - is increased by 1 to fetch the next batch of result from the API
   */
  searchResultMoreClick()
  {
    this.setState({ SearchOffset: this.state.SearchOffset + 1 });
    this.setState({ SearchMoreAvailable: false });
    this.fetchFriendsData();
  }

  /*
  This method will actually call the backend API and fetch the friends result based on the search query
   */
  fetchFriendsData() {
    const searchType = this.state.SearchType;
    const searchValue = this.state.SearchValue;
    const offset = this.state.SearchOffset;
    const searchMoreAvailable = this.state.SearchMoreAvailable;
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
      newFriend["image"] = value[0];
      newFriend["emailId"] = value[1];
      newFriend["name"] = value[2];

      if(!this.state.SelectedFriends.has(newFriend["emailId"]))
      {
        this.state.SelectedFriends.set(newFriend["emailId"], newFriend);
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

  inviteMessageChange(e)
  {
    this.setState({ InviteMessage: e.target.value});
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
          onClick={this.searchResultHandler.bind(this)}
          disabled={this.state.PopupSearch}
        />
        <br/>
        <div style={{width:"100%", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
        <FriendsInvitedGrid friendsInvitedData={[...this.state.SelectedFriends.values()]} removeInviteClick={this.removeInviteClick.bind(this)}/>
        </div>
        <br/>
        <div style={{width:"100%", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
        <TextArea title = "Invitation Message to Friends" value={this.state.InviteMessage} handleChange={this.inviteMessageChange.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default StartProjectStepThree;
