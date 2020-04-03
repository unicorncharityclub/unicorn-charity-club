import React from 'react';
import "./Spotlight_Common.css";
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'reactstrap';

class CollapseComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
      completedProjects : [
        'https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
      ]
    }

    this.togglePanel = this.togglePanel.bind(this);
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
            {this.state.completedProjects          
            .map((elem, index) => (
                  <Col>
                    <Image className="completedproject" key = {index} src={elem} />
                  </Col>                  
              ))}                                        
            </Row>
        </div>
      );
  }

  renderTreasureTrove () {
    return (
      <div>
        <br/>                
          <Row>
          {this.state.completedProjects          
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

  renderContentVertical () {
    return (  
      <div>                   
          <div className="center_vertical_content">    
            <p className="statistics">
                4
            </p>
            <p className="statistics_titles">
              Total Projects
            </p>

            <p className="statistics">
              798
            </p>
            <p className="statistics_titles" >
              Total People Reached
            </p>

            <p className="statistics">
              122
            </p>
            <p className="statistics_titles">
              Total Volunteer Hours
            </p>

            <p className="statistics">
              $829
            </p>
            <p className="statistics_titles">
              Total Funds Raised
            </p>
        </div>   
      </div>
      
    );
  }


  render() {
    
    if (this.props.isVertical){      
      return (
        <div className="content_section vertical">

          <div> 
              {/* profile pic details here */}
              <Image className="profile_pic_vertical" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" />
          </div> 

          <div className ="profileDetails_vertical">
            <h3>Name</h3>
            <h6>Age</h6>
            <h6>City, State</h6>
          </div>

          <hr className = "hr_vertical"/>
          <div onClick={(e)=>this.togglePanel(e)} className="header">
              <p>             
                <span className="collapse_title">{this.props.title}</span>
                <span class='icon-down-vertical'>&#709;</span>
              </p>             
          </div>                      
              <div className="content">                    
                { this.renderContentVertical() } 
                <br/>                             
              </div>          
          </div>
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
              </div>) : <hr/>}
          
          </div>
        );

    }
  
    }
  }

export default CollapseComponent;