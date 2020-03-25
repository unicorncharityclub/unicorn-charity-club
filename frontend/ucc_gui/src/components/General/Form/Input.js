import React from 'react';
import "./Form.css"

const Input = (props) => {
	return (
  <div >
    <input
      className="form-control input-main"
      style={{width:props.width}}
      id={props.name}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      />
  </div>
)
};

export default Input;