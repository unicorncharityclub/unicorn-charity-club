import React, { Component } from "react";
import SettingIcon from "../../../../image/settings.png";
import "./Settings.css";
import { connect } from 'react-redux';

class Settings extends Component {

  render() {
    return (
      <div className="header__settings">
        <div className="setting-icon">
          <img src={SettingIcon} alt="settings" />

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
                   <a href="/Logout" className="logout-link">
                        <div className="settings-dropdown__item">Logout</div>
                    </a>
              </div>
        </div>
      </div>
    );
  }
}

export default connect()(Settings);
