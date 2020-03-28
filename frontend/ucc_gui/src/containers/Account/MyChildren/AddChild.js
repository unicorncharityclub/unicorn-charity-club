import React from "react";
import "../Info/Account.css";
import "./MyChildren.css";
import ProfileForm from "../../../components/Account/ProfileForm";
import axiosConfig from "../../../axiosConfig";
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
      first_name: "",
      last_name: "",
      mobile: "",
      address: "",
      profile_pic: "",
      dob: "",
      gender: "",
      aboutme: "",
      favorite_thing: "",
      dream: "",
      super_powers: "",
      support: "",
      school: "-",
      school_grade: ""
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
      profile_pic: URL.createObjectURL(event.target.files[0]),
      finalImage: event.target.files[0]
    });
  }

  onSaveClicked(event) {
    event.preventDefault();
    let form_data = new FormData();
    try {
      form_data.append("first_name", this.state.first_name);
      form_data.append("last_name", this.state.last_name);
      form_data.append("dob", this.state.dob);
      form_data.append("gender", this.state.gender);
      form_data.append("Address", this.state.address);
      form_data.append("Aboutme", this.state.aboutme);
      form_data.append("FavoriteThing", this.state.favorite_thing);
      form_data.append("Dream", this.state.dream);
      form_data.append("SuperPowers", this.state.super_powers);
      form_data.append("Support", this.state.support);
      form_data.append("School", this.state.school);
      form_data.append("SchoolGrade", this.state.school_grade);
      if (this.state.finalImage)
        form_data.append(
          "ProfilePic",
          this.state.finalImage,
          this.state.finalImage.name
        );
    } catch (err) {
      console.log(err);
    }

    axiosConfig.defaults.withCredentials = true;
    axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
    const user_emailid = cookie.load("user_emailid");
    return axiosConfig
      .post(`myaccount/addchild/${user_emailid}`, form_data, {
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
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          address={this.state.address}
          dob={this.state.dob}
          gender={this.state.gender}
          aboutme={this.state.aboutme}
          favorite_thing={this.state.favorite_thing}
          dream={this.state.dream}
          super_powers={this.state.super_powers}
          support={this.state.support}
          profile_pic={this.state.profile_pic}
          school={this.state.school}
          school_grade={this.state.school_grade}
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
