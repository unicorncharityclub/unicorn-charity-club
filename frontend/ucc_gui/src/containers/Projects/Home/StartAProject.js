import React from "react";
import { Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class ProjectsHome extends React.Component {
  render() {
    return (
      <div>
        <div className="blackDivider">
        </div>
        <div className="textHeader">
            Start a Project
        </div>

        <div className="marginSpaceTop">
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
      </div>
    );
  }
}

export default ProjectsHome;