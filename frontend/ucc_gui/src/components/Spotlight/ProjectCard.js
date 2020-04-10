import React from 'react';
import Image from 'react-bootstrap/Image';
import "../../components/Spotlight/Spotlight_Common.css";


class ProjectCard extends React.Component {

    handleImageClick(value) {
        this.props.onClick(this.props.imageId)
    }

    render() {
        return (            
            <Image className="completedproject" src={this.props.imageSrc} height="100vw" onClick={this.handleImageClick.bind(this)} />
        );
    }
}


export default ProjectCard;
