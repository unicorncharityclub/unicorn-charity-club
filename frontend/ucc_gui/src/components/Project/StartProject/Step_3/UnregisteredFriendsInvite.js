import React from "react";
import TextBlackSubHeading from "../../../General/Text/TextBlackSubHeading";
import Input from "../../../General/Form/Input";
import AlertMessage from "../../../../components/General/AlertMessage";
import Add from "@material-ui/icons/Add";
import BlueButton from "../../../General/Form/BlueButton";
import DeleteButton from "../../../General/Form/DeleteButton";

class UnregisteredFriendsInvite extends React.Component {
  render() {
    return (
      <div style={{ width:"100%"}}>
          <hr/>
        <div>
          <TextBlackSubHeading message={this.props.message} />
        </div>
        <table >
            <tbody>
        {this.props.unregisteredUser.map((user, index) => {
          return (
                  <tr key={index}>
                    <td style={{width:"100%"}}>
                      <Input
                          width="100%"
                        placeholder="Email"
                        handleChange={e =>
                          this.props.unregisteredUserEmailChange(e, index)
                        }
                        onBlur={this.props.unregisteredUserEmailValidate(index)}
                        value={user.email_address}
                      />
                    </td>
                    <td>
                      {index > 4 ? (
                          <DeleteButton handleOnClick={e =>this.props.unregisteredUserDeleteClick(e, index)}/>
                      ) : (
                        <div />
                      )}
                    </td>
                    <td>
                      <AlertMessage alertMessage={user.issue} />
                    </td>
                  </tr>
          );
        })}
        </tbody>
              </table>
        <div style={{width:"100%", marginTop: "5px"}}>
          <BlueButton
                startIcon={<Add style={{ fontSize: 30 }}/>}
                handleOnClick={this.props.unregisteredUserAddMoreClick}
                title="ADD MORE&nbsp;"
                disabled={this.props.disabled}
              />
          </div>
          <div style={{marginTop:"5px"}}>
              <AlertMessage alertMessage={this.props.unregisteredUserIssue} />
            </div>


      </div>
    );
  }
}
export default UnregisteredFriendsInvite;
