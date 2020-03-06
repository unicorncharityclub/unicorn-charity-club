import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";


class ImgMediaCard extends React.Component {

    searchResultImageClick(value) {
        this.props.searchResultImageClick([this.props.imageSrc, this.props.imageId, this.props.imageName])
    }

    render() {
        return (
            <Card onClick={this.searchResultImageClick.bind(this)}>
                <CardActionArea style={{padding: "3px"}} >
                    <CardMedia style={{objectFit: "contain"}}
                        component="img"
                        height="100"
                        image={this.props.imageSrc}
                        alt="Charity Project"

                    />
                    <CardContent style={{fontSize: "12px", padding:"0px", textAlign:"center"}}>
                        {this.props.imageName}
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}


export default ImgMediaCard;
