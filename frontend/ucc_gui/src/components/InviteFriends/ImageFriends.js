import React from 'react';
import TextBlueHeading from "../General/TextBlueHeading";
import TextBlack from "../General/TextBlack";
import TextBlackSubHeading from "../General/TextBlackSubHeading";
import Search from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import AlertMessage from "../AlertMessage";


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
            this.props.onClick(["name",this.state.friendName])
        }
        else if(this.state.friendEmailid)
        {
            let emailValid = this.state.friendEmailid.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              if (emailValid === null) {
                this.setState({ searchStatus : "Invalid Email Id"});
              }
              else
              {
                  this.props.onClick(["emailid",this.state.friendEmailid])
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
                <TextBlack message="Build your team by inviting family and friends to your project."/>
                <br/>
                <div style={{width:"100%", height:"260px", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
                    <div>
                        <div style={{width:"100%", height:"50px", float:"left", textAlign:"left"}}>
                            <div style={{width:"5%",float:"left"}}>
                                &nbsp;
                            </div>
                            <div style={{width:"40%",float:"left"}}>
                                <TextBlackSubHeading message="Find Friends By Their Name : "/>
                            </div>
                            <div className="form-item" style={{float:"left",width:"50%"}}>
                              <input
                                name="friend-name"
                                type="text"
                                id="friend-name"
                                placeholder="Enter Name"
                                style={{width:"100%"}}
                                value={this.state.friendName}
                                onChange={this.onFriendNameChange.bind(this)}
                              />
                            </div>
                        </div>

                        <div style={{width:"100%", float:"left", textAlign:"center"}}>
                            <TextBlueHeading message="OR"/>
                        </div>

                        <div style={{width:"100%", float:"left", textAlign:"left"}}>
                            <div style={{width:"5%",float:"left"}}>
                                &nbsp;
                            </div>
                            <div style={{width:"40%",float:"left"}}>
                                <TextBlackSubHeading message="Find Friends By Their Email-Id : "/>
                            </div>
                            <div className="form-item" style={{float:"left",width:"50%"}}>
                              <input
                            name="friend-emailid"
                            type="text"
                            id="friend-emailid"
                            placeholder="Enter EmailId"
                            style={{width:"100%"}}
                            value={this.state.friendEmailid}
                            onChange={this.onFriendEmailidChange.bind(this)}
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
