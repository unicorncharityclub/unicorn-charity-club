import React from "react";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "../ImageCard";

class GiftGrid extends React.Component {
  
    giftSelectedHandler(value) {        
        this.props.onClick(value);
    }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" style={{paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px"}}>

          {this.props.prizeData          
          .map(elem => (
                   <Grid item xs={6} sm={4} md={4} key={this.props.prizeData.indexOf(elem)} >                     
                   <ImgMediaCard imageSrc={elem.prize_url} imageId={elem.prize_id} onClick={this.giftSelectedHandler.bind(this)}/>
            </Grid>
          ))}          

        </Grid>
      </div>
    );
  }
}

export default GiftGrid;
