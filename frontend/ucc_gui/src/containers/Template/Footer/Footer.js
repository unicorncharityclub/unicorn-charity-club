import React from "react";
import { Container, Table, TableBody, TableHead } from "@material-ui/core";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (   
      <div className="main_container">      
          <div className="footer_container"> 
            <div>
                <a href="">Column 1</a> 
                <a href="">Lorem ipum dolor</a>
                <a href="">Telus ante nesr</a> 
                <a href="">Dignestim elit imperdiet</a> 
            </div>
            <div>
                <a href="">Column 2</a> 
                <a href="">Lorem ipum dolor</a>
                <a href="">Telus ante nesr</a> 
                <a href="">Dignestim elit imperdiet</a> 
            </div>
            <div>
                <a href="">Column 3</a> 
                <a href="">Lorem ipum dolor</a>
                <a href="">Telus ante nesr</a> 
                <a href="">Dignestim elit imperdiet</a> 
            </div>                        
          </div>
          
          
          <div className="allrights">
            <p>
              ALL RIGHTS RESERVED. 
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>
        </div>                 
    );
  }
}

export default Footer;