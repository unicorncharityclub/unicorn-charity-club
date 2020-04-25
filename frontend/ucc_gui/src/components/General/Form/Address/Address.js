import React from 'react';
import Input from "../../Form/Input"
import AxiosConfig from "../../../../axiosConfig";
import "./Address.css"
import TextTheme from "../../Text/TextTheme";

class Address extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        projectId: this.props.id,
    }
 }


 componentDidMount () {
        AxiosConfig.get(`charityproject/${this.state.projectId}/`)
    }

    render() {
        return (

                <form>
                        <div className="project-form-address">
                        <TextTheme message="1. Charitable Organization" className="text_medium text_black" /> <br/>
                              <Input type="text"
                                    name="name"
                                     placeholder="Name"
                                    value={this.props.name}
                                     handleChange={this.props.changeHandler}/> <br/>

                              <Input type="text"
                                    name="address"
                                     placeholder="Address"
                                    value={this.props.address}
                                    handleChange={this.props.changeHandler}/> <br/>

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
                                    name="stateName"
                                    value={this.props.stateName}
                                           placeholder="State"
                                    handleChange={this.props.changeHandler}/> <br/>
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
