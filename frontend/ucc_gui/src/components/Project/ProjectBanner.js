import React from 'react';
import Image from "react-bootstrap/Image";

class ProjectBanner extends React.Component {

    render() {
        return (
            <div style={{width: "100%", height: "100%"}} >
                <Image src={this.props.image} style={{width: "100%", minHeight: "100%", objectFit:"fill"}}/>
            </div>
        );
    }
}

export default ProjectBanner;
