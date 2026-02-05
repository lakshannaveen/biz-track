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

export default {
  GetAttendanceCard,
};
