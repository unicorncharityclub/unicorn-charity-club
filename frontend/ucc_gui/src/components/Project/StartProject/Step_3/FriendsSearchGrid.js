import React from "react";
import Grid from "@material-ui/core/Grid";
import FriendsMediaCard from "./FriendsCard";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import TextBlackSubHeading from "../../../General/Text/TextBlackSubHeading";
import PinkButton from "../../../General/Form/PinkButton";

class FriendsSearchGrid extends React.Component {

    searchResultImageClick(value) {
        this.props.searchResultImageClick(value);
    }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>

          <div>
              <TextBlackSubHeading message={"Search Result For " + this.props.searchStringType + " : \"" + this.props.searchStringValue + "\""}/>
            </div>
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" style={{paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px"}}>

          {this.props.friendsSearchData
          .map(elem => (
                   <Grid item xs={4} sm={3} md={3} key={this.props.friendsSearchData.indexOf(elem)} >
                   <FriendsMediaCard imageSrc={elem.user_photo} imageId={elem.user_email} imageName={elem.user_name} searchResultImageClick={this.searchResultImageClick.bind(this)} />
            </Grid>
          ))}
        </Grid>
        <div style={{width:"100%", height:"50px", position: "absolute",bottom: "10px", textAlign: "center"}}>

            <PinkButton
                startIcon={<Add />}
                handleOnClick={this.props.searchResultMoreClick}
                disabled={!this.props.searchMore}
                height="35px"
                title="More"
            />
            <PinkButton
                startIcon={<Close />}
                handleOnClick={this.props.searchResultCancelClick}
                height="35px"
                marginLeft="20px"
                title="Cancel"
            />
        </div>
      </div>
    );
  }
}

export default FriendsSearchGrid;
