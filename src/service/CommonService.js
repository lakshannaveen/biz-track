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
  // Hardcoded service number for testing
  const hardcodedServiceNo = "0004086";
  localStorage.setItem("ServiceNo", hardcodedServiceNo);
  
  return axios.post(`login/GetUserByServiceNo`)
    .then((response) => {

      if (
        response.data &&
        response.data.ResultSet &&
        response.data.ResultSet.length > 0
      ) {
        const serviceNo = response.data.ResultSet[0].ServiceNo;

        // save to localStorage
        localStorage.setItem("ServiceNo", serviceNo);
      }

      return response;
    });
};


export default {
  getBannerImages,
  GetAccessHeadComponent,
  GetUserByServiceNo,
};
