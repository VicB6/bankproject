import { SIGN_IN, SIGN_OUT } from '../utils/constants';

function authReducer(state = {}, action:{type:string,user:""}){
  switch (action.type) {
    case SIGN_IN:
      return action.user;
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default authReducer;