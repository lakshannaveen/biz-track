import React, { useState, useEffect } from "react";
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
  targetEligible = 1700,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Validate that we have data
  if (!eligibleData?.length || !attendanceData?.length || !rateData?.length) {
    return null; // Don't render if no data available
  }

  // Build chart data using all available points
  const len = Math.max(
    eligibleData.length,
    attendanceData.length,
    rateData.length,
  );

  console.log("WeeklyAttendanceTrend - Data received:", {
    eligibleLength: eligibleData.length,
    attendanceLength: attendanceData.length,
    rateLength: rateData.length,
    eligibleData,
    attendanceData,
    rateData,
  });

  const chartData = [];
  for (let i = 0; i < len; i++) {
    const eligibleItem = eligibleData[i];
    const attendanceItem = attendanceData[i];
    const rateItem = rateData[i];

    // Use dayName from the first available source
    const dayName =
      eligibleItem?.dayName ||
      attendanceItem?.dayName ||
      rateItem?.dayName ||
      `Day ${i + 1}`;

    const point = {
      name: dayName.substring(0, 3),
      eligible: Math.max(0, Math.floor(eligibleItem?.v ?? 0)),
      attendance: Math.max(0, Math.floor(attendanceItem?.v ?? 0)),
      rate: Math.max(0, Math.min(100, Math.floor(rateItem?.v ?? 0))),
    };
    chartData.push(point);
  }

  console.log("Chart data built:", chartData);

  // Don't render if chartData is empty or invalid
  if (
    chartData.length === 0 ||
    chartData.every((d) => !d.eligible && !d.attendance)
  ) {
    return null;
  }

  // Calculate responsive values
  const chartMargin = {
    top: 30,
    right: isMobile ? -10 : -13,
    left: isMobile ? -20 : -22,
    bottom: isMobile ? 10 : 30,
  };

  const chartHeight = isMobile ? 450 : 650;
  const barGap = chartData.length > 5 ? 30 : 50;
  const barSizeEligible = chartData.length > 5 ? 18 : 28;
  const barSizeAttendance = chartData.length > 5 ? 12 : 18;
  const yAxisWidth = isMobile ? (chartData.length > 5 ? 50 : 60) : 60;
  const yAxisRightWidth = isMobile ? (chartData.length > 5 ? 45 : 60) : 60;

  return (
    <Box sx={{ animation: `fadeInUp 0.5s ease-out 0.2s forwards`, opacity: 0 }}>
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: { xs: "16px", sm: "20px" },
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          height: "100%",
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 600,
              color: "#1a2d4d",
              marginBottom: "2px",
            }}
          >
            CDL Weekly Attendance Trend
          </Typography>
          <Typography sx={{ fontSize: { xs: 10, sm: 11 }, color: "#64748b" }}>
            Eligible vs attendance with rate overlay
          </Typography>
        </Box>

        <Box sx={{ height: chartHeight, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={chartMargin}
              barCategoryGap={barGap}
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
                tick={{
                  fill: "#64748b",
                  fontSize: chartData.length > 5 ? 10 : 12,
                }}
                angle={chartData.length > 5 ? -45 : 0}
                textAnchor={chartData.length > 5 ? "end" : "middle"}
                height={chartData.length > 5 ? 60 : 30}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 10 }}
                width={yAxisWidth}
                tickFormatter={fmtK}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 10 }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                width={yAxisRightWidth}
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
                barSize={barSizeEligible}
                fill="#06b6d4"
                radius={[8, 8, 8, 8]}
              />
              <Bar
                yAxisId="left"
                dataKey="attendance"
                name="Attendance"
                barSize={barSizeAttendance}
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
            gap: { xs: 1, sm: 2 },
            alignItems: "center",
            paddingTop: 2,
            borderTop: "1px solid #e5e7eb",
            flexWrap: "wrap",
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
            <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#64748b" }}>
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
            <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#64748b" }}>
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
            <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#64748b" }}>
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
            <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#64748b" }}>
              Target
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WeeklyAttendanceTrend;
