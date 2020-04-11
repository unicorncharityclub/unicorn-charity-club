import React from "react";
import AxiosConfig from '../../../axiosConfig'
import Children from "./Children";
import * as cookie from "react-cookies";

class ChildrenList extends React.Component {
  state = {
    children: []
  };

  componentDidMount() {
    AxiosConfig.get(`profile/childrens/${cookie.load('user_email')}`).then(res => {
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