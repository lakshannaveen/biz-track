import axios from "axios";

const readAuthKey = () => {
  const raw = localStorage.getItem("token");
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    return parsed || raw;
  } catch (err) {
    return raw;
  }
};

const getBannerImages = async () => {
  return axios.get(`home/GetBannerImgList`).then((response) => {
    return response;
  });
};

const GetAccessHeadComponent = async () => {
  return axios.post(`Access/GetAccessHeadComponent`).then((response) => {
    return response;
  });
};

const GetUserByServiceNo = async () => {
 
  
  return axios.post(`login/GetUserByServiceNo`)
    .then((response) => {

      if (
        response.data &&
        response.data.ResultSet &&
        response.data.ResultSet.length > 0
      ) {
        const serviceNo = response.data.ResultSet[0].ServiceNo;

        localStorage.setItem("ServiceNo", serviceNo);
      }

      return response;
    });
};
const GetToDoList = async () => {
  const authKey = readAuthKey();
  return axios.get(`DailyCollect/GetSupplier`, {
    headers: {
      "auth-key": authKey,
    },
  }).then((response) => {
    return response;
  });
};

const GetDailyCollect = async (params = {}) => {
  const authKey = readAuthKey();
  return axios.get(`DailyCollect/GetDailyCollect`, {
    headers: {
      "auth-key": authKey,
    },
    params,
  }).then((response) => {
    return response;
  });
};

const PostDailyCollect = async (payload) => {
  const authKey = readAuthKey();
  return axios
    .post(`DailyCollect/PostDailyCollect`, payload, {
      headers: {
        "auth-key": authKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    });
};

const UpdateDailyCollect = async (payload) => {
  const authKey = readAuthKey();
  return axios
    .post(`DailyCollect/UpdateDailyCollect`, payload, {
      headers: {
        "auth-key": authKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    });
};

const GetCdllocbaseAttendance = async () => {
  return axios.get("Attendancedashboard/GetCdllocbaseAttendance").then((response) => {
    return response;
  });
};


export default {
  getBannerImages,
  GetAccessHeadComponent,
  GetUserByServiceNo,
  GetToDoList,
  GetDailyCollect,
  PostDailyCollect,
  UpdateDailyCollect,
  GetCdllocbaseAttendance,
};
