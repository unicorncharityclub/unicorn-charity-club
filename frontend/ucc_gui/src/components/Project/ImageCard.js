import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


class ImgMediaCard extends React.Component {

    handleImageClick(value) {
        this.props.onClick(this.props.imageId)
    }

    render() {
        return (
            <Card onClick={this.handleImageClick.bind(this)}>
                <CardActionArea style={{padding: "5px"}} >
                    <CardMedia style={{objectFit: "scale-down"}}
                        component="img"
                        height="250"
                        width="200"
                        image={this.props.imageSrc}
                        alt="Charity Project"
                    />
                </CardActionArea>
            </Card>
        );
    }
}


export default ImgMediaCard;
