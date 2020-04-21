import React from 'react';
import "./Spotlight_Common.css";
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'reactstrap';
import VerticalSpotlightDetails from './VerticalSpotlightDetails';
import AxiosConfig from '../../axiosConfig';
import cookie from "react-cookies";
import ProjectCard from "./ProjectCard";

class CollapseComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,     
      completed_projects : [] ,
      total_projects  : '',
      people_reached  : '',
      volunteer_hours  : '',
      funds_raised  : '',
      user_email : cookie.load('user_email')    
    }

    this.togglePanel = this.togglePanel.bind(this);
  }

  componentDidMount(){
    this.fetchCompletedProjectList(this);  
    this.fetchSpotlightStats(this);  
  }

  fetchCompletedProjectList (obj) {
    const user_email = this.state.user_email;
    AxiosConfig.get('charityproject/completed_project_list/')
    .then(function(response) {obj.setCompletedProjectList(response);})
    .catch(function(error) {console.log(error);});
 }

  setCompletedProjectList (response) {
        let completed_projects = response.data;
        this.setState(prevState => ({
          completed_projects : completed_projects
      }));
  }

  fetchSpotlightStats (obj) {
    const user_email = this.state.user_email;
    AxiosConfig.get(`charityproject/socialImpact/${user_email}/`)
    .then(function(response) {obj.setSpotlightStats(response);})
    .catch(function(error) {console.log(error);});
  }

  setSpotlightStats (response) {    
    let total_projects = response.data['total_projects'];  
    let people_reached = response.data['people_reached'];  
    let volunteer_hours = response.data['volunteer_hours'];  
    let funds_raised = response.data['funds_raised'];
    this.setState(prevState => ({
        total_projects  : total_projects,
        people_reached  : people_reached,
        volunteer_hours  : volunteer_hours,
        funds_raised  : funds_raised
    }));   

  }
 

  togglePanel(e){
    this.setState({open: !this.state.open})
  }

  renderSocialImpactDetails () {
    return (  
      <div>    
        <table>
            <tbody>
            <tr className="statistics">
                <td>
                  {this.state.total_projects}
                </td>
                <td>
                  {this.state.people_reached}
                </td>
                <td>
                  {this.state.volunteer_hours}
                </td>
                <td>
                  ${this.state.funds_raised}
                </td>
              </tr>  
              <tr className="statistics_titles">
                <td>
                  Total Projects
                </td>
                <td>
                  Total People Reached
                </td>
                <td>
                  Total Volunteer Hours
                </td>
                <td>
                  Total Funds Raised
                </td>
              </tr>                            
            </tbody>
          </table>             
        </div>   
    );
  }

  projectSelectedHandler (value) {
      window.open('Projects/'+value+"/Congratulations","_self");
  }

  renderCompletedProject () {
      return (
        <Row>            
            {            
            this.state.completed_projects && this.state.completed_projects.length > 0?(
              this.state.completed_projects          
              .map((elem, index) => (
                  <Col>
                    <ProjectCard className="completedproject" imageSrc={elem.project.badge} imageId={elem.project.id} onClick={this.projectSelectedHandler.bind(this)} />
                    {/* <ProjectCard imageSrc={elem.project_details.badge} imageId={elem.project_details.project_id} onClick={this.projectSelectedHandler.bind(this)} /> */}
                  </Col>                  
              )) ):(<span>No Completed Projects available</span>) }                                                    
        </Row>
      );
  }

  renderTreasureTrove () {
    return (
      <div>
        <br/>            
          <Row>
          {this.state.completed_projects && this.state.completed_projects.length > 0?(
              this.state.completed_projects                    
              .map((elem, index) => (
                    <Col>
                      <Image className="completedproject" key = {index} src={elem.prize_image} rounded />
                    </Col>                  
                )) ):(<span>No Treasure Trove available</span>) }                                        
          </Row>        
      </div>
    );
}

  renderContent (title) {
    if (title === "My Social Impact"){
        return (
          <div>
            {this.renderSocialImpactDetails()} 
          </div>
          );
      }else if (title === "Completed Projects") {
        return (
          <div className="completedProjContainer">
            {this.renderCompletedProject()} 
          </div>          
        );          
      }else{
        return(
          <div>
              {this.renderTreasureTrove()} 
          </div>          
        );                
      }      
  }

  render() {
    
    if (this.props.isVertical){      
      return (
          <VerticalSpotlightDetails isSpotlightPage = {true}/>
        );
    }else if (!this.props.isVertical){
      // horizontal
      console.log(this.props.title)
      return (
        <div className="content_section">
          <div onClick={(e)=>this.togglePanel(e)} className="header_collapse">
              <h3>             
                <span className="collapse_title">{this.props.title}</span>
                <span class='icon-down'>&#709;</span>
              </h3>             
          </div>
          
            {this.state.open ? 
            (
              <div className="content">    
                {/* render inside content */}
                { this.renderContent(this.props.title) } 
                <br/>             
                <hr className="horizontal"/>                         
              </div>) : <hr className="horizontal_close"/>}
          
          </div>
        );

    }
  
    }
  }

export default CollapseComponent;