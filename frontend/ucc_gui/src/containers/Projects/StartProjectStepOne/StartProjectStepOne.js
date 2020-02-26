import React from "react";
import "./StartProjectStepOne.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {Container} from "@material-ui/core";


class StartProjectStepOne extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
          ProjectBadge : '',
          ProjectBanner : '',
          ProjectName : '',
          ProjectCategory : '',
          ProjectVideo : ''
        }
     }  

     onChange(e){
      let files= e.target.files;
      console.warn("data file", files)
     }


    componentDidMount () {

    }

    render() {
      return(
            <div>  

                    <Container>

                  <div>
                    <h2 className="textHeader">Share Your Story</h2>
                    <p> Create a personal video that tells your friends and family about your new project. Be sure to:
                    <ul>
                        <li>Explain why you chose this project.</li>
                        <li>Explain why people should support the project mission.</li>
                        <li>Ask your friends and family to join your project. </li>
                    </ul>
                    </p>
                  </div>

                  <div>
                        <input type="file" name="file" onChange={(e)=>this.onChange(e)}/>
                  </div>

                <br/>
                <br/>
                  <Button className = "backButton" variant="light" size="lg"> BACK </Button>
                  <Button className = "nextButton" variant="success" size="lg"> NEXT </Button>

                </ Container>
            </div>
        )
    }
  }

export default StartProjectStepOne;