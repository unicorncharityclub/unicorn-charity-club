import React from "react";
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ProjectGrid from "../../../components/Project/Home/ProjectGrid";
import axiosConfig from '../../../axiosConfig'
import ActiveProjectInfo from "../../../components/Project/Home/ActiveProjectHomeInfo/ActiveProjectInfo";
import cookie from "react-cookies";


class ProjectsHome extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          categoryList : [],
          projectsList : [
              {
                  "project_banner": "",
                  "project_id": "",
                  "project_category": ""
              }
          ],
          selectedCategory : "",
          activeProjectsList : [],
          UserEmailId: cookie.load('user_emailid')
      }
   }

   componentDidMount(){
        this.fetchListOfProjectCategory(this);
        this.fetchProjectDetails(this);
        this.fetchActiveProjectsList(this);
   }

   fetchActiveProjectsList(obj) {
      const user_emailid = this.state.UserEmailId;      
      axiosConfig.get(`charityproject/activeProjectList/${user_emailid}`)
      .then(function(response) {obj.setActiveProjectsList(response);})
      .catch(function(error) {console.log(error);});
   }

    fetchListOfProjectCategory(obj) {
        axiosConfig.get(`charityproject/category`)
            .then(function(response) {obj.setCategoryList(response);})
            .catch(function(error) {console.log(error);});
    }

    fetchProjectDetails(obj) {
        axiosConfig.get(`charityproject/all_project_info_list`)
            .then(function(response) {obj.setProjectDetails(response);})
            .catch(function(error) {console.log(error);});
    }

    setCategoryList(response) {
        let categoryList = response.data["category_list"];
        this.setState(prevState => ({
        categoryList: categoryList
      }));
      
    }

    setActiveProjectsList (response) {
        let activeProjectsList = response.data["active_project_list"];
        this.setState(prevState => ({
          activeProjectsList: activeProjectsList
      }));

      console.log(this.state.activeProjectsList);
      
    }

    setProjectDetails(response) {
        this.setState(prevState => ({
            projectsList: response.data["project_list"]
        }));
        // console.log(this.state.projectsList)
    }


    onCategoryChange(event) {
        this.setState({selectedCategory : event.target.value});
    }


  render() {
    return (
      <div>
        <div className="blackDivider"></div>
        
        <div className="textHeader">
            Active
        </div>

        <div> 
          {this.state.projectsList[0].project_id?
                  (  <ActiveProjectInfo projectList={this.state.activeProjectsList}/>):(<div/>)}                 
        </div>


        <div className="blackDivider"></div>

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