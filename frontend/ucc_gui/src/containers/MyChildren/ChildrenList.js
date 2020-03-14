import React from "react";
import axiosConfig from '../../axiosConfig'
import Children from "./Children";
import * as cookie from "react-cookies";
import Add_child from "../../site_media/Images/Add_Child.png";


class ChildrenList extends React.Component {
  state = {
    children: []
  };

  componentDidMount() {
    axiosConfig.get(`childaccount/${cookie.load('user_emailid')}`).then(res => {
      this.setState({
        children: res.data['lst']
      });
      console.log(res)
    });
  }

  render() {
    return (
       <div>
        <Children data={this.state.children} />
      </div>
    );
  }
}

export default ChildrenList;