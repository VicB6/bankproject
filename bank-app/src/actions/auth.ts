import { SIGN_IN, BASE_API_URL } from '../utils/constants';
import axios from 'axios';

type userType = {user_name:string;
                    password:string};
type userTypeToken = {userid:string,user_name:string,token:string};

export const signIn = (user:userType) => ({
  type: SIGN_IN,
  user
});

export const initiateLogin = (user_name:string, password:string) => {
  return async (dispatch:typeof signIn) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/signin`, {
        user_name,
        password
      });
      const user = result.data;
      localStorage.setItem('user_token', user.token);
      dispatch(signIn(user));
    } catch (error) {
      console.log('error');
    }
  };
};

export const registerNewUser = (data:userType) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_API_URL}/signup`, data);
      return { success: true };
    } catch (error) {
      console.log('error', error);
      return { success: false };
    }
  };
};