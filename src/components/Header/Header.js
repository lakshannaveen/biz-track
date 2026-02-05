// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Divider,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { logOut } from "../../action/Login";

// const Header = ({ title }) => {
//   const { data } = useSelector((state) => state.userbyServiceNo);
//   const [hasImage, setHasImage] = useState(false);
//   const authKey = JSON.parse(localStorage.getItem("token"));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [inTime, setInTime] = useState(""); // State to hold In Time
//   let navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch In Time from API
//     const fetchInTime = async () => {
//       const currentDate = new Date();
//       const month = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
//         .toString()
//         .padStart(2, "0")}`;

//       try {
//         const response = await axios.get(
//           `Attendance/GetAttendanceCard?P_MONTH=${month}`
//         );

//         if (response.data.StatusCode === 200) {
//           const resultSet = response.data.ResultSet;
//           const today = currentDate.toLocaleDateString(); // Format to match API response

//           // Find today's attendance record
//           const todayRecord = resultSet.find((record) => {
//             const recordDate = new Date(record.Date).toLocaleDateString();
//             return recordDate === today;
//           });

//           // Set In Time if it exists
//           if (todayRecord) {
//             setInTime(todayRecord.InTime || "Unvailable"); // Default message if InTime is empty
//           } else {
//             setInTime("Unvailable"); // Default message if no record found
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching In Time:", error);
//       }
//     };

//     fetchInTime();

//     // Image loading logic remains unchanged
//     try {
//       const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//       if (metaThemeColor) {
//         metaThemeColor.setAttribute("content", "#004AAD");
//       }
//       const img = new Image();
//       img.onload = function () {
//         setHasImage(true);
//       };
//       img.onerror = function () {
//         setHasImage(false);
//       };
//       if (data && data[0] && data[0].ServiceNo) {
//         img.src = `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${
//           data[0].ServiceNo
//         }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "");
//       }
//     } catch (error) {
//       console.error("Error loading image:", error);
//     }
//   }, [navigate, dispatch, authKey, data]);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logOut(navigate));
//   };

//   const handleProfile = () => {
//     handleClose();
//     navigate("/userprofile");
//   };

//   const greet = () => {
//     var d = new Date();
//     var time = d.getHours();

//     if (time < 12) {
//       return "Good Morning...";
//     } else if (time >= 12 && time <= 16) {
//       return "Good Afternoon...";
//     } else {
//       return "Good Evening...";
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         display: "flex",
//         justifyContent: "space-between",
//         padding: 1,
//         top: 0,
//         zIndex: 999,
//       }}
//     >
//       <Box sx={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ maxWidth: "400px" }}>
//           <img
//             width={"60%"}
//             src={require("../../assets/icons/a.png")}
//             alt="First slide"
//           />
//         </div>
//         <Typography fontSize={12} fontWeight={550}>
//           {greet()}
//         </Typography>
//       </Box>
//       <Box sx={{ alignItems: "center" }}>
//         <IconButton onClick={handleMenu}>
//           <Avatar
//             variant="rounded"
//             src={
//               hasImage
//                 ? `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${
//                     data[0].ServiceNo
//                   }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "")
//                 : require("../../assets/images/man.png")
//             }
//             sx={{
//               width: 40,
//               height: "20%",
//               borderRadius: 2,
//             }}
//           />
//         </IconButton>
//         <Typography sx={{ color: "green", fontSize: 12, marginLeft: -7 }}>
//           In Time : {inTime}
//         </Typography>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleProfile}>Profile</MenuItem>
//           <Divider sx={{ my: 0.5 }} />
//           <MenuItem onClick={handleLogout}>Logout</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default Header;


import React, { useEffect, useState } from "react";
import ForceUpdateButton from '../ForceUpdateButton';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logOut } from "../../action/Login";

const Header = ({ title }) => {
  const { data } = useSelector((state) => state.userbyServiceNo);
  const [hasImage, setHasImage] = useState(false);
  const authKey = JSON.parse(localStorage.getItem("token"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [inTime, setInTime] = useState("");  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInTime = async () => {
      const currentDate = new Date();
      const month = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      try {
        const response = await axios.get(
          `Attendance/GetAttendanceCard?P_MONTH=${month}`
        );

        if (response.data.StatusCode === 200) {
          const resultSet = response.data.ResultSet;
          const today = currentDate.toLocaleDateString();

          const todayRecord = resultSet.find((record) => {
            const recordDate = new Date(record.Date).toLocaleDateString();
            return recordDate === today;
          });

          // Set In Time if it exists
          if (todayRecord) {
            setInTime(todayRecord.InTime || "Unavailable");  
          } else {
            setInTime("Unavailable");   
          }
        }
      } catch (error) {
        console.error("Error fetching In Time:", error);
      }
    };

    fetchInTime();

     
    try {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", "#004AAD");
      }
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
  }, [navigate, dispatch, authKey, data]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  const handleProfile = () => {
    handleClose();
    navigate("/userprofile");
  };

  const greet = () => {
    var d = new Date();
    var time = d.getHours();

    if (time < 12) {
      return "Good Morning...";
    } else if (time >= 12 && time <= 16) {
      return "Good Afternoon...";
    } else {
      return "Good Evening...";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: 1,
        top: 0,
        zIndex: 999,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: "400px" }}>
          <img
            width={"60%"}
            src={require("../../assets/icons/a.png")}
            alt="First slide"
          />
        </div>
        <Typography fontSize={12} fontWeight={550}>
          {greet()}
        </Typography>
        
      </Box>
      
      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    {/* Force update button */}
    <ForceUpdateButton
      onClick={(e) => {
        e.stopPropagation();  
        
      }}
    />

    {/* ONLY avatar opens menu */}
    <IconButton
  onClick={(e) => {
    if (hasImage) {
      handleMenu(e); // ✅ event pass
    }
  }}
>
  <Avatar
    variant="rounded"
    src={
      hasImage
        ? `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${
            data[0].ServiceNo
          }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "")
        : require("../../assets/images/man.png")
    }
    sx={{
      width: 40,
      height: 50,
      borderRadius: 2,
      cursor: hasImage ? "pointer" : "default",
    }}
  />
</IconButton>

  </Box>

  {inTime && inTime !== "Unavailable" && (
    <Typography
      sx={{
        color: "green",
        fontSize: 12,
        mt: 0.3,
        textAlign: "right",
      }}
    >
      In Time: {inTime}
    </Typography>
  )}

  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <MenuItem onClick={handleProfile}>Profile</MenuItem>
    <Divider sx={{ my: 0.5 }} />
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  </Menu>
</Box>

    </Box>
  );
};

export default Header;





//----------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Divider,
//   Badge,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { logOut } from "../../action/Login";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
// import moment from "moment";

// const Header = ({ title }) => {
//   const { data } = useSelector((state) => state.userbyServiceNo);
//   const [hasImage, setHasImage] = useState(false);
//   const authKey = JSON.parse(localStorage.getItem("token"));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
//   const [inTime, setInTime] = useState("");
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);
//   let navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Format date for display
//   const formatDate = (dateString) => {
//     return moment(dateString).format("MMM D, h:mm A");
//   };

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     setLoadingNotifications(true);
//     try {
//       const userResponse = await axios.get(
//         `${axios.defaults.baseURL}/login/GetUserByServiceNo`
//       );
//       const userData = userResponse.data.ResultSet[0];
//       const mobileNo = userData.MobileNo;

//       const notificationResponse = await axios.get(
//         `${axios.defaults.baseURL}Notification/GetNotification?P_PHONENO=${mobileNo}`
//       );
//       const notifications = notificationResponse.data.ResultSet || [];

//       const readMessages =
//         JSON.parse(localStorage.getItem("readMessages")) || [];

//       const updatedNotifications = notifications.map((item) => ({
//         ...item,
//         read: readMessages.includes(`${item.Subject}_${item.Created_date}`),
//       }));

//       setNotifications(updatedNotifications);
//       setUnreadCount(updatedNotifications.filter((item) => !item.read).length);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     } finally {
//       setLoadingNotifications(false);
//     }
//   };

//   // Fetch attendance data for inTime
//   const fetchInTime = async () => {
//     const currentDate = new Date();
//     const month = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
//       .toString()
//       .padStart(2, "0")}`;

//     try {
//       const response = await axios.get(
//         `Attendance/GetAttendanceCard?P_MONTH=${month}`
//       );

//       if (response.data.StatusCode === 200) {
//         const resultSet = response.data.ResultSet;
//         const today = currentDate.toLocaleDateString();

//         const todayRecord = resultSet.find((record) => {
//           const recordDate = new Date(record.Date).toLocaleDateString();
//           return recordDate === today;
//         });

//         if (todayRecord) {
//           setInTime(todayRecord.InTime || "Unavailable");
//         } else {
//           setInTime("Unavailable");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching In Time:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     fetchInTime();

//     // Image loading logic
//     try {
//       const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//       if (metaThemeColor) {
//         metaThemeColor.setAttribute("content", "#004AAD");
//       }
//       const img = new Image();
//       img.onload = function () {
//         setHasImage(true);
//       };
//       img.onerror = function () {
//         setHasImage(false);
//       };
//       if (data && data[0] && data[0].ServiceNo) {
//         img.src = `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${
//           data[0].ServiceNo
//         }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "");
//       }
//     } catch (error) {
//       console.error("Error loading image:", error);
//     }

//     // Set up refresh interval (every 5 minutes)
//     const interval = setInterval(() => {
//       fetchNotifications();
//     }, 300000);

//     return () => clearInterval(interval);
//   }, [navigate, dispatch, authKey, data]);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleNotificationClick = (event) => {
//     fetchNotifications(); // Refresh notifications when clicked
//     setNotificationAnchorEl(event.currentTarget);
//   };

//   const handleNotificationClose = () => {
//     setNotificationAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logOut(navigate));
//   };

//   const handleProfile = () => {
//     handleClose();
//     navigate("/userprofile");
//   };

//   const handleMarkAsRead = (item) => {
//     const key = `${item.Subject}_${item.Created_date}`;
//     const readMessages = JSON.parse(localStorage.getItem("readMessages")) || [];
    
//     if (!readMessages.includes(key)) {
//       readMessages.push(key);
//       localStorage.setItem("readMessages", JSON.stringify(readMessages));
      
//       // Update local state
//       const updatedNotifications = notifications.map((notification) =>
//         `${notification.Subject}_${notification.Created_date}` === key
//           ? { ...notification, read: true }
//           : notification
//       );
      
//       setNotifications(updatedNotifications);
//       setUnreadCount(updatedNotifications.filter((n) => !n.read).length);
//     }
    
//     navigate(`/notifications/NotificationMessage`, { state: { item } });
//     handleNotificationClose();
//   };

//   const handleMarkAllAsRead = () => {
//     const readMessages = JSON.parse(localStorage.getItem("readMessages")) || [];
//     const newReadMessages = [...readMessages];
    
//     notifications.forEach((item) => {
//       const key = `${item.Subject}_${item.Created_date}`;
//       if (!readMessages.includes(key)) {
//         newReadMessages.push(key);
//       }
//     });
    
//     localStorage.setItem("readMessages", JSON.stringify(newReadMessages));
    
//     const updatedNotifications = notifications.map((item) => ({
//       ...item,
//       read: true,
//     }));
    
//     setNotifications(updatedNotifications);
//     setUnreadCount(0);
//   };

//   const greet = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning...";
//     if (hour >= 12 && hour <= 16) return "Good Afternoon...";
//     return "Good Evening...";
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         display: "flex",
//         justifyContent: "space-between",
//         padding: 1,
//         top: 0,
//         zIndex: 999,
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//       }}
//     >
//       <Box sx={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ maxWidth: "400px" }}>
//           <img
//             width={"60%"}
//             src={require("../../assets/icons/a.png")}
//             alt="Company Logo"
//           />
//         </div>
//         <Typography fontSize={12} fontWeight={550}>
//           {greet()}
//         </Typography>
//       </Box>

//       <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
//         {/* In Time Display */}



//         {inTime && inTime !== "Unavailable" && (
//           <Typography sx={{ color: "green", fontSize: 12, marginLeft: -7 }}>
//             In Time: {inTime}
//           </Typography>
//            )}
//         {/* Notification Button */}
//         <IconButton
//           onClick={handleNotificationClick}
//           sx={{ position: "relative" }}
//         >
//           <Badge
//             badgeContent={unreadCount}
//             color="error"
//             invisible={unreadCount === 0}
//             max={9}
//           >
//             {unreadCount > 0 ? (
//               <NotificationImportantIcon color="error" />
//             ) : (
//               <NotificationsIcon />
//             )}
//           </Badge>
//         </IconButton>
         
//         {/* Notification Dropdown Menu */}
//         <Menu
//           anchorEl={notificationAnchorEl}
//           open={Boolean(notificationAnchorEl)}
//           onClose={handleNotificationClose}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "right",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           sx={{
//             "& .MuiPaper-root": {
//               maxHeight: "60vh",
//               width: "350px",
//             },
//           }}
//         >
//           <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", px: 1 }}>
//               Notifications
//             </Typography>
//             {unreadCount > 0 && (
//               <Typography
//                 variant="body2"
//                 sx={{ color: "primary.main", cursor: "pointer" }}
//                 onClick={handleMarkAllAsRead}
//               >
//                 Mark all as read
//               </Typography>
//             )}
//           </Box>
//           <Divider />

//           {loadingNotifications ? (
//             <Box sx={{ p: 2, textAlign: "center" }}>
//               <Typography>Loading notifications...</Typography>
//             </Box>
//           ) : notifications.length === 0 ? (
//             <Box sx={{ p: 2, textAlign: "center" }}>
//               <Typography>No notifications available</Typography>
//             </Box>
//           ) : (
//             <Box sx={{ maxHeight: "50vh", overflowY: "auto" }}>
//               {notifications.slice(0, 10).map((item) => (
//                 <MenuItem
//                   key={`${item.Subject}_${item.Created_date}`}
//                   onClick={() => handleMarkAsRead(item)}
//                   sx={{
//                     bgcolor: item.read ? "action.hover" : "background.default",
//                     borderLeft: !item.read ? "3px solid #004AAD" : "none",
//                     py: 1.5,
//                   }}
//                 >
//                   <Box sx={{ width: "100%" }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontWeight: item.read ? "normal" : "bold",
//                           fontSize: "14px",
//                         }}
//                       >
//                         {item.Subject}
//                       </Typography>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ fontSize: "12px" }}
//                       >
//                         {formatDate(item.Created_date)}
//                       </Typography>
//                     </Box>
//                     <Typography
//                       sx={{
//                         display: "-webkit-box",
//                         WebkitBoxOrient: "vertical",
//                         WebkitLineClamp: 2,
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         fontSize: "13px",
//                         mt: 0.5,
//                       }}
//                     >
//                       {item.Message}
//                     </Typography>
//                   </Box>
//                 </MenuItem>
//               ))}
//             </Box>
//           )}

//           {notifications.length > 10 && (
//             <>
//               <Divider />
//               <MenuItem
//                 onClick={() => {
//                   navigate("/notifications");
//                   handleNotificationClose();
//                 }}
//                 sx={{ justifyContent: "center" }}
//               >
//                 <Typography sx={{ color: "primary.main" }}>
//                   View All Notifications
//                 </Typography>
//               </MenuItem>
//             </>
//           )}
//         </Menu>

//         {/* Profile Button */}
//         <IconButton onClick={handleMenu}>
//           <Avatar
//             variant="rounded"
//             src={
//               hasImage
//                 ? `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${
//                     data[0].ServiceNo
//                   }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "")
//                 : require("../../assets/images/man.png")
//             }
//             sx={{
//               width: 40,
//               height: 40,
//               borderRadius: 2,
//             }}
//           />
//         </IconButton>

//         {/* Profile Menu */}
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleProfile}>Profile</MenuItem>
//           <Divider sx={{ my: 0.5 }} />
//           <MenuItem onClick={handleLogout}>Logout</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default Header;