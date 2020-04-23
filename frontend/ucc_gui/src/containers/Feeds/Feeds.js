import React from "react";
import VerticalSpotlightDetails from "../../components/Spotlight/VerticalSpotlightDetails";
import {Container} from "@material-ui/core";
import AxiosConfig from "../../axiosConfig";
import * as cookie from "react-cookies";
import UserStartedProject from "../../components/Feeds/UserStartedProject";
import UserCompletedProject from "../../components/Feeds/UserCompletedProject";
import ProjectInvitation from "../../components/Feeds/ProjectInvitation";
import UserSetGoal from "../../components/Feeds/UserSetGoal";
import FriendJoinedProject from "../../components/Feeds/FriendJoinedProject";


class Feeds extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feedList: []
        }
    }

    componentDidMount() {
        AxiosConfig.get('charityproject/feed', {params: {user_email: cookie.load('user_email')}})
            .then(res => {
                this.setState({
                    feedList: res.data.feed_list
                });
                console.log(res.data.feed_list);
            }).catch(error => console.log(error))
    };


    render() {
        return (
            <div className="feed-content">
                <Container>
                    <VerticalSpotlightDetails isSpotlightPage={false}/>
                    <div>
                        {this.state.feedList.map((item) => (
                            (item.action === 'Received_Invitation') ?
                                <ProjectInvitation profilePic={item.friend_profile_pic}
                                                   friendsName={item.friend_name}
                                                   gender={item.gender}
                                                   time={item.time}
                                                   projectBanner={item.project_banner}
                                                   projectName={item.project_name}
                                                   projectMission={item.project_mission}/>
                                : (item.action === 'Joined_Project') ?
                                <FriendJoinedProject friendsProfilePic={item.friend_profile_pic}
                                                     friendsName={item.friend_name}
                                                     time={item.time}
                                                     projectBadge={item.project_badge}
                                                     projectName={item.project_name}/>
                                : (item.action === 'Started_Project') ?
                                    <UserStartedProject profilePic={item.profile_pic}
                                                        userName={item.user_name}
                                                        time={item.time}
                                                        projectBadge={item.project_badge}
                                                        projectName={item.project_name}/>
                                    : (item.action === 'Completed_Project') ?
                                        <UserCompletedProject profilePic={item.profile_pic}
                                                              userName={item.user_name}
                                                              time={item.time}
                                                              video={item.adventure_experience}
                                                              projectName={item.project_name}/>
                                        : (item.action === 'Goal_Set') ?
                                            <UserSetGoal profilePic={item.profile_pic}
                                                         userName={item.user_name}
                                                         time={item.time}
                                                         goalName={item.goal_name}
                                                         projectName={item.project_name}/> : ''
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Feeds;