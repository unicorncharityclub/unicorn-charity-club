import React from 'react';
import cookie from "react-cookies";
import axiosConfig from "../../../../axiosConfig";

class Address extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        Project_id: this.props.id,
    }
 }


 componentDidMount () {
        axiosConfig.get(`charityproject/${this.state.Project_id}`)
    }

    render() {
        return (

                <form>
                        <div className="project-form-address">
                              <label>1. Local Organization </label> <br/>
                              <input type="text"
                                    name="Name"
                                     placeholder="Name"
                                    value={this.props.Name}
                                     onChange={this.props.changeHandler}/> <br/><br/>

                              <input type="text"
                                    name="Address"
                                     placeholder="Address"
                                    value={this.props.Address}
                                    onChange={this.props.changeHandler}/> <br/><br/>

                                    <input type="text"
                                           style={{float:"left", width:"60%"}}
                                    name="City"
                                           placeholder="City"
                                    value={this.props.City}
                                    onChange={this.props.changeHandler}/>

                                    <input type="text"
                                           style={{float:"left", width:"18%"}}
                                    name="State_name"
                                    value={this.props.State_name}
                                           placeholder="State"
                                    onChange={this.props.changeHandler}/> <br/><br/>
                                    <br/>

                                    <input type="text"
                                    name="Website"
                                           placeholder="Website"
                                    value={this.props.Website}
                                           onChange={this.props.changeHandler}/> <br/>
                        </div>
                </form>

        );
    }
}


export default Address;
