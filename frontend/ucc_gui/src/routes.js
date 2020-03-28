import React from "react";
import { Route } from "react-router-dom";

import Account from "./containers/Account/Info/Account.js";
import Login from "./containers/Account/Login/Login";
import Register from "./containers/Account/Register/Register";
import Payment from "./containers/Template/Menu/Payment/Payment";
import Terms_and_Conditions from "./containers/Template/Menu/Terms_and_Conditions/Terms_and_Conditions";
import Security_and_Privacy from "./containers/Template/Menu/Security_and_Privacy/Security_and_Privacy";
import Feeds from "./containers/Feeds/Feeds";
import ChildrenList from "./containers/Account/MyChildren/ChildrenList";
import AddChild from "./containers/Account/MyChildren/AddChild";
import ProjectsHome from "./containers/Projects/Home/ProjectsHome"
import ProjectDetails from "./containers/Projects/Details/ProjectDetails"
import StartProjectStepOne from "./containers/Projects/StartProject/Step_1/StartProjectStepOne";
import StartProjectStepTwo from "./containers/Projects/StartProject/Step_2/StartProjectStepTwo";
import StartProjectStepThree from "./containers/Projects/StartProject/Step_3/StartProjectStepThree";
import ProjectInvitation from "./containers/Projects/ActiveProject/Step_0/ProjectInvitation";
import ActiveProjectChallenge1 from "./containers/Projects/ActiveProject/Step_1/ActiveProjectChallenge1";
import ActiveProjectChallenge2 from "./containers/Projects/ActiveProject/Step_2/ActiveProjectChallenge2"
import LearnNewSkill from "./containers/Projects/ActiveProject/Step_3/LearnNewSkill/LearnNewSkill";
import DevelopNewHabit from "./containers/Projects/ActiveProject/Step_3/DevelopNewHabit/DevelopNewHabit";
import Mobile_toolbar from "./containers/Template/Header/Mobile/Mobile_toolbar";
import VolunteerTime from "./containers/Projects/ActiveProject/Step_3/VolunteerTime/VolunteerTime";
import SpreadTheWord from "./containers/Projects/ActiveProject/Step_3/SpreadTheWord/SpreadTheWord";


class BaseRouter extends React.Component {
    render() {
        switch (this.props.userState) {
        case "registered":
          return (
            <div>
              <Route exact path="/" component={Feeds} />
              <Route exact path="/Account" component={Account} />
              <Route exact path='/Menu/Payment' component={Payment} />
              <Route exact path='/Menu/Terms_and_Conditions' component={Terms_and_Conditions} />
              <Route exact path='/Menu/Security_and_Privacy' component={Security_and_Privacy} />
              <Route exact path='/MyChildrenList' component={ChildrenList} />
              <Route exact path='/Projects/' component={ProjectsHome} />
              <Route exact path='/Projects/:id' component={ProjectDetails} />
              <Route exact path='/Projects/:id/ProjectInvitation/:inviter_email' component={ProjectInvitation} />
              <Route exact path='/Projects/:id/ActiveProjectChallenge1' component={ActiveProjectChallenge1} />
              <Route exact path='/Projects/:id/ActiveProjectChallenge2' component={ActiveProjectChallenge2} />
              <Route exact path='/Projects/:id/LearnNewSkill' component={LearnNewSkill} />
              <Route exact path='/Projects/:id/DevelopNewHabit' component={DevelopNewHabit} />
              <Route exact path='/Projects/:id/VolunteerTime' component={VolunteerTime} />
              <Route exact path='/Projects/:id/StartNewProject' component={StartProjectStepOne} />
              <Route exact path='/Projects/:id/StartProjectStepTwo' component={StartProjectStepTwo} />
              <Route exact path='/Projects/:id/InviteFriends' component={StartProjectStepThree} />              
              <Route exact path='/Projects/:id/SpreadTheWord' component={SpreadTheWord} />
              <Route exact path='/AddChild' component={AddChild}/>
              <Route exact path="/Mobile_toolbar" component={Mobile_toolbar}/>
            </div>
          );
        default:
        case "unregistered":
          return (
            <div>
              <Route exact path="/" render={(props) => <Login {...props} appState={this.props.appState} />}  />
              <Route exact path="/register" component={Register} />
            </div>
          );
      }
    }
}

export default BaseRouter;
