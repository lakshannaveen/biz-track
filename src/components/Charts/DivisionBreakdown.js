import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { getColor, CustomDot, CustomTooltip } from "./ChartUtils";

export function DivisionBreakdown({ divisionData }) {
  return (
    <Box
      sx={{
        animation: `fadeInUp 0.5s ease-out 0.3s forwards`,
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
            alignItems: "center",
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
             CDPLC Division Attendance Rate
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "4px",
              }}
            >
              Attendance % across all divisions
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "12px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                }}
              />
              <Typography
                sx={{ fontSize: "12px", color: "#1a2d4d", fontWeight: 500 }}
              >
                ≥90%
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                }}
              />
              <Typography
                sx={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}
              >
                ≥75%
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#f43f5e",
                }}
              />
              <Typography
                sx={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}
              >
                &lt;75%
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: "288px", width: "100%", marginBottom: "16px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={divisionData}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="division"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
                domain={[40, 110]}
                tickFormatter={(v) => `${v}%`}
                width={42}
              />
              <Tooltip
                content={(props) => (
                  <CustomTooltip {...props} divisionData={divisionData} />
                )}
              />
              <ReferenceLine
                y={77}
                stroke="rgba(6,182,212,0.3)"
                strokeDasharray="6 3"
                label={{
                  value: "Avg 77%",
                  fill: "#06b6d4",
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />
              <Line
                type="monotoneX"
                dataKey="rate"
                stroke="url(#lineGlow)"
                strokeWidth={3}
                dot={(props) => (
                  <CustomDot {...props} divisionData={divisionData} />
                )}
                activeDot={{
                  r: 8,
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Division Badges */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {divisionData?.map((d) => {
            const color = getColor(d.rate);
            const bgColor =
              d.rate >= 90 ? "#f0fdf4" : d.rate >= 75 ? "#f0f9ff" : "#fdf2f8";
            const borderColor =
              d.rate >= 90 ? "#d1fae5" : d.rate >= 75 ? "#bfdbfe" : "#fbcfe8";
            return (
              <Box
                key={d.division}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 12px",
                  borderRadius: "16px",
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#1a2d4d",
                  }}
                >
                  {d.division}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: color,
                  }}
                >
                  {d.rate}%
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
