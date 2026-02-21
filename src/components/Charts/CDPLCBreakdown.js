import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip,
} from "recharts";
import { CDPLCCustomTooltip, CDPLCLegend } from "./ChartUtils";

export function CDPLCBreakdown({ cdplcData, radialData }) {
  return (
    <Box
      sx={{
        animation: `fadeInUp 0.5s ease-out 0.2s forwards`,
        opacity: 0,
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1a2d4d",
              }}
            >
              CDPLC Category Attendance
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "4px",
              }}
            >
              Actual attendance % by category
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#1a2d4d",
              }}
            >
              76%
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Overall Actual
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: "288px", width: "100%", marginBottom: "16px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="90%"
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={6}
                background={{
                  fill: "rgba(0, 0, 0, 0.04)",
                }}
                label={false}
              />
              <Tooltip
                content={(props) => (
                  <CDPLCCustomTooltip {...props} cdplcData={cdplcData} />
                )}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <CDPLCLegend cdplcData={cdplcData} />

        {/* Category Cards */}
        <Box
          sx={{
            marginTop: "16px",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: "12px",
          }}
        >
          {cdplcData?.map((cat) => (
            <Box
              key={cat.name}
              sx={{
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                padding: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px",
                }}
              >
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: cat.fill,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "#64748b",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {cat.name}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: cat.fill,
                }}
              >
                {cat.actualPct}%
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "#94a3b8",
                }}
              >
                {cat.attendance}/{cat.strength}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
