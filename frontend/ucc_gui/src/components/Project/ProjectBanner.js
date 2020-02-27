import React from 'react';
import Image from "react-bootstrap/Image";

class ProjectBanner extends React.Component {

    render() {
        return (
            <div>
                <Image src={this.props.image} style={{width: "100%", height: "400px"}} fluid />
            </div>
        );
    }
}


export default ProjectBanner;
