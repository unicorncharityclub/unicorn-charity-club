import React from 'react';
import cookie from "react-cookies";
import axiosConfig from "../../../../axiosConfig";

class Address extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        project_id: this.props.id,
    }
 }


 componentDidMount () {
        axiosConfig.get(`charityproject/${this.state.project_id}`)
    }

    render() {
        return (

                <form>
                        <div className="project-form-address">
                              <label>1. Local Organization </label> <br/>
                              <input type="text"
                                    name="name"
                                     placeholder="Name"
                                    value={this.props.name}
                                     onChange={this.props.changeHandler}/> <br/><br/>

                              <input type="text"
                                    name="address"
                                     placeholder="Address"
                                    value={this.props.address}
                                    onChange={this.props.changeHandler}/> <br/><br/>

                                    <input type="text"
                                           style={{float:"left", width:"60%"}}
                                    name="city"
                                           placeholder="City"
                                    value={this.props.city}
                                    onChange={this.props.changeHandler}/>

                                    <input type="text"
                                           style={{float:"left", width:"18%"}}
                                    name="state_name"
                                    value={this.props.state_name}
                                           placeholder="State"
                                    onChange={this.props.changeHandler}/> <br/><br/>
                                    <br/>

                                    <input type="text"
                                    name="website"
                                           placeholder="Website"
                                    value={this.props.website}
                                           onChange={this.props.changeHandler}/> <br/>
                        </div>
                </form>

        );
    }
}


export default Address;
