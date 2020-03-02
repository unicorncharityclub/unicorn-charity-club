import React from 'react';
import TextBlueHeading from "../General/TextBlueHeading";
import TextBlack from "../General/TextBlack";
import TextBlackSubHeading from "../General/TextBlackSubHeading";
import AlertMessage from "../AlertMessage";
import Search from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";


class InviteFriends extends React.Component {


    render() {
        return (
            <div >
                <TextBlueHeading message="BUILD YOUR TEAM"/>
                <TextBlack message="Build your team by inviting family and friends to your project."/>
                <br/>
                <div style={{width:"100%", height:"250px", padding:"10px", borderRadius: "10px", borderStyle:"solid"}}>
                    <div style={{height:"65%"}}>
                        <div style={{width:"48%", float:"left", textAlign:"center"}}>
                            <TextBlackSubHeading message="Find Friends By Their Name"/>
                            <br/>
                            <div className="form-item" align="center">
                              <input
                                name="friend-name"
                                type="text"
                                id="friend-name"
                                placeholder="Enter Name"
                              />
                            </div>
                        </div>

                        <div style={{width:"4%", float:"left"}}>

                            <TextBlueHeading message="&nbsp;&nbsp;"/>
                            <TextBlueHeading message="OR"/>
                            <TextBlueHeading message="&nbsp;&nbsp;"/>
                        </div>
                        <div style={{width:"48%", float:"left", textAlign:"center"}}>
                        <TextBlackSubHeading message="Find Friends By Their Email-Id"/>
                        <br/>
                        <div className="form-item" align="center">
                          <input
                            name="friend-emailid"
                            type="text"
                            id="friend-emailid"
                            placeholder="Enter EmailId"
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
                          >
                            <TextBlueHeading message="Search"/>

                          </Button>
                    </div>

                </div>
            </div>
        );
    }
}


export default InviteFriends;
