import React from 'react';


const TextArea = (props) => (
  <div className="form-group">
      {props.title?
          (<label className="form-label textarea-main">{props.title}</label>)
          :
          ('')}
    <textarea
      className="form-control textarea-main"
      name={props.name}
      rows={props.rows}
      cols = {props.cols}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} />
  </div>
);

export default TextArea;