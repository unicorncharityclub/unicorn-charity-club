import React from "react";
import { Container } from "@material-ui/core";

class Skeleton extends React.Component {

    render() {
        return(
            <div className="header_main">
                <div className="header_step_banner_main">
                    <div className="banner_main">
                        <div className="banner_main_content" style={{ border: "solid 1px"}}>
                            Banner
                        </div>
                    </div>

                    <div className="stepper_main">
                        <div className="stepper_main_content" style={{border: "solid 1px"}}>
                            Stepper
                        </div>
                    </div>
                </div>

                <div className="page_info_hr_content_main" style={{background:"yellow"}}>
                        Project details <br/>
                </div>

                <div className="page_main">
                    <div className="page_info_vr_content_main" style={{background:"yellow"}}>
                            Project <br/>
                            Details <br/>
                            In <br/>
                            A <br/>
                            Div <br/>
                    </div>
                    <div className="page_details_main">
                        <div className="page_details_content_main">
                            Right <br/>
                            Content <br/>
                            Of <br/>
                            The <br/>
                            Project <br/>
                            As <br/>
                            Per <br/>
                            Page <br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Skeleton;