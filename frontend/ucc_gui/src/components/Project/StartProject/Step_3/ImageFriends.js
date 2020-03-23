import React from 'react';
import TextBlueHeading from "../../../General/Text/TextBlueHeading";
import TextBlack from "../../../General/Text/TextBlack";
import TextBlackSubHeading from "../../../General/Text/TextBlackSubHeading";
import Search from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import AlertMessage from "../../../General/AlertMessage";
import Input from "../../../General/Form/Input";


class InviteFriends extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                friendName: '',
                friendEmailid : '',
                searchStatus : ''
            }
         }

 onFriendNameChange(e) {
    this.setState({ friendName: e.target.value });
    this.setState({ friendEmailid: '' });
    this.setState({ searchStatus : ''});
  }

 onFriendEmailidChange(e) {
    this.setState({ friendEmailid: e.target.value });
    this.setState({ friendName: '' });
    this.setState({ searchStatus : ''});
  }

  onSearchFriends(e){
        if(this.state.friendName)
        {
            this.props.searchResultHandler(["name",this.state.friendName])
        }
        else if(this.state.friendEmailid)
        {
            let emailValid = this.state.friendEmailid.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              if (emailValid === null) {
                this.setState({ searchStatus : "Invalid Email Id"});
              }
              else
              {
                  this.props.searchResultHandler(["emailid",this.state.friendEmailid])
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
                <TextBlueHeading message="BUILD YOUR TEAM"/>
                <TextBlackSubHeading message="Build your team by inviting family and friends to your project."/>
                <br/>
                <div style={{width:"100%", height:"260px", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
                    <div>
                        <div style={{width:"100%", height:"50px", float:"left", textAlign:"left"}}>
                            <div style={{width:"40%", height:"100%", float:"left", position: "relative"}}>
                                <TextBlack message="Find friends by their name : "
                                           top = "50%"
                                           position = "absolute"
                                           transform = "translateY(-50%)"
                                           right = {5}/>
                            </div>
                            <div className="form-item" style={{float:"left",width:"50%"}}>

                              <Input
                                name="friend-name"
                                type="text"
                                id="friend-name"
                                placeholder="Enter Name"
                                value={this.state.friendName}
                                handleChange={this.onFriendNameChange.bind(this)}
                              />
                            </div>
                        </div>

                        <div style={{width:"100%", float:"left", textAlign:"center"}}>
                            <TextBlueHeading message="OR"/>
                        </div>

                        <div style={{width:"100%", height:"50px", float:"left", textAlign:"left"}}>
                            <div style={{width:"40%", height:"100%", float:"left", position: "relative"}}>
                                <TextBlack message="Find friends by their email : "
                                        top = "50%"
                                           position = "absolute"
                                           transform = "translateY(-50%)"
                                           right = {5}/>
                            </div>
                            <div className="form-item" style={{float:"left",width:"50%"}}>
                              <Input
                            name="friend-emailid"
                            type="text"
                            id="friend-emailid"
                            placeholder="Enter Email"
                            value={this.state.friendEmailid}
                            handleChange={this.onFriendEmailidChange.bind(this)}
                          />
                            </div>
                        </div>

                    </div>

                    <div style={{height:"25%", width:"100%",  textAlign:"center"}}>

                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Search />}
                            component="span"
                            style={{textTransform:"None"}}
                            onClick={this.onSearchFriends.bind(this)}
                            disabled={this.props.disabled}
                          >
                            <TextBlueHeading message="Search"/>
                          </Button>
                            <AlertMessage alertMessage={this.state.searchStatus} />
                    </div>
                </div>
            </div>
        );
    }
}


export default InviteFriends;
