import axios from "axios";

const GetAttendanceCard = async (month) => {
 

  let formData = new FormData();
  formData.append("P_MONTH", month);

  let config = {
    method: "post",
    url: "Attendance/GetAttendanceCard",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const GetCdlBasedDivison = async (mcvDate, hadDate) => {
  return axios.get(`Attendancedashboard/GetCdlBasedDivison`, {
    params: {
      p_mcv_date: mcvDate,
      p_had_date: hadDate
    }
  }).then((response) => {
    return response;
  });
};

const GetTraineeBasedTypes = async (hadDate) => {
  return axios.get(`Attendancedashboard/GetTraineeBasedTypes`, {
    params: {
      p_had_date: hadDate
    }
  }).then((response) => {
    return response;
  });
};

const GetTraineeDivisionAttendance = async (mcvDate, hadDate) => {
  return axios.get(`Attendancedashboard/GetTraineeDivisionAttendance`, {
    params: {
      p_mcv_date: mcvDate,
      p_had_date: hadDate
    }
  }).then((response) => {
    return response;
  });
};

const GetAllAttendance = async (mcvDate, hadDate) => {
  return axios.get(`Attendancedashboard/GetAllAttendance`, {
    params: {
      p_mcv_date: mcvDate,
      p_had_date: hadDate
    }
  }).then((response) => {
    return response;
  });
};

export default {
  GetAttendanceCard,
  GetCdlBasedDivison,
  GetTraineeBasedTypes,
  GetTraineeDivisionAttendance,
  GetAllAttendance,
};
