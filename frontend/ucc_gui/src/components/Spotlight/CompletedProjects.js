import React from "react";
import "./Spotlight_Common.css";
import CollapseComponent from "./CollapseComponent";


class CompletedProjects extends React.Component {
  render() {
    return (
        <div>
            <CollapseComponent title = "Completed Projects"/>                      
        </div>
    );
  }
}

export default CompletedProjects;