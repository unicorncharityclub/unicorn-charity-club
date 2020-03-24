 /*
  this method is called when some value is entered in the search option and the search button is pressed
  value[0] - is the search type (Name | Emailid)
  value[1] - is the search value string
  PopupSearch is set to true to show the popup screen
  SearchMoreAvailable is set to true so the 'More' option on the popup screen is enabled
  */
 export const searchResultHandler = function(value) {
    console.log(value);
    this.setState({ SearchType: value[0] });
    this.setState({ SearchValue: value[1] });
    this.setState({ SearchOffset: 0 });
    this.setState({ SearchMoreAvailable: true });
    this.fetchFriendsData(this, value[0], value[1], 0, true);
  };

  /*
  This method os called when from the popup friends screen the cancel button is pressed
  PopupSearch is set to false to close the popup screen
   */
  export const searchResultCancelClick = function()
  {
    this.setState({ PopupSearch: false });
    this.setState({ SearchOffset: 0 });
    this.setState({ SearchMoreAvailable: true });
  };

  /*
  This method is called when from the popup friends screen the more button is pressed
  SearchOffset - is increased by 1 to fetch the next batch of result from the API
   */
  export const searchResultMoreClick = function()
  {
    this.setState({ SearchOffset: this.state.SearchOffset + 1 });
    this.fetchFriendsData(this, this.state.SearchType, this.state.SearchValue, this.state.SearchOffset + 1 , true );
  };


  /*
  When an image is clicked
   1. First check if the email id is existing in the map or not
   2. If the email id is not existing in the map then add the user details in the 'SelectedFriends' list
   3. Close the popup div
   */
  export const searchResultImageClick = function(value)
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
  };

  /*
  The method is used to remove an already selected friend whom we were going to send an invite.
  The value is the email id
   */
  export const removeInviteClick = function(value)
  {
    this.state.SelectedFriends.delete(value);
    // This is just a useless state change just to notify changes in the state
    this.setState({ SearchOffset: 0 });
  };

  // Update the state when the invite message changes
 export const inviteMessageChange = function(e)
  {
    this.setState({ InviteMessage: e.target.value});
  };

  //Method to dynamically add more input text fields on button click
 export const unregisteredUserAddMore = function()
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
  };

  //When the email id on the unregistered user is updated
 export const unregisteredUserEmailChange = function(e, index)
  {
    this.state.UnregisteredUser[index] = {email_address:e.target.value, issue:""};
    this.setState({UnregisteredUser: this.state.UnregisteredUser});
    this.setState({UnregisteredUserIssue:""});
  };

  //When an invite to an unregistered user is deleted
 export const unregisteredUserDeleteClick = function(e, index)
  {
    this.setState({UnregisteredUserIssue:""});
    this.state.UnregisteredUser.splice(index,1);
    this.setState({UnregisteredUser: this.state.UnregisteredUser});
  };

 export const unregisteredUserEmailValidate = function(index)
  {
    const emailaddress = this.state.UnregisteredUser[index]["email_address"];
    if(emailaddress.length>0 && emailaddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)===null)
    {
      this.state.UnregisteredUser[index] = {email_address:emailaddress, issue:"Invalid Email"};
    }
  };