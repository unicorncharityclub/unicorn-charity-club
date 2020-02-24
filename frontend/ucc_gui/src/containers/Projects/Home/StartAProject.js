import React from "react";
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ProjectGrid from "../../../components/Project/Home/ProjectGrid";
import axios from "axios";

class ProjectsHome extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          categoryList : [],
          projectsList : [
              {
                  "project_banner": ""
              }
          ],
          selectedCategory : ""
      }
   }

   componentDidMount(){
        this.fetchListOfProjectCategory(this);
        this.fetchProjectDetails(this);
   }

    fetchListOfProjectCategory(obj) {
        axios.get(`http://127.0.0.1:8000/charityproject/category`)
            .then(function(response) {obj.setCategoryList(response);})
            .catch(function(error) {console.log(error);});
    }

    fetchProjectDetails(obj) {
        axios.get(`http://127.0.0.1:8000/charityproject/all_project_info_list`)
            .then(function(response) {obj.setProjectDetails(response);})
            .catch(function(error) {console.log(error);});
    }

    setCategoryList(response) {
        let categoryList = response.data["category_list"];
        this.setState(prevState => ({
        categoryList: categoryList
      }));
    }

    setProjectDetails(response) {
        this.setState(prevState => ({
            projectsList: response.data["project_list"]
        }));
        console.log(response)
    }


    onCategoryChange(event) {
        this.setState({selectedCategory : event.target.value});
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
          <FormControl variant="outlined" style={{marginLeft: '15%', border: '2px solid black', width : "70%"}}>
              <Select  native style={{height: "50px"}} onChange={this.onCategoryChange.bind(this)} >
              <option value="" />
                {this.state.categoryList.map((projectCategory) => <option key={projectCategory} value={projectCategory}>{projectCategory}</option>)}
            </Select>
          </FormControl>
        </div>

        <div>
            {this.state.projectsList[0].project_banner?
                (<ProjectGrid projectData={this.state.projectsList} category={this.state.selectedCategory} />):(<div/>)}
         </div>
      </div>
    );
  }

}

export default ProjectsHome;