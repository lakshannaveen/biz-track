import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Approvals = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: "EMOBCI0002",
      label: "Attendance",
      path: "/Attendance",
      icon: "attendance.png",
    },
    
    { id: "EMOBCI0003", label: "Leave", path: "/Leave", icon: "exit.png" },
    // {
    //   id: "EMOBCI0005",
    //   label: "Extra Hours",
    //   path: "/ex_hours",
    //   icon: "ex_hours.png",
    // },

    // {
    //   id: "EMOBCI0005",
    //   label: "Time Endoresement",
    //   path: "/time_endoresement",
    //   icon: "time_endoresement.png",
    // },

    // {
    //   id: "EMOBCI0005",
    //   label: "Welfare",
    //   path: "/Welfare",
    //   icon: "welfare.png",
    // },

    // {
    //   id: "EMOBCI0006",
    //   label: "Sahanasala",
    //   path: "/budgetshop",
    //   icon: "store.png",
    // },
    {
      id: "EMOBCI0007",
      label: "Medical",
      path: "/Medical",
      icon: "healthcare.png",
    },
    {
      id: "EMOBCI0009",
      label: "Outstanding Tools",
      path: "/tools",
      icon: "tools.png",
    },
  ];

  return (
    <Box
      sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 2 }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 500, textAlign: "center" }}
      >
        Personal
      </Typography>
      <Grid container spacing={1}>
        {categories.map((category) => (
          <Grid item xs={4} key={category.id} sx={{ padding: 1 }}>
            <Card
              sx={{
                padding: 2,
                boxShadow: 0,
                borderRadius: 2,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardActionArea
                onClick={() => navigate(category.path)}
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <img
                    className="d-block"
                    src={require(`../../assets/icons/${category.icon}`)}
                    alt={category.label}
                    style={{ opacity: "70%", width: "40px", height: "40px" }}
                  />
                  <Typography
                    gutterBottom
                    fontSize={14}
                    fontWeight={600}
                    component="div"
                    style={{
                      opacity: "40%",
                      textAlign: "center",
                      marginTop: 8,
                      width: "100%",
                    }}
                  >
                    {category.label}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Approvals;
