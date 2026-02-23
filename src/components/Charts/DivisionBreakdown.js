import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { CustomDot, CustomTooltip } from "./ChartUtils";
import { Building2 } from "lucide-react";
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

// Helper function to get color based on attendance percentage
const getAttendanceColor = (percentage) => {
  if (percentage >= 90) return "#10b981"; // Green
  if (percentage >= 80) return "#f59e0b"; // Orange
  return "#ef4444"; // Red
};

export function DivisionBreakdown({ divisionData }) {
  const [selectedCategory, setSelectedCategory] = useState("executive");

  // Calculate summary stats based on selected category
  const calculateStats = () => {
    let totalStrength = 0;
    let totalAttendance = 0;

    divisionData.forEach((division) => {
      const categoryData = division.categories[selectedCategory];
      if (categoryData) {
        totalStrength += categoryData.st;
        totalAttendance += categoryData.at;
      }
    });

    const rate =
      totalStrength > 0
        ? Math.round((totalAttendance / totalStrength) * 100)
        : 0;
    return { totalStrength, totalAttendance, rate };
  };

  const stats = calculateStats();

  // (table view removed) filtered table data is not used

  const categories = [
    { key: "executive", label: "Executive", icon: "👔" },
    { key: "supervisory", label: "Supervisory", icon: "👥" },
    { key: "clerical", label: "Clerical", icon: "📋" },
    { key: "industrial", label: "Industrial", icon: "🔧" },
  ];

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
          padding: { xs: "12px", sm: "16px", md: "20px" },
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8eb",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "24px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <Building2 size={20} color="#1a2d4d" />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1a2d4d",
              }}
            >
              Division Breakdown
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Select a sector to view division-level attendance
          </Typography>
        </Box>

        {/* Category Filter Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              sx={{
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "none",
                border: "1px solid #e5e7eb",
                backgroundColor:
                  selectedCategory === category.key ? "#dbeafe" : "#f3f4f6",
                color:
                  selectedCategory === category.key ? "#3b82f6" : "#6b7280",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === category.key ? "#dbeafe" : "#e5e7eb",
                },
              }}
            >
              {category.label}
            </Button>
          ))}
        </Box>

        {/* Summary Stats */}
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            marginBottom: "24px",
            paddingBottom: "24px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
              }}
            >
              Strength
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1a2d4d",
              }}
            >
              {stats.totalStrength}
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
                ≥90
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
                ≥75
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
                &lt;75
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
                tickFormatter={(v) => v}
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
                  value: "Avg 77",
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
            const color = getAttendanceColor(d.rate);
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
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 0",
                  }}
                >
                  {d.division}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "12px",
                    color: color,
                    paddingLeft: "8px",
                  }}
                >
                  {d.rate}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
