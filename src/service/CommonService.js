import axios from "axios";

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
  const authKey = JSON.parse(localStorage.getItem("token"));
  return axios.get(`DailyCollect/GetSupplier`, {
    headers: {
      "auth-key": authKey,
    },
  }).then((response) => {
    return response;
  });
};

const GetDailyCollect = async (params = {}) => {
  const authKey = JSON.parse(localStorage.getItem("token"));
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
  const authKey = JSON.parse(localStorage.getItem("token"));
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


const CommonService = {
  getBannerImages,
  GetAccessHeadComponent,
  GetUserByServiceNo,
  GetToDoList,
  GetDailyCollect,
  PostDailyCollect,
};

export default CommonService;
