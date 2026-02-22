import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HouseIcon from "@mui/icons-material/House";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SmsIcon from "@mui/icons-material/Sms";
import { Link } from "react-router-dom";
import { Box, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Footer() {
  const [value, setValue] = React.useState("recents");
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = React.useState(0);

  const fetchUnseenCount = async () => {
    try {
      const userResponse = await axios.get(
        `${axios.defaults.baseURL}/login/GetUserByServiceNo`,
      );
      const userData = userResponse.data.ResultSet[0];
      const mobileNo = userData.MobileNo;

      const countResponse = await axios.get(
        `${axios.defaults.baseURL}Notification/GetUnSeenCount?P_PHONENO=${mobileNo}`,
      );
      setUnreadCount(parseInt(countResponse.data.ResultSet.Count) || 0);
    } catch (error) {
      console.error("Error fetching unseen count:", error);
    }
  };

  React.useEffect(() => {
    fetchUnseenCount();

    const interval = setInterval(() => {
      fetchUnseenCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "QR") {
      dispatch({
        type: "IS_OPEN",
        payload: { isOpen: true, isOpenDetailScreen: false },
      });
    } else if (newValue === "Notification") {
      fetchUnseenCount();
    } else {
      dispatch({ type: "IS_CLOSE" });
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%", padding: "5px" }}>
        <BottomNavigation
          sx={{
            width: "100%",
            borderRadius: 3,
            backgroundImage: "linear-gradient(to bottom, #5B52B3, #004AAD)",
            "& .MuiBottomNavigationAction-root.Mui-selected": {
              color: "white",
            },
            "& .MuiBottomNavigationAction-root": {
              color: "white",
            },
          }}
          value={value}
          onChange={handleChange}
          showLabels={false}
        >
          <BottomNavigationAction
            component={Link}
            to="/home"
            // label="Home"
            value="Home"
            icon={<HouseIcon fontSize="large" />}
          />
          <BottomNavigationAction
            component={Link}
            to="/dashboard"
            //label="Dashboard"
            value="Dashboard"
            icon={<DashboardIcon fontSize="large" />}
          />
          <BottomNavigationAction
            //label="QR"
            // to="/NewQR_Scan"
            value="QR"
            icon={<QrCodeScannerIcon fontSize="large" />}
          />
          <BottomNavigationAction
            component={Link}
            to="/notifications"
            // label="Notification"
            value="Notification"
            icon={
              <Badge
                badgeContent={unreadCount}
                color="error"
                invisible={unreadCount === 0}
                max={999}
              >
                <SmsIcon fontSize="large" />
              </Badge>
            }
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}
