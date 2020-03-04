import React from "react";
import Grid from "@material-ui/core/Grid";
import FriendsMediaCard from "../FriendsCard";
import Search from "@material-ui/icons/Search";
import TextBlueHeading from "../../General/TextBlueHeading";
import Button from "@material-ui/core/Button";

class FriendsSearchGrid extends React.Component {

    projectSelectedHandler(value) {
        //window.open('Projects/'+value,"_self");
    }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
          Search result
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" style={{paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px"}}>

          {this.props.friendsSearchData
          .map(elem => (
                   <Grid item xs={4} sm={3} md={3} key={this.props.friendsSearchData.indexOf(elem)} >
                   <FriendsMediaCard imageSrc={elem.image} imageId={elem.emailId} imageName={elem.name} onClick={this.projectSelectedHandler.bind(this)} />
            </Grid>
          ))}
        </Grid>
        <div style={{backgroundColor:"red", position:"absolute", bottom:"0px", width:"100%", height:"50px"}}>
            Hello
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
    );
  }
}

export default FriendsSearchGrid;
