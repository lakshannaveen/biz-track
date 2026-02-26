import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";

const dayOrderMap = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
};

const dayAbbrMap = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1a2d4d" }}>
          {payload[0].payload.name}
        </Typography>
        {payload.map((p, i) => (
          <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: p.color,
                borderRadius: 1,
              }}
            />
            <Typography sx={{ fontSize: 12, color: "#64748b" }}>
              {p.name}:{" "}
              <span style={{ color: "#1a2d4d", fontWeight: 700 }}>
                {p.value}
              </span>
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

const fmtK = (v) => {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return v;
};

export function WeeklyAttendanceTrend({
  eligibleData = [],
  attendanceData = [],
  rateData = [],
  dayNames = [],
  targetEligible = 1700,
}) {
  // Validate that we have data
  if (!eligibleData?.length || !attendanceData?.length || !rateData?.length) {
    return null; // Don't render if no data available
  }

  // Build chart data
  let chartData = [];

  // If dayNames provided, use them directly; otherwise use index-based fallback
  if (dayNames && dayNames.length > 0) {
    for (let i = 0; i < dayNames.length; i++) {
      const point = {
        name: dayAbbrMap[dayNames[i]] || dayNames[i],
        eligible: Math.max(0, Math.floor(eligibleData[i]?.v ?? 0)),
        attendance: Math.max(0, Math.floor(attendanceData[i]?.v ?? 0)),
        rate: Math.max(0, Math.min(100, Math.floor(rateData[i]?.v ?? 0))),
      };
      chartData.push(point);
    }
  } else {
    // Fallback: use last 5 points with index-based day names
    const len = Math.min(
      5,
      Math.max(eligibleData.length, attendanceData.length, rateData.length),
    );
    const start = Math.max(0, eligibleData.length - len);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    for (let i = 0; i < len; i++) {
      const idx = start + i;
      const point = {
        name: days[i] || `D${i + 1}`,
        eligible: Math.max(0, Math.floor(eligibleData[idx]?.v ?? 0)),
        attendance: Math.max(0, Math.floor(attendanceData[idx]?.v ?? 0)),
        rate: Math.max(0, Math.min(100, Math.floor(rateData[idx]?.v ?? 0))),
      };
      chartData.push(point);
    }
  }

  // Don't render if chartData is empty or invalid
  if (
    chartData.length === 0 ||
    chartData.every((d) => !d.eligible && !d.attendance)
  ) {
    return null;
  }

  return (
    <Box sx={{ animation: `fadeInUp 0.5s ease-out 0.2s forwards`, opacity: 0 }}>
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "20px ",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          height: "100%",
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: "#1a2d4d",
              marginBottom: "2px",
            }}
          >
            CDL Weekly Attendance Trend
          </Typography>
          <Typography sx={{ fontSize: 11, color: "#64748b" }}>
            Eligible vs attendance with rate overlay
          </Typography>
        </Box>

        <Box sx={{ height: { xs: 450, md: 550 }, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: -12, left: -12, bottom: 40 }}
              barCategoryGap={20}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b" }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b" }}
                width={60}
                tickFormatter={fmtK}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b" }}
                domain={[60, 100]}
                width={60}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />

              <ReferenceLine
                y={targetEligible}
                stroke="#ef4444"
                strokeDasharray="4 4"
                yAxisId="left"
                strokeWidth={1.5}
              />

              {/* Eligible as pale background bar */}
              <Bar
                yAxisId="left"
                dataKey="eligible"
                name="Eligible"
                barSize={36}
                fill="#06b6d4"
                radius={[8, 8, 8, 8]}
              />
              <Bar
                yAxisId="left"
                dataKey="attendance"
                name="Attendance"
                barSize={22}
                fill="#3b82f6"
                radius={[8, 8, 8, 8]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rate"
                name="Rate %"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            paddingTop: 2,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#06b6d4",
              }}
            />
            <Typography sx={{ fontSize: 10, color: "#64748b" }}>
              Eligible
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
              }}
            />
            <Typography sx={{ fontSize: 10, color: "#64748b" }}>
              Attendance
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
              }}
            />
            <Typography sx={{ fontSize: 10, color: "#64748b" }}>
              Rate %
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{ width: 20, height: 0, borderBottom: "2px dashed #ef4444" }}
            />
            <Typography sx={{ fontSize: 10, color: "#64748b" }}>
              Target
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WeeklyAttendanceTrend;
