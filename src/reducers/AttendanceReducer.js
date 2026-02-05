import {
  ATTENDANCE_REQUEST,
  ATTENDANCE_SUCCESS,
  ATTENDANCE_FAIL,
} from "../constants/AttendanceContant";

const initialState = {
  requestBody: null,
  responseBody: [],
  error: null,
  msg: null,
  loading: false,
};

export const GetAttendanceCard = (state = initialState, action) => {
  switch (action.type) {
    case ATTENDANCE_REQUEST:  
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
        msg: null,
      };
    case ATTENDANCE_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        responseBody: [],
      };
    default:
      return state;
  }
};
