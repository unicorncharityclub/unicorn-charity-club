import React from "react";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "../ImageCard";

class ProjectGrid extends React.Component {
  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start"
        >
          {this.props.projectData.map(elem => (
            <Grid item xs={12} sm={6} md={4} key={this.props.projectData.indexOf(elem)}>
              <ImgMediaCard imageSrc={elem.image} id={elem.id} />                          
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default ProjectGrid;
