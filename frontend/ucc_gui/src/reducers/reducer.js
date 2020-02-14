
const initialState = {
  user_id: 0,
  token: ""
};

const baseReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        user_id: action.user_id,
        token: action.token
      };
    default:
      return state;
  }
};

export default baseReducer;