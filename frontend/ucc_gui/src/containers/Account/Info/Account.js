import React from "react";
import cookie from 'react-cookies'
import AxiosConfig from '../../../axiosConfig'

/** @import CSS styles */
import "./Account.css";
import ProfileForm from "../../../components/Account/ProfileForm";

/**
 * @description Creates the My Account page for the user
 * @class Account
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {Account}
 * @example <Account />
 * pre-condition: all the imports
 * post-condition: returns the Account page
 * @param null
 * @returns {Account}
 */


class Account extends React.Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        mobile: '',
        address: '',
        profilePic: '',
        dob: '',
        gender: '',
        aboutMe: '',
        favoriteThing: '',
        dream: '',
        superPowers: '',
        support: '',
        school: '',
        schoolGrade: '',
    };

    componentDidMount() {
        const user_email = cookie.load('user_email');
        AxiosConfig.get(`profile/${user_email}`)
            .then(res => {
                    this.setState({
                        email: res.data.email,
                        firstName: res.data.first_name,
                        lastName: res.data.last_name,
                        mobile: res.data.mobile,
                        address: res.data.address,
                        profilePic: res.data.profile_pic,
                        dob: res.data.dob,
                        gender: res.data.gender,
                        aboutMe: res.data.aboutme,
                        favoriteThing: res.data.favorite_thing,
                        dream: res.data.dream,
                        superPowers: res.data.super_powers,
                        support: res.data.support,
                    }
                    );

                    if ('school' in res.data)
                    {
                        this.setState({
                            school: res.data.school,
                            schoolGrade: res.data.school_grade,
                        });
                    }
            }).catch(error => console.log(error))
    }

    onDataChange(event){
        this.setState({ [event.target.name]: event.target.value });
     }

     onCheckboxDataChange(event){
        // do something here
     }

    onImageChange(event){
    this.setState({
        profilePic: URL.createObjectURL(event.target.files[0]),
        finalImage: event.target.files[0]
    });
    }

    onSaveClicked(event) {
        event.preventDefault();
        let form_data = new FormData();
        try {
            form_data.append("email", this.state.email);
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
        }
        catch (err) {
          console.log(err);
        }

        AxiosConfig.defaults.withCredentials = true;
        AxiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        return AxiosConfig.put(`profile/${this.state.email}`, form_data,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => console.log(res))
            .catch(error => console.log(error));
  }

  render() {
    return (
            <div style={{ display: "block" }}>

                <ProfileForm
                     email={this.state.email}
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
              {/* form ends here */}
            </div>
    );
  }
}

export default Account;
