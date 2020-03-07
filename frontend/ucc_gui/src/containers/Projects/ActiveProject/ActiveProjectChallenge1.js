import React from "react";
import ActiveProjectChallengeInfo from "../../../components/Project/ActiveProjectDetails/ActiveProjectChallengeInfo";
import Button from "react-bootstrap/Button";
import "./ActiveProjectChallenge1.css";

class ActiveProjectChallenge1 extends React.Component {

    render() {
      return(
            <div>
                <p>This is Active Project Challenge 1 Page</p>
                <ActiveProjectChallengeInfo />
                <br/>
                <div>
                    <h2 className="textHeader">PLAN YOUR PROJECT GIFT</h2>
                    <p className="insideContent">
                        PRESENTATION
                        <br/>
                        Prep for Success Exploration Presentation
                    </p>                    
                </div>
                <div className="insideContent">
                    Some Content fetch from backend here...
                </div>
                <div className="buttons">
                    <Button className = "doneButton" variant="light" size="lg">Done</Button>                    
                </div>
            </div>
        )
    }
}

export default ActiveProjectChallenge1;  