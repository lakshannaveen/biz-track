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


  try {
    const data = await AttendanceService.GetAttendanceCard(month);
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
  } catch (error) {
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
  }
};

export const GetCdlBasedDivison = (mcvDate, hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetCdlBasedDivison(mcvDate, hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          divisionData: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch division data",
        },
      });
    }
  } catch (error) {
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
  }
};

export const GetTraineeBasedTypes = (hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetTraineeBasedTypes(hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          traineeTypes: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch trainee types data",
        },
      });
    }
  } catch (error) {
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
  }
};

export const GetTraineeDivisionAttendance = (mcvDate, hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetTraineeDivisionAttendance(mcvDate, hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          traineeDivision: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch trainee division data",
        },
      });
    }
  } catch (error) {
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
  }
};

export const GetAllAttendance = (mcvDate, hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetAllAttendance(mcvDate, hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          allAttendance: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch all attendance data",
        },
      });
    }
  } catch (error) {
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
  }
};
