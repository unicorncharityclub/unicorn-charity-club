import React from "react";
import { NavLink } from "react-router-dom";
import "../../containers/Account/Info/Account.css";
import "../../containers/Account/MyChildren/MyChildren.css";
import Arrow_backward from "./../../image/arrow-backward.png";
import Upload_photo from "./../../image/Default-profile-picture.png";
import CheckBox from "../General/Form/Checkbox";

class ProfileForm extends React.Component {

  render() {
    const checkboxes = [
      "Animals",
      "Art, Culture, Humanities",
      "Health and Wellness",
      "Community Development",
      "Education",
      "Environment",
      "Human and Civil Rights",
      "International Causes",
      "Research and Public Policy"
    ];

    return (
      <div style={{ display: "block" }}>
        <div className="header__wrapper">
          <div className="header__logo">
            <NavLink to={"/"}>
              <img src={Arrow_backward} alt="Backward Arrow" />
            </NavLink>
            <div className="header-menu-mobile" />
          </div>
          <div className="header-title">
            <div className="header-link">
              <label htmlFor="save">Save</label>
              <input
                id="save"
                type="submit"
                form="child-form"
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
        <form id="child-form" onSubmit={this.props.onSaveClicked.bind(this)}>
          <div className="form-wrapper">
            <div className="blessing-form">
              <img
                className="profile-picture"
                src={this.props.profile_pic || Upload_photo}
                alt=""
              />
              <label className="upload-photo" htmlFor="file">
                Upload Photo
              </label>
              <input
                id="file"
                style={{ display: "none" }}
                type="file"
                name="profile_pic"
                accept=".png, .jpeg, .jpg"
                onChange={this.props.onImageChange.bind(this)}
              />
            </div>

            {this.props.email ? (
              <div className="child-form">
                <label>Email:</label>
                <label>{this.props.email}</label>
              </div>
            ) : ''}

            <div className="child-form">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={this.props.first_name}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>

            <div className="child-form">
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={this.props.last_name}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>

            <div className="child-form">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={this.props.address}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>

            <div className="child-form">
              <label>Mobile:</label>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={this.props.mobile}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>

            <div className="child-form">
              <label>Birth Date: </label>
              <input
                type="date"
                name="dob"
                placeholder="12 May 2012"
                value={this.props.dob}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>
            <div className="child-form">
              <label>Gender: </label>
              <div className="radio-inline">
                <input
                  className="radio"
                  id="boy"
                  name="gender"
                  type="radio"
                  value="Male"
                  checked={this.props.gender === "Male"}
                  onChange={this.props.onDataChange.bind(this)}
                />
                <label className="radio__label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="radio-inline">
                <input
                  className="radio"
                  id="girl"
                  name="gender"
                  type="radio"
                  value="Female"
                  checked={this.props.gender === "Female"}
                  onChange={this.props.onDataChange.bind(this)}
                />
                <label className="radio__label" htmlFor="femala">
                  Female
                </label>
              </div>
            </div>

            {this.props.school ? (
              <div>
                <div className="child-form">
                  <label>School:</label>
                  <input
                    type="text"
                    name="school"
                    placeholder="School Name"
                    value={this.props.school}
                    onChange={this.props.onDataChange.bind(this)}
                  />
                </div>
                <div className="child-form" style={{ marginBottom: "20px" }}>
                  <label>School Grade: </label>

                  <select
                    className="child-form-select"
                    name="school_grade"
                    placeholder="Select School Grade"
                    value={this.props.school_grade}
                    onChange={this.props.onDataChange.bind(this)}
                  >
                    <option value="Select School Grade">
                      Select School Grade
                    </option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="child-form">
              <hr className="form-separator" />
            </div>
            <div className="blessing-info">
              <label>About Me:</label>
              <textarea
                type="text"
                name="aboutme"
                placeholder="Tell us what you are..."
                value={this.props.aboutme}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>
            <div className="blessing-info">
              <label>My favorite things are...</label>
              <textarea
                name="favorite_thing"
                placeholder="What do you like to do; eat, listen to, play with, or travel to?"
                value={this.props.favorite_thing}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>
            <div className="blessing-info">
              <label>I have a dream that one day...</label>
              <textarea
                name="dream"
                placeholder="How would you want the world to be different from today?"
                value={this.props.dream}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>
            <div className="blessing-info">
              <label>I have the super power(s) to...</label>
              <textarea
                name="super_powers"
                placeholder="What powers help you make a greatest impact on the world?"
                value={this.props.super_powers}
                onChange={this.props.onDataChange.bind(this)}
              />
            </div>
            <div className="blessing-info">
              {/*<label>I want to make the world a better place by supporting(check all that apply):</label>*/}
              <CheckBox
                name="support"
                title="I want to make the world a better place by supporting(check all that apply):"
                type="checkbox"
                options={checkboxes}
                onChange={this.props.onCheckboxDataChange.bind(this)}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileForm;
