import {
  ATTENDANCE_FAIL,
  ATTENDANCE_SUCCESS,
  ATTENDANCE_REQUEST,
} from "../constants/AttendanceContant";

import AttendanceService from "../service/AttendanceService";

export const GetAttendanceCard = (month) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });


  return await AttendanceService.GetAttendanceCard(month).then(
    (data) => {
      //  console.log(data);
      if (data.data.StatusCode === 200) {
        dispatch({
          type: ATTENDANCE_SUCCESS,
          payload: {
            responseBody: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: ATTENDANCE_FAIL,
          payload: {
            msg: "Sorry we could not find result for your search query. Please try again!",
          },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
};
