
const initialState = {
  userId: 0,
  token: ""
};

const baseReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        userList: action.userList,
        token: action.token,
        type: 'LOGIN_SUCCESS'
      };
    case 'LOGOUT_SUCCESS':
      return {
        userList: action.userList,
        token: action.token,
        type: 'LOGOUT_SUCCESS'
      };
    default:
      return state;
  }
};

export default baseReducer;