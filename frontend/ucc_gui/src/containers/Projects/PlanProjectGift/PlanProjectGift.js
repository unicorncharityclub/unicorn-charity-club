import React from "react";
import "./PlanProjectGift.css";
import { Container } from "@material-ui/core";
import ProjectInfo from "../../../components/Project/ProjectDetails/ProjectInfo";
import Button from "react-bootstrap/Button";
import GiftGrid from "../../../components/Project/PlanProjectGift/GiftGrid";


class PlanProjectGift extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
      
        }
     }  

    componentDidMount () {

    }

    render() {
      return(
            <div>  
                <br/>                
                <Container>
                    {/* Here need the component for showing 1-2-3 */}
                    <div>
                        <ProjectInfo id={this.props.match.params.id} />
                    </div>
                    
                    <br/>
                    <div>
                        <h2 className="textHeader">PLAN YOUR PROJECT GIFT</h2>
                        <p className = "insideContent">Reward your Project Team with a secret gift when they complete the Project.</p>
                    </div>
                    <div>
                        {/* Here the Project Gifts.. */}
                        <GiftGrid />
                    </div>
                    <br/>
                    <div className="buttons">
                        <Button className = "backButton" variant="light" size="lg"> BACK </Button>
                        <Button className = "nextButton" variant="success" size="lg"> NEXT </Button>
                    </div>


                </Container>
            </div>
        )
    }
  }

export default PlanProjectGift;