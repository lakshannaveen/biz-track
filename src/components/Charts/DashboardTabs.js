import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const DashboardTabs = ({ activeTab, onTabChange }) => {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "24px",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "6px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#004AAD",
            height: "3px",
          },
          "& .MuiTab-root": {
            fontSize: "13px",
            fontWeight: 600,
            textTransform: "none",
            minWidth: "110px",
            padding: "8px 12px",
            color: "#666",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            },
          },
          "& .Mui-selected": {
            color: "#004AAD",
          },
        }}
      >
        <Tab label="HR Dashboard" />
        <Tab label="Financial Dashboard" />
      </Tabs>
    </Box>
  );
};

export default DashboardTabs;
