import React from "react";
import { Box, Card, CardActionArea, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminChaserSelection = () => {
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    // Navigate to collectForm with a parameter indicating the selection
    navigate(`/collectForm?type=${type}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        padding: 2,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          marginBottom: 4,
          fontWeight: 600,
          color: "#333",
        }}
      >
        Select Role
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: 3,
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea
              onClick={() => handleCardClick("admin")}
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    color: "#1976d2",
                    marginBottom: 1,
                  }}
                >
                  Admin
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Select admin role
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: 3,
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea
              onClick={() => handleCardClick("chaser")}
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    color: "#1976d2",
                    marginBottom: 1,
                  }}
                >
                  Chaser
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Select chaser role
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminChaserSelection;