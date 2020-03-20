
const initialState = {
  user_id: 0,
  token: ""
};

const baseReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        user_list: action.user_list,
        token: action.token,
        type: 'LOGIN_SUCCESS'
      };
    case 'LOGOUT_SUCCESS':
      return {
        user_list: action.user_list,
        token: action.token,
        type: 'LOGOUT_SUCCESS'
      };
    default:
      return state;
  }
};

export default baseReducer;