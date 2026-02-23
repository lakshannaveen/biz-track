import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

// Count Up Hook
export function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const raf = useRef();
  const start = useRef();

  useEffect(() => {
    start.current = undefined;
    const step = (ts) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return count;
}

// KPI Card Component
export function KpiCard({
  label,
  target,
  suffix = "",
  icon: Icon,
  sparkData,
  sparkColor,
  trend,
  trendPositive,
  delay,
}) {
  const count = useCountUp(target, 1200 + delay * 200);

  // Determine icon background color based on sparkColor
  const getIconBgColor = (color) => {
    const colorMap = {
      "#3b82f6": "#dbeafe", // blue
      "#8b5cf6": "#ede9fe", // purple
      "#10b981": "#d1fae5", // green
      "#06b6d4": "#cffafe", // cyan
    };
    return colorMap[color] || `${color}15`;
  };

  const getIconColor = (color) => {
    const colorMap = {
      "#3b82f6": "#1e40af", // blue
      "#8b5cf6": "#5b21b6", // purple
      "#10b981": "#065f46", // green
      "#06b6d4": "#0e4e4d", // cyan
    };
    return colorMap[color] || color;
  };

  return (
    <Box
      sx={{
        animation: `slideUp 0.5s ease-out ${delay * 0.12}s forwards`,
        opacity: 0,
        "@keyframes slideUp": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: { xs: "12px", sm: "16px", md: "20px" },
          color: "#1a2d4d",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
          transition: "all 0.18s ease",
          "&:hover": {
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
          },
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          minHeight: { xs: 92, sm: 88 },
          justifyContent: "center",
        }}
      >
        {/* Content Container */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* Left Section - Icon and Values */}
          <Box sx={{ display: "flex", gap: "12px", flex: 1, alignItems: "center" }}>
            {/* Icon */}
            <Box
              sx={{
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: getIconBgColor(sparkColor),
                color: getIconColor(sparkColor),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "36px",
                height: "36px",
                flexShrink: 0,
                "& svg": { width: { xs: 16, sm: 18 }, height: { xs: 16, sm: 18 } },
              }}
            >
              <Icon />
            </Box>

            {/* Value and Label */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "18px", sm: "20px", md: "24px" },
                  fontWeight: 700,
                  color: "#000",
                  letterSpacing: "-0.5px",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                {count.toLocaleString()}
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "#6b7280",
                  marginTop: "4px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {label}
              </Typography>
            </Box>
          </Box>

          {/* Trend badge removed as requested */}
        </Box>
      </Box>
    </Box>
  );
}
