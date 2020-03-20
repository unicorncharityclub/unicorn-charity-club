import React, { Component } from "react";
import Setting_icon from "../../../../image/settings.png";
import "./Settings.css";
import { connect } from 'react-redux';
import cookie from 'react-cookies'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
      let empty = "";
      cookie.save('user_emailid', empty);
      cookie.save('XSRF-TOKEN', empty);
      cookie.save('user_list', empty);
      this.props.dispatch({ type: "LOGOUT_SUCCESS", user_list:empty, token:empty});
  }
  render() {
    return (
      <div className="header__settings">
        <div className="setting-icon">
          <img src={Setting_icon} alt="settings" />

              <div className="settings-dropdown">
                  <a href="/Account" >
                        <div className="settings-dropdown__item">My&nbsp;Account</div>
                  </a>
                  <a href="/Payment" >
                        <div className="settings-dropdown__item">&nbsp;Payment</div>
                  </a>
                  <a href="/Terms_and_Conditions" >
                        <div className="settings-dropdown__item">Terms&nbsp;&&nbsp;Conditions</div>
                  </a>
                  <a href="/Security_and_Privacy" >
                        <div className="settings-dropdown__item">Security&nbsp;and&nbsp;Privacy</div>
                  </a>
                   <a href="/" onClick={this.logout} className="logout-link">
                        <div className="settings-dropdown__item">Logout</div>
                    </a>
              </div>
        </div>
      </div>
    );
  }
}

export default connect()(Settings);
