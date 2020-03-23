import React from 'react';

const Input = (props) => {
	return (
  <div >
    <input
      className="form-control"
      id={props.name}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      style={{marginTop:"5px", borderRadius:"0", border:"2px solid", width:"100%" }}/>
  </div>
)
}

export default Input;