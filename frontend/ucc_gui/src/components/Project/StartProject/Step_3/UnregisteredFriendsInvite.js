import React from "react";

class UnregisteredFriendsInvite extends React.Component {

  render() {
    return (
      <div>
          {
            this.props.unregisteredUser.map((user, index)=>
            {
              return(
                  <div key={index}>
                    <table>
                      <tbody>
                      <tr>
                        <td>
                          <input placeholder="Email Id" onChange={(e)=>this.props.unregisteredUserEmailChange(e, index)} onBlur={this.props.unregisteredUserEmailValidate(index)} value={user.email_address} />
                        </td>
                        <td>
                          {index>4?<button onClick={(e)=>this.props.unregisteredUserDeleteClick(e, index)}>Remove</button>:<div/>}
                        </td>
                        <td>
                          {user.issue}
                        </td>
                      </tr>
                      </tbody>
                    </table>

                  </div>
              )
            })
          }
          <button onClick={this.props.unregisteredUserAddMoreClick}>Add More</button>
          {this.props.unregisteredUserIssue}
      </div>
    );
  }
}
export default UnregisteredFriendsInvite;
