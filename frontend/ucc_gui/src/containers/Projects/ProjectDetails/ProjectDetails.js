import React from "react";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";

class ProjectDetails extends React.Component {
    constructor(props) {
        super(props);                   
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
                This is Project Details Page
                {console.log(this.props)}
                <ProjectInfo id={this.props.match.params.id} />
            </div>
        )
    }

  }

export default ProjectDetails;  