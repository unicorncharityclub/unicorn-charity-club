import React from 'react';
import Search from "@material-ui/icons/Search";
import Input from "../../../General/Form/Input";
import BlueButton from "../../../General/Form/BlueButton";
import TextTheme from "../../../General/Text/TextTheme";


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
                    (<TextTheme message="BUILD YOUR TEAM" className="text_large text_blue" />)
                    : ('')
                }
                <hr/>
                <div >
                    <TextTheme message={this.props.message} className="text_medium text_black" />
                </div>
                <br/>
                <div >
                    <div>
                        <div style={{width:"100%", height:"50px", float:"left", textAlign:"left"}}>
                            <div style={{width:"30%", height:"100%", float:"left", position: "relative"}}>
                                <TextTheme message="Find friends by their name : " className="text_small text_black"
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
                            <TextTheme message="OR" className="text_medium text_blue" />
                        </div>

                        <div style={{width:"100%", height:"50px", float:"left", textAlign:"left"}}>
                            <div style={{width:"30%", height:"100%", float:"left", position: "relative"}}>
                                <TextTheme message="Find friends by their email : " className="text_small text_black"
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
                          <TextTheme message={this.state.searchStatus} />
                    </div>
                </div>
            </div>
        );
    }
}


export default InviteFriends;
