// import React from "react";
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardActionArea,
//   useTheme,
//   useMediaQuery 
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { 
//   HomeWorkOutlined,
//   HandymanOutlined,
//   PersonOutline  
// } from "@mui/icons-material";
// import { motion } from "framer-motion";

// const Approvals = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const categories = [
//     {
//       id: "Bungalow",
//       name: "Bungalow",
//       fullName: "Book your stay",
//       icon: <HomeWorkOutlined fontSize="large" />,
//       path: "/reservations",
//       color: theme.palette.primary.main
//     },
//     {
//       id: "Maintainers",
//       name: "Maintainers",
//       fullName: "maintenance requests",
//       icon: <HandymanOutlined fontSize="large" />,
//       path: "/MaintenancePage",
//       color: theme.palette.secondary.main
//     },
//     {
//       id: "Caretaker",
//       name: "Caretaker",
//       fullName: "View bungalow status",
//       icon: <PersonOutline fontSize="large" />,
//       path: "/caretaker-view", 
//       color: theme.palette.success.main 
//     },
//   ];

//   const cardVariants = {
//     hover: {
//       y: -5,
//       boxShadow: theme.shadows[6],
//       transition: { duration: 0.2 }
//     },
//     tap: {
//       scale: 0.98
//     }
//   };

//   return (
//     <Box sx={{ 
//       width: "100%", 
//       maxWidth: "800px", 
//       margin: "0 auto", 
//       padding: isMobile ? 1 : 3,
//       background: theme.palette.background.default
//     }}>
//       <Typography 
//         variant="h4" 
//         sx={{ 
//           mb: 4, 
//           fontWeight: 600, 
//           textAlign: "center",
//           color: theme.palette.text.primary,
//           fontSize: isMobile ? "1.8rem" : "2.2rem"
//         }}
//       >
//         NEHB Portal
//       </Typography>
//       <Typography 
//         variant="subtitle1" 
//         sx={{ 
//           mb: 4, 
//           textAlign: "center",
//           color: theme.palette.text.secondary
//         }}
//       >
//         Select an option below to get started
//       </Typography>
      
//       <Grid container spacing={isMobile ? 1 : 3} justifyContent="center">
//         {categories.map((category) => (
//           <Grid item xs={6} sm={4} key={category.id}>  
//             <motion.div
//               whileHover="hover"
//               whileTap="tap"
//               variants={cardVariants}
//             >
//               <Card 
//                 sx={{ 
//                   borderRadius: 2,
//                   background: `linear-gradient(135deg, ${category.color}20, ${theme.palette.background.paper})`,
//                   border: `1px solid ${theme.palette.divider}`,
//                   transition: "all 0.3s ease",
//                   '&:hover': {
//                     borderColor: category.color
//                   }
//                 }}
//               >
//                 <CardActionArea 
//                   onClick={() => navigate(category.path)}
//                   sx={{ p: 3, height: "100%" }}
//                 >
//                   <Box sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     textAlign: "center",
//                     gap: 2
//                   }}>
//                     <Box sx={{
//                       width: 60,
//                       height: 60,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       backgroundColor: `${category.color}20`,
//                       color: category.color
//                     }}>
//                       {React.cloneElement(category.icon, { fontSize: "large" })}
//                     </Box>
//                     <Typography
//                       variant="h6"
//                       component="div"
//                       sx={{ 
//                         fontWeight: 600,
//                         color: theme.palette.text.primary
//                       }}
//                     >
//                       {category.name}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{ 
//                         color: theme.palette.text.secondary,
//                         fontSize: "0.8rem"
//                       }}
//                     >
//                       {category.fullName}
//                     </Typography>
//                   </Box>
//                 </CardActionArea>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Approvals;






import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  HomeWorkOutlined,
  HandymanOutlined,
  PersonOutline
} from "@mui/icons-material";
import { motion } from "framer-motion";
import api from "../../service/CommonService";

const TARGET_COMPONENT_ID = "EMOBCI0010";

const Approvals = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [accessLevel, setAccessLevel] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .GetAccessHeadComponent()
      .then((res) => {
        const list = res.data?.ResultSet ?? [];

        const row = list.find((x) => x?.ComponentId === TARGET_COMPONENT_ID);

        const level = row?.AccessLevel != null ? String(row.AccessLevel) : "";

        setAccessLevel(level);
      })
      .catch((err) => {
        console.error("Access level fetch failed", err);
        setAccessLevel("");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return; 

    if (!accessLevel) {
      navigate("/reservations", { replace: true });
      return;
    }

    if (accessLevel === "2") {
      navigate("/caretaker-view", { replace: true });
      return;
    }
  }, [accessLevel, loading, navigate]);

  const categories = [
    {
      id: "Bungalow",
      name: "Bungalow",
      fullName: "Book your stay",
      icon: <HomeWorkOutlined />,
      path: "/reservations",
      color: theme.palette.primary.main
    },
    {
      id: "Maintainers",
      name: "Maintainers",
      fullName: "Maintenance requests",
      icon: <HandymanOutlined />,
      path: "/MaintenancePage",
      color: theme.palette.secondary.main
    },
    {
      id: "Caretaker",
      name: "Caretaker",
      fullName: "View bungalow status",
      icon: <PersonOutline />,
      path: "/caretaker-view",
      color: theme.palette.success.main
    }
  ];

  const getFilteredCategories = () => {
    switch (accessLevel) {
      case "1":
        return categories.filter(
          (c) => c.id === "Bungalow" || c.id === "Maintainers"
        );
      case "2":
        return categories.filter((c) => c.id === "Caretaker");
      case "3":
        return categories;
      default:
        return categories.filter((c) => c.id === "Bungalow");
    }
  };

  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: theme.shadows[6],
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!accessLevel) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: isMobile ? 1 : 3,
        background: theme.palette.background.default
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          textAlign: "center",
          color: theme.palette.text.primary,
          fontSize: isMobile ? "1.8rem" : "2.2rem"
        }}
      >
        NEHB Portal
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mb: 4,
          textAlign: "center",
          color: theme.palette.text.secondary
        }}
      >
        Select an option below to get started
      </Typography>

      <Grid container spacing={isMobile ? 1 : 3} justifyContent="center">
        {getFilteredCategories().map((category) => (
          <Grid item xs={6} sm={4} key={category.id}>
            <motion.div whileHover="hover" whileTap="tap" variants={cardVariants}>
              <Card
                sx={{
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${category.color}20, ${theme.palette.background.paper})`,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: category.color }
                }}
              >
                <CardActionArea
                  onClick={() => navigate(category.path)}
                  sx={{ p: 3, height: "100%" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: `${category.color}20`,
                        color: category.color
                      }}
                    >
                      {React.cloneElement(category.icon, { fontSize: "large" })}
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {category.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.8rem"
                      }}
                    >
                      {category.fullName}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Approvals;
