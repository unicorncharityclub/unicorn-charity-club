/** @import modules
 * 'npm i --save react'
 * 'npm i --save react-router-dom'
 */
/** */
import React, {
  Component
} from "react";
import AxiosConfig from "../../../../axiosConfig";
import VerticalSpotlightDetails from '../../../../components/Spotlight/VerticalSpotlightDetails';
/** @import CSS styles */
class Security_and_Privacy extends React.Component {
  _isMounted = false;
  constructor(props) {
      super(props);
      this.state = {
          TermsTitle: "",
          TermsContent: "",
      };
  }
  componentDidMount() {
      AxiosConfig.get(`misc/privacy/`)
          .then((res) => {
              this.setState({
                  TermsTitle: res.data.title,
                  TermsContent: res.data.content,
              });
          })
          .catch((error) => console.log(error));
  }
  render() {
      switch (this.props.userState) {
          default:
          case "registered":
              return (
              <div className="header_main">
                  <div className="page_main">
                      <VerticalSpotlightDetails isSpotlightPage={ false }/>
                      <div className="page_details_main">
                          <div className="page_details_content_main">
                              <div>
                                  <h1> { this.state.TermsTitle }
                                      </h1>
                                          < br className="br" />
                                          <div dangerouslySetInnerHTML={ { __html: this.state.TermsContent } }>
                                              </div>
                                                  <hr className="horizontal_line" />
                          </div>
                      </div>
                    </div>
                </div>
              </div>
              );
      }
  }
}
export default Security_and_Privacy;
