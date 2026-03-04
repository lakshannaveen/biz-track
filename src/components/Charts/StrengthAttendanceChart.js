import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// Colors similar to dashboard theme
const COLORS = {
  actual: "#6d28d9", // purple
  attendance: "#10b981", // green
  eligible: "#3b82f6", // blue
};

function ChartTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          border: "1px solid #e2e8f0",
          padding: "8px",
          borderRadius: "8px",
          boxShadow: "0 6px 18px rgba(15,23,42,0.08)",
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1a2d4d" }}>
          {payload[0].payload.name}
        </Typography>
        {payload.map((p) => (
          <Box key={p.name} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box sx={{ width: 10, height: 10, backgroundColor: p.color, borderRadius: 1 }} />
            <Typography sx={{ fontSize: 12, color: "#64748b" }}>
              {p.name}: <strong style={{ color: "#1a2d4d" }}>{p.value}</strong>
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
}

export function StrengthAttendanceChart({ series = [] }) {
  // series: array of { category/name, eligible, attendance, actual }
  if (!series || !Array.isArray(series) || series.length === 0) return null;

  const data = series.map((s) => ({
    name: s.category || s.name || "-",
    eligible: Number(s.eligible ?? s.strength ?? 0),
    attendance: Number(s.attendance ?? s.at ?? 0),
    actual: Number(s.actual ?? s.actualStrength ?? s.attendance ?? 0),
  }));

  return (
    <Box sx={{ animation: `fadeInUp 0.5s ease-out 0.2s forwards`, opacity: 0 }}>
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: { xs: "12px", sm: "20px" },
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          border: "1px solid #e2e8f0",
          marginBottom: "16px",
        }}
      >
        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#1a2d4d" }}>
            Employee Strength vs Attendance
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#64748b" }}>
            Workforce distribution by employee type
          </Typography>
        </Box>

        <Box sx={{ height: 360, width: "100%", marginTop: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend verticalAlign="bottom" height={36} />

              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.actual} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={COLORS.actual} stopOpacity={0.06} />
                </linearGradient>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.attendance} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={COLORS.attendance} stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="colorEligible" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.eligible} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={COLORS.eligible} stopOpacity={0.04} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="eligible"
                name="Eligible Strength"
                stroke={COLORS.eligible}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEligible)"
                activeDot={{ r: 4 }}
              />

              <Area
                type="monotone"
                dataKey="attendance"
                name="Attendance"
                stroke={COLORS.attendance}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAttendance)"
                activeDot={{ r: 4 }}
              />

              <Area
                type="monotone"
                dataKey="actual"
                name="Actual Strength"
                stroke={COLORS.actual}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorActual)"
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default StrengthAttendanceChart;
