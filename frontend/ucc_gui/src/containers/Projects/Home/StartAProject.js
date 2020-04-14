import React from "react";
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ProjectGrid from "../../../components/Project/Home/ProjectGrid";
import AxiosConfig from '../../../axiosConfig'
import ActiveProjectInfo from "../../../components/Project/Home/ActiveProjectHomeInfo/ActiveProjectInfo";
import cookie from "react-cookies";
import "./Project.css";
import {Container} from "@material-ui/core";
import VerticalSpotlightDetails from '../../../components/Spotlight/VerticalSpotlightDetails';


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
          plannedProjectsList : [],
          invitationsList : [],
          userEmail: cookie.load('user_email')
      }
   }

   componentDidMount(){
        this.fetchListOfProjectCategory(this);
        this.fetchProjectDetails(this);
        this.fetchActiveProjectsList(this);
        this.fetchPlannedProjectsList(this);
        this.fetchInvitaionsList(this);
   }

   fetchInvitaionsList (obj) {
      const userEmail = this.state.userEmail;
      AxiosConfig.get(`charityproject/invitations/${userEmail}`)
      .then(function(response) {obj.setInvitationsList(response);})
      .catch(function(error) {console.log(error);});
   }

   fetchActiveProjectsList(obj) {
      const userEmail = this.state.userEmail;
      AxiosConfig.get('charityproject/active_project_list/')
      .then(function(response) {obj.setActiveProjectsList(response);})
      .catch(function(error) {console.log(error);});
   }

  fetchPlannedProjectsList(obj) {
        const userEmail = this.state.userEmail;
        AxiosConfig.get('charityproject/planning_project_list/')
        .then(function(response) {obj.setPlannedProjectsList(response);})
        .catch(function(error) {console.log(error);});
    }

    fetchListOfProjectCategory(obj) {
        AxiosConfig.get(`charityproject/category`)
            .then(function(response) {obj.setCategoryList(response);})
            .catch(function(error) {console.log(error);});
    }

    fetchProjectDetails(obj) {
        AxiosConfig.get('charityproject/all_projects/')
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
            let activeProjectsList = response.data;
            this.setState(prevState => ({
              activeProjectsList: activeProjectsList
          }));      
    }

    setPlannedProjectsList (response) {            
        let plannedProjectsList = response.data;
        this.setState(prevState => ({
          plannedProjectsList: plannedProjectsList
      }));      
      //console.log(this.state.plannedProjectsList)
    }

    setInvitationsList (response) {
        let invitationsList = response.data["invited_project_list"];
        this.setState(prevState => ({
          invitationsList: invitationsList
      }));      
    }

    setProjectDetails(response) {
        this.setState(prevState => ({
            projectsList: response.data
        }));        
    }


    onCategoryChange(event) {
        this.setState({selectedCategory : event.target.value});
    }


  render() {
    return (
      <div>
        <Container>
        {/* put here the vertical component for spotlight */}
        <VerticalSpotlightDetails isSpotlightPage = {false}/>

        <div className = "content_section_box">
          <div className="textHeader">
              Invitations
          </div>

          <div>                             
              {this.state.invitationsList && this.state.invitationsList.length > 0?
                (  <ActiveProjectInfo projectList={this.state.invitationsList} listType = {"Invitation"}/>):(<span className = "message">Invitations not available</span>)}
          </div>
          <hr className="horizontal_line"/>
        </div>
        
        <br/>

        {/* <div className="blackDivider"></div> */}
        
        <div className = "content_section_box">
          <div className="textHeader">
              Planning
          </div>

          <div>                     
          {this.state.plannedProjectsList && this.state.plannedProjectsList.length > 0?
                    (  <ActiveProjectInfo projectList={this.state.plannedProjectsList} listType = {"Planning"}/>):(<span className = "message">Projects not available</span>)}
          </div>
          <hr className="horizontal_line"/>
        </div>
        
        <br/>
        {/* <div className="blackDivider"></div> */}
        
        <div className = "content_section_box">
          <div className="textHeader">
              Active
          </div>

          <div> 
            {this.state.activeProjectsList && this.state.activeProjectsList.length > 0?
                    (  <ActiveProjectInfo projectList={this.state.activeProjectsList} listType = {"Active"}/>):(<span className = "message">Projects not available</span>)}
          </div>
          <hr className="horizontal_line"/>
        </div>

        <br/>
        {/* <div className="blackDivider"></div> */}

        <div className = "content_section_box">
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
              {this.state.projectsList[0].banner?
                  (<ProjectGrid projectData={this.state.projectsList} category={this.state.selectedCategory} />):(<div/>)}
          </div>

         </div>
         </Container>      
      </div>
    );
  }

}

export default ProjectsHome;