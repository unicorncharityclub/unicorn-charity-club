import React from "react";
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ProjectGrid from "../../../components/Project/Home/ProjectGrid";

class ProjectsHome extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         projects: [
            { id: 1, image: 'http://127.0.0.1:8000/static/project_banner/Desert.jpg'},
            { id: 2, image: 'http://127.0.0.1:8000/static/project_banner/Desert.jpg'},
            { id: 3, image: 'http://127.0.0.1:8000/static/project_banner/Desert.jpg'},
            { id: 4, image: 'http://127.0.0.1:8000/static/project_banner/Desert.jpg'},
         ]
      }
   }


  render() {
    return (
      <div>
        <div className="blackDivider">
        </div>
        <div className="textHeader">
            Start a Project
        </div>

        <div className="marginSpaceTop marginSpaceBottom">
          <FormControl variant="outlined" style={{marginLeft: '15%', border: '2px solid black',
            width : "70%"}}>
            <Select native >
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
        </div>

         <div>
            <h1 id='title'>Charity Projects</h1>
            <ProjectGrid projectData={this.state.projects}/>
         </div>         
       </div>
    );
  }
}

export default ProjectsHome;