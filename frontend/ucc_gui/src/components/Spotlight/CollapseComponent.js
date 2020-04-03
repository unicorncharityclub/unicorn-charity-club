import React from 'react';
import "./Spotlight_Common.css";
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'reactstrap';
import VerticalSpotlightDetails from './VerticalSpotlightDetails';

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