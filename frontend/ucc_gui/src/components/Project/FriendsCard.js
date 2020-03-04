import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";


class ImgMediaCard extends React.Component {

    handleImageClick(value) {
        this.props.onClick(this.props.imageId)
    }

    render() {
        return (
            <Card onClick={this.handleImageClick.bind(this)}>
                <CardActionArea style={{padding: "5px"}} >
                    <CardMedia style={{objectFit: "cover"}}
                        component="img"
                        height="120"
                        image={this.props.imageSrc}
                        alt="Charity Project"

                    />
                    <CardContent style={{padding:"2px", textAlign:"center"}}>
                        ABC
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}


export default ImgMediaCard;
