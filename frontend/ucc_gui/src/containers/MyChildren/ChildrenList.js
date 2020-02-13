import React from "react";
import axios from "axios";
import Children from "./Children";


class ChildrenList extends React.Component {
  state = {
    children: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/childaccount/").then(res => {
      this.setState({
        children: res.data
      });
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