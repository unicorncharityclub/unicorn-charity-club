import React from "react";
import Grid from "@material-ui/core/Grid";
import FriendsMediaCard from "./FriendsCard";
import Search from "@material-ui/icons/Search";
import TextBlueHeading from "../../General/TextBlueHeading";
import Button from "@material-ui/core/Button";

class FriendsSearchGrid extends React.Component {

    searchResultImageClick(value) {
        this.props.searchResultImageClick(value);
    }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        Search Result For {this.props.searchString}
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" style={{paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px"}}>

          {this.props.friendsSearchData
          .map(elem => (
                   <Grid item xs={4} sm={3} md={3} key={this.props.friendsSearchData.indexOf(elem)} >
                   <FriendsMediaCard imageSrc={elem.user_photo} imageId={elem.user_email} imageName={elem.user_name} searchResultImageClick={this.searchResultImageClick.bind(this)} />
            </Grid>
          ))}
        </Grid>
        <div style={{width:"100%", height:"50px"}}>
            <Button
                size="small"
                variant="outlined"
                startIcon={<Search />}
                component="span"
                onClick={this.props.searchResultMoreClick}
                disabled={!this.props.searchMore}
                style={{textTransform:"None", height:"35px"}}
              >
                <TextBlueHeading message="More"/>
              </Button>

            <Button
                size="small"
                variant="outlined"
                startIcon={<Search />}
                component="span"
                onClick={this.props.searchResultCancelClick}
                style={{textTransform:"None", height:"35px"}}
              >
                <TextBlueHeading message="Cancel"/>
              </Button>
        </div>
      </div>
    );
  }
}

export default FriendsSearchGrid;
