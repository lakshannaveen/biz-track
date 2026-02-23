import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";

const AttendanceCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          sx={{
            color: "#1a2d4d",
            fontWeight: 600,
            marginBottom: "8px",
            fontSize: "12px",
          }}
        >
          {payload[0].payload.type}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            marginBottom: "4px",
          }}
        >
          <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
            Attendance:
          </Typography>
          <Typography
            sx={{
              color: "#1a2d4d",
              fontWeight: 600,
              fontSize: "11px",
            }}
          >
            {payload[0].payload.percentage.toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
          }}
        >
          <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
            Present:
          </Typography>
          <Typography
            sx={{
              color: "#1a2d4d",
              fontWeight: 600,
              fontSize: "11px",
            }}
          >
            {payload[0].payload.attendance} / {payload[0].payload.strength}
          </Typography>
        </Box>
      </Box>
    );
  }
  return null;
};

// Helper function to get color based on attendance percentage
const getAttendanceColor = (percentage) => {
  if (percentage >= 90) return "#10b981"; // Green
  if (percentage >= 80) return "#3b82f6"; // Blue (changed from orange to blue to match image)
  return "#94a3b8"; // Gray (changed from red to gray to match image)
};

export function EmployeeTypeChart({ employeeTypeData }) {
  // Transform data to include percentage
  const chartData = employeeTypeData.map((item) => ({
    type: item.type,
    percentage: (item.attendance / item.strength) * 100,
    attendance: item.attendance,
    strength: item.strength,
  }));

  return (
    <Box
      sx={{
        animation: `fadeInUp 0.5s ease-out 0.2s forwards`,
        opacity: 0,
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        height: "100%",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: { xs: "12px", sm: "16px", md: "20px" },
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          border: "1px solid #e5e7eb",
          boxSizing: "border-box",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1a2d4d",
              marginBottom: "2px",
            }}
          >
            Attendance by Employee Type
          </Typography>
          <Typography
            sx={{
              fontSize: "11px",
              color: "#64748b",
            }}
          >
            Color indicates attendance health
          </Typography>
        </Box>

        {/* Chart */}
        <Box sx={{ height: { xs: "260px", md: "320px" }, width: "100%", marginBottom: "16px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              barGap={6}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 10,
                }}
                ticks={[0, 25, 50, 75, 100]}
              />
              <YAxis
                type="category"
                dataKey="type"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#1a2d4d",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                width={80}
              />
              <Tooltip content={<AttendanceCustomTooltip />} />
              <ReferenceLine
                x={100}
                stroke="#ef4444"
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <Bar dataKey="percentage" fill="#ef4444" barSize={28} radius={[8, 8, 8, 8]}>
                {chartData.map((item, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getAttendanceColor(item.percentage)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            paddingTop: "12px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                }}
              />
              <Typography sx={{ fontSize: "10px", color: "#64748b" }}>
                ≥ 90
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                }}
              />
              <Typography sx={{ fontSize: "10px", color: "#64748b" }}>
                80–89
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#94a3b8",
                }}
              />
              <Typography sx={{ fontSize: "10px", color: "#64748b" }}>
                &lt; 80
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Box
              sx={{
                width: "20px",
                height: "0px",
                borderBottom: "2px dashed #ef4444",
              }}
            />
            <Typography sx={{ fontSize: "10px", color: "#64748b" }}>
              Target
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}