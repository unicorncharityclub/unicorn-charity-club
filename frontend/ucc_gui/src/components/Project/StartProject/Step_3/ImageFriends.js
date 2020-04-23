import React from 'react';
import TextBlueSubHeading from "../../../General/Text/TextBlueSubHeading";
import TextBlueHeading from "../../../General/Text/TextBlueHeading";
import TextBlack from "../../../General/Text/TextBlack";
import TextBlackSubHeading from "../../../General/Text/TextBlackSubHeading";
import Search from "@material-ui/icons/Search";
import AlertMessage from "../../../General/AlertMessage";
import Input from "../../../General/Form/Input";
import BlueButton from "../../../General/Form/BlueButton";


class InviteFriends extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                friendName: '',
                friendEmail : '',
                searchStatus : ''
            }
         }

 onFriendNameChange(e) {
    this.setState({ friendName: e.target.value });
    this.setState({ friendEmail: '' });
    this.setState({ searchStatus : ''});
  }

 onFriendEmailChange(e) {
    this.setState({ friendEmail: e.target.value });
    this.setState({ friendName: '' });
    this.setState({ searchStatus : ''});
  }

  onSearchFriends(e){
        if(this.state.friendName)
        {
            this.props.searchResultHandler(["name",this.state.friendName])
        }
        else if(this.state.friendEmail)
        {
            let emailValid = this.state.friendEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              if (emailValid === null) {
                this.setState({ searchStatus : "Invalid Email Id"});
              }
              else
              {
                  this.props.searchResultHandler(["email",this.state.friendEmail])
              }
        }
        else
        {
            this.setState({ searchStatus : "Enter some value to search by"});
        }
  }

    render() {
        return (
            <div >
                {this.props.showHeaderMessage ?
                    (<TextBlueHeading message="BUILD YOUR TEAM"/>)
                    : ('')
                }
                <hr/>
                <div >
                    <TextBlackSubHeading message={this.props.message}/>
                </div>
                <br/>
                <div >
                    <div>
                        <div style={{width:"100%", height:"50px", float:"left", textAlign:"left"}}>
                            <div style={{width:"30%", height:"100%", float:"left", position: "relative"}}>
                                <TextBlack message="Find friends by their name : "
                                           top = "50%"
                                           position = "absolute"
                                           transform = "translateY(-50%)"
                                           right = {5}/>
                            </div>
                            <div className="form-item" style={{float:"left",width:"50%"}}>

                              <Input
                                name="friendName"
                                type="text"
                                id="friend-name"
                                placeholder="Enter Name"
                                value={this.state.friendName}
                                handleChange={this.onFriendNameChange.bind(this)}
                              />
                            </div>
                        </div>

                        <div style={{width:"100%", float:"left", textAlign:"center"}}>
                            <TextBlueSubHeading message="OR"/>
                        </div>

                        <div style={{width:"100%", height:"50px", float:"left", textAlign:"left"}}>
                            <div style={{width:"30%", height:"100%", float:"left", position: "relative"}}>
                                <TextBlack message="Find friends by their email : "
                                        top = "50%"
                                           position = "absolute"
                                           transform = "translateY(-50%)"
                                           right = {5}/>
                            </div>
                            <div className="form-item" style={{float:"left",width:"50%"}}>
                              <Input
                                    name="friendEmail"
                                    type="text"
                                    id="friend-emailid"
                                    placeholder="Enter Email"
                                    value={this.state.friendEmail}
                                    handleChange={this.onFriendEmailChange.bind(this)}
                                />
                            </div>
                        </div>

                    </div>

                    <div style={{height:"25%", width:"100%",  textAlign:"center"}}>

                        <BlueButton
                            startIcon={<Search style={{ fontSize: 30 }}/>}
                            handleOnClick={this.onSearchFriends.bind(this)}
                            disabled={this.props.disabled}
                            title="SEARCH&nbsp;"
                          />
                          <AlertMessage alertMessage={this.state.searchStatus} />
                    </div>
                </div>
            </div>
        );
    }
}


export default InviteFriends;
