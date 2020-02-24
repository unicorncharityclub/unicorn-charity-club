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
    render() {
        return (
            <Card >            
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        width="200"
                        image={this.props.imageSrc}
                    />
                </CardActionArea>
                <CardActions style={{backgroundColor:"lightblue"}}>
                    <Button size="small" color="primary">
                        {/*  This link goes to the ProjectDetails page for resp pids  */}                                      
                        {<a href={`/Projects/${this.props.id}`}> Start Project {this.props.id} </a>}  
                        
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default ImgMediaCard;
