import React from "react";
import Grid from "@material-ui/core/Grid";
import FriendsMediaCard from "./FriendsCard";
import TextTheme from "../../../General/Text/TextTheme";


class FriendsInvitedGrid extends React.Component {

    searchResultImageClick(value) {
        //Do Nothing
    }

    removeInviteClick(value) {
        this.props.removeInviteClick(value)
    }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
          <div style={{textAlign:"center"}}>
              <TextTheme message="Invites are being sent to :" className="text_medium text_black" />
        </div>
        {this.props.friendsInvitedData.length > 0 ? (
        <Grid container spacing={2} 
              direction="row" 
              justify="flex-start" 
              alignItems="flex-start"
              style={{paddingLeft: "20px", 
                      paddingRight: "20px", 
                      paddingTop: "20px"}}>
          {this.props.friendsInvitedData.map(elem => (
                   <Grid item xs={4} sm={3} md={3} key={this.props.friendsInvitedData.indexOf(elem)} >
                   <FriendsMediaCard  imageSrc={elem.user_photo} 
                                      imageId={elem.user_email} 
                                      imageName={elem.user_name} 
                                      searchResultImageClick={this.searchResultImageClick.bind(this)} 
                                      removeInviteClick={this.removeInviteClick.bind(this)} />
                    </Grid>
          ))}
        </Grid>
            ) :
            (<div style={{textAlign:"center"}}>
                <TextTheme message=" -- No Friends Selected -- " className="text_medium text_red" />
        </div>)}
      </div>
    );
  }
}

export default FriendsInvitedGrid;
