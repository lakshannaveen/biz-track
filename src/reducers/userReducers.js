import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_REQUEST,
  VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_REQUEST,
} from "../constants/userConstants";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  number: null,
  loading: false,
  data: null,
  msg: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFICATION_REQUEST:
      return {
        ...state,
        loading: false,
        number: action.payload.number,
        msg: action.payload.msg,
        data: action.payload.data,
        token: action.payload.token,
        OTP : action.payload.OTP
      };
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        number: action.payload.number,
        msg: null,
        user: action.payload.user,
      };
    case VERIFICATION_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        token: null,
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        msg: null,
        loading: false,
        data: action.payload.data,
        number: null,
        token: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
        number: null,
        token: null,
        user: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
        number: null,
        loading: false,
        data: null,
        msg: null,
        token: null,
      };
    default:
      return state;
  }
};
