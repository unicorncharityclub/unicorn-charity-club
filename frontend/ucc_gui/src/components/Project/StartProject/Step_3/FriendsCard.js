import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Upload_photo from "../../../../image/Default-profile-picture.png";


class ImgMediaCard extends React.Component {

    searchResultImageClick(value) {
        this.props.searchResultImageClick([this.props.imageSrc, this.props.imageId, this.props.imageName])
    }

    removeInviteClick(value)
    {
        this.props.removeInviteClick(this.props.imageId)
    }

    render() {
        return (
            <Card onClick={this.searchResultImageClick.bind(this)} style={{border:"2px solid"}}>
                <CardActionArea style={{padding: "3px"}} >
                    <CardMedia style={{objectFit: "contain"}}
                        component="img"
                        height="100"
                        image={this.props.imageSrc?this.props.imageSrc:Upload_photo}
                        alt="Charity Project"

                    />
                    <CardContent style={{fontSize: "14px", padding:"0px", textAlign:"center"}}>
                        {this.props.imageName}
                    </CardContent>

                </CardActionArea>
                {this.props.removeInviteClick?(
                <CardActions>
                    <div style={{width:"100%", textAlign:"center"}}>
                    <Button size="small" color="primary" onClick={this.removeInviteClick.bind(this)}>
                      Remove Invite
                    </Button>
                        </div>
                </CardActions>
                    ):(<div/>)}

            </Card>
        );
    }
}


export default ImgMediaCard;
