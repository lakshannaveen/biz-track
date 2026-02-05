import React, { useState, useEffect } from "react";
import "./userProfile.css";
import { useSelector } from "react-redux";
import axios from "axios";

function UserProfile() {
  const { data } = useSelector((state) => state.userbyServiceNo);
  const [hasImage, setHasImage] = useState(false);
  const authKey = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    try {
      const img = new Image();
      img.onload = function () {
        setHasImage(true);
      };
      img.onerror = function () {
        setHasImage(false);
      };
      if (data && data[0] && data[0].ServiceNo) {
        img.src = `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${
          data[0].ServiceNo
        }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "");
      }
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }, [authKey, data]);

  return (
    <div className="full-container">
      <div className="upper-part">
        <div className="profile">Profile</div>
      </div>
      <div className="divider-box">
        <div className="img-box">
          <img
            src={
              hasImage
                ? `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${data[0].ServiceNo}`.replace(
                    /"/g,
                    ""
                  )
                : require("../../assets/images/man.png")
            }
            className="hash"
            alt="User profile"
          />
        </div>
        <div className="us">{data[0].ReportName}</div>
      </div>

      <div className="eight-boxes">
        <div className="b">
          <h2>Designation</h2>
          <p>{data[0].Designation}</p>
        </div>
        <div className="b">
          <h2>Service Number</h2>
          <p>{data[0].ServiceNo}</p>
        </div>
        <div className="row-container">
          <div className="b mobile-card">
            <h2>Mobile Number</h2>
            <p>{data[0].MobileNo}</p>
          </div>
          <div className="b email-card">
            <h2>Email</h2>
            <p>{data[0].Email}</p>
          </div>
        </div>
        <div className="b">
          <h2>Division</h2>
          <p>{data[0].Division}</p>
        </div>
        <div className="b">
          <h2>Department</h2>
          <p>{data[0].Department}</p>
        </div>
        <div className="b">
          <h2>Location</h2>
          <p>{data[0].Location}</p>
        </div>
        <div className="row-container">
          <div className="b recruitment-card">
            <h2>Recruitment Date</h2>
            <p>{data[0].RecruitmentDate}</p>
          </div>
          <div className="b permanent-card">
            <h2>Permanent Date</h2>
            <p>{data[0].PermanantDate}</p>
          </div>
        </div>
        <div className="b">
          <h2>Retirement Date</h2>
          <p>{data[0].RetirementDate}</p>
        </div>
        <div className="b-1">
          <h2 className="report-officer-title">Report Officer</h2>
          <div className="reporting-officer-container">
            <div className="reporting-officer-name">
              <p>{data[0].ReportingOfficerDetails.ReportName}</p>
            </div>
            <div className="reporting-officer-img">
              <img
                src={
                  hasImage
                    ? `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${
                        data[0].ReportingOfficerDetails.ServiceNo
                      }&authKey=${authKey.replace("+", "%2B")}`.replace(
                        /"/g,
                        ""
                      )
                    : require("../../assets/images/man.png")
                }
                alt="Reporting Officer"
                className="reporting-officer-img"
              />
            </div>
          </div>
          <h2>Service No</h2>
          <p>{data[0].ReportingOfficerDetails.ServiceNo}</p>
          <h2>Designation</h2>
          <p>{data[0].ReportingOfficerDetails.Designation}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
