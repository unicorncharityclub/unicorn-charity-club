import React from 'react';
import Button from "@material-ui/core/Button";
import TextTheme from "../Text/TextTheme";

const BlueButton = (props) => {
	return(
	<Button
		size="small"
		variant="outlined"
		component="span"
		startIcon={props.startIcon}
		style= {{textTransform:"None", borderRadius : "20px 20px 20px 20px", backgroundColor:"#2BB9B7", border:"2px solid"}}
		disabled={props.disabled}
		onClick= {props.handleOnClick} >
		<TextTheme message={props.title} className="text_large text_white" />
	</Button>)
};

export default BlueButton;
