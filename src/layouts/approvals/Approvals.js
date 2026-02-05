import React from "react";
import { Box, Typography, Grid, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  ConstructionOutlined, 
  EngineeringOutlined, 
  DynamicFormOutlined, 
  MonitorHeartOutlined, 
  CalendarMonthOutlined, 
  AccessTimeOutlined, 
  InsertDriveFileOutlined, 
  HandshakeOutlined 
} from "@mui/icons-material";

const Approvals = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "iwo",
      name: "IWO",
      fullName: "Internal Work Orders",
      icon: <ConstructionOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
      path: "/approvals/iwo"
    },
    {
      id: "ewo",
      name: "EWO",
      fullName: "External Work Orders",
      icon: <EngineeringOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
      path: "/approvals/ewo"
    },
    // {
    //   id: "moc",
    //   name: "MOC",
    //   fullName: "Management of Change",
    //   icon: <DynamicFormOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/moc"
    // },
    // {
    //   id: "umr",
    //   name: "UMR",
    //   fullName: "Unit Modification Request",
    //   icon: <MonitorHeartOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/umr"
    // },
    // {
    //   id: "leave",
    //   name: "Leave",
    //   fullName: "Leave Requests",
    //   icon: <CalendarMonthOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/leave"
    // },
    {
      id: "ot",
      name: "OT",
      fullName: "Overtime",
      icon: <AccessTimeOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
      path: "/approvals/ot"
    },
    // {
    //   id: "efile",
    //   name: "E-File",
    //   fullName: "Electronic Files",
    //   icon: <InsertDriveFileOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/efile"
    // },
    // {
    //   id: "agreement",
    //   name: "Agreement",
    //   fullName: "Agreements & Contracts",
    //   icon: <HandshakeOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/agreement"
    // }
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, textAlign: "center" }}>
        Approvals
      </Typography>
      
      <Grid container spacing={1}>
        {categories.map((category) => (
          <Grid item xs={4} key={category.id} sx={{ padding: 1 }}>
            <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
              <CardActionArea onClick={() => navigate(category.path)}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }}>
                  {category.icon}
                  <Typography
                    gutterBottom
                    fontSize={14}
                    fontWeight={600}
                    component="div"
                    style={{ opacity: "40%" }}
                  >
                    {category.name}
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