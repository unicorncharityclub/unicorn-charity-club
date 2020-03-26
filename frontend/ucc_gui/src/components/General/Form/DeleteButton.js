import React from 'react';
import Button from "@material-ui/core/Button";
import TextWhiteHeading from "../Text/TextWhiteHeading";
import Close from "@material-ui/icons/Close";

const DeleteButton = (props) => {
	return(
	<Button

		size="small"
		variant="outlined"
		style= {{borderRadius : "20px 20px 20px 20px", backgroundColor:"#FF0000", border:"2px solid"}}
		onClick= {props.handleOnClick} >
				<Close style={{ fontSize: 20 }}/>
	</Button>
	)
};

export default DeleteButton;
