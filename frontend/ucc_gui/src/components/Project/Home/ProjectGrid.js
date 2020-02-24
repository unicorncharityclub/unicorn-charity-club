import React from "react";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "../ImageCard";

class ProjectGrid extends React.Component {

    projectSelectedHandler(value) {
        window.open('Projects/'+value,"_self");
    }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
<<<<<<< HEAD
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start"
        >
          {this.props.projectData.map(elem => (
            <Grid item xs={12} sm={6} md={4} key={this.props.projectData.indexOf(elem)}>
              <ImgMediaCard imageSrc={elem.image} id={elem.id} />                          
=======
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" style={{paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px"}}>
          {this.props.projectData
              .filter(elem => elem.project_category.startsWith(this.props.category))
              .map(elem => (
            <Grid item xs={12} sm={6} md={6} key={this.props.projectData.indexOf(elem)} >
              <ImgMediaCard imageSrc={elem.project_banner} imageId={elem.project_id} onClick={this.projectSelectedHandler} />
>>>>>>> 6bf23f07f526419855c5804e95e7af7f055e4450
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default ProjectGrid;
