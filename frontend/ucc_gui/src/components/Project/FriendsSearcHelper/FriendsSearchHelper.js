 /*
  this method is called when some value is entered in the search option and the search button is pressed
  value[0] - is the search type (Name | Email)
  value[1] - is the search value string
  popupSearch is set to true to show the popup screen
  searchMoreAvailable is set to true so the 'More' option on the popup screen is enabled
  */
 import AxiosConfig from "../../../axiosConfig";

 export const searchResultHandler = function(value) {
    console.log(value);
    this.setState({ searchType: value[0] });
    this.setState({ searchValue: value[1] });
    this.setState({ searchPage: 1 });
    this.setState({ searchMoreAvailable: true });
    this.fetchFriendsData(this, value[0], value[1], 1, true);
  };

  /*
  This method os called when from the popup friends screen the cancel button is pressed
  popupSearch is set to false to close the popup screen
   */
  export const searchResultCancelClick = function()
  {
    this.setState({ popupSearch: false });
    this.setState({ searchPage: 1 });
    this.setState({ searchMoreAvailable: true });
  };

  /*
  This method is called when from the popup friends screen the more button is pressed
  searchPage - is increased by 1 to fetch the next batch of result from the API
   */
  export const searchResultMoreClick = function()
  {
    this.setState({ searchPage: this.state.searchPage + 1 });
    this.fetchFriendsData(this, this.state.searchType, this.state.searchValue, this.state.searchPage + 1 , true );
  };


  /*
  When an image is clicked
   1. First check if the email id is existing in the map or not
   2. If the email id is not existing in the map then add the user details in the 'selectedFriends' list
   3. Close the popup div
   */
  export const searchResultImageClick = function(value)
  {
      const newFriend = {};
      newFriend["user_photo"] = value[0];
      newFriend["user_email"] = value[1];
      newFriend["user_name"] = value[2];

      if(!this.state.selectedFriends.has(newFriend["user_email"]))
      {
        this.state.selectedFriends.set(newFriend["user_email"], newFriend);
      }
      this.setState({ popupSearch: false });
  };

  /*
  The method is used to remove an already selected friend whom we were going to send an invite.
  The value is the email
   */
  export const removeInviteClick = function(value)
  {
    this.state.selectedFriends.delete(value);
    // This is just a useless state change just to notify changes in the state
    this.setState({ searchPage: 1 });
  };

  // Update the state when the invite message changes
 export const inviteMessageChange = function(e)
  {
    this.setState({ inviteMessage: e.target.value});
  };

  //Method to dynamically add more input text fields on button click
 export const unregisteredUserAddMore = function()
  {
    let errorFlag = false;
    for(let i=0;i<this.state.unregisteredUser.length;i++)
    {
      if(this.state.unregisteredUser[i]["email_address"].trim().length===0)
      {
        errorFlag = true;
        break;
      }
    }
    console.log(errorFlag);
    if(errorFlag)
    {
      this.setState({unregisteredUserIssue:"Empty Spaces Available"})
    }
    else
    {
      this.setState({unregisteredUserIssue:""});
      this.setState({unregisteredUser:[...this.state.unregisteredUser, {email_address:"", issue:""}]})
    }
    console.log(this.state.unregisteredUser);
  };

  //When the email id on the unregistered user is updated
 export const unregisteredUserEmailChange = function(e, index)
  {
    this.state.unregisteredUser[index] = {email_address:e.target.value, issue:""};
    this.setState({unregisteredUser: this.state.unregisteredUser});
    this.setState({unregisteredUserIssue:""});
  };

  //When an invite to an unregistered user is deleted
 export const unregisteredUserDeleteClick = function(e, index)
  {
    this.setState({unregisteredUserIssue:""});
    this.state.unregisteredUser.splice(index,1);
    this.setState({unregisteredUser: this.state.unregisteredUser});
  };

 export const unregisteredUserEmailValidate = function(index)
  {
    const emailaddress = this.state.unregisteredUser[index]["email_address"];
    if(emailaddress.length>0 && emailaddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)===null)
    {
      this.state.unregisteredUser[index] = {email_address:emailaddress, issue:"Invalid Email"};
    }
  };

  /*
  This method will actually call the backend API and fetch the friends result based on the search query
   */
  export const fetchFriendsDataHelper = function(obj, searchType, searchValue, page, searchMoreFlag) {
    if(searchType==='email')
    {
      AxiosConfig
      .get(`charityproject/search_friend_email/`,
        {params: {
              email: searchValue,
                page: page
            }})
        .then(function(response)
        {
            if("results" in response.data)
            {
                obj.setState({ popupSearch: true });
                obj.setState({friendsSearchData: response.data["results"]})
            }
            if("next" in response.data)
            {
                if (response.data["next"] == null)
                {
                    obj.setState({ searchMoreAvailable: false });
                }
                else
                {
                    obj.setState({ searchMoreAvailable: true });
                }
            }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    else {
      AxiosConfig
        .get(`charityproject/search_friend_name/`,
            {params: {
                  text: searchValue,
                    page: page
                }})
        .then(function(response) {
            if("results" in response.data)
            {
                obj.setState({ popupSearch: true });
                obj.setState({friendsSearchData: response.data["results"]})
            }
            if("next" in response.data)
            {
                if (response.data["next"] == null)
                {
                    obj.setState({ searchMoreAvailable: false });
                }
                else
                {
                    obj.setState({ searchMoreAvailable: true });
                }
            }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  };