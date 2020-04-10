import React from "react";
import AxiosConfig from "../../../axiosConfig";
import cookie from "react-cookies";
import {connect} from "react-redux";

class Logout extends React.Component {
constructor(props) {
    super(props);
  }

    componentDidMount() {
    const props = this.props;
      AxiosConfig
      .post(`account/exit/`, this.state)
      .then(function(response) {
          let empty = "";
        cookie.remove('user_email');
        cookie.remove('user_list');
        props.dispatch({ type: "LOGOUT_SUCCESS", userList:empty, token:empty});
      });
    }

  render() {
    return (
                <div style={{ display: "block", paddingTop: "50px", backgroundColor:"white" }}>
                <a href="/">Login Again</a>
</div>
    );
  }
}

export default connect()(Logout);