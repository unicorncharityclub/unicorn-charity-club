import React from 'react';
import cookie from "react-cookies";
import Input from "../../Form/Input"
import axiosConfig from "../../../../axiosConfig";
import TextBlack from "../../Text/TextBlack";
import "./Address.css"
import TextBlackSubHeading from "../../Text/TextBlackSubHeading";

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
                        <br/>
                              <TextBlackSubHeading message = "1. Local Organization"/> <br/>
                              <Input type="text"
                                    name="name"
                                     placeholder="Name"
                                    value={this.props.name}
                                     handleChange={this.props.changeHandler}/> <br/><br/>

                              <Input type="text"
                                    name="address"
                                     placeholder="Address"
                                    value={this.props.address}
                                    handleChange={this.props.changeHandler}/> <br/><br/>

                                   <div className="Box1">
                                    <Input type="text"
                                           style={{float:"left", width:"60%"}}
                                    name="city"
                                           placeholder="City"
                                    value={this.props.city}
                                    handleChange={this.props.changeHandler}/>
                                   </div>

                                    <div className="Box2">
                                    <Input type="text"
                                           style={{float:"right"}}
                                    name="state_name"
                                    value={this.props.state_name}
                                           placeholder="State"
                                    handleChange={this.props.changeHandler}/> <br/><br/>
                                    </div>

                                    <Input type="text"
                                    name="website"
                                           placeholder="Website"
                                    value={this.props.website}
                                           handleChange={this.props.changeHandler}/> <br/>
                        </div>
                </form>

        );
    }
}


export default Address;
