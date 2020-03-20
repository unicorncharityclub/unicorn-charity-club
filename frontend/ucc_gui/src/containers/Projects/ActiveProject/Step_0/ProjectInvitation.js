import React from "react";
import "./ProjectInvitation.css";
import ProjectInfo from "../../../../components/Project/Details/ProjectInfo";
import Button from 'react-bootstrap/Button';

class ProjectInvitation extends React.Component {
    constructor(props) {
        super(props);    
        
     }

    componentDidMount () {        
        
    }

    render() {
      return(
            <div style={{margin:"35px", marginBottom: "150px"}}> 
                <div className = "insideContent">
                    <h3>DEAR USER NAME,</h3>
                    <p>
                        <b>here need to add the invitation text..</b>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>

                    <div>Here need to fetch project video</div>
                </div>
                <ProjectInfo id={1} />

                <div>
                    <h2 className="textHeader">Project Mission</h2>
                    <p className = "insideContent">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.    
                    </p>
                  </div>

                  <div>
                    <h2 className="textHeader">Project Goal</h2>
                    <p className = "insideContent">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.   
                    </p>
                  </div>

                  <br/>

                    <Button className = "startButton" variant="success" size="lg">
                        JOIN PROJECT
                    </Button>
                  
                  


            </div>
        )
    }
}

export default ProjectInvitation;  