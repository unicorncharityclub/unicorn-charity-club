import React from "react";
import Avatar from '@material-ui/core/Avatar';

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);    

    // hard coding this for now 
    this.state = {
      id: this.props.id, 
      projectName : 'Project Tigers',
      projectCategory : 'Project Tigers Category',
      projectTags : ['Project Tigers Tag 1', 'Project Tigers Tag 2'],      
      ProjectImage : 'http://127.0.0.1:8000/static/project_banner/Desert.jpg',
      ProjectMission: '',
      ProjectGoal: '',
      ProjectVideo: ''

    }

 }  
  
  
    componentDidMount () {
    //   const { id } = this.props.match.params
  
    //   fetch(`https://api.twitter.com/user/${id}`)
    //     .then((user) => {
    //       this.setState(() => ({ user }))
    //     })
    }
    render() {
      return(
            <div>
                This is Project Info Component..
                <div> 
                  <Avatar className = "profilepic" src={this.state.ProjectImage}/>
                  <h2>{this.state.projectName}</h2> 
                  <p>Project id :{this.state.id}   </p>
                  <p>{this.state.projectCategory}</p> 
                  <p>{this.state.projectTags}</p>                    
                                               
                </div>
            </div>
        )
    }

  }

export default ProjectInfo;  