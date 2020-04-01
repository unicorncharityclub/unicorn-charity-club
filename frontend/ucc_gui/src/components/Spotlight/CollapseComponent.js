import React from 'react';
import "./Spotlight_Common.css";

class CollapseComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true
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
        <div>This is Completed Projects Component </div>
      );
  }

  renderTreasureTrove () {
    return (
      <div>This is Treasure Trove Component </div>
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
          <div>
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
  return (
      <div>
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
              <hr className="horizontal"/>                         
            </div>) : <hr/>}            
        </div>
      );
    }
  }

export default CollapseComponent;