import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const EmployeeTypeCustomTooltip = ({ active, payload }) => {
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
        {payload.map((entry, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              marginBottom: i < payload.length - 1 ? "4px" : 0,
            }}
          >
            <Box
              sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: entry.color,
              }}
            />
            <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
              {entry.name}:
            </Typography>
            <Typography
              sx={{
                color: "#1a2d4d",
                fontWeight: 600,
                fontSize: "11px",
              }}
            >
              {entry.value.toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

export function EmployeeTypeChart({ employeeTypeData }) {
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
        {/* Header with Badge */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1a2d4d",
                marginBottom: "4px",
              }}
            >
              Employee Strength vs Attendance
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Workforce distribution by employee type
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Today
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: "288px", width: "100%", marginBottom: "24px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={employeeTypeData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradStrength" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradEligible" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="type"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
              />
              <Tooltip content={<EmployeeTypeCustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "16px",
                  fontSize: "12px",
                }}
                formatter={(value) => (
                  <span style={{ color: "#94a3b8" }}>{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="strength"
                name="Actual Strength"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#gradStrength)"
                dot={{
                  fill: "#3b82f6",
                  r: 4,
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                  fill: "#3b82f6",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="eligible"
                name="Eligible Strength"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#gradEligible)"
                dot={{
                  fill: "#8b5cf6",
                  r: 4,
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                  fill: "#8b5cf6",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="attendance"
                name="Attendance"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#gradAttendance)"
                dot={{
                  fill: "#10b981",
                  r: 4,
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                  fill: "#10b981",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* Summary Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
        >
          {[
            {
              label: "Total Strength",
              value: "3,891",
              color: "#3b82f6",
            },
            {
              label: "Eligible",
              value: "3,331",
              color: "#8b5cf6",
            },
            {
              label: "Attendance",
              value: "2,579",
              color: "#10b981",
            },
          ].map((stat) => (
            <Box
              key={stat.label}
              sx={{
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: stat.color,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "#94a3b8",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
