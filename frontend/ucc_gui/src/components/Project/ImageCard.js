import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});



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
