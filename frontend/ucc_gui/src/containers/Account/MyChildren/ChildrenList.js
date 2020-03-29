import React from "react";
import axiosConfig from '../../../axiosConfig'
import Children from "./Children";
import * as cookie from "react-cookies";

class ChildrenList extends React.Component {
  state = {
    children: []
  };

  componentDidMount() {
    axiosConfig.get(`myaccount/childrens/${cookie.load('user_email')}`).then(res => {
      this.setState({
        children: res.data['child_list']
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