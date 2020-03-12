import React from 'react';
import TextBlueHeading from "../../General/TextBlueHeading";
import TextBlack from "../../General/TextBlack";
import Checkbox from '@material-ui/core/Checkbox';
class ProjectContent extends React.Component {

    render() {
        return (
            <div style={{borderRadius: "10px", borderStyle:"solid", margin:"10px"}}>
                  <div style={{margin:"10px"}}>
                      <TextBlueHeading message="Challenge 2: Ideation"/>
                      <br/>
                        <TextBlack message = "SET YOUR GOAL"/>
                        <br/>
                        <TextBlack message = "1. How can I make a difference? Explore the following impact adventures and set your project goal."/>
                        <ul style={{paddingLeft:"60px"}}>
                            <br/>
                            <Checkbox name="Option1" value="SpreadWord"/>
                            <label for="Option1"> <TextBlack message = "Spread the word by inviting 5+ friends to the project"/></label><br/>
                            <br/>

                            <Checkbox name="Option2" value="NewSkill"/>
                            <label for="Option2"> <TextBlack message = "Learn a new skill that supports the mission"/></label><br/>
                            <br/>

                            <Checkbox name="Option3" value="NewHabit"/>
                            <label for="Option3"> <TextBlack message = "Develop a new habit that supports the mission"/></label><br/>
                            <br/>

                            <Checkbox name="Option4" value="Volunteer"/>
                            <label for="Option4"> <TextBlack message = "Volunteer time at a local organization"/></label><br/>
                            <br/>

                            <Checkbox name="Option5" value="Donation"/>
                            <label for="Option5"> <TextBlack message = "Give a donation to support the mission"/></label><br/>
                            <br/>

                            <Checkbox name="Option6" value="Fundraise"/>
                            <label for="Option6"> <TextBlack message = "Fundraise money to support the mission"/></label><br/>
                            <br/>

                        </ul>
                        <br/>

                  </div>
            </div>
        );
    }
}


export default ProjectContent;
