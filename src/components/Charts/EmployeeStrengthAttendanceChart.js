import React from "react";
import { Box, Typography, Chip, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        padding: "10px 12px",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.14)",
      }}
    >
      <Typography
        sx={{
          color: "#1a2d4d",
          fontWeight: 700,
          marginBottom: "6px",
          fontSize: "12px",
        }}
      >
        {label}
      </Typography>

      {payload.map((entry, index) => (
        <Box
          key={`${entry.dataKey}-${index}`}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "2px",
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
            sx={{ color: "#1a2d4d", fontWeight: 700, fontSize: "11px" }}
          >
            {Number(entry.value || 0).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export function EmployeeStrengthAttendanceChart({ allAttendance = [] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Normalize employee type labels for consistency
  const normalizeType = (value) => {
    const str = (value || "").toString().trim().toLowerCase();

    if (str.includes("cdplc")) return "CDPLC";
    if (str.includes("trainee")) return "Trainee";
    if (str.includes("sub") && str.includes("l")) return "Sub (L)";
    if (str.includes("sub") && str.includes("f")) return "Sub (F)";

    return (value || "").toString().trim();
  };

  // Transform API data: filter out TOTAL category and map to chart format
  const transformedData = (allAttendance || [])
    .filter((item) => {
      const typeValue = (
        item?.Type ||
        item?.TYPE ||
        item?.EmployeeType ||
        item?.employeeType ||
        ""
      )
        .toString()
        .trim();
      return typeValue && typeValue.toUpperCase() !== "TOTAL";
    })
    .map((item) => {
      const strength =
        parseInt(item?.ActualStrength || item?.Strength || 0) || 0;
      const attendance = parseInt(item?.Attendance || 0) || 0;

      // Use eligible value directly from API - try multiple field names
      const eligible =
        parseInt(
          item?.EligibleStrength ||
            item?.Eligible ||
            item?.EligibleCount ||
            item?.EligibleAttendance ||
            0,
        ) || 0;

      return {
        type: normalizeType(
          item?.Type || item?.TYPE || item?.EmployeeType || "Unknown",
        ),
        strength: strength,
        attendance: attendance,
        eligible: eligible,
      };
    });

  const chartData = transformedData.length > 0 ? transformedData : [];

  // Ensure all expected categories are shown (add missing ones with 0 values)
  const expectedCategories = ["CDPLC", "Trainee", "Sub (L)", "Sub (F)"];
  const existingTypes = new Set(chartData.map((item) => item.type));

  const enrichedChartData = [
    ...chartData,
    ...expectedCategories
      .filter((cat) => !existingTypes.has(cat))
      .map((cat) => ({
        type: cat,
        strength: 0,
        attendance: 0,
        eligible: 0,
      })),
  ];

  const formatTypeLabel = (value) => {
    const label = (value || "").toString();
    return label;
  };

  // Calculate totals from transformed data
  const totals = enrichedChartData.reduce(
    (acc, item) => ({
      strength: acc.strength + item.strength,
      eligible: acc.eligible + item.eligible,
      attendance: acc.attendance + item.attendance,
    }),
    { strength: 0, eligible: 0, attendance: 0 },
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: { xs: "12px", sm: "16px", md: "20px" },
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "flex-start" },
            justifyContent: "space-between",
            marginBottom: "16px",
            gap: { xs: "12px", sm: "8px" },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                color: "#1a2d4d",
                wordBreak: "break-word",
              }}
            >
              Employee Strength vs Attendance
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "11px" },
                color: "#64748b",
                marginTop: "2px",
              }}
            >
              Workforce distribution by employee type
            </Typography>
          </Box>
          <Chip
            label="Today"
            size="small"
            sx={{
              backgroundColor: "#e0ecff",
              color: "#004AAD",
              fontWeight: 600,
              height: "24px",
              flexShrink: 0,
            }}
          />
        </Box>

        <Box
          sx={{
            height: { xs: "280px", sm: "300px", md: "340px" },
            width: "100%",
            marginBottom: "12px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={enrichedChartData}
              margin={{
                top: 10,
                right: isMobile ? 15 : 5,
                left: isMobile ? -5 : -20,
                bottom: isMobile ? 26 : 0,
              }}
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
                stroke="rgba(148, 163, 184, 0.35)"
                vertical={false}
              />

              <XAxis
                dataKey="type"
                axisLine={false}
                tickLine={false}
                interval={0}
                minTickGap={0}
                tickFormatter={formatTypeLabel}
                tick={{ fill: "#64748b", fontSize: isMobile ? 10 : 12 }}
                dy={isMobile ? 4 : 8}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: isMobile ? 9 : 10 }}
                width={isMobile ? 35 : 45}
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend
                wrapperStyle={{
                  paddingTop: isMobile ? "8px" : "12px",
                  fontSize: isMobile ? "9px" : "12px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: isMobile ? "4px" : "8px",
                  lineHeight: isMobile ? "1.2" : "1.5",
                }}
                formatter={(value) => (
                  <span style={{ color: "#64748b" }}>{value}</span>
                )}
              />

              <Area
                type="monotone"
                dataKey="strength"
                name="Actual Strength"
                stroke="#3b82f6"
                strokeWidth={isMobile ? 1.5 : 2.5}
                fill="url(#gradStrength)"
                isAnimationActive={!isMobile}
                dot={
                  isMobile ? false : { fill: "#3b82f6", r: 4, strokeWidth: 0 }
                }
                activeDot={{
                  r: isMobile ? 4 : 6,
                  fill: "#3b82f6",
                  stroke: "#ffffff",
                  strokeWidth: 1,
                }}
              />

              <Area
                type="monotone"
                dataKey="eligible"
                name="Eligible Strength"
                stroke="#8b5cf6"
                strokeWidth={isMobile ? 1.5 : 2}
                fill="url(#gradEligible)"
                isAnimationActive={!isMobile}
                dot={
                  isMobile ? false : { fill: "#8b5cf6", r: 4, strokeWidth: 0 }
                }
                activeDot={{
                  r: isMobile ? 4 : 6,
                  fill: "#8b5cf6",
                  stroke: "#ffffff",
                  strokeWidth: 1,
                }}
              />

              <Area
                type="monotone"
                dataKey="attendance"
                name="Attendance"
                stroke="#10b981"
                strokeWidth={isMobile ? 1.5 : 2.5}
                fill="url(#gradAttendance)"
                isAnimationActive={!isMobile}
                dot={
                  isMobile ? false : { fill: "#10b981", r: 4, strokeWidth: 0 }
                }
                activeDot={{
                  r: isMobile ? 4 : 6,
                  fill: "#10b981",
                  stroke: "#ffffff",
                  strokeWidth: 1,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </motion.div>
  );
}
