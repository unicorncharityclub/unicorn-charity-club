import React from 'react';
import "./Spotlight_Common.css";
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'reactstrap';
import VerticalSpotlightDetails from './VerticalSpotlightDetails';
import AxiosConfig from '../../axiosConfig';

class CollapseComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
      treasure_list : [
        'https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
      ],
      completed_projects : []      
    }

    this.togglePanel = this.togglePanel.bind(this);
  }

  componentDidMount(){
    this.fetchCompletedProjectList(this);    
  }

  fetchCompletedProjectList (obj) {
    const user_email = this.state.user_email;
    AxiosConfig.get(`charityproject/completedProjects/${user_email}`)
    .then(function(response) {obj.setCompletedProjectList(response);})
    .catch(function(error) {console.log(error);});
 }

 setCompletedProjectList (response) {
      let completed_projects = response.data['completed_projects'];      
      this.setState(prevState => ({
        completed_projects : completed_projects
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
                  4
                </td>
                <td>
                  798
                </td>
                <td>
                  122
                </td>
                <td>
                  $829
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

  renderCompletedProject () {
      return (
        <div>
            <Row>
            {            
            this.state.completed_projects && this.state.completed_projects.length > 0?(
              this.state.completed_projects          
              .map((elem, index) => (
                  <Col>
                    <Image className="completedproject" key = {index} src={elem.project_details.badge} />
                  </Col>                  
              )) ):(<span>No Completed Projects available</span>) }                                        
            </Row>
        </div>
      );
  }

  renderTreasureTrove () {
    return (
      <div>
        <br/>                
          <Row>
          {this.state.treasure_list          
          .map((elem, index) => (
                <Col>
                  <Image className="completedproject" key = {index} src={elem} rounded />
                </Col>                  
            ))}                                        
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
          <div onClick={(e)=>this.togglePanel(e)} className="header">
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
              </div>) : <hr className="horizontal"/>}
          
          </div>
        );

    }
  
    }
  }

export default CollapseComponent;