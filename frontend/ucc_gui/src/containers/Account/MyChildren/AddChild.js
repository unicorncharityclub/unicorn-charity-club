import React from "react";
import "../Info/Account.css";
import "./MyChildren.css";
import ProfileForm from "../../../components/Account/ProfileForm";
import AxiosConfig from "../../../axiosConfig";
import cookie from "react-cookies";

/**
 * @description Creates a form for all details of individual child
 * @class AddChild
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {AddChild}
 * @example <AddChild />
 * pre-condition: all the imports
 * post-condition: returns a form for all details of individual child
 * @param null
 * @returns {AddChild}
 */
class AddChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      profilePic: "",
      dob: "",
      gender: "",
      aboutMe: "",
      favoriteThing: "",
      dream: "",
      superPowers: "",
      support: "",
      school: "-",
      schoolGrade: ""
    };
  }

  onDataChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onCheckboxDataChange(event) {
    // do something here
  }

  onImageChange(event) {
    this.setState({
      profilePic: URL.createObjectURL(event.target.files[0]),
      finalImage: event.target.files[0]
    });
  }

  onSaveClicked(event) {
    event.preventDefault();
    let form_data = new FormData();
    try {
      form_data.append("first_name", this.state.firstName);
      form_data.append("last_name", this.state.lastName);
      form_data.append("dob", this.state.dob);
      form_data.append("gender", this.state.gender);
      form_data.append("address", this.state.address);
      form_data.append("about_me", this.state.aboutMe);
      form_data.append("favorite_thing", this.state.favoriteThing);
      form_data.append("dream", this.state.dream);
      form_data.append("super_powers", this.state.superPowers);
      form_data.append("support", this.state.support);
      form_data.append("school", this.state.school);
      form_data.append("school_grade", this.state.schoolGrade);
      if (this.state.finalImage)
        form_data.append(
          "profile_pic",
          this.state.finalImage,
          this.state.finalImage.name
        );
    } catch (err) {
      console.log(err);
    }

    AxiosConfig.defaults.withCredentials = true;
    AxiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
    const user_email = cookie.load("user_email");
    return AxiosConfig
      .post(`profile/addchild/${user_email}`, form_data, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <ProfileForm
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          address={this.state.address}
          dob={this.state.dob}
          gender={this.state.gender}
          aboutMe={this.state.aboutMe}
          favoriteThing={this.state.favoriteThing}
          dream={this.state.dream}
          superPowers={this.state.superPowers}
          support={this.state.support}
          profilePic={this.state.profilePic}
          school={this.state.school}
          schoolGrade={this.state.schoolGrade}
          onDataChange={this.onDataChange.bind(this)}
          onImageChange={this.onImageChange.bind(this)}
          onSaveClicked={this.onSaveClicked.bind(this)}
          onCheckboxDataChange={this.onCheckboxDataChange.bind(this)}
        />
      </div>
    );
  }
}

export default AddChild;
