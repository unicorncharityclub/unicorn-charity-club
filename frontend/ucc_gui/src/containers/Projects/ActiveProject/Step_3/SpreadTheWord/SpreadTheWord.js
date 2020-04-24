import React from "react";
import "../../../../ProjectCommon.css"
import AxiosConfig from "../../../../../axiosConfig";
import ProgressStepper from "../../../../../components/Project/ProgressStepper";
import ProjectBanner from "../../../../../components/Project/ProjectBanner";
import InviteFriends from "../../../../../components/Project/StartProject/Step_3/ImageFriends";
import FriendsInvitedGrid from "../../../../../components/Project/StartProject/Step_3/FriendsInvitedGrid";
import UnregisteredFriendsInvite from "../../../../../components/Project/StartProject/Step_3/UnregisteredFriendsInvite";
import TextArea from "../../../../../components/General/Form/TextArea";
import FriendsSearchGrid from "../../../../../components/Project/StartProject/Step_3/FriendsSearchGrid";
import TwoButtonLayout from "../../../../../components/General/TwoButtonLayout";
import TextTheme from "../../../../../components/General/Text/TextTheme";
import * as FriendsSearchHelper from '../../../../../components/Project/FriendsSearcHelper/FriendsSearchHelper';

import Video from "../../../../../components/General/Video/Video";
import ProjectInfo from "../../../../../components/Project/Details/ProjectInfo";


class SpreadTheWord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            projectName: '',
            projectBanner: '',
            projectBadge: '',
            popupSearch: false,
            searchType: "",
            searchValue: "",
            searchMoreAvailable: true,
            searchPage: 1,
            selectedFriends: new Map(),
            inviteMessage: "Hello Friends",
            unregisteredUser: [{email_address: "", issue: ""}, {email_address: "", issue: ""}, {
                email_address: "",
                issue: ""
            }, {email_address: "", issue: ""}, {email_address: "", issue: ""}],
            unregisteredUserIssue: "",
            sendInvitationIssue: "",
            friendsSearchData: [],
            video: "",
            finalVideo: ""
        }
    }

    componentDidMount() {
        console.log(this.props.id)
        AxiosConfig.get(`charityproject/${this.state.projectId}/`)
            .then(res => {
                this.setState({
                    projectName: res.data.name,
                    projectBanner: res.data.banner,
                    projectBadge: res.data.badge
                });
            }).catch(error => console.log(error))
    }

    videoHandler = (event) => {
        this.setState({
            video: URL.createObjectURL(event.target.files[0]),
            finalVideo: event.target.files[0]
        });
    };

    sendInvitationToUsers(obj) {
        let form_data = new FormData();

        for (const friends of this.state.selectedFriends.values()) {
            form_data.append('registered_user', friends["user_email"])
        }
        for (let i = 0; i < this.state.unregisteredUser.length; i++) {
            form_data.append('unregistered_user', this.state.unregisteredUser[i]["email_address"].trim());
        }
        form_data.append("project_id", this.state.projectId);
        form_data.append("invitation_message", this.state.inviteMessage);

        AxiosConfig.post(`charityproject/spread_the_word/`, form_data)
            .then(function (response) {
                obj.props.history.push('/Projects')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkInvitationMessageErr() {
        if (this.state.video.length === 0) {
            this.setState({sendInvitationIssue: "Please upload a video for your invitees."});
            return true;
        }
        else if (this.state.inviteMessage.length === 0) {
            this.setState({sendInvitationIssue: "Enter an Invitation message to be sent to your invitee's."});
            return true;
        }
        return false;
    }

    checkUnregisteredUsersErr() {
        let errorFlag = false;
        for (let i = 0; i < this.state.unregisteredUser.length; i++) {
            if (this.state.unregisteredUser[i]["issue"].trim().length !== 0) {
                errorFlag = true;
                this.setState({unregisteredUser: this.state.unregisteredUser});
                this.setState({sendInvitationIssue: "Invalid Email Id of Unregistered User."});

                break;
            }
        }
        return errorFlag
    }

    /*
    This method will actually call the backend API and fetch the friends result based on the search query
     */
    fetchFriendsData(obj, searchType, searchValue, page, searchMoreFlag) {
        FriendsSearchHelper.fetchFriendsDataHelper(obj, searchType, searchValue, page, searchMoreFlag);
    }

    // button actions

    sendInviteButtonClick() {
        this.setState({sendInvitationIssue: ""});
        if (this.checkUnregisteredUsersErr() === false && this.checkInvitationMessageErr() === false) {
            this.sendInvitationToUsers(this);
        }
    }

    saveButtonClick() {

    }

    render() {
        return (

            <div className="header_main">

                {this.state.popupSearch ? (
                    <div
                        id="popup"
                        className="friends-popup-window">

                        <FriendsSearchGrid
                            friendsSearchData={this.state.friendsSearchData}
                            searchStringType={this.state.searchType}
                            searchStringValue={this.state.searchValue}
                            searchMore={this.state.searchMoreAvailable}
                            searchResultCancelClick={FriendsSearchHelper.searchResultCancelClick.bind(this)}
                            searchResultMoreClick={FriendsSearchHelper.searchResultMoreClick.bind(this)}
                            searchResultImageClick={FriendsSearchHelper.searchResultImageClick.bind(this)}
                        />
                    </div>
                ) : (
                    <div/>
                )}

                <div className="page_info_hr_content_main">
                    <div className="header_step_banner_main">
                        <div className="banner_main">
                            <div className="banner_main_content">
                                <ProjectBanner image={this.state.projectBanner}/>
                            </div>
                        </div>

                        <div className="stepper_main">
                            <div className="stepper_main_content">
                                <ProgressStepper currentStep="2"/>
                            </div>
                        </div>
                    </div>
                    <ProjectInfo id={this.props.match.params.id}/>
                </div>

                <div className="page_main">
                    <div className="page_info_vr_content_main">
                        <ProjectInfo vertical={true} id={this.props.match.params.id}/>
                    </div>
                    <div className="header_step_banner_main_vr">
                        <div className="banner_main_vr">
                            <div className="banner_main_content">
                                <ProjectBanner image={this.state.projectBanner}/>
                            </div>
                        </div>

                        <div className="stepper_main_vr">
                            <div className="stepper_main_content">
                                <ProgressStepper currentStep="2"/>
                            </div>
                        </div>
                    </div>


                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            <div>
                                <TextTheme message="CHALLENGE 3: Adventure" className="text_large text_blue"/>
                                <br/>
                                <TextTheme message="SPREAD THE WORD" className="text_large text_black"/>
                                <TextTheme
                                    message="Spread the word by inviting your family and friends to join you on your project."
                                    className="text_small text_black"/>
                                <br/>
                            </div>
                            <div>
                                <TextTheme message="1. Create a Personal Video to :"
                                           className="text_medium text_black"/>
                                <table style={{marginTop: "10px"}}>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <ul>
                                                <li><TextTheme message="Explain why you choose this project."
                                                               className="text_small text_black"/></li>
                                                <li><TextTheme message="Explain why people should support the project."
                                                               className="text_small text_black"/></li>
                                                <li><TextTheme
                                                    message="Ask your family and friends to join your project."
                                                    className="text_small text_black"/></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                <Video src={this.state.video}
                                       id="file" style={{display: 'none'}}
                                       type="file"
                                       name="video"
                                       accept="video/*"
                                       width="100%"
                                       onChange={this.videoHandler.bind(this)}/>
                            </div>

                            <InviteFriends
                                message="2. Invite family and friends to join the project."
                                searchResultHandler={FriendsSearchHelper.searchResultHandler.bind(this)}
                                disabled={this.state.popupSearch}
                            />
                            <br/>
                            <FriendsInvitedGrid
                                friendsInvitedData={[...this.state.selectedFriends.values()]}
                                removeInviteClick={FriendsSearchHelper.removeInviteClick.bind(this)}/>
                            <br/>
                            <div>

                                <UnregisteredFriendsInvite
                                    message="3. Send invites to unregistered users."
                                    unregisteredUser={this.state.unregisteredUser}
                                    unregisteredUserIssue={this.state.unregisteredUserIssue}
                                    unregisteredUserAddMoreClick={FriendsSearchHelper.unregisteredUserAddMore.bind(this)}
                                    unregisteredUserEmailChange={FriendsSearchHelper.unregisteredUserEmailChange.bind(this)}
                                    unregisteredUserDeleteClick={FriendsSearchHelper.unregisteredUserDeleteClick.bind(this)}
                                    unregisteredUserEmailValidate={FriendsSearchHelper.unregisteredUserEmailValidate.bind(this)}/>
                            </div>
                            <br/>
                            <div>
                                <div>
                                    <TextTheme message="4. Invitation message to friends."
                                               className="text_medium text_black"/>
                                </div>
                                <TextArea
                                    value={this.state.inviteMessage}
                                    rows={5}
                                    handleChange={FriendsSearchHelper.inviteMessageChange.bind(this)}/>
                            </div>

                            <TwoButtonLayout button1Text="SAVE" button2Text="COMPLETE PROJECT"
                                             button1Click={this.saveButtonClick.bind(this)}
                                             button2Click={this.sendInviteButtonClick.bind(this)}/>
                            <TextTheme message={this.state.sendInvitationIssue} className="text_medium text_red"/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SpreadTheWord;
