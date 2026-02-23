import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export function TraineesOverview({ traineeOverall, traineeByDivision }) {
  const totalTrainees = {
    clerical: 2,
    clerical_att: 0,
    clerical_percent: 0,
    industrial: 143,
    industrial_att: 116,
    industrial_percent: 80,
    total: 145,
    total_att: 116,
    total_percent: 80,
  };

  return (
    <Box
      sx={{
        animation: `fadeInUp 0.5s ease-out 0.4s forwards`,
        opacity: 0,
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {/* Trainees Overview Bar Chart */}
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          marginBottom: "32px",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "24px" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1a2d4d",
            }}
          >
            Trainees Overview
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            Category-wise strength and attendance distribution
          </Typography>
        </Box>

        {/* Chart */}
        <Box sx={{ height: "320px", width: "100%", marginBottom: "24px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={traineeOverall}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient
                  id="colorAttendance"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="category"
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
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#1a2d4d" }}
              />
              <Legend />
              <Bar
                dataKey="strength"
                fill="url(#colorStrength)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="attendance"
                fill="url(#colorAttendance)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Summary Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              Total Trainees
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1a2d4d",
              }}
            >
              {totalTrainees.total}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              Present Today
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#10b981",
              }}
            >
              {totalTrainees.total_att}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              Attendance Rate
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#3b82f6",
              }}
            >
              {totalTrainees.total_percent}%
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: "11px",
            color: "#94a3b8",
            fontStyle: "italic",
          }}
        >
          * This includes CDL Consultant, CDL Permanent, CDL Contract, CDL
          Trainee and Trainee Facility
        </Typography>
      </Box>

      {/* Trainees by Division Chart */}
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          marginBottom: "32px",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "24px" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1a2d4d",
            }}
          >
            Trainees by Division
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            Attendance distribution across divisions
          </Typography>
        </Box>

        {/* Chart */}
        <Box sx={{ height: "384px", width: "100%", marginBottom: "16px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={traineeByDivision}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <defs>
                <linearGradient
                  id="divisonClerical"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient
                  id="divisonClericalAtt"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient
                  id="divisionIndustrial"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient
                  id="divisionIndustrialAtt"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
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
                  fontSize: 11,
                }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#1a2d4d" }}
              />
              <Legend />
              <Bar
                dataKey="clerical_strength"
                fill="url(#divisonClerical)"
                name="Clerical (Strength)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="clerical_attendance"
                fill="url(#divisonClericalAtt)"
                name="Clerical (Attended)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="industrial_strength"
                fill="url(#divisionIndustrial)"
                name="Industrial (Strength)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="industrial_attendance"
                fill="url(#divisionIndustrialAtt)"
                name="Industrial (Attended)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Typography
          sx={{
            fontSize: "11px",
            color: "#94a3b8",
            fontStyle: "italic",
          }}
        >
          * This Includes Other Trainees (NAITA)
        </Typography>
      </Box>

      {/* Trainee Attendance Rate Chart */}
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
        <Box sx={{ marginBottom: "24px" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1a2d4d",
            }}
          >
            Trainee Attendance Rate by Division
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            Percentage attendance across divisions
          </Typography>
        </Box>

        {/* Chart */}
        <Box sx={{ height: "320px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={traineeByDivision}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <defs>
                <linearGradient id="linePercent" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
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
                  fontSize: 11,
                }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`${value}%`, "Attendance Rate"]}
                labelStyle={{ color: "#1a2d4d" }}
              />
              <Line
                type="monotoneX"
                dataKey="total_percent"
                stroke="url(#linePercent)"
                strokeWidth={3}
                dot={{
                  fill: "#06b6d4",
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#ffffff",
                }}
                activeDot={{
                  r: 7,
                  strokeWidth: 2,
                  stroke: "#ffffff",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}
